"use client";

import { useEffect, useState } from "react";
import type { StaticImageData } from "next/image";
import ironCard from "@/asset/example/tier-card/iron.png";
import bronzeCard from "@/asset/example/tier-card/bronze.png";
import silverCard from "@/asset/example/tier-card/silver.png";
import goldCard from "@/asset/example/tier-card/gold.png";
import platinumCard from "@/asset/example/tier-card/platinum.png";
import diamondCard from "@/asset/example/tier-card/diamond.png";
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

interface TierCardEntry {
  name: string;
  image: StaticImageData;
}

const TIER_CARDS: TierCardEntry[] = [
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

const SLIDE_OFFSETS = [
  "-translate-x-[0%]",
  "-translate-x-[100%]",
  "-translate-x-[200%]",
  "-translate-x-[300%]",
  "-translate-x-[400%]",
  "-translate-x-[500%]",
  "-translate-x-[600%]",
  "-translate-x-[700%]",
  "-translate-x-[800%]",
] as const;

const CarouselTest = () => {
  const [activeIndex, setActiveIndex] = useState<number>(0);

  const goToPrev = () => {
    setActiveIndex((prev) =>
      prev > 0 ? prev - 1 : TIER_CARDS.length - 1,
    );
  };

  const goToNext = () => {
    setActiveIndex((prev) =>
      prev < TIER_CARDS.length - 1 ? prev + 1 : 0,
    );
  };

  /** ArrowLeft/ArrowRight 키보드 네비게이션 */
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") goToPrev();
      if (e.key === "ArrowRight") goToNext();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-950">
      {/* Left: Card display */}
      <div className="flex flex-1 items-center justify-center overflow-hidden">
        <div className="relative w-full overflow-hidden">
          <div
            className={`flex transition-transform duration-500 ease-out ${SLIDE_OFFSETS[activeIndex]}`}
          >
            {TIER_CARDS.map((tier, i) => (
              <div
                key={tier.name}
                className="flex w-full shrink-0 items-center justify-center"
              >
                <TierCard
                  tierName={tier.name}
                  backgroundImage={tier.image}
                  portraitUrl={JETT_PORTRAIT}
                  ovr={92}
                  playerName="Player#KR1"
                  stats={SAMPLE_STATS}
                  className="h-[80vh]"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right: Debug panel */}
      <div className="flex w-80 flex-col gap-6 border-l border-white/10 bg-gray-900 p-6">
        {/* Tier select buttons */}
        <section>
          <h3 className="mb-3 text-sm font-semibold tracking-wider text-white/50">
            TIER
          </h3>
          <div className="grid grid-cols-3 gap-2">
            {TIER_CARDS.map((tier, i) => (
              <button
                key={tier.name}
                onClick={() => setActiveIndex(i)}
                className={`rounded-md px-2 py-1.5 text-sm font-medium transition-colors ${
                  i === activeIndex
                    ? "bg-white text-gray-900"
                    : "bg-white/10 text-white hover:bg-white/20"
                }`}
              >
                {tier.name}
              </button>
            ))}
          </div>
        </section>

        {/* Carousel controls */}
        <section>
          <h3 className="mb-3 text-sm font-semibold tracking-wider text-white/50">
            CAROUSEL
          </h3>
          <div className="flex items-center gap-3">
            <button
              onClick={goToPrev}
              className="rounded-full bg-white/10 p-2 text-white transition-colors hover:bg-white/20"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-4 w-4"
              >
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>

            <span className="flex-1 text-center text-sm font-medium text-white">
              {TIER_CARDS[activeIndex].name} ({activeIndex + 1}/
              {TIER_CARDS.length})
            </span>

            <button
              onClick={goToNext}
              className="rounded-full bg-white/10 p-2 text-white transition-colors hover:bg-white/20"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-4 w-4"
              >
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>
          </div>
        </section>

        {/* Stats display */}
        <section>
          <h3 className="mb-3 text-sm font-semibold tracking-wider text-white/50">
            STATS
          </h3>
          <div className="flex flex-col gap-2">
            {SAMPLE_STATS.map((stat) => (
              <div
                key={stat.label}
                className="flex items-center justify-between rounded-md bg-white/5 px-3 py-1.5"
              >
                <span className="text-sm text-white/60">{stat.label}</span>
                <span className="text-sm font-bold text-white">
                  {stat.value}
                </span>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export { CarouselTest };
