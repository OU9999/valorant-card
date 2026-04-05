"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { TierCard } from "@/components/card/tier-card";
import { CHARACTERS } from "@/constants/characters";
import { TIER_CARD_IMAGES } from "@/constants/tier-card-images";
import { getWeaponIconUrl } from "@/constants/weapons";
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
    <div className="relative flex min-h-screen flex-col items-center justify-center bg-background">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_oklch(0.668_0.220_21_/_0.12)_0%,_transparent_60%)]" />
      <div className="relative z-10 flex flex-col items-center gap-6">
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
        <Link
          href="/"
          className="flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="size-4" />
          돌아가기
        </Link>
      </div>
    </div>
  );
};

export { CardView };
