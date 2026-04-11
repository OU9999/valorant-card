"use client";

import { ArrowLeft } from "lucide-react";
import { useTranslations } from "next-intl";
import { TierCard } from "@/components/card/tier-card";
import { Button } from "@/components/ui/button";
import { CHARACTERS } from "@/constants/game/characters";
import { TIER_CARD_IMAGES } from "@/constants/card/tier-card-images";
import { getWeaponIconUrl } from "@/constants/game/weapons";
import type { GeneratedCardData } from "@/lib/card/generate";

const DEFAULT_POSE_INDEX = 0;

// ─── Helpers ───

const getAgentPortraitUrl = (agentId: string): string => {
  const normalized = agentId.toUpperCase();
  const character = CHARACTERS.find((c) => c.id.toUpperCase() === normalized);
  if (!character) return "";
  return character.poses[DEFAULT_POSE_INDEX];
};

// ─── Component ───

interface CardResultProps {
  data: GeneratedCardData;
  onBack: () => void;
}

const CardResult = ({ data, onBack }: CardResultProps) => {
  const t = useTranslations("Card");
  const backgroundImage = TIER_CARD_IMAGES[data.tierName];
  const portraitUrl = getAgentPortraitUrl(data.agentId);
  const weaponIconUrl = data.weaponId ? getWeaponIconUrl(data.weaponId) : undefined;

  return (
    <div className="flex flex-col items-center gap-6">
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
      <Button
        variant="ghost"
        className="gap-2 text-muted-foreground hover:text-foreground"
        onClick={onBack}
      >
        <ArrowLeft className="size-4" />
        {t("back")}
      </Button>
    </div>
  );
};

export { CardResult };
