"use client";

import type { StaticImageData } from "next/image";
import ascendantCard from "@/asset/example/tier-card/ascendant.png";
import immortalCard from "@/asset/example/tier-card/immortal.png";
import radiantCard from "@/asset/example/tier-card/radiant.png";
import { TierCard } from "@/components/card/tier-card";
import type { TierName } from "@/constants/tier-design";

const JETT_PORTRAIT = "/characters/jett/fullportrait.png";

const SAMPLE_STATS = [
  { label: "ACS", value: "280" },
  { label: "K/D", value: "1.3" },
  { label: "HS%", value: "27%" },
  { label: "DDΔ", value: "+31" },
  { label: "KAST", value: "74%" },
  { label: "ADR", value: "168" },
];

interface HighTierCardEntry {
  name: TierName;
  competitiveTier: number;
  image: StaticImageData;
}

const HIGH_TIER_CARDS: HighTierCardEntry[] = [
  { name: "Ascendant", competitiveTier: 23, image: ascendantCard },
  { name: "Immortal", competitiveTier: 26, image: immortalCard },
  { name: "Radiant", competitiveTier: 27, image: radiantCard },
];

const CardSvgTest = () => (
  <div className="flex min-h-screen items-center justify-center gap-8 bg-gray-950 p-6">
    {HIGH_TIER_CARDS.map((card) => (
      <div key={card.name} className="flex flex-col items-center gap-3">
        <span className="text-sm font-medium text-white/70">{card.name}</span>
        <TierCard
          tierName={card.name}
          competitiveTier={card.competitiveTier}
          backgroundImage={card.image}
          portraitUrl={JETT_PORTRAIT}
          ovr={92}
          playerName="Player"
          stats={SAMPLE_STATS}
          className="h-[85vh]"
        />
      </div>
    ))}
  </div>
);

export { CardSvgTest };
