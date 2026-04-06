"use client";

import { TierCard } from "@/components/card/tier-card";
import { CombatStats } from "@/components/card/detail/combat-stats";
import { PerformanceBadges } from "@/components/card/detail/performance-badges";
import { AIFeedback } from "@/components/card/detail/ai-feedback";
import type { FormTrend } from "@/lib/valorant/card-stats";
import { cn } from "@/lib/cn";
import { SectionTitle, SubSectionTitle, SectionDescription } from "./shared";
import {
  VANDAL_ICON_URL,
  SHOWCASE_STATS,
  TIER_ENTRIES,
  MOCK_COMBAT_STATS,
  MOCK_BADGES,
  MOCK_AI_STATS,
} from "./mock-data";

/* ─── StatBar (for Boast/Roast demo) ─── */

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

const TRENDS: FormTrend[] = ["up", "stable", "down"];
const TREND_LABELS: Record<FormTrend, string> = {
  up: "Up (Climbing)",
  stable: "Stable",
  down: "Down (Declining)",
};

const ComponentStylesSection = () => {
  const featured = TIER_ENTRIES[7]; // Immortal

  return (
    <section className="space-y-10">
      <SectionTitle id="components">4. Component Stylings</SectionTitle>

      {/* TierCard */}
      <div className="space-y-4">
        <SubSectionTitle>TierCard — Layer Stack Demo</SubSectionTitle>
        <SectionDescription>
          카드는 4개 레이어로 구성: BackgroundLayer → PortraitLayer (fade mask) → BottomGradientLayer → Content (OVR, name, stats). High tier는 SVG clipPath 사용.
        </SectionDescription>
        <div className="flex flex-col items-start gap-6 md:flex-row">
          <div className="w-64 shrink-0">
            <TierCard
              tierName={featured.tierName}
              competitiveTier={featured.competitiveTier}
              backgroundImage={featured.image}
              portraitUrl={featured.portrait}
              ovr={featured.ovr}
              playerName={featured.playerName}
              weaponIconUrl={VANDAL_ICON_URL}
              stats={SHOWCASE_STATS[featured.tierName]}
            />
          </div>
          <div className="flex flex-col gap-2">
            {[
              { z: "Z-0", label: "BackgroundLayer", desc: "Tier-specific metallic texture (object-contain)" },
              { z: "Z-1", label: "PortraitLayer", desc: "Agent portrait with .card-portrait-fade mask" },
              { z: "Z-2", label: "BottomGradientLayer", desc: "Tier gradient (bg-linear-to-t), 33% high / 38% standard" },
              { z: "Z-3", label: "Content", desc: "OVR, player name, stats (absolute positioned)" },
            ].map((layer) => (
              <div key={layer.z} className="flex items-start gap-3">
                <span className="shrink-0 rounded bg-primary/20 px-2 py-0.5 font-mono text-[10px] font-bold text-primary">
                  {layer.z}
                </span>
                <div>
                  <p className="text-xs font-bold text-foreground">{layer.label}</p>
                  <p className="text-[10px] text-muted-foreground">{layer.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CombatStats */}
      <div className="space-y-4">
        <SubSectionTitle>CombatStats</SubSectionTitle>
        <SectionDescription>
          rounded-lg bg-card p-6/p-8. Header: h-8 w-1 bg-primary bar + tracking-widest. Grid: 2-3 cols. Corner: tactical L-line (border-r-2 border-t-2 border-primary/20).
        </SectionDescription>
        <div className="max-w-2xl">
          <CombatStats stats={MOCK_COMBAT_STATS} matchCount={20} />
        </div>
      </div>

      {/* PerformanceBadges */}
      <div className="space-y-4">
        <SubSectionTitle>PerformanceBadges</SubSectionTitle>
        <SectionDescription>
          border-l-2 border-emerald-500/40. Earned: full opacity + emerald-400 icon. Unearned: opacity-40 + muted icon.
        </SectionDescription>
        <div className="max-w-2xl">
          <PerformanceBadges badges={MOCK_BADGES} />
        </div>
      </div>

      {/* AIFeedback — 3 Trend Variants */}
      <div className="space-y-4">
        <SubSectionTitle>AIFeedback — Trend Variants</SubSectionTitle>
        <SectionDescription>
          Terminal aesthetic: font-mono, text-emerald-400/80, &gt; prefix. 3 trend states: up (emerald), stable (muted), down (primary/red).
        </SectionDescription>
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
          {TRENDS.map((trend) => (
            <div key={trend} className="space-y-2">
              <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                {TREND_LABELS[trend]}
              </p>
              <AIFeedback stats={MOCK_AI_STATS} trend={trend} />
            </div>
          ))}
        </div>
      </div>

      {/* StatBar Variants */}
      <div className="space-y-4">
        <SubSectionTitle>StatBar — Boast / Roast</SubSectionTitle>
        <SectionDescription>
          Flashback V5 패턴. border-l-2 border-[#FF4655]. Boast: 어두운 배경 위 밝은 텍스트. Roast: 빨간 배경 위 어두운 텍스트.
        </SectionDescription>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="overflow-hidden rounded-lg border border-[#2A1520] bg-[#0F1923] p-4">
            <StatBar variant="boast" label="함께 가장 많이 승리한 플레이어" value="DRX HYUNBIN" />
          </div>
          <div className="overflow-hidden rounded-lg border border-[#FF4655]/30 bg-[#FF4655] p-4">
            <StatBar variant="roast" label="함께 가장 많이 패배한 플레이어" value="DRX HYUNBIN" />
          </div>
        </div>
      </div>

      {/* Radial Gradient Overlay */}
      <div className="space-y-4">
        <SubSectionTitle>Radial Gradient Overlay</SubSectionTitle>
        <SectionDescription>
          페이지 상단의 부드러운 빨간 글로우. pointer-events-none absolute inset-0.
        </SectionDescription>
        <div className="relative h-48 overflow-hidden rounded-lg border border-border bg-background">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_oklch(0.668_0.220_21_/_0.12)_0%,_transparent_60%)]" />
          <div className="flex h-full items-center justify-center">
            <p className="font-mono text-xs text-muted-foreground">
              radial-gradient(ellipse_at_top, primary/12%, transparent 60%)
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export { ComponentStylesSection };
