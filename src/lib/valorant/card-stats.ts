import type { MatchDetails } from "@/network/riot/match";
import type { MatchMetrics, NormalizedMetrics } from "./tracker-score";
import {
  calculateMatchMetrics,
  normalizeMetrics,
  calculateConsistency,
} from "./tracker-score";
import { getTierInfo } from "./tiers";
import type { Badge } from "./badges";
import { calculateBadges } from "./badges";
import {
  clamp,
  collectAllKills,
  detectClutch,
  detectFirstBlood,
  RECENCY_DECAY,
  BAYESIAN_PRIOR_WINS,
  BAYESIAN_PRIOR_TOTAL,
} from "./match-utils";

// ─── Types ───

interface CardMetrics {
  fbRatio: number;
  multikillRate: number;
  assistsPerRound: number;
  surviveRate: number;
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
  badges: Badge[];
}

// ─── Constants ───

const CLUTCH_NEUTRAL_RATE = 0.125;

const CARD_NORMALIZATION = {
  fbRatio: { max: 2.0 },
  multikillRate: { max: 0.4 },
  assistsPerRound: { max: 0.5 },
  surviveRate: { max: 1.0 },
  clutchRate: { max: 0.5 },
} as const;

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
    clutchRate:
      clutchAttempts > 0 ? clutchSuccesses / clutchAttempts : CLUTCH_NEUTRAL_RATE,
  };
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
    sums.clutchRate += m.clutchRate * weight;
  }

  return {
    fbRatio: sums.fbRatio / totalWeight,
    multikillRate: sums.multikillRate / totalWeight,
    assistsPerRound: sums.assistsPerRound / totalWeight,
    surviveRate: sums.surviveRate / totalWeight,
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

const calculateDEF = (cm: CardMetrics, consistency: number): number => {
  const survive = clamp(
    cm.surviveRate / CARD_NORMALIZATION.surviveRate.max,
    0,
    1
  );
  return survive * 0.5 + consistency * 0.5;
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

/**
 * 매치별 경량 OVR (0~1 스케일)
 * DEF는 per-match이므로 consistency 제외, surviveRate만 사용
 */
const calculateMatchOVR = (
  match: MatchDetails,
  puuid: string
): number | null => {
  const mm = calculateMatchMetrics(match, puuid);
  const cm = calculateCardMetrics(match, puuid);
  if (!mm || !cm) return null;

  const nm = normalizeMetrics(mm);
  const survive = clamp(
    cm.surviveRate / CARD_NORMALIZATION.surviveRate.max,
    0,
    1
  );

  return (
    (calculateSHO(nm) +
      calculateDRI(nm) +
      calculatePAC(cm) +
      calculatePAS(nm, cm) +
      survive +
      calculatePHY(nm, cm)) /
    6
  );
};

const calculateFormTrend = (
  matches: MatchDetails[],
  puuid: string
): FormTrend => {
  const ovrs = matches
    .map((m) => calculateMatchOVR(m, puuid))
    .filter((v): v is number => v !== null);

  if (ovrs.length < 6) return "stable";

  const recent5 = ovrs.slice(0, 5);
  const older = ovrs.slice(5);

  const avg = (arr: number[]): number =>
    arr.reduce((s, v) => s + v, 0) / arr.length;

  const diff = avg(recent5) - avg(older);

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

  const consistency = calculateConsistency(matchMetrics);

  const { adjustedBase, ceiling } = tierInfo;
  const range = ceiling - adjustedBase;

  const mapToScore = (perf: number): number =>
    Math.round(clamp(adjustedBase + perf * range, adjustedBase, ceiling));

  const stats: CardStats = {
    sho: mapToScore(calculateSHO(nm)),
    dri: mapToScore(calculateDRI(nm)),
    pac: mapToScore(calculatePAC(cm)),
    pas: mapToScore(calculatePAS(nm, cm)),
    def: mapToScore(calculateDEF(cm, consistency)),
    phy: mapToScore(calculatePHY(nm, cm)),
  };

  const ovr = Math.round(
    (stats.sho + stats.dri + stats.pac + stats.pas + stats.def + stats.phy) / 6
  );

  const trend = calculateFormTrend(matches, puuid);
  const badges = calculateBadges(matches, puuid, matchMetrics);

  return { ovr, stats, trend, badges };
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
  const bayesianWinRate =
    (totalWins + BAYESIAN_PRIOR_WINS) /
    (matchMetrics.length + BAYESIAN_PRIOR_TOTAL);

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
