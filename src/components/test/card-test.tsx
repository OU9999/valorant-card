"use client";

import Image, { type StaticImageData } from "next/image";
import ironCard from "@/asset/example/tier-card/iron.png";
import bronzeCard from "@/asset/example/tier-card/bronze.png";
import silverCard from "@/asset/example/tier-card/silver.png";
import goldCard from "@/asset/example/tier-card/gold.png";
import platinumCard from "@/asset/example/tier-card/platinum.png";
import diamondCard from "@/asset/example/tier-card/diamond.png";
import ascendantCard from "@/asset/example/tier-card/ascendant.png";
import immortalCard from "@/asset/example/tier-card/immortal.png";
import radiantCard from "@/asset/example/tier-card/radiant.png";

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

interface TierCard {
  name: string;
  image: StaticImageData;
}

const TIER_CARDS: TierCard[] = [
  { name: "Iron", image: ironCard },
  { name: "Bronze", image: bronzeCard },
  { name: "Silver", image: silverCard },
  { name: "Gold", image: goldCard },
  { name: "Platinum", image: platinumCard },
  { name: "Diamond", image: diamondCard },
  { name: "Ascendant", image: ascendantCard },
  { name: "Immortal", image: immortalCard },
  { name: "Radiant", image: radiantCard },
];

const CardTest = () => (
  <div className="flex min-h-screen flex-wrap items-start justify-center gap-8 bg-gray-950 p-8">
    {TIER_CARDS.map((tier) => (
      <div key={tier.name} className="flex flex-col items-center gap-2">
        <span className="text-sm font-medium text-white/70">{tier.name}</span>
        <div className="relative w-50 aspect-2109/3218">
          {/* Layer 1: Card background */}
          <Image
            src={tier.image}
            alt={`${tier.name} card background`}
            fill
            className="object-contain"
          />

          {/* Layer 2: Agent portrait (clipped + faded) */}
          <Image
            src={JETT_PORTRAIT}
            alt="agent portrait"
            fill
            sizes="200px"
            className="card-clip card-portrait-fade object-cover object-top"
          />

          {/* Layer 3: Bottom gradient for text readability */}
          <div className="card-clip absolute inset-x-0 bottom-0 h-[45%] bg-linear-to-t from-black/80 via-black/40 to-transparent" />

          {/* Layer 4: Text content */}
          <div className="absolute inset-0">
            {/* OVR */}
            <div className="absolute left-[12%] top-[12%]">
              <span className="text-2xl font-bold text-white drop-shadow-lg">
                92
              </span>
            </div>

            {/* Player name */}
            <div className="absolute inset-x-0 top-[62%] text-center">
              <span className="text-sm font-semibold text-white drop-shadow-lg">
                Player#KR1
              </span>
            </div>

            {/* Stats grid */}
            <div className="absolute inset-x-[15%] top-[70%] grid grid-cols-2 gap-x-4 gap-y-0.5 text-xs text-white">
              {SAMPLE_STATS.map((stat) => (
                <div key={stat.label} className="flex justify-between">
                  <span className="text-white/70">{stat.label}</span>
                  <span className="font-bold">{stat.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    ))}
  </div>
);

export { CardTest };
