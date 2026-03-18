import type {
  MatchDetails,
  MatchPlayer,
  RoundResult,
  RoundPlayerStats,
  Kill,
} from "@/network/riot/match";
import type { MatchMetrics, NormalizedMetrics } from "./tracker-score";
import {
  calculateMatchMetrics,
  normalizeMetrics,
  calculatePerformance,
} from "./tracker-score";
import { getTierInfo } from "./tiers";

// ─── Types ───

interface CardMetrics {
  fbRatio: number;
  multikillRate: number;
  assistsPerRound: number;
  surviveRate: number;
  deathsPerRound: number;
  clutchRate: number;
}

interface CardStats {
  sho: number;
  dri: number;
  pac: number;
  pas: number;
  def: number;
  phy: number;
}

type FormTrend = "up" | "stable" | "down";

interface CardScoreResult {
  ovr: number;
  stats: CardStats;
  trend: FormTrend;
}

// ─── Constants ───

const RECENCY_DECAY = 0.97;

const CARD_NORMALIZATION = {
  fbRatio: { max: 2.0 },
  multikillRate: { max: 0.4 },
  assistsPerRound: { max: 0.5 },
  surviveRate: { max: 1.0 },
  deathsPerRound: { max: 1.0 },
  clutchRate: { max: 0.5 },
} as const;

// ─── Helpers ───

const clamp = (value: number, min: number, max: number): number =>
  Math.min(max, Math.max(min, value));

// ─── CardMetrics Calculation ───

const calculateCardMetrics = (
  match: MatchDetails,
  puuid: string
): CardMetrics | null => {
  const player = match.players.find((p) => p.puuid === puuid);
  if (!player) return null;

  const { stats } = player;
  if (stats.roundsPlayed === 0) return null;

  const teammatePuuids = new Set(
    match.players
      .filter((p) => p.teamId === player.teamId && p.puuid !== puuid)
      .map((p) => p.puuid)
  );

  let firstKills = 0;
  let firstDeaths = 0;
  let multikillRounds = 0;
  let surviveRounds = 0;
  let clutchAttempts = 0;
  let clutchSuccesses = 0;

  for (const round of match.roundResults) {
    const allKills = collectAllKills(round.playerStats);
    if (allKills.length === 0) continue;

    const fb = detectFirstBlood(allKills, puuid);
    if (fb === "kill") firstKills++;
    if (fb === "death") firstDeaths++;

    const playerKills = allKills.filter((k) => k.killer === puuid);
    if (playerKills.length >= 2) multikillRounds++;

    const died = allKills.some((k) => k.victim === puuid);
    if (!died) surviveRounds++;

    const clutch = detectClutch(
      allKills,
      puuid,
      player.teamId,
      teammatePuuids,
      round.winningTeam
    );
    if (clutch !== null) {
      clutchAttempts++;
      if (clutch) clutchSuccesses++;
    }
  }

  return {
    fbRatio: firstKills / Math.max(firstDeaths, 1),
    multikillRate: multikillRounds / stats.roundsPlayed,
    assistsPerRound: stats.assists / stats.roundsPlayed,
    surviveRate: surviveRounds / stats.roundsPlayed,
    deathsPerRound: stats.deaths / stats.roundsPlayed,
    clutchRate:
      clutchAttempts > 0 ? clutchSuccesses / clutchAttempts : 0,
  };
};

const collectAllKills = (playerStats: RoundPlayerStats[]): Kill[] => {
  const kills: Kill[] = [];
  for (const ps of playerStats) {
    kills.push(...ps.kills);
  }
  return kills;
};

const detectFirstBlood = (
  allKills: Kill[],
  puuid: string
): "kill" | "death" | null => {
  if (allKills.length === 0) return null;

  const sorted = [...allKills].sort(
    (a, b) => a.timeSinceRoundStartMillis - b.timeSinceRoundStartMillis
  );
  const first = sorted[0];

  if (first.killer === puuid) return "kill";
  if (first.victim === puuid) return "death";
  return null;
};

