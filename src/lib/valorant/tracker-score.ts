import type {
  MatchDetails,
  MatchPlayer,
  RoundResult,
  RoundPlayerStats,
  Kill,
} from "@/network/riot/match";
import { getTierInfo } from "./tiers";

// ─── Types ───

interface MatchMetrics {
  kd: number;
  acs: number;
  hsPercent: number;
  adr: number;
  win: number;
  kast: number;
}

interface NormalizedMetrics {
  kd: number;
  acs: number;
  hsPercent: number;
  adr: number;
  win: number;
  kast: number;
}

interface TrackerScoreResult {
  score: number;
  performance: number;
  metrics: NormalizedMetrics;
}

// ─── Constants ───

const TRADE_WINDOW_MS = 5000;
const RECENCY_DECAY = 0.97;

const NORMALIZATION = {
  kd: { max: 2.0 },
  acs: { max: 350 },
  hsPercent: { max: 35 },
  adr: { max: 200 },
  win: { max: 100 },
  kast: { min: 40, range: 50 },
} as const;

const WEIGHTS = {
  acs: 0.25,
  kd: 0.2,
  adr: 0.15,
  kast: 0.15,
  win: 0.15,
  hsPercent: 0.1,
} as const;

// ─── Helpers ───

const clamp = (value: number, min: number, max: number): number =>
  Math.min(max, Math.max(min, value));

// ─── Per-Match Metric Calculation ───

const calculateMatchMetrics = (
  match: MatchDetails,
  puuid: string
): MatchMetrics | null => {
  const player = match.players.find((p) => p.puuid === puuid);
  if (!player) return null;

  const { stats } = player;
  if (stats.roundsPlayed === 0) return null;

  const kd = stats.kills / Math.max(stats.deaths, 1);
  const acs = stats.score / stats.roundsPlayed;

  const team = match.teams.find((t) => t.teamId === player.teamId);
  const win = team?.won ? 1 : 0;

  const { totalHeadshots, totalBodyshots, totalLegshots, totalDamage } =
    aggregateRoundDamage(match.roundResults, puuid);

  const totalShots = totalHeadshots + totalBodyshots + totalLegshots;
  const hsPercent = totalShots > 0 ? (totalHeadshots / totalShots) * 100 : 0;
  const adr = totalDamage / stats.roundsPlayed;

  const kast = calculateKAST(
    match.roundResults,
    puuid,
    player.teamId,
    match.players
  );

  return { kd, acs, hsPercent, adr, win, kast };
};

const aggregateRoundDamage = (
  roundResults: RoundResult[],
  puuid: string
): {
  totalHeadshots: number;
  totalBodyshots: number;
  totalLegshots: number;
  totalDamage: number;
} => {
  let totalHeadshots = 0;
  let totalBodyshots = 0;
  let totalLegshots = 0;
  let totalDamage = 0;

  for (const round of roundResults) {
    const playerStats = round.playerStats.find((ps) => ps.puuid === puuid);
    if (!playerStats) continue;

    for (const dmg of playerStats.damage) {
      totalHeadshots += dmg.headshots;
      totalBodyshots += dmg.bodyshots;
      totalLegshots += dmg.legshots;
      totalDamage += dmg.damage;
    }
  }

  return { totalHeadshots, totalBodyshots, totalLegshots, totalDamage };
};

// ─── KAST Calculation ───

const calculateKAST = (
  roundResults: RoundResult[],
  puuid: string,
  teamId: string,
  players: MatchPlayer[]
): number => {
  if (roundResults.length === 0) return 0;

  const teammatePuuids = new Set(
    players
      .filter((p) => p.teamId === teamId && p.puuid !== puuid)
      .map((p) => p.puuid)
  );

  let kastRounds = 0;

  for (const round of roundResults) {
    const allKills = collectAllKills(round.playerStats);

    const hasKill = allKills.some((k) => k.killer === puuid);
    if (hasKill) {
      kastRounds++;
      continue;
    }

    const hasAssist = allKills.some((k) => k.assistants.includes(puuid));
    if (hasAssist) {
      kastRounds++;
      continue;
    }

    const hasDied = allKills.some((k) => k.victim === puuid);
    if (!hasDied) {
      kastRounds++;
      continue;
    }

    const wasTraded = checkTraded(allKills, puuid, teammatePuuids);
    if (wasTraded) {
      kastRounds++;
    }
  }

  return (kastRounds / roundResults.length) * 100;
};

const collectAllKills = (playerStats: RoundPlayerStats[]): Kill[] => {
  const kills: Kill[] = [];
  for (const ps of playerStats) {
    kills.push(...ps.kills);
  }
  return kills;
};

