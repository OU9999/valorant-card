"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { TierCard } from "@/components/card/tier-card";
import {
  CardDetailLayout,
  CardSlot,
  DetailSlot,
} from "@/components/card/card-detail-layout";
import { CombatStats } from "@/components/card/detail/combat-stats";
import { PerformanceBadges } from "@/components/card/detail/performance-badges";
import { AIFeedback } from "@/components/card/detail/ai-feedback";
import { CHARACTERS } from "@/constants/game/characters";
import { TIER_CARD_IMAGES } from "@/constants/card/tier-card-images";
import { getWeaponIconUrl } from "@/constants/game/weapons";
import type { GeneratedCardData } from "@/lib/card/generate";

const DEFAULT_POSE_INDEX = 0;

const getAgentPortraitUrl = (agentId: string): string => {
  const normalized = agentId.toUpperCase();
  const character = CHARACTERS.find((c) => c.id.toUpperCase() === normalized);
  if (!character) return "";
  return character.poses[DEFAULT_POSE_INDEX];
};

interface CardViewProps {
  data: GeneratedCardData;
}

const CardView = ({ data }: CardViewProps) => {
  const backgroundImage = TIER_CARD_IMAGES[data.tierName];
  const portraitUrl = getAgentPortraitUrl(data.agentId);
  const weaponIconUrl = data.weaponId
    ? getWeaponIconUrl(data.weaponId)
    : undefined;

  return (
    <div className="flex min-h-screen flex-col items-center">
      <CardDetailLayout>
        <CardSlot>
          <TierCard
            tierName={data.tierName}
            competitiveTier={data.competitiveTier}
            backgroundImage={backgroundImage}
            portraitUrl={portraitUrl}
            ovr={data.ovr}
            playerName={data.playerName}
            region={data.region}
            weaponIconUrl={weaponIconUrl}
            stats={data.stats}
            className="h-[800px]"
            priority
          />
        </CardSlot>
        <DetailSlot>
          <CombatStats stats={data.stats} />
          <PerformanceBadges badges={data.badges} />
          <AIFeedback stats={data.stats} trend={data.trend} />
        </DetailSlot>
      </CardDetailLayout>
      <Link
        href="/"
        className="relative z-10 mb-8 flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="size-4" />
        돌아가기
      </Link>
    </div>
  );
};

export { CardView };
