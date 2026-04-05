"use client";

import { useState } from "react";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getWeaponIconUrl } from "@/constants/weapons";
import type { TierName } from "@/constants/tier-design";
import { Label } from "@/components/ui/label";

const VANDAL_ICON_URL = getWeaponIconUrl("9c82e19d-4575-0200-1a81-3eacf00cf872");

const STATS = [
  { label: "ACS", value: "312" },
  { label: "K/D", value: "1.6" },
  { label: "HS%", value: "34%" },
  { label: "DDΔ", value: "+48" },
  { label: "KAST", value: "81%" },
  { label: "ADR", value: "189" },
];

interface TierEntry {
  name: TierName;
  competitiveTier: number;
  image: StaticImageData;
}

const TIERS: TierEntry[] = [
  { name: "Iron", competitiveTier: 5, image: ironCard },
  { name: "Bronze", competitiveTier: 8, image: bronzeCard },
  { name: "Silver", competitiveTier: 11, image: silverCard },
  { name: "Gold", competitiveTier: 14, image: goldCard },
  { name: "Platinum", competitiveTier: 17, image: platinumCard },
  { name: "Diamond", competitiveTier: 20, image: diamondCard },
  { name: "Ascendant", competitiveTier: 23, image: ascendantCard },
  { name: "Immortal", competitiveTier: 26, image: immortalCard },
  { name: "Radiant", competitiveTier: 27, image: radiantCard },
];

const DEFAULT_HEIGHTS = [560, 640, 700, 800];
const SM_WIDTHS = [180, 210, 280, 360];

const SizeTest = () => {
  const [tierIndex, setTierIndex] = useState(8);

  const tier = TIERS[tierIndex];

  const commonProps = {
    tierName: tier.name,
    competitiveTier: tier.competitiveTier,
    backgroundImage: tier.image,
    portraitUrl: "/characters/jett/fullportrait.png",
    ovr: 97,
    playerName: "TenZ",
    weaponIconUrl: VANDAL_ICON_URL,
    stats: STATS,
  };

  return (
    <div className="flex h-screen bg-background">
      {/* Card comparison area */}
      <div className="flex-1 overflow-x-auto overflow-y-auto p-8">
        {/* default size row */}
        <section className="mb-12">
          <h2 className="mb-4 text-lg font-bold text-foreground">
            default size
          </h2>
          <div className="flex items-end gap-6">
            {DEFAULT_HEIGHTS.map((h) => (
              <div key={h} className="flex shrink-0 flex-col items-center gap-2">
                <span className="rounded bg-muted px-2 py-1 text-xs font-mono font-medium text-foreground">
                  {h}px
                  <span className="ml-1 text-muted-foreground">
                    ({Math.round(h * 0.6554)}w)
                  </span>
                </span>
                <div style={{ height: `${h}px` }}>
                  <TierCard {...commonProps} className="h-full" />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* sm size row — 너비 기준 (hero 3열 컬럼에서 너비로 크기 결정) */}
        <section>
          <h2 className="mb-4 text-lg font-bold text-foreground">
            sm size
            <span className="ml-2 text-sm font-normal text-muted-foreground">
              (너비 기준 — hero 컬럼 시뮬레이션)
            </span>
          </h2>
          <div className="flex items-end gap-6">
            {SM_WIDTHS.map((w) => (
              <div key={w} className="flex shrink-0 flex-col items-center gap-2">
                <span className="rounded bg-muted px-2 py-1 text-xs font-mono font-medium text-foreground">
                  {w}w
                  <span className="ml-1 text-muted-foreground">
                    ({Math.round(w / 0.6554)}h)
                  </span>
                </span>
                <div style={{ width: `${w}px` }}>
                  <TierCard {...commonProps} size="sm" />
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Side panel */}
      <div className="flex w-72 shrink-0 flex-col gap-6 overflow-y-auto border-l border-border bg-card p-6">
        <section>
          <Label className="mb-3 text-xs tracking-wider text-muted-foreground">
            TIER
          </Label>
          <Select
            value={String(tierIndex)}
            onValueChange={(val) => setTierIndex(Number(val))}
          >
            <SelectTrigger className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {TIERS.map((t, i) => (
                <SelectItem key={t.name} value={String(i)}>
                  {t.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </section>

        <section>
          <Label className="mb-3 text-xs tracking-wider text-muted-foreground">
            QUICK TIER
          </Label>
          <div className="grid grid-cols-3 gap-1.5">
            {TIERS.map((t, i) => (
              <Button
                key={t.name}
                variant={tierIndex === i ? "default" : "ghost"}
                size="sm"
                className="text-xs"
                onClick={() => setTierIndex(i)}
              >
                {t.name}
              </Button>
            ))}
          </div>
        </section>

        <section>
          <Label className="mb-3 text-xs tracking-wider text-muted-foreground">
            SIZE CANDIDATES
          </Label>
          <div className="flex flex-col gap-2 text-sm text-muted-foreground">
            <div className="rounded-md border border-border p-3">
              <p className="font-medium text-foreground">default</p>
              <p className="mt-1 font-mono text-xs">
                {DEFAULT_HEIGHTS.map((h) => `${h}px`).join(" / ")}
              </p>
              <p className="mt-1 text-xs">carousel, 카드 상세, 결과</p>
            </div>
            <div className="rounded-md border border-border p-3">
              <p className="font-medium text-foreground">sm</p>
              <p className="mt-1 font-mono text-xs">
                {SM_WIDTHS.map((w) => `${w}w`).join(" / ")}
              </p>
              <p className="mt-1 text-xs">메인 페이지 3열 스크롤 (너비 기준)</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default function SizeTestPage() {
  return <SizeTest />;
}
