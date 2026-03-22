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
import { TierCardRef } from "@/components/card/tier-card-ref";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getWeaponIconUrl } from "@/constants/weapons";
import type { TierName } from "@/constants/tier-design";
import { TestLayout } from "@/components/test/test-layout";

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

const SizeTest = () => {
  const [height, setHeight] = useState(500);
  const [tierIndex, setTierIndex] = useState(8); // Radiant
  const [showOriginal, setShowOriginal] = useState(true);

  const tier = TIERS[tierIndex];

  const cardProps = {
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
    <TestLayout
      cardArea={
        <div className="flex items-center justify-center gap-6">
          {showOriginal && (
            <div className="flex flex-col items-center gap-2">
              <span className="text-xs text-muted-foreground">Original</span>
              <div style={{ height: `${height}px` }}>
                <TierCardRef {...cardProps} className="h-full" />
              </div>
            </div>
          )}
          <div className="flex flex-col items-center gap-2">
            <span className="text-xs text-muted-foreground">
              New (cqw)
            </span>
            <div style={{ height: `${height}px` }}>
              <TierCard {...cardProps} className="h-full" />
            </div>
          </div>
        </div>
      }
      sidePanel={
        <>
          {/* Card Height */}
          <section>
            <Label className="mb-3 text-xs tracking-wider text-muted-foreground">
              CARD HEIGHT
            </Label>
            <div className="flex flex-col gap-3">
              <input
                type="range"
                min={100}
                max={800}
                value={height}
                onChange={(e) => setHeight(Number(e.target.value))}
                className="w-full accent-primary"
              />
              <div className="flex items-center gap-2">
                <Input
                  type="number"
                  min={100}
                  max={800}
                  value={height}
                  onChange={(e) => setHeight(Number(e.target.value))}
                  className="w-20 text-right"
                />
                <span className="text-sm text-muted-foreground">px</span>
              </div>
            </div>
          </section>

          {/* Tier Select */}
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

          {/* Compare Toggle */}
          <section>
            <Label className="mb-3 text-xs tracking-wider text-muted-foreground">
              COMPARE
            </Label>
            <Button
              variant={showOriginal ? "default" : "secondary"}
              size="sm"
              className="w-full"
              onClick={() => setShowOriginal((prev) => !prev)}
            >
              {showOriginal ? "Original 비교 ON" : "Original 비교 OFF"}
            </Button>
          </section>

          {/* Quick Sizes */}
          <section>
            <Label className="mb-3 text-xs tracking-wider text-muted-foreground">
              PRESETS
            </Label>
            <div className="grid grid-cols-2 gap-2">
              {[200, 350, 500, 700].map((h) => (
                <Button
                  key={h}
                  variant={height === h ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setHeight(h)}
                >
                  {h}px
                </Button>
              ))}
            </div>
          </section>
        </>
      }
    />
  );
};

export default function SizeTestPage() {
  return <SizeTest />;
}
