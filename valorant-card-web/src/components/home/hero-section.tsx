"use client";

import { useState, useEffect } from "react";
import type { CSSProperties } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Loader2, LogOut } from "lucide-react";
import { TierCard } from "@/components/card/tier-card";
import { Button } from "@/components/ui/button";
import { TIER_CARD_IMAGES } from "@/constants/tier-card-images";
import { DataDisclosureDialog } from "@/components/home/data-disclosure-dialog";
import { useAuthStatus } from "@/hooks/use-auth-status";
import {
  VANDAL_ICON_URL,
  SHOWCASE_STATS,
  COMPETITIVE_TIERS,
} from "@/components/design/mock-data";
import type { TierName } from "@/constants/tier-design";
import type { CardErrorCode } from "@/lib/card/errors";

type HeroState =
  | { phase: "idle" }
  | { phase: "loading" }
  | { phase: "error"; message: string };

const SHOWCASE_GLOW: Record<TierName, string> = {
  Iron: "drop-shadow(0 0 12px rgba(156,163,175,0.5))",
  Bronze: "drop-shadow(0 0 12px rgba(217,119,6,0.5))",
  Silver: "drop-shadow(0 0 12px rgba(148,163,184,0.6))",
  Gold: "drop-shadow(0 0 12px rgba(245,158,11,0.5))",
  Platinum: "drop-shadow(0 0 12px rgba(6,182,212,0.5))",
  Diamond: "drop-shadow(0 0 12px rgba(192,38,211,0.5))",
  Ascendant: "drop-shadow(0 0 14px rgba(16,185,129,0.6))",
  Immortal: "drop-shadow(0 0 14px rgba(225,29,72,0.6))",
  Radiant: "drop-shadow(0 0 14px rgba(212,175,55,0.6))",
};

interface ShowcaseCard {
  tierName: TierName;
  portrait: string;
  ovr: number;
  playerName: string;
}

const COLUMN_1: ShowcaseCard[] = [
  { tierName: "Iron", portrait: "/characters/sage/pose2.png", ovr: 12, playerName: "s0m" },
  { tierName: "Gold", portrait: "/characters/phoenix/pose2.png", ovr: 45, playerName: "aspas" },
  { tierName: "Silver", portrait: "/characters/yoru/pose3.png", ovr: 34, playerName: "Boaster" },
  { tierName: "Diamond", portrait: "/characters/omen/pose1.png", ovr: 68, playerName: "nAts" },
  { tierName: "Bronze", portrait: "/characters/neon/pose1.png", ovr: 21, playerName: "Meteor" },
  { tierName: "Radiant", portrait: "/characters/jett/pose3.png", ovr: 97, playerName: "Demon1" },
];

const COLUMN_2: ShowcaseCard[] = [
  { tierName: "Bronze", portrait: "/characters/breach/pose1.png", ovr: 23, playerName: "t3xture" },
  { tierName: "Platinum", portrait: "/characters/iso/pose3.png", ovr: 56, playerName: "stax" },
  { tierName: "Iron", portrait: "/characters/kayo/pose2.png", ovr: 10, playerName: "Jinggg" },
  { tierName: "Immortal", portrait: "/characters/reyna/pose3.png", ovr: 91, playerName: "Alfajer" },
  { tierName: "Silver", portrait: "/characters/tejo/pose1.png", ovr: 32, playerName: "crashies" },
  { tierName: "Diamond", portrait: "/characters/skye/pose1.png", ovr: 65, playerName: "Shao" },
];

const COLUMN_3: ShowcaseCard[] = [
  { tierName: "Silver", portrait: "/characters/cypher/pose1.png", ovr: 35, playerName: "Lakia" },
  { tierName: "Gold", portrait: "/characters/sova/pose2.png", ovr: 48, playerName: "zekken" },
  { tierName: "Bronze", portrait: "/characters/chamber/pose3.png", ovr: 19, playerName: "f0rsakeN" },
  { tierName: "Ascendant", portrait: "/characters/vyse/pose3.png", ovr: 84, playerName: "MaKo" },
  { tierName: "Iron", portrait: "/characters/astra/pose2.png", ovr: 8, playerName: "BuZz" },
  { tierName: "Platinum", portrait: "/characters/gekko/pose3.png", ovr: 58, playerName: "Derke" },
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
      <div
        className={`${direction === "up" ? "card-scroll-up" : "card-scroll-down"} flex flex-col`}
        style={{ "--scroll-duration": `${speed}s` } as CSSProperties}
      >
        {doubled.map((card, i) => (
          <div
            key={`${card.tierName}-${i}`}
            className="showcase-card pb-3"
            style={{ "--tier-glow": SHOWCASE_GLOW[card.tierName] } as CSSProperties}
          >
            <TierCard
              tierName={card.tierName}
              competitiveTier={COMPETITIVE_TIERS[card.tierName]}
              backgroundImage={TIER_CARD_IMAGES[card.tierName]}
              portraitUrl={card.portrait}
              ovr={card.ovr}
              playerName={card.playerName}
              weaponIconUrl={VANDAL_ICON_URL}
              stats={SHOWCASE_STATS[card.tierName]}
              size="sm"
              className="w-[280px]"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

const HeroSection = () => {
  const [state, setState] = useState<HeroState>({ phase: "idle" });
  const [dialogOpen, setDialogOpen] = useState(false);
  const { status: authStatus, refresh: refreshAuth } = useAuthStatus();
  const searchParams = useSearchParams();
  const router = useRouter();

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
