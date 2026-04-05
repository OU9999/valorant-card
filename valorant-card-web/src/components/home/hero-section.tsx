"use client";

import { useState, useEffect } from "react";
import type { CSSProperties } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Loader2, LogOut } from "lucide-react";
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
import { getWeaponIconUrl } from "@/constants/weapons";
import { DataDisclosureDialog } from "@/components/home/data-disclosure-dialog";
import { useAuthStatus } from "@/hooks/use-auth-status";
import type { TierName } from "@/constants/tier-design";
import type { CardErrorCode } from "@/lib/card/errors";

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
  const [state, setState] = useState<HeroState>({ phase: "idle" });
  const [dialogOpen, setDialogOpen] = useState(false);
  const { status: authStatus, refresh: refreshAuth } = useAuthStatus();
  const searchParams = useSearchParams();
  const router = useRouter();

  /**
   * RSO 콜백 처리: 인증 성공 시 카드 생성 및 /card/[id]로 이동, 실패 시 에러 표시.
   */
  useEffect(() => {
    if (searchParams.get("authenticated") === "true") {
      refreshAuth();
      window.history.replaceState({}, "", "/");
      generateCard();
      return;
    }

    const authError = searchParams.get("auth_error");
    if (authError) {
      setState({ phase: "error", message: "로그인에 실패했습니다. 다시 시도해주세요." });
      window.history.replaceState({}, "", "/");
    }
  }, [searchParams, refreshAuth]);

  const generateCard = async () => {
    setState({ phase: "loading" });

    try {
      const res = await fetch("/api/card/generate", { method: "POST" });
      const json = await res.json();

      if (!res.ok) {
        const code = json.code as CardErrorCode | undefined;
        if (code === "UNAUTHORIZED") {
          setDialogOpen(true);
          setState({ phase: "idle" });
          return;
        }
        const message = code
          ? (json.error as string)
          : "오류가 발생했습니다. 다시 시도해주세요.";
        setState({ phase: "error", message });
        return;
      }

      router.push(`/card/${json.id as string}`);
    } catch {
      setState({ phase: "error", message: "오류가 발생했습니다. 다시 시도해주세요." });
    }
  };

  const handleLogin = () => {
    setDialogOpen(true);
  };

  const handlePreview = () => {
    router.push("/card/test");
  };

  const handleLogout = async () => {
    await fetch("/api/auth/rso/logout", { method: "POST" });
    refreshAuth();
    setState({ phase: "idle" });
  };

  const isLoading = state.phase === "loading";
  const isAuthenticated = authStatus?.authenticated === true;

  // ─── Default View (idle / loading / error) ───
  return (
    <div className="relative flex min-h-screen flex-col bg-background md:flex-row">
      {/* Radial gradient overlay */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_oklch(0.668_0.220_21_/_0.12)_0%,_transparent_60%)]" />

      {/* Left — Title + Search */}
      <div className="relative z-10 flex flex-col items-center justify-center px-6 py-20 md:w-[55%] md:py-0">
        <h1 className="flex flex-col items-center gap-1 font-heading">
          <span className="text-5xl font-extrabold uppercase tracking-wide text-primary md:text-7xl">
            VALORANT
          </span>
          <span className="text-3xl font-bold uppercase tracking-wide text-foreground md:text-5xl">
            FC CARD
          </span>
        </h1>
        <p className="mt-4 text-center text-sm text-muted-foreground md:text-base">
          나만의 발로란트 카드를 만들어보세요
        </p>

        {/* Action area */}
        <div className="mt-8 flex flex-col items-center gap-3">
          {isLoading ? (
            <Button size="lg" className="h-12 gap-2 px-8" disabled>
              <Loader2 className="size-4 animate-spin" />
              카드 생성 중...
            </Button>
          ) : isAuthenticated ? (
            <div className="flex items-center gap-3">
              <Button size="lg" className="h-12 gap-2 px-8" onClick={generateCard}>
                카드 생성
              </Button>
              <button
                type="button"
                onClick={handleLogout}
                className="flex items-center gap-1.5 text-xs text-muted-foreground transition-colors hover:text-foreground"
              >
                <LogOut className="size-3" />
                로그아웃
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={handleLogin}
              className="flex h-12 items-center gap-2.5 rounded-lg bg-[#D13639] px-8 text-sm font-semibold text-white transition-colors hover:bg-[#B82E31]"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="size-5">
                <path d="M13.458.86 0 7.093l3.353 12.761 2.552-.313-.701-8.024.838-.373 1.447 8.202 4.361-.535-.775-8.857.83-.37 1.591 9.025 4.412-.542-.849-9.708.84-.374 1.74 9.87L24 17.318V3.5Zm.316 19.356.222 1.256L24 23.14v-4.18l-10.22 1.256Z" />
              </svg>
              Riot 계정으로 로그인
            </button>
          )}

          {/* Error message */}
          {state.phase === "error" && (
            <p className="text-sm text-destructive">{state.message}</p>
          )}
        </div>

        {/* Data disclosure dialog */}
        <DataDisclosureDialog open={dialogOpen} onOpenChange={setDialogOpen} onPreview={handlePreview} />
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