/**
 * Trade 판정: 플레이어 사망 후 5초 이내에 팀원이 킬러를 처치했는지 확인
 */
const checkTraded = (
  allKills: Kill[],
  puuid: string,
  teammatePuuids: Set<string>
): boolean => {
  const deathEvent = allKills.find((k) => k.victim === puuid);
  if (!deathEvent) return false;

  const killer = deathEvent.killer;
  const deathTime = deathEvent.timeSinceRoundStartMillis;

  return allKills.some(
    (k) =>
      k.victim === killer &&
      teammatePuuids.has(k.killer) &&
      k.timeSinceRoundStartMillis - deathTime <= TRADE_WINDOW_MS &&
      k.timeSinceRoundStartMillis >= deathTime
  );
};

// ─── Normalization ───

const normalizeMetrics = (metrics: MatchMetrics): NormalizedMetrics => ({
  kd: clamp(metrics.kd / NORMALIZATION.kd.max, 0, 1),
  acs: clamp(metrics.acs / NORMALIZATION.acs.max, 0, 1),
  hsPercent: clamp(metrics.hsPercent / NORMALIZATION.hsPercent.max, 0, 1),
  adr: clamp(metrics.adr / NORMALIZATION.adr.max, 0, 1),
  win: clamp(metrics.win / (NORMALIZATION.win.max / 100), 0, 1),
  kast: clamp(
    (metrics.kast - NORMALIZATION.kast.min) / NORMALIZATION.kast.range,
    0,
    1
  ),
});

// ─── Weighted Performance ───

const calculatePerformance = (normalized: NormalizedMetrics): number =>
  normalized.acs * WEIGHTS.acs +
  normalized.kd * WEIGHTS.kd +
  normalized.adr * WEIGHTS.adr +
  normalized.kast * WEIGHTS.kast +
  normalized.win * WEIGHTS.win +
  normalized.hsPercent * WEIGHTS.hsPercent;

// ─── Recency-Weighted Aggregation ───

const aggregateMetrics = (
  matchMetrics: MatchMetrics[]
): NormalizedMetrics | null => {
  if (matchMetrics.length === 0) return null;

  let totalWeight = 0;
  const sums = { kd: 0, acs: 0, hsPercent: 0, adr: 0, win: 0, kast: 0 };

  for (let i = 0; i < matchMetrics.length; i++) {
    const weight = Math.pow(RECENCY_DECAY, i);
    const m = matchMetrics[i];
    totalWeight += weight;

    sums.kd += m.kd * weight;
    sums.acs += m.acs * weight;
    sums.hsPercent += m.hsPercent * weight;
    sums.adr += m.adr * weight;
    sums.win += m.win * weight;
    sums.kast += m.kast * weight;
  }

  const averaged: MatchMetrics = {
    kd: sums.kd / totalWeight,
    acs: sums.acs / totalWeight,
    hsPercent: sums.hsPercent / totalWeight,
    adr: sums.adr / totalWeight,
    win: sums.win / totalWeight,
    kast: sums.kast / totalWeight,
  };

  return normalizeMetrics(averaged);
};

// ─── Main Entry ───

/**
 * 최근 매치 데이터와 랭크 티어로 Tracker Score(1~99)를 산출한다.
 *
 * @param matches - 최근 매치 목록 (최신순 정렬, 최대 20개)
 * @param puuid - 대상 플레이어 PUUID
 * @param competitiveTier - 현재 경쟁전 티어 (0~27)
 */
const calculateTrackerScore = (
  matches: MatchDetails[],
  puuid: string,
  competitiveTier: number
): TrackerScoreResult | null => {
  const tierInfo = getTierInfo(competitiveTier);
  if (!tierInfo) return null;

  const matchMetrics = matches
    .map((match) => calculateMatchMetrics(match, puuid))
    .filter((m): m is MatchMetrics => m !== null);

  if (matchMetrics.length === 0) return null;

  const metrics = aggregateMetrics(matchMetrics);
  if (!metrics) return null;

  const performance = calculatePerformance(metrics);
  const { base, ceiling } = tierInfo;
  const score = Math.round(base + performance * (ceiling - base));

  return {
    score: clamp(score, base, ceiling),
    performance,
    metrics,
  };
};

export {
  calculateTrackerScore,
  calculateMatchMetrics,
  calculateKAST,
  calculatePerformance,
  normalizeMetrics,
  aggregateMetrics,
};
export type { MatchMetrics, NormalizedMetrics, TrackerScoreResult };
