"use client";

import { useState } from "react";
import type { CSSProperties, FormEvent } from "react";
import { Search, Loader2 } from "lucide-react";
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
import { CardResult } from "@/components/home/card-result";
import { ERROR_MESSAGES } from "@/lib/card/errors";
import type { TierName } from "@/constants/tier-design";
import type { CardErrorCode } from "@/lib/card/errors";
import type { GeneratedCardData } from "@/lib/card/generate";

const VANDAL_ICON_URL = getWeaponIconUrl("9c82e19d-4575-0200-1a81-3eacf00cf872");

const PLACEHOLDER_STATS = [
  { label: "ACS", value: "0" },
  { label: "K/D", value: "0" },
  { label: "HS%", value: "0" },
  { label: "DDΔ", value: "0" },
  { label: "KAST", value: "0" },
  { label: "ADR", value: "0" },
];

// ─── State Machine ───

type HeroState =
  | { phase: "idle" }
  | { phase: "loading" }
  | { phase: "result"; data: GeneratedCardData }
  | { phase: "error"; message: string };

// ─── Showcase Data ───

interface ShowcaseCard {
  tierName: TierName;
  competitiveTier: number;
  image: StaticImageData;
  portrait: string;
  ovr: number;
  playerName: string;
  glow: string;
}

const COLUMN_1: ShowcaseCard[] = [
  { tierName: "Iron", competitiveTier: 5, image: ironCard, portrait: "/characters/sage/pose2.png", ovr: 12, playerName: "s0m", glow: "drop-shadow(0 0 12px rgba(156,163,175,0.5))" },
  { tierName: "Gold", competitiveTier: 14, image: goldCard, portrait: "/characters/phoenix/pose2.png", ovr: 45, playerName: "aspas", glow: "drop-shadow(0 0 12px rgba(245,158,11,0.5))" },
  { tierName: "Silver", competitiveTier: 11, image: silverCard, portrait: "/characters/yoru/pose3.png", ovr: 34, playerName: "Boaster", glow: "drop-shadow(0 0 12px rgba(148,163,184,0.6))" },
  { tierName: "Diamond", competitiveTier: 20, image: diamondCard, portrait: "/characters/omen/pose1.png", ovr: 68, playerName: "nAts", glow: "drop-shadow(0 0 12px rgba(192,38,211,0.5))" },
  { tierName: "Bronze", competitiveTier: 8, image: bronzeCard, portrait: "/characters/neon/pose1.png", ovr: 21, playerName: "Meteor", glow: "drop-shadow(0 0 12px rgba(217,119,6,0.5))" },
  { tierName: "Radiant", competitiveTier: 27, image: radiantCard, portrait: "/characters/jett/pose3.png", ovr: 97, playerName: "Demon1", glow: "drop-shadow(0 0 14px rgba(212,175,55,0.6))" },
];

const COLUMN_2: ShowcaseCard[] = [
  { tierName: "Bronze", competitiveTier: 8, image: bronzeCard, portrait: "/characters/breach/pose1.png", ovr: 23, playerName: "t3xture", glow: "drop-shadow(0 0 12px rgba(217,119,6,0.5))" },
  { tierName: "Platinum", competitiveTier: 17, image: platinumCard, portrait: "/characters/iso/pose3.png", ovr: 56, playerName: "stax", glow: "drop-shadow(0 0 12px rgba(6,182,212,0.5))" },
  { tierName: "Iron", competitiveTier: 5, image: ironCard, portrait: "/characters/kayo/pose2.png", ovr: 10, playerName: "Jinggg", glow: "drop-shadow(0 0 12px rgba(156,163,175,0.5))" },
  { tierName: "Immortal", competitiveTier: 26, image: immortalCard, portrait: "/characters/reyna/pose3.png", ovr: 91, playerName: "Alfajer", glow: "drop-shadow(0 0 14px rgba(225,29,72,0.6))" },
  { tierName: "Silver", competitiveTier: 11, image: silverCard, portrait: "/characters/tejo/pose1.png", ovr: 32, playerName: "crashies", glow: "drop-shadow(0 0 12px rgba(148,163,184,0.6))" },
  { tierName: "Diamond", competitiveTier: 20, image: diamondCard, portrait: "/characters/skye/pose1.png", ovr: 65, playerName: "Shao", glow: "drop-shadow(0 0 12px rgba(192,38,211,0.5))" },
];

