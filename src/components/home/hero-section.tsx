"use client";

import { Search } from "lucide-react";
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
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getWeaponIconUrl } from "@/constants/weapons";
import type { TierName } from "@/constants/tier-design";

const VANDAL_ICON_URL = getWeaponIconUrl("9c82e19d-4575-0200-1a81-3eacf00cf872");

const PLACEHOLDER_STATS = [
  { label: "ACS", value: "0" },
  { label: "K/D", value: "0" },
  { label: "HS%", value: "0" },
  { label: "DDΔ", value: "0" },
  { label: "KAST", value: "0" },
  { label: "ADR", value: "0" },
];

interface CarouselCard {
  tierName: TierName;
  competitiveTier: number;
  image: StaticImageData;
  portrait: string;
  ovr: number;
  playerName: string;
}

const CAROUSEL_CARDS: CarouselCard[] = [
  { tierName: "Iron", competitiveTier: 5, image: ironCard, portrait: "/characters/sage/fullportrait.png", ovr: 12, playerName: "Rookie" },
  { tierName: "Bronze", competitiveTier: 8, image: bronzeCard, portrait: "/characters/breach/fullportrait.png", ovr: 23, playerName: "Breaker" },
  { tierName: "Silver", competitiveTier: 11, image: silverCard, portrait: "/characters/cypher/fullportrait.png", ovr: 35, playerName: "Ghost" },
  { tierName: "Gold", competitiveTier: 14, image: goldCard, portrait: "/characters/phoenix/fullportrait.png", ovr: 45, playerName: "Blaze" },
  { tierName: "Platinum", competitiveTier: 17, image: platinumCard, portrait: "/characters/sova/fullportrait.png", ovr: 56, playerName: "Hunter" },
  { tierName: "Diamond", competitiveTier: 20, image: diamondCard, portrait: "/characters/killjoy/fullportrait.png", ovr: 67, playerName: "Spark" },
  { tierName: "Ascendant", competitiveTier: 23, image: ascendantCard, portrait: "/characters/jett/fullportrait.png", ovr: 84, playerName: "Shadow" },
  { tierName: "Immortal", competitiveTier: 26, image: immortalCard, portrait: "/characters/reyna/fullportrait.png", ovr: 91, playerName: "FAKER" },
  { tierName: "Radiant", competitiveTier: 27, image: radiantCard, portrait: "/characters/chamber/fullportrait.png", ovr: 97, playerName: "TenZ" },
];

const HeroSection = () => (
  <div className="relative flex min-h-screen flex-col items-center bg-background">
    {/* Radial gradient overlay */}
    <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_oklch(0.668_0.220_21_/_0.12)_0%,_transparent_60%)]" />

    {/* Content */}
    <div className="relative z-10 flex w-full flex-1 flex-col items-center pt-32">
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
      <div className="mt-8 flex w-full max-w-md items-center gap-2 px-6">
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

      {/* Card carousel — infinite scroll */}
      <div className="mt-16 w-full overflow-hidden">
        <div className="carousel-track flex w-max gap-5">
          {[...CAROUSEL_CARDS, ...CAROUSEL_CARDS].map((card, i) => (
            <div key={`${card.tierName}-${i}`} className="shrink-0">
              <TierCard
                tierName={card.tierName}
                competitiveTier={card.competitiveTier}
                backgroundImage={card.image}
                portraitUrl={card.portrait}
                ovr={card.ovr}
                playerName={card.playerName}
                weaponIconUrl={VANDAL_ICON_URL}
                stats={PLACEHOLDER_STATS}
                size="sm"
                className="h-[350px]"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

export { HeroSection };