/**
 * 클러치 판정: 팀원이 모두 죽고 혼자 남은 상태에서 라운드 승리
 * 킬 이벤트를 시간순으로 추적하여 팀원 생존 수를 계산
 */
const detectClutch = (
  allKills: Kill[],
  puuid: string,
  teamId: string,
  teammatePuuids: Set<string>,
  winningTeam: string
): boolean | null => {
  const sorted = [...allKills].sort(
    (a, b) => a.timeSinceRoundStartMillis - b.timeSinceRoundStartMillis
  );

  let teammatesAlive = teammatePuuids.size;
  let playerDied = false;

  for (const kill of sorted) {
    if (kill.victim === puuid) {
      playerDied = true;
      break;
    }
    if (teammatePuuids.has(kill.victim)) {
      teammatesAlive--;
    }
  }

  if (playerDied) return null;
  if (teammatesAlive > 0) return null;

  return winningTeam === teamId;
};

// ─── Aggregate CardMetrics ───

const aggregateCardMetrics = (
  metricsArray: CardMetrics[]
): CardMetrics | null => {
  if (metricsArray.length === 0) return null;

  let totalWeight = 0;
  const sums = {
    fbRatio: 0,
    multikillRate: 0,
    assistsPerRound: 0,
    surviveRate: 0,
    deathsPerRound: 0,
    clutchRate: 0,
  };

  for (let i = 0; i < metricsArray.length; i++) {
    const weight = Math.pow(RECENCY_DECAY, i);
    const m = metricsArray[i];
    totalWeight += weight;

    sums.fbRatio += m.fbRatio * weight;
    sums.multikillRate += m.multikillRate * weight;
    sums.assistsPerRound += m.assistsPerRound * weight;
    sums.surviveRate += m.surviveRate * weight;
    sums.deathsPerRound += m.deathsPerRound * weight;
    sums.clutchRate += m.clutchRate * weight;
  }

  return {
    fbRatio: sums.fbRatio / totalWeight,
    multikillRate: sums.multikillRate / totalWeight,
    assistsPerRound: sums.assistsPerRound / totalWeight,
    surviveRate: sums.surviveRate / totalWeight,
    deathsPerRound: sums.deathsPerRound / totalWeight,
    clutchRate: sums.clutchRate / totalWeight,
  };
};

// ─── 6 Stats Calculation ───

const calculateSHO = (nm: NormalizedMetrics): number =>
  nm.acs * 0.4 + nm.adr * 0.3 + nm.ddDelta * 0.3;

const calculateDRI = (nm: NormalizedMetrics): number =>
  nm.hsPercent * 0.5 + nm.kd * 0.5;

const calculatePAC = (cm: CardMetrics): number => {
  const fb = clamp(Math.sqrt(cm.fbRatio / CARD_NORMALIZATION.fbRatio.max), 0, 1);
  const mk = clamp(
    Math.sqrt(cm.multikillRate / CARD_NORMALIZATION.multikillRate.max),
    0,
    1
  );
  return fb * 0.5 + mk * 0.5;
};

const calculatePAS = (nm: NormalizedMetrics, cm: CardMetrics): number => {
  const apr = clamp(
    Math.sqrt(cm.assistsPerRound / CARD_NORMALIZATION.assistsPerRound.max),
    0,
    1
  );
  return apr * 0.5 + nm.kast * 0.5;
};

const calculateDEF = (cm: CardMetrics): number => {
  const invDeaths = clamp(
    1 - cm.deathsPerRound / CARD_NORMALIZATION.deathsPerRound.max,
    0,
    1
  );
  const survive = clamp(
    cm.surviveRate / CARD_NORMALIZATION.surviveRate.max,
    0,
    1
  );
  return invDeaths * 0.5 + survive * 0.5;
};

const calculatePHY = (nm: NormalizedMetrics, cm: CardMetrics): number => {
  const clutch = clamp(
    Math.sqrt(cm.clutchRate / CARD_NORMALIZATION.clutchRate.max),
    0,
    1
  );
  return clutch * 0.6 + nm.win * 0.4;
};

