"use client";

import { useEffect, useState } from "react";
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
    <div className="flex min-h-screen flex-col items-center justify-center gap-6 bg-gray-950">
      {/* Carousel viewport */}
      <div className="relative w-full overflow-hidden">
        <div
          className={`flex transition-transform duration-500 ease-out ${SLIDE_OFFSETS[activeIndex]}`}
        >
          {TIER_CARDS.map((tier, i) => (
            <div
              key={tier.name}
              className="flex w-full shrink-0 items-center justify-center"
            >
              <div className="relative h-[80vh] aspect-[2109/3218]">
                {/* Layer 1: Card background */}
                <Image
                  src={tier.image}
                  alt={`${tier.name} card background`}
                  fill
                  className="object-contain"
                  priority={i === 0}
                  sizes="52vh"
                />

                {/* Layer 2: Agent portrait (clipped + faded) */}
                <Image
                  src={JETT_PORTRAIT}
                  alt="agent portrait"
                  fill
                  sizes="52vh"
                  className="card-clip card-portrait-fade object-cover object-top"
                />

                {/* Layer 3: Bottom gradient for text readability */}
                <div className="card-clip absolute inset-x-0 bottom-0 h-[45%] bg-linear-to-t from-black/80 via-black/40 to-transparent" />

                {/* Layer 4: Text content */}
                <div className="absolute inset-0">
                  {/* OVR */}
                  <div className="absolute left-[12%] top-[12%]">
                    <span className="text-5xl font-bold text-white drop-shadow-lg">
                      92
                    </span>
                  </div>

                  {/* Player name */}
                  <div className="absolute inset-x-0 top-[62%] text-center">
                    <span className="text-2xl font-semibold text-white drop-shadow-lg">
                      Player#KR1
                    </span>
                  </div>

                  {/* Stats grid */}
                  <div className="absolute inset-x-[15%] top-[70%] grid grid-cols-2 gap-x-6 gap-y-1 text-white">
                    {SAMPLE_STATS.map((stat) => (
                      <div key={stat.label} className="flex justify-between">
                        <span className="text-base text-white/70">
                          {stat.label}
                        </span>
                        <span className="text-base font-bold">
                          {stat.value}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation controls */}
      <div className="flex items-center gap-6">
        <button
          onClick={goToPrev}
          className="rounded-full bg-white/10 p-3 text-white transition-colors hover:bg-white/20"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-5 w-5"
          >
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>

        <span className="min-w-24 text-center text-lg font-medium text-white">
          {TIER_CARDS[activeIndex].name}
        </span>

        <button
          onClick={goToNext}
          className="rounded-full bg-white/10 p-3 text-white transition-colors hover:bg-white/20"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-5 w-5"
          >
            <path d="M9 18l6-6-6-6" />
          </svg>
        </button>
      </div>

      {/* Dot indicators */}
      <div className="flex gap-2">
        {TIER_CARDS.map((tier, i) => (
          <button
            key={tier.name}
            onClick={() => setActiveIndex(i)}
            className={`h-2.5 w-2.5 rounded-full transition-colors ${
              i === activeIndex ? "bg-white" : "bg-white/30"
            }`}
            aria-label={`Go to ${tier.name} card`}
          />
        ))}
      </div>
    </div>
  );
};

export { CarouselTest };
