import type { RiotRegion, ValorantShard } from "@/network/riot/common";
import type { MatchDetails } from "@/network/riot/match";
import type { CardStat, FormTrend } from "@/lib/valorant/card-stats";
import type { Badge } from "@/lib/valorant/badges";
import type { TierName } from "@/constants/tier-design";
import { TIER_NAMES } from "@/constants/tier-design";

const SHARD_LABELS: Record<ValorantShard, string> = {
  kr: "KR",
  ap: "AP",
  na: "NA",
  eu: "EU",
  br: "BR",
  latam: "LATAM",
};
import {
  getAccountByPuuid,
  getMatchListByPuuid,
  getMatchById,
} from "@/lib/riot/client";
import {
  calculateCardScore,
  formatCardStats,
  findMostUsedWeapon,
} from "@/lib/valorant/card-stats";
import { getTierIndex } from "@/lib/valorant/tiers";
import { RiotRateLimitError } from "@/lib/riot/errors";
import { CardGenerationError } from "./errors";

// ─── Types ───

interface GeneratedCardData {
  playerName: string;
  tagLine: string;
  tierName: TierName;
  competitiveTier: number;
  ovr: number;
  stats: CardStat[];
  agentId: string;
  weaponId: string | null;
  region: string;
  trend: FormTrend;
  badges: Badge[];
}

// ─── Helpers ───

const findMostPlayedAgent = (
  matches: MatchDetails[],
  puuid: string,
): string | null => {
  const counts = new Map<string, number>();

  for (const match of matches) {
    const player = match.players.find((p) => p.puuid === puuid);
    if (!player) continue;

    const id = player.characterId;
    counts.set(id, (counts.get(id) ?? 0) + 1);
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

const competitiveTierToTierName = (tier: number): TierName | null => {
  const index = getTierIndex(tier);
  if (index < 0) return null;
  return TIER_NAMES[index] ?? null;
};

// ─── Main Orchestrator ───

const generateCard = async (
  puuid: string,
  shard: ValorantShard,
  region: RiotRegion,
): Promise<GeneratedCardData> => {

  try {
    // 1. Account lookup by puuid
    const accountResult = await getAccountByPuuid(puuid, region);
    if (!accountResult.ok) {
      if (accountResult.error.status === 404) {
        throw new CardGenerationError("ACCOUNT_NOT_FOUND", "Account not found", 404);
      }
      if (accountResult.error.code === "RATE_LIMITED") {
        throw new CardGenerationError("RATE_LIMITED", "Rate limited", 429);
      }
      if (accountResult.error.code === "MISSING_API_KEY") {
        throw new CardGenerationError("API_KEY_EXPIRED", "API key not configured", 500);
      }
      throw new CardGenerationError("INTERNAL_ERROR", accountResult.error.message, 500);
    }

    // 2. Match list
    const matchListResult = await getMatchListByPuuid(accountResult.data.puuid, shard);
    if (!matchListResult.ok) {
      if (matchListResult.error.code === "RATE_LIMITED") {
        throw new CardGenerationError("RATE_LIMITED", "Rate limited", 429);
      }
      throw new CardGenerationError("INTERNAL_ERROR", matchListResult.error.message, 500);
    }

    // 4. Pre-filter competitive matches, take first 5
    const competitiveEntries = matchListResult.data.history
      .filter((entry) => entry.queueId === "competitive")
      .slice(0, 5);

    if (competitiveEntries.length === 0) {
      throw new CardGenerationError("NO_MATCHES", "No competitive matches found", 404);
    }

    // 5. Fetch match details in parallel
    const matchResults = await Promise.all(
      competitiveEntries.map((entry) => getMatchById(entry.matchId, shard)),
    );

    const matches: MatchDetails[] = [];
    for (const result of matchResults) {
      if (result.ok) {
        matches.push(result.data);
      }
    }

    if (matches.length === 0) {
      throw new CardGenerationError("NO_MATCHES", "Failed to fetch match details", 500);
    }

    // 6. Extract competitive tier from most recent match
    const mostRecentMatch = matches[0];
    const playerInMatch = mostRecentMatch.players.find((p) => p.puuid === puuid);
    const competitiveTier = playerInMatch?.competitiveTier ?? 0;

    // 7. Calculate card score
    const scoreResult = calculateCardScore(matches, puuid, competitiveTier);
    if (!scoreResult) {
      throw new CardGenerationError("NO_MATCHES", "Could not calculate card score", 500);
    }

    // 8. Determine tier name
    const tierName = competitiveTierToTierName(competitiveTier);
    if (!tierName) {
      throw new CardGenerationError("INTERNAL_ERROR", "Unknown competitive tier", 500);
    }

    // 9. Most played agent + most used weapon
    const agentId = findMostPlayedAgent(matches, puuid);
    if (!agentId) {
      throw new CardGenerationError("INTERNAL_ERROR", "Could not determine agent", 500);
    }

    const weaponId = findMostUsedWeapon(matches, puuid);

    // 10. Format and return
    return {
      playerName: accountResult.data.gameName,
      tagLine: accountResult.data.tagLine,
      tierName,
      competitiveTier,
      ovr: scoreResult.ovr,
      stats: formatCardStats(scoreResult.stats),
      agentId,
      weaponId,
      region: SHARD_LABELS[shard],
      trend: scoreResult.trend,
      badges: scoreResult.badges,
    };
  } catch (error) {
    if (error instanceof CardGenerationError) throw error;

    if (error instanceof RiotRateLimitError) {
      throw new CardGenerationError("RATE_LIMITED", "Rate limited", 429, error.retryAfter);
    }

    const message = error instanceof Error ? error.message : "Unknown error";

    if (message.includes("401") || message.includes("403")) {
      throw new CardGenerationError("API_KEY_EXPIRED", "API key expired or invalid", 500);
    }

    throw new CardGenerationError("INTERNAL_ERROR", message, 500);
  }
};

export { generateCard };
export type { GeneratedCardData };
