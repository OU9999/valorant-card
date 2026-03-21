"use client";

import type { StaticImageData } from "next/image";
import ascendantCard from "@/asset/example/tier-card/ascendant.png";
import immortalCard from "@/asset/example/tier-card/immortal.png";
import radiantCard from "@/asset/example/tier-card/radiant.png";
import { TierCard } from "@/components/card/tier-card";

const JETT_PORTRAIT =
  "https://media.valorant-api.com/agents/add6443a-41bd-e414-f6ad-e58d267f4e95/fullportrait.png";

const SAMPLE_STATS = [
  { label: "SHO", value: 88 },
  { label: "DRI", value: 92 },
  { label: "PAC", value: 85 },
  { label: "PAS", value: 75 },
  { label: "DEF", value: 70 },
  { label: "PHY", value: 78 },
];

interface HighTierCardEntry {
  name: string;
  image: StaticImageData;
}

const HIGH_TIER_CARDS: HighTierCardEntry[] = [
  { name: "Ascendant", image: ascendantCard },
  { name: "Immortal", image: immortalCard },
  { name: "Radiant", image: radiantCard },
];

const CardSvgTest = () => (
  <div className="flex min-h-screen items-center justify-center gap-8 bg-gray-950 p-6">
    {HIGH_TIER_CARDS.map((card) => (
      <div key={card.name} className="flex flex-col items-center gap-3">
        <span className="text-sm font-medium text-white/70">{card.name}</span>
        <TierCard
          tierName={card.name}
          backgroundImage={card.image}
          portraitUrl={JETT_PORTRAIT}
          ovr={92}
          playerName="Player#KR1"
          stats={SAMPLE_STATS}
          className="h-[85vh]"
        />
      </div>
    ))}
  </div>
);

export { CardSvgTest };
