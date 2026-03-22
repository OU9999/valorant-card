"use client";

import { Search } from "lucide-react";
import ascendantCard from "@/asset/example/tier-card/ascendant.png";
import immortalCard from "@/asset/example/tier-card/immortal.png";
import radiantCard from "@/asset/example/tier-card/radiant.png";
import { TierCard } from "@/components/card/tier-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getWeaponIconUrl } from "@/constants/weapons";
import type { TierName } from "@/constants/tier-design";

const VANDAL_ICON_URL = getWeaponIconUrl("9c82e19d-4575-0200-1a81-3eacf00cf872");

const SHOWCASE_STATS = [
  { label: "ACS", value: "312" },
  { label: "K/D", value: "1.6" },
  { label: "HS%", value: "34%" },
  { label: "DDΔ", value: "+48" },
  { label: "KAST", value: "81%" },
  { label: "ADR", value: "189" },
];

interface ShowcaseCard {
  tierName: TierName;
  competitiveTier: number;
  image: typeof ascendantCard;
  portrait: string;
  ovr: number;
  playerName: string;
}

const SHOWCASE_CARDS: ShowcaseCard[] = [
  {
    tierName: "Ascendant",
    competitiveTier: 23,
    image: ascendantCard,
    portrait: "/characters/jett/fullportrait.png",
    ovr: 84,
    playerName: "Shadow",
  },
  {
    tierName: "Immortal",
    competitiveTier: 26,
    image: immortalCard,
    portrait: "/characters/reyna/fullportrait.png",
    ovr: 91,
    playerName: "FAKER",
  },
  {
    tierName: "Radiant",
    competitiveTier: 27,
    image: radiantCard,
    portrait: "/characters/chamber/fullportrait.png",
    ovr: 97,
    playerName: "TenZ",
  },
];

const HeroSection = () => (
  <div className="relative flex min-h-screen flex-col items-center bg-background">
    {/* Radial gradient overlay */}
    <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_oklch(0.668_0.220_21_/_0.12)_0%,_transparent_60%)]" />

    {/* Content */}
    <div className="relative z-10 flex w-full max-w-5xl flex-1 flex-col items-center px-6 pt-32">
      {/* Title */}
      <h1 className="flex flex-col items-center gap-1">
        <span className="text-5xl font-black tracking-[0.25em] text-primary md:text-7xl">
          VALORANT
        </span>
        <span className="text-3xl font-bold tracking-widest text-foreground md:text-5xl">
          FC CARD
        </span>
      </h1>
      <p className="mt-4 text-center text-sm text-muted-foreground md:text-base">
        나만의 발로란트 카드를 만들어보세요
      </p>

      {/* Search bar (demo) */}
      <div className="mt-8 flex w-full max-w-md items-center gap-2">
        <Input
          type="text"
          placeholder="Player#TAG"
          className="h-10 flex-1 text-sm"
          readOnly
        />
        <Button size="lg" className="h-10 gap-2 px-5">
          <Search className="size-4" />
          검색
        </Button>
      </div>

      {/* Card showcase - 3 card fan layout */}
      <div className="mt-16 flex items-center justify-center" style={{ perspective: "1200px" }}>
        {SHOWCASE_CARDS.map((card, i) => {
          const isCenter = i === 1;
          const rotation = i === 0 ? "-6deg" : i === 2 ? "6deg" : "0deg";
          const translateX = i === 0 ? "8%" : i === 2 ? "-8%" : "0";
          const translateY = isCenter ? "0" : "4%";
          const scale = isCenter ? 1 : 0.88;
          const zIndex = isCenter ? 10 : 5;

          return (
            <div
              key={card.tierName}
              className="transition-transform duration-500"
              style={{
                transform: `translateX(${translateX}) translateY(${translateY}) rotateY(${rotation}) scale(${scale})`,
                zIndex,
              }}
            >
              <TierCard
                tierName={card.tierName}
                competitiveTier={card.competitiveTier}
                backgroundImage={card.image}
                portraitUrl={card.portrait}
                ovr={card.ovr}
                playerName={card.playerName}
                weaponIconUrl={VANDAL_ICON_URL}
                stats={SHOWCASE_STATS}
                className="h-[50vh] md:h-[60vh]"
              />
            </div>
          );
        })}
      </div>
    </div>
  </div>
);

export { HeroSection };