// ─── Form Trend ───

const calculateFormTrend = (matchMetrics: MatchMetrics[]): FormTrend => {
  if (matchMetrics.length < 6) return "stable";

  const recent5 = matchMetrics.slice(0, 5);
  const older = matchMetrics.slice(5);

  const avgPerf = (metrics: MatchMetrics[]): number => {
    const total = metrics.reduce(
      (sum, m) => sum + calculatePerformance(normalizeMetrics(m)),
      0
    );
    return total / metrics.length;
  };

  const diff = avgPerf(recent5) - avgPerf(older);

  if (diff > 0.05) return "up";
  if (diff < -0.05) return "down";
  return "stable";
};

// ─── Main Entry ───

const calculateCardScore = (
  matches: MatchDetails[],
  puuid: string,
  competitiveTier: number
): CardScoreResult | null => {
  const tierInfo = getTierInfo(competitiveTier);
  if (!tierInfo) return null;

  const matchMetrics = matches
    .map((match) => calculateMatchMetrics(match, puuid))
    .filter((m): m is MatchMetrics => m !== null);

  const cardMetricsArray = matches
    .map((match) => calculateCardMetrics(match, puuid))
    .filter((m): m is CardMetrics => m !== null);

  if (matchMetrics.length === 0 || cardMetricsArray.length === 0) return null;

  const nm = normalizeMetrics(
    aggregateMatchMetrics(matchMetrics)
  );
  const cm = aggregateCardMetrics(cardMetricsArray);
  if (!cm) return null;

  const { adjustedBase, ceiling } = tierInfo;
  const range = ceiling - adjustedBase;

  const mapToScore = (perf: number): number =>
    Math.round(clamp(adjustedBase + perf * range, adjustedBase, ceiling));

  const stats: CardStats = {
    sho: mapToScore(calculateSHO(nm)),
    dri: mapToScore(calculateDRI(nm)),
    pac: mapToScore(calculatePAC(cm)),
    pas: mapToScore(calculatePAS(nm, cm)),
    def: mapToScore(calculateDEF(cm)),
    phy: mapToScore(calculatePHY(nm, cm)),
  };

  const ovr = Math.round(
    (stats.sho + stats.dri + stats.pac + stats.pas + stats.def + stats.phy) / 6
  );

  const trend = calculateFormTrend(matchMetrics);

  return { ovr, stats, trend };
};

// ─── Helper: aggregate MatchMetrics without normalization ───

const aggregateMatchMetrics = (
  matchMetrics: MatchMetrics[]
): MatchMetrics => {
  let totalWeight = 0;
  const sums = {
    kd: 0,
    acs: 0,
    hsPercent: 0,
    adr: 0,
    ddDelta: 0,
    win: 0,
    kast: 0,
  };

  for (let i = 0; i < matchMetrics.length; i++) {
    const weight = Math.pow(RECENCY_DECAY, i);
    const m = matchMetrics[i];
    totalWeight += weight;

    sums.kd += m.kd * weight;
    sums.acs += m.acs * weight;
    sums.hsPercent += m.hsPercent * weight;
    sums.adr += m.adr * weight;
    sums.ddDelta += m.ddDelta * weight;
    sums.win += m.win * weight;
    sums.kast += m.kast * weight;
  }

  const totalWins = matchMetrics.filter((m) => m.win === 1).length;
  const bayesianWinRate = (totalWins + 5) / (matchMetrics.length + 10);

  return {
    kd: sums.kd / totalWeight,
    acs: sums.acs / totalWeight,
    hsPercent: sums.hsPercent / totalWeight,
    adr: sums.adr / totalWeight,
    ddDelta: sums.ddDelta / totalWeight,
    win: bayesianWinRate,
    kast: sums.kast / totalWeight,
  };
};

export { calculateCardScore, calculateCardMetrics, calculateFormTrend };
export type { CardMetrics, CardStats, CardScoreResult, FormTrend };
