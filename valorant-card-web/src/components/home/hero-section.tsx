"use client";

import type { CSSProperties } from "react";
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

interface ShowcaseCard {
  tierName: TierName;
  competitiveTier: number;
  image: StaticImageData;
  portrait: string;
  ovr: number;
  playerName: string;
  glow: string;
}

/** 3열에 분배할 카드 데이터 — 뷰포트를 충분히 채우도록 컬럼당 6장, 18장 모두 고유 요원+포즈 */
const COLUMN_1: ShowcaseCard[] = [
  { tierName: "Iron", competitiveTier: 5, image: ironCard, portrait: "/characters/sage/pose1.png", ovr: 12, playerName: "Rookie", glow: "drop-shadow(0 0 12px rgba(156,163,175,0.5))" },
  { tierName: "Gold", competitiveTier: 14, image: goldCard, portrait: "/characters/phoenix/pose2.png", ovr: 45, playerName: "Blaze", glow: "drop-shadow(0 0 12px rgba(245,158,11,0.5))" },
  { tierName: "Ascendant", competitiveTier: 23, image: ascendantCard, portrait: "/characters/jett/pose3.png", ovr: 84, playerName: "Shadow", glow: "drop-shadow(0 0 14px rgba(16,185,129,0.6))" },
  { tierName: "Platinum", competitiveTier: 17, image: platinumCard, portrait: "/characters/omen/pose1.png", ovr: 59, playerName: "Phantom", glow: "drop-shadow(0 0 12px rgba(6,182,212,0.5))" },
  { tierName: "Bronze", competitiveTier: 8, image: bronzeCard, portrait: "/characters/neon/pose2.png", ovr: 21, playerName: "Volt", glow: "drop-shadow(0 0 12px rgba(217,119,6,0.5))" },
  { tierName: "Radiant", competitiveTier: 27, image: radiantCard, portrait: "/characters/yoru/pose3.png", ovr: 96, playerName: "Rift", glow: "drop-shadow(0 0 14px rgba(212,175,55,0.6))" },
];

const COLUMN_2: ShowcaseCard[] = [
  { tierName: "Bronze", competitiveTier: 8, image: bronzeCard, portrait: "/characters/breach/pose1.png", ovr: 23, playerName: "Breaker", glow: "drop-shadow(0 0 12px rgba(217,119,6,0.5))" },
  { tierName: "Platinum", competitiveTier: 17, image: platinumCard, portrait: "/characters/sova/pose2.png", ovr: 56, playerName: "Hunter", glow: "drop-shadow(0 0 12px rgba(6,182,212,0.5))" },
  { tierName: "Immortal", competitiveTier: 26, image: immortalCard, portrait: "/characters/reyna/pose3.png", ovr: 91, playerName: "FAKER", glow: "drop-shadow(0 0 14px rgba(225,29,72,0.6))" },
  { tierName: "Diamond", competitiveTier: 20, image: diamondCard, portrait: "/characters/viper/pose1.png", ovr: 69, playerName: "Toxin", glow: "drop-shadow(0 0 12px rgba(192,38,211,0.5))" },
  { tierName: "Gold", competitiveTier: 14, image: goldCard, portrait: "/characters/raze/pose2.png", ovr: 48, playerName: "Boom", glow: "drop-shadow(0 0 12px rgba(245,158,11,0.5))" },
  { tierName: "Silver", competitiveTier: 11, image: silverCard, portrait: "/characters/skye/pose3.png", ovr: 33, playerName: "Wilder", glow: "drop-shadow(0 0 12px rgba(148,163,184,0.6))" },
];

const COLUMN_3: ShowcaseCard[] = [
  { tierName: "Silver", competitiveTier: 11, image: silverCard, portrait: "/characters/cypher/pose1.png", ovr: 35, playerName: "Ghost", glow: "drop-shadow(0 0 12px rgba(148,163,184,0.6))" },
  { tierName: "Diamond", competitiveTier: 20, image: diamondCard, portrait: "/characters/killjoy/pose2.png", ovr: 67, playerName: "Spark", glow: "drop-shadow(0 0 12px rgba(192,38,211,0.5))" },
  { tierName: "Radiant", competitiveTier: 27, image: radiantCard, portrait: "/characters/chamber/pose3.png", ovr: 97, playerName: "TenZ", glow: "drop-shadow(0 0 14px rgba(212,175,55,0.6))" },
  { tierName: "Ascendant", competitiveTier: 23, image: ascendantCard, portrait: "/characters/fade/pose1.png", ovr: 82, playerName: "Dusk", glow: "drop-shadow(0 0 14px rgba(16,185,129,0.6))" },
  { tierName: "Iron", competitiveTier: 5, image: ironCard, portrait: "/characters/astra/pose2.png", ovr: 10, playerName: "Nova", glow: "drop-shadow(0 0 12px rgba(156,163,175,0.5))" },
  { tierName: "Immortal", competitiveTier: 26, image: immortalCard, portrait: "/characters/gekko/pose3.png", ovr: 89, playerName: "Mosh", glow: "drop-shadow(0 0 14px rgba(225,29,72,0.6))" },
];

interface CardColumnProps {
  cards: ShowcaseCard[];
  direction: "up" | "down";
  speed: number;
  delay: number;
}

const CardColumn = ({ cards, direction, speed, delay }: CardColumnProps) => {
  const doubled = [...cards, ...cards];
  return (
    <div
      className="card-column flex-1 overflow-hidden"
      style={{ "--column-delay": `${delay}s` } as CSSProperties}
    >
      {/* pb-3: gap-3 대신 per-item padding 사용 — translateY(-50%)가 정확히 세트 경계와 일치하도록 */}
      <div
        className={`${direction === "up" ? "card-scroll-up" : "card-scroll-down"} flex flex-col`}
        style={{ "--scroll-duration": `${speed}s` } as CSSProperties}
      >
        {doubled.map((card, i) => (
          <div
            key={`${card.tierName}-${i}`}
            className="showcase-card pb-3"
            style={{ "--tier-glow": card.glow } as CSSProperties}
          >
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
              priority
            />
          </div>
        ))}
      </div>
    </div>
  );
};

const HeroSection = () => (
  <div className="relative flex min-h-screen flex-col bg-background md:flex-row">
    {/* Radial gradient overlay */}
    <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_oklch(0.668_0.220_21_/_0.12)_0%,_transparent_60%)]" />

    {/* Left — Title + Search */}
    <div className="relative z-10 flex flex-col items-center justify-center px-6 py-20 md:w-[55%] md:py-0">
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
    </div>

    {/* Right — 3-column vertical scroll */}
    <div className="relative z-10 flex h-screen items-center overflow-hidden md:w-[45%]">
      {/* Top/bottom fade masks */}
      <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-32 bg-gradient-to-b from-background via-background/60 to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-32 bg-gradient-to-t from-background via-background/60 to-transparent" />

      <div className="flex h-full w-full gap-3 px-4">
        <CardColumn cards={COLUMN_1} direction="up" speed={60} delay={0.1} />
        <CardColumn cards={COLUMN_2} direction="down" speed={44} delay={0.3} />
        <CardColumn cards={COLUMN_3} direction="up" speed={52} delay={0.5} />
      </div>
    </div>
  </div>
);

export { HeroSection };
