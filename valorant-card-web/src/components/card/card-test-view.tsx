"use client";

import { useEffect, useState } from "react";
import { TierCard } from "@/components/card/tier-card";
import {
  CardDetailLayout,
  CardSlot,
  DetailSlot,
} from "@/components/card/card-detail-layout";
import { CardDetailPlaceholder } from "@/components/card/card-detail-placeholder";
import { CHARACTERS } from "@/constants/characters";
import { TIER_CARD_IMAGES } from "@/constants/tier-card-images";
import { getWeaponIconUrl } from "@/constants/weapons";
import { TIER_NAMES } from "@/constants/tier-design";
import { SHARD_DISPLAY_NAMES } from "@/constants/regions";
import { adaptHenrikMatch } from "@/lib/henrik/adapter";
import {
  calculateCardScore,
  formatCardStats,
  findMostUsedWeapon,
} from "@/lib/valorant/card-stats";
import { getTierIndex } from "@/lib/valorant/tiers";
import type { TierName } from "@/constants/tier-design";
import type { CardStat, FormTrend } from "@/lib/valorant/card-stats";
import type { Badge } from "@/lib/valorant/badges";
import type { MatchDetails } from "@/network/riot/match";
import type {
  HenrikMatchesResponse,
  HenrikAccountResponse,
  HenrikMmrResponse,
} from "@/lib/henrik/types";

// ─── Types ───

interface ComputedCardData {
  tierName: TierName;
  competitiveTier: number;
  portraitUrl: string;
  ovr: number;
  playerName: string;
  region: string;
  weaponIconUrl?: string;
  stats: CardStat[];
  trend: FormTrend;
  badges: Badge[];
}

// ─── Helpers ───

const getTierName = (competitiveTier: number): TierName => {
  const index = getTierIndex(competitiveTier);
  if (index < 0 || index >= TIER_NAMES.length) return "Iron";
  return TIER_NAMES[index];
};

const findMostPlayedAgent = (
  matches: MatchDetails[],
  puuid: string,
): string => {
  const counts = new Map<string, number>();
  for (const match of matches) {
    const player = match.players.find((p) => p.puuid === puuid);
    if (!player) continue;
    counts.set(player.characterId, (counts.get(player.characterId) ?? 0) + 1);
  }
  let maxId = "";
  let maxCount = 0;
  for (const [id, count] of counts) {
    if (count > maxCount) {
      maxId = id;
      maxCount = count;
    }
  }
  return maxId;
};

// ─── Component ───

const CardTestView = () => {
  const [data, setData] = useState<ComputedCardData | null>(null);
  const [error, setError] = useState<string | null>(null);

  /** fixture 로드 → 어댑터 변환 → 알고리즘 실행 → 카드 데이터 계산 */
  useEffect(() => {
    Promise.all([
      fetch("/fixtures/henrik-account.json").then((r) => r.json()),
      fetch("/fixtures/henrik-mmr.json").then((r) => r.json()),
      fetch("/fixtures/henrik-matches.json").then((r) => r.json()),
    ])
      .then(
        ([account, mmr, matchesData]: [
          HenrikAccountResponse,
          HenrikMmrResponse,
          HenrikMatchesResponse,
        ]) => {
          const matches = matchesData.data.map(adaptHenrikMatch);
          const puuid = account.data.puuid;
          const competitiveTier = mmr.data.current.tier.id;

          const result = calculateCardScore(matches, puuid, competitiveTier);
          if (!result) {
            setError("알고리즘 실행 실패");
            return;
          }

          const tierName = getTierName(competitiveTier);
          const agentId = findMostPlayedAgent(matches, puuid);
          const character = CHARACTERS.find(
            (c) => c.id.toUpperCase() === agentId.toUpperCase(),
          );
          const portraitUrl = character?.poses[0] ?? "";
          const weaponId = findMostUsedWeapon(matches, puuid);
          const weaponIconUrl = weaponId
            ? getWeaponIconUrl(weaponId)
            : undefined;
          const region =
            SHARD_DISPLAY_NAMES[
              account.data.region as keyof typeof SHARD_DISPLAY_NAMES
            ] ?? account.data.region.toUpperCase();

          setData({
            tierName,
            competitiveTier,
            portraitUrl,
            ovr: result.ovr,
            playerName: account.data.name,
            region,
            weaponIconUrl,
            stats: formatCardStats(result.stats),
            trend: result.trend,
            badges: result.badges,
          });
        },
      )
      .catch((err: unknown) => {
        setError(err instanceof Error ? err.message : String(err));
      });
  }, []);

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <p className="text-red-400">{error}</p>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <p className="text-muted-foreground">Loading...</p>
      </div>
    );
  }

  return (
    <CardDetailLayout>
      <CardSlot>
        <TierCard
          tierName={data.tierName}
          competitiveTier={data.competitiveTier}
          backgroundImage={TIER_CARD_IMAGES[data.tierName]}
          portraitUrl={data.portraitUrl}
          ovr={data.ovr}
          playerName={data.playerName}
          region={data.region}
          weaponIconUrl={data.weaponIconUrl}
          stats={data.stats}
          className="h-[800px]"
          priority
        />
      </CardSlot>
      <DetailSlot>
        <CardDetailPlaceholder />
      </DetailSlot>
    </CardDetailLayout>
  );
};

export { CardTestView };
