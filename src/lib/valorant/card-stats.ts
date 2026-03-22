import type { MatchDetails } from "@/network/riot/match";
import type { MatchMetrics } from "./tracker-score";
import {
  calculateMatchMetrics,
  normalizeMetrics,
  calculateConsistency,
  calculatePerformance,
} from "./tracker-score";
import { getTierInfo } from "./tiers";
import type { Badge } from "./badges";
import { calculateBadges } from "./badges";
import {
  clamp,
  RECENCY_DECAY,
  BAYESIAN_PRIOR_WINS,
  BAYESIAN_PRIOR_TOTAL,
} from "./match-utils";

// ─── Types ───

interface CardStats {
  acs: number;
  kd: number;
  hsPercent: number;
  ddDelta: number;
  kast: number;
  adr: number;
}

interface CardStat {
  label: string;
  value: string;
}

type FormTrend = "up" | "stable" | "down";

interface CardScoreResult {
  ovr: number;
  stats: CardStats;
  trend: FormTrend;
  badges: Badge[];
}

// ─── Stats Formatting ───

const formatCardStats = (metrics: MatchMetrics): CardStat[] => [
  { label: "ACS", value: String(Math.round(metrics.acs)) },
  { label: "K/D", value: metrics.kd.toFixed(1) },
  { label: "HS%", value: `${Math.round(metrics.hsPercent)}%` },
  { label: "DDΔ", value: `${metrics.ddDelta >= 0 ? "+" : ""}${Math.round(metrics.ddDelta)}` },
  { label: "KAST", value: `${Math.round(metrics.kast)}%` },
  { label: "ADR", value: String(Math.round(metrics.adr)) },
];

// ─── Form Trend ───

/** 매치별 경량 OVR (0~1 스케일) — 가중 합산 기반 */
const calculateMatchOVR = (
  match: MatchDetails,
  puuid: string
): number | null => {
  const mm = calculateMatchMetrics(match, puuid);
  if (!mm) return null;

  return calculatePerformance(normalizeMetrics(mm));
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

  if (matchMetrics.length === 0) return null;

  const aggregated = aggregateMatchMetrics(matchMetrics);
  const nm = normalizeMetrics(aggregated);
  const consistency = calculateConsistency(matchMetrics);

  const { adjustedBase, ceiling } = tierInfo;
  const range = ceiling - adjustedBase;

  const performance = calculatePerformance(nm);
  const finalPerf = performance * 0.9 + consistency * 0.1;
  const ovr = Math.round(clamp(adjustedBase + finalPerf * range, adjustedBase, ceiling));

  const stats: CardStats = {
    acs: aggregated.acs,
    kd: aggregated.kd,
    hsPercent: aggregated.hsPercent,
    ddDelta: aggregated.ddDelta,
    kast: aggregated.kast,
    adr: aggregated.adr,
  };

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

// ─── Weapon ───

const findMostUsedWeapon = (
  matches: MatchDetails[],
  puuid: string,
): string | null => {
  const counts = new Map<string, number>();

  for (const match of matches) {
    for (const round of match.roundResults) {
      const ps = round.playerStats.find((s) => s.puuid === puuid);
      if (!ps) continue;

      for (const kill of ps.kills) {
        const weaponId = kill.finishingDamage.damageItem;
        if (!weaponId) continue;
        counts.set(weaponId, (counts.get(weaponId) ?? 0) + 1);
      }
    }
  }

  let maxId: string | null = null;
  let maxCount = 0;
  for (const [id, count] of counts) {
    if (count > maxCount) {
      maxId = id;
      maxCount = count;
    }
  }

  return maxId;
};

export { calculateCardScore, calculateFormTrend, formatCardStats, findMostUsedWeapon };
export type { CardStat, CardStats, CardScoreResult, FormTrend };