const COLUMN_3: ShowcaseCard[] = [
  { tierName: "Silver", competitiveTier: 11, image: silverCard, portrait: "/characters/cypher/pose1.png", ovr: 35, playerName: "Lakia", glow: "drop-shadow(0 0 12px rgba(148,163,184,0.6))" },
  { tierName: "Gold", competitiveTier: 14, image: goldCard, portrait: "/characters/sova/pose2.png", ovr: 48, playerName: "zekken", glow: "drop-shadow(0 0 12px rgba(245,158,11,0.5))" },
  { tierName: "Bronze", competitiveTier: 8, image: bronzeCard, portrait: "/characters/chamber/pose3.png", ovr: 19, playerName: "f0rsakeN", glow: "drop-shadow(0 0 12px rgba(217,119,6,0.5))" },
  { tierName: "Ascendant", competitiveTier: 23, image: ascendantCard, portrait: "/characters/vyse/pose3.png", ovr: 84, playerName: "MaKo", glow: "drop-shadow(0 0 14px rgba(16,185,129,0.6))" },
  { tierName: "Iron", competitiveTier: 5, image: ironCard, portrait: "/characters/astra/pose2.png", ovr: 8, playerName: "BuZz", glow: "drop-shadow(0 0 12px rgba(156,163,175,0.5))" },
  { tierName: "Platinum", competitiveTier: 17, image: platinumCard, portrait: "/characters/gekko/pose3.png", ovr: 58, playerName: "Derke", glow: "drop-shadow(0 0 12px rgba(6,182,212,0.5))" },
];

// ─── Card Column ───

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
              className="w-[280px]"
              priority={i < 3}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

// ─── Hero Section ───

const HeroSection = () => {
  const [riotId, setRiotId] = useState("");
  const [state, setState] = useState<HeroState>({ phase: "idle" });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const trimmed = riotId.trim();
    if (!trimmed.includes("#")) {
      setState({ phase: "error", message: ERROR_MESSAGES.INVALID_RIOT_ID });
      return;
    }

    setState({ phase: "loading" });

    try {
      const res = await fetch("/api/card/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ riotId: trimmed }),
      });

      const json = await res.json();

      if (!res.ok) {
        const code = json.code as CardErrorCode | undefined;
        const message = code ? ERROR_MESSAGES[code] : ERROR_MESSAGES.INTERNAL_ERROR;
        setState({ phase: "error", message });
        return;
      }

      setState({ phase: "result", data: json as GeneratedCardData });
    } catch {
      setState({ phase: "error", message: ERROR_MESSAGES.INTERNAL_ERROR });
    }
  };

  const handleBack = () => {
    setState({ phase: "idle" });
    setRiotId("");
  };

  const isLoading = state.phase === "loading";

  // ─── Result View ───
  if (state.phase === "result") {
    return (
      <div className="relative flex min-h-screen flex-col items-center justify-center bg-background">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_oklch(0.668_0.220_21_/_0.12)_0%,_transparent_60%)]" />
        <div className="relative z-10">
          <CardResult data={state.data} onBack={handleBack} />
        </div>
      </div>
    );
  }

  // ─── Default View (idle / loading / error) ───
  return (
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

        {/* Search form */}
        <form onSubmit={handleSubmit} className="mt-8 flex w-full max-w-md items-center gap-2">
          <Input
            type="text"
            placeholder="Player#TAG"
            className="h-10 flex-1 text-sm"
            value={riotId}
            onChange={(e) => {
              setRiotId(e.target.value);
              if (state.phase === "error") setState({ phase: "idle" });
            }}
            disabled={isLoading}
          />
          <Button size="lg" className="h-10 gap-2 px-5" type="submit" disabled={isLoading}>
            {isLoading ? (
              <Loader2 className="size-4 animate-spin" />
            ) : (
              <Search className="size-4" />
            )}
            {isLoading ? "생성 중..." : "검색"}
          </Button>
        </form>

        {/* Error message */}
        {state.phase === "error" && (
          <p className="mt-3 text-sm text-destructive">{state.message}</p>
        )}
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
};

export { HeroSection };
