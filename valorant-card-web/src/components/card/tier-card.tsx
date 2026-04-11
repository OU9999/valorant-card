"use client";

import { useId, type Ref } from "react";
import type { StaticImageData } from "next/image";
import { HIGH_TIER_NAMES, TIER_DESIGNS } from "@/constants/card/tier-design";
import type { TierName } from "@/constants/card/tier-design";
import { cn } from "@/lib/cn";
import type { CardStat, CardSize } from "./tier-card/types";
import {
  ClipPathDefs,
  BackgroundLayer,
  PortraitLayer,
  BottomGradientLayer,
} from "./tier-card/layers";
import { OvrSection } from "./tier-card/ovr-section";
import { PlayerNameSection } from "./tier-card/player-name-section";
import { StatsSection } from "./tier-card/stats-section";

/* ------------------------------------------------------------------ */
/*  TierCard                                                          */
/* ------------------------------------------------------------------ */

interface TierCardProps {
  ref?: Ref<HTMLDivElement>;
  tierName: TierName;
  competitiveTier: number;
  backgroundImage: StaticImageData;
  portraitUrl: string;
  ovr: number;
  playerName: string;
  region?: string;
  weaponIconUrl?: string;
  stats: CardStat[];
  size?: CardSize;
  priority?: boolean;
  className?: string;
}

const TierCard = ({
  ref,
  tierName,
  competitiveTier,
  backgroundImage,
  portraitUrl,
  ovr,
  playerName,
  region = "AP",
  weaponIconUrl,
  stats,
  size = "default",
  priority = false,
  className,
}: TierCardProps) => {
  const clipId = useId();
  const design = TIER_DESIGNS[tierName];
  const isHighTier = HIGH_TIER_NAMES.has(tierName);
  const clipStyle = { clipPath: `url(#${clipId})` };
  const isSm = size === "sm";

  return (
    <div
      ref={ref}
      className={cn(
        "@container relative overflow-hidden aspect-2109/3218",
        className,
      )}
    >
      <ClipPathDefs clipId={clipId} tierName={tierName} />
      <BackgroundLayer
        backgroundImage={backgroundImage}
        tierName={tierName}
        priority={priority}
      />
      <PortraitLayer
        portraitUrl={portraitUrl}
        isHighTier={isHighTier}
        clipStyle={clipStyle}
        priority={priority}
      />
      <BottomGradientLayer
        design={design}
        isHighTier={isHighTier}
        clipStyle={clipStyle}
      />
      <div className="absolute inset-0">
        <OvrSection
          ovr={ovr}
          region={region}
          weaponIconUrl={weaponIconUrl}
          competitiveTier={competitiveTier}
          tierName={tierName}
          design={design}
          isHighTier={isHighTier}
          isSm={isSm}
          clipStyle={clipStyle}
        />
        <PlayerNameSection
          playerName={playerName}
          design={design}
          isHighTier={isHighTier}
          isSm={isSm}
        />
        <StatsSection
          stats={stats}
          design={design}
          isHighTier={isHighTier}
          isSm={isSm}
        />
      </div>
    </div>
  );
};

export { TierCard };
export type { TierCardProps, CardStat, CardSize };
