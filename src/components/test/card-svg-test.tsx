"use client";

import Image, { type StaticImageData } from "next/image";
import ascendantCard from "@/asset/example/tier-card/ascendant.png";
import immortalCard from "@/asset/example/tier-card/immortal.png";
import radiantCard from "@/asset/example/tier-card/radiant.png";
import { CARD_SVG_PATH_HIGH_TIER } from "@/constants/card";

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

interface HighTierCard {
  name: string;
  image: StaticImageData;
}

const HIGH_TIER_CARDS: HighTierCard[] = [
  { name: "Ascendant", image: ascendantCard },
  { name: "Immortal", image: immortalCard },
  { name: "Radiant", image: radiantCard },
];

const HighTierCardPreview = ({ card }: { card: HighTierCard }) => (
  <div className="flex flex-col items-center gap-3">
    <span className="text-sm font-medium text-white/70">{card.name}</span>
    <div className="relative aspect-2109/3218 h-[85vh]">
      {/* Layer 1: Card background */}
      <Image
        src={card.image}
        alt={`${card.name} card background`}
        fill
        className="object-contain"
      />

      {/* Layer 2: Agent portrait (SVG clipPath + fade) */}
      <Image
        src={JETT_PORTRAIT}
        alt="agent portrait"
        fill
        sizes="600px"
        className="object-cover object-top card-portrait-fade"
        style={{ clipPath: "url(#high-tier-clip)" }}
      />

      {/* Layer 3: Bottom gradient (clipped) */}
      <div
        className="absolute inset-x-0 bottom-0 h-[45%] bg-linear-to-t from-black/80 via-black/40 to-transparent"
        style={{ clipPath: "url(#high-tier-clip)" }}
      />

      {/* Layer 4: Text content */}
      <div className="absolute inset-0">
        <div className="absolute left-[12%] top-[12%]">
          <span className="text-4xl font-bold text-white drop-shadow-lg">
            92
          </span>
        </div>
        <div className="absolute inset-x-0 top-[62%] text-center">
          <span className="text-lg font-semibold text-white drop-shadow-lg">
            Player#KR1
          </span>
        </div>
        <div className="absolute inset-x-[15%] top-[70%] grid grid-cols-2 gap-x-6 gap-y-1 text-sm text-white">
          {SAMPLE_STATS.map((stat) => (
            <div key={stat.label} className="flex justify-between">
              <span className="text-white/70">{stat.label}</span>
              <span className="font-bold">{stat.value}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Layer 5: SVG path 오버레이 (정렬 확인용) */}
      <svg
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        className="absolute inset-0 h-full w-full"
      >
        <path
          d={CARD_SVG_PATH_HIGH_TIER}
          fill="none"
          stroke="red"
          strokeWidth={0.2}
          opacity={0.8}
        />
      </svg>
    </div>
  </div>
);

const CardSvgTest = () => (
  <div className="flex min-h-screen items-center justify-center gap-8 bg-gray-950 p-6">
    {/* SVG clipPath 정의 (hidden) */}
    <svg className="absolute h-0 w-0">
      <defs>
        <clipPath id="high-tier-clip" clipPathUnits="objectBoundingBox">
          <path
            d={CARD_SVG_PATH_HIGH_TIER}
            transform="scale(0.01, 0.01)"
          />
        </clipPath>
      </defs>
    </svg>

    {HIGH_TIER_CARDS.map((card) => (
      <HighTierCardPreview key={card.name} card={card} />
    ))}
  </div>
);

export { CardSvgTest };
