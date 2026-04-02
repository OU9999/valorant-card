import type {
  MatchDetails,
  MatchPlayer,
  RoundResult,
  Kill,
} from "@/network/riot/match";
import { clamp, collectAllKills } from "./match-utils";

// ─── Types ───

interface MatchMetrics {
  kd: number;
  acs: number;
  hsPercent: number;
  adr: number;
  ddDelta: number;
  win: number;
  kast: number;
}

interface NormalizedMetrics {
  kd: number;
  acs: number;
  hsPercent: number;
  adr: number;
  ddDelta: number;
  win: number;
  kast: number;
}

// ─── Constants ───

const TRADE_WINDOW_MS = 5000;
const CONSISTENCY_MAX_STDDEV = 0.3;

const NORMALIZATION = {
  kd: { max: 2.0 },
  acs: { max: 350 },
  hsPercent: { max: 35 },
  adr: { max: 200 },
  ddDelta: { max: 80 },
  kast: { min: 65, range: 25 },
} as const;

const WEIGHTS = {
  acs: 0.25,
  kd: 0.2,
  adr: 0.1,
  ddDelta: 0.1,
  hsPercent: 0.1,
  win: 0.1,
  kast: 0.05,
} as const;

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

  const {
    totalHeadshots,
    totalBodyshots,
    totalLegshots,
    totalDamage,
    totalDamageReceived,
  } = aggregateRoundDamage(match.roundResults, puuid);

  const totalShots = totalHeadshots + totalBodyshots + totalLegshots;
  const hsPercent = totalShots > 0 ? (totalHeadshots / totalShots) * 100 : 0;
  const adr = totalDamage / stats.roundsPlayed;
  const ddDelta = (totalDamage - totalDamageReceived) / stats.roundsPlayed;

  const kast = calculateKAST(
    match.roundResults,
    puuid,
    player.teamId,
    match.players
  );

  return { kd, acs, hsPercent, adr, ddDelta, win, kast };
};

const aggregateRoundDamage = (
  roundResults: RoundResult[],
  puuid: string
): {
  totalHeadshots: number;
  totalBodyshots: number;
  totalLegshots: number;
  totalDamage: number;
  totalDamageReceived: number;
} => {
  let totalHeadshots = 0;
  let totalBodyshots = 0;
  let totalLegshots = 0;
  let totalDamage = 0;
  let totalDamageReceived = 0;

  for (const round of roundResults) {
    const playerStats = round.playerStats.find((ps) => ps.puuid === puuid);
    if (!playerStats) continue;

    for (const dmg of playerStats.damage) {
      totalHeadshots += dmg.headshots;
      totalBodyshots += dmg.bodyshots;
      totalLegshots += dmg.legshots;
      totalDamage += dmg.damage;
    }

    for (const ps of round.playerStats) {
      if (ps.puuid === puuid) continue;

      for (const dmg of ps.damage) {
        if (dmg.receiver === puuid) {
          totalDamageReceived += dmg.damage;
        }
      }
    }
  }

  return {
    totalHeadshots,
    totalBodyshots,
    totalLegshots,
    totalDamage,
    totalDamageReceived,
  };
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
  kd: clamp(Math.sqrt(metrics.kd / NORMALIZATION.kd.max), 0, 1),
  acs: clamp(Math.sqrt(metrics.acs / NORMALIZATION.acs.max), 0, 1),
  hsPercent: clamp(
    Math.sqrt(metrics.hsPercent / NORMALIZATION.hsPercent.max),
    0,
    1
  ),
  adr: clamp(Math.sqrt(metrics.adr / NORMALIZATION.adr.max), 0, 1),
  ddDelta:
    clamp(metrics.ddDelta / NORMALIZATION.ddDelta.max, -1, 1) * 0.5 + 0.5,
  win: clamp(metrics.win, 0, 1),
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
  normalized.ddDelta * WEIGHTS.ddDelta +
  normalized.hsPercent * WEIGHTS.hsPercent +
  normalized.win * WEIGHTS.win +
  normalized.kast * WEIGHTS.kast;

// ─── Consistency ───

const calculateConsistency = (matchMetrics: MatchMetrics[]): number => {
  if (matchMetrics.length < 2) return 1;

  const performances = matchMetrics.map((m) =>
    calculatePerformance(normalizeMetrics(m))
  );

  const mean = performances.reduce((a, b) => a + b, 0) / performances.length;
  const variance =
    performances.reduce((sum, p) => sum + (p - mean) ** 2, 0) /
    performances.length;
  const stddev = Math.sqrt(variance);

  return 1 - clamp(stddev / CONSISTENCY_MAX_STDDEV, 0, 1);
};

export {
  calculateMatchMetrics,
  calculateKAST,
  calculatePerformance,
  calculateConsistency,
  normalizeMetrics,
};
export type { MatchMetrics, NormalizedMetrics };
