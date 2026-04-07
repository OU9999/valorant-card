"use client";

import { TierCard } from "@/components/card/tier-card";
import { TIER_DESIGNS, HIGH_TIER_NAMES } from "@/constants/tier-design";
import { getTierIcon } from "@/lib/valorant/tiers";
import { cn } from "@/lib/cn";
import {
  SectionTitle,
  SubSectionTitle,
  SectionDescription,
  ColorSwatch,
} from "./shared";
import {
  VANDAL_ICON_URL,
  SHOWCASE_STATS,
  TIER_ENTRIES,
} from "./mock-data";

/* ─── Global Token Data ─── */

interface TokenEntry {
  token: string;
  oklch: string;
  hex: string;
  role: string;
}

const GLOBAL_TOKENS: TokenEntry[] = [
  { token: "--background", oklch: "oklch(0.209 0.025 249)", hex: "#131B2E", role: "Page background — deep navy" },
  { token: "--card", oklch: "oklch(0.255 0.024 249)", hex: "#1A2338", role: "Card/panel surface" },
  { token: "--foreground", oklch: "oklch(0.932 0.010 82)", hex: "#EDEAE6", role: "Primary text" },
  { token: "--primary", oklch: "oklch(0.668 0.220 21)", hex: "#FF4655", role: "Valorant Red — accent, borders, CTAs, focus rings" },
  { token: "--secondary", oklch: "oklch(0.283 0.026 247)", hex: "#1E2A40", role: "Secondary/muted surface" },
  { token: "--muted-foreground", oklch: "oklch(0.714 0.009 254)", hex: "#A8A8B0", role: "De-emphasized text" },
  { token: "--border", oklch: "oklch(0.932 0.010 82 / 10%)", hex: "rgba(237,234,230,0.10)", role: "Semi-transparent borders" },
];

/* ─── Boast/Roast colors (removed V5 Semantic Palette — unused colors) ─── */

/* ─── StatBar (inline for this section) ─── */

interface StatBarProps {
  variant: "boast" | "roast";
  label: string;
  value: string;
}

const StatBar = ({ variant, label, value }: StatBarProps) => {
  const isBoast = variant === "boast";
  return (
    <div
      className="border-l-2 border-[#FF4655] px-5 pb-4 pt-3"
      style={{
        background: isBoast
          ? "linear-gradient(180deg, rgba(255,70,85,0) 0%, rgba(255,70,85,0.4) 100%)"
          : "linear-gradient(180deg, rgba(20,0,5,0) 0%, rgba(20,0,5,0.5) 100%)",
      }}
    >
      <p className={cn("text-xs", isBoast ? "text-white/70" : "text-[#6B1525]")}>
        {label}
      </p>
      <p className={cn("mt-1 text-2xl font-bold tracking-wide", isBoast ? "text-white" : "text-[#1A0008]")}>
        {value}
      </p>
    </div>
  );
};

/* ─── Section ─── */

const ColorPaletteSection = () => (
  <section className="space-y-10">
    <SectionTitle id="color-palette">2. Color Palette &amp; Roles</SectionTitle>

    {/* Global Tokens */}
    <div className="space-y-4">
      <SubSectionTitle>Global Tokens (Dark Mode)</SubSectionTitle>
      <SectionDescription>
        디자인 판단에 필요한 핵심 토큰만 정리. 나머지(--ring, --input, --accent 등)는 shadcn 내부 매핑으로 globals.css 참조.
      </SectionDescription>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {GLOBAL_TOKENS.map((t) => (
          <ColorSwatch
            key={t.token}
            color={t.token}
            label={t.token}
            sub={t.role}
            useCssVar
          />
        ))}
      </div>
    </div>

    {/* Boast / Roast Pattern */}
    <div className="space-y-4">
      <SubSectionTitle>Boast / Roast Pattern</SubSectionTitle>
      <SectionDescription>
        모든 텍스트 박스의 기본 레이아웃 패턴. Flashback V5의 Boast/Roast 구조에서 차용, 의미 구분 없이 레이아웃 변형으로 사용.
      </SectionDescription>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="space-y-2">
          <p className="text-xs font-medium text-foreground">Boast (Dark)</p>
          <div className="overflow-hidden rounded-lg border border-[#2A1520] bg-[#0F1923]">
            <div className="flex flex-col gap-3 p-4">
              <StatBar variant="boast" label="함께 가장 많이 승리한 플레이어" value="DRX HYUNBIN" />
              <StatBar variant="boast" label="헤드샷 확률이 가장 높은 플레이어" value="HEARTSPING" />
            </div>
          </div>
        </div>
        <div className="space-y-2">
          <p className="text-xs font-medium text-foreground">Roast (Red Dominant)</p>
          <div className="overflow-hidden rounded-lg border border-[#FF4655]/30 bg-[#FF4655]">
            <div className="flex flex-col gap-3 p-4">
              <StatBar variant="roast" label="함께 가장 많이 패배한 플레이어" value="DRX HYUNBIN" />
              <StatBar variant="roast" label="헤드샷 확률이 가장 낮은 플레이어" value="MYMELODY" />
            </div>
          </div>
        </div>
      </div>
    </div>

    {/* Tier Card Color System */}
    <div className="space-y-6">
      <SubSectionTitle>Tier Card Color System</SubSectionTitle>
      <p className="text-xs text-muted-foreground">
        9개 티어별 고유 컬러 팔레트. Light-background 티어(Silver, Gold, Radiant)는 dark text 사용. High tier(Ascendant, Immortal, Radiant)는 SVG clipPath + 강화 글로우.
      </p>

      {/* 9 Tier Cards Grid */}
      <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {TIER_ENTRIES.map((entry) => {
          const design = TIER_DESIGNS[entry.tierName];
          const isHigh = HIGH_TIER_NAMES.has(entry.tierName);
          return (
            <div key={entry.tierName} className="space-y-3">
              <TierCard
                tierName={entry.tierName}
                competitiveTier={entry.competitiveTier}
                backgroundImage={entry.image}
                portraitUrl={entry.portrait}
                ovr={entry.ovr}
                playerName={entry.playerName}
                weaponIconUrl={VANDAL_ICON_URL}
                stats={SHOWCASE_STATS[entry.tierName]}
                size="sm"
              />
              <div className="space-y-1.5">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold uppercase tracking-widest text-foreground">
                    {entry.tierName}
                  </span>
                  {isHigh && (
                    <span className="rounded bg-primary/20 px-1.5 py-0.5 text-[9px] font-bold uppercase text-primary">
                      High Tier
                    </span>
                  )}
                </div>
                <div className="space-y-0.5 font-mono text-[10px] text-muted-foreground">
                  {(Object.keys(design) as (keyof typeof design)[]).map((key) => (
                    <p key={key}>
                      <span className="text-foreground/50">{key}:</span>{" "}
                      {key === "ovr" || key === "playerName" ? (
                        <span className={design[key]}>Sample</span>
                      ) : (
                        design[key]
                      )}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Tier Icon Glow Comparison */}
      <div className="space-y-3">
        <p className="text-xs font-medium text-foreground">Icon Glow Comparison</p>
        <div className="flex flex-wrap gap-6">
          {TIER_ENTRIES.map((entry) => (
            <div key={entry.tierName} className="flex flex-col items-center gap-2">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={getTierIcon(entry.competitiveTier)}
                alt={`${entry.tierName} icon`}
                className={cn("size-10", TIER_DESIGNS[entry.tierName].iconGlow)}
              />
              <span className="text-[10px] text-muted-foreground">{entry.tierName}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

export { ColorPaletteSection };
