"use client";

import { useState } from "react";
import Image, { type StaticImageData } from "next/image";
import ironCard from "@/asset/example/tier-card/iron.png";
import bronzeCard from "@/asset/example/tier-card/bronze.png";
import silverCard from "@/asset/example/tier-card/silver.png";
import goldCard from "@/asset/example/tier-card/gold.png";
import platinumCard from "@/asset/example/tier-card/platinum.png";
import diamondCard from "@/asset/example/tier-card/diamond.png";
import ascendantCard from "@/asset/example/tier-card/ascendant.png";
import immortalCard from "@/asset/example/tier-card/immortal.png";
import radiantCard from "@/asset/example/tier-card/radiant.png";
import { getCardSvgPath } from "@/constants/card/borders";
import { HIGH_TIER_NAMES } from "@/constants/card/tier-design";
import type { TierName } from "@/constants/card/tier-design";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { TestLayout } from "./test-layout";

interface TierEntry {
  name: TierName;
  image: StaticImageData;
}

const TIERS: TierEntry[] = [
  { name: "Iron", image: ironCard },
  { name: "Bronze", image: bronzeCard },
  { name: "Silver", image: silverCard },
  { name: "Gold", image: goldCard },
  { name: "Platinum", image: platinumCard },
  { name: "Diamond", image: diamondCard },
  { name: "Ascendant", image: ascendantCard },
  { name: "Immortal", image: immortalCard },
  { name: "Radiant", image: radiantCard },
];

const SvgTest = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [showOverlay, setShowOverlay] = useState(true);
  const [strokeColor, setStrokeColor] = useState("red");

  const tier = TIERS[activeIndex];
  const isHighTier = HIGH_TIER_NAMES.has(tier.name);
  const svgPath = getCardSvgPath(tier.name);

  return (
    <TestLayout
      cardArea={
        <div className="relative aspect-2109/3218 h-[800px]">
          <Image
            src={tier.image}
            alt={`${tier.name} card`}
            fill
            className="object-contain"
          />
          {showOverlay && (
            <svg
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
              className="absolute inset-0 h-full w-full"
            >
              <path
                d={svgPath}
                fill="none"
                stroke={strokeColor}
                strokeWidth="0.3"
              />
            </svg>
          )}
        </div>
      }
      sidePanel={
        <>
          <section>
            <Label className="mb-3 text-xs tracking-wider text-muted-foreground">
              TIER
            </Label>
            <div className="grid grid-cols-3 gap-2">
              {TIERS.map((t, i) => (
                <Button
                  key={t.name}
                  variant={i === activeIndex ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setActiveIndex(i)}
                >
                  {t.name}
                </Button>
              ))}
            </div>
          </section>

          <section>
            <Label className="mb-3 text-xs tracking-wider text-muted-foreground">
              SVG OVERLAY
            </Label>
            <div className="flex flex-col gap-2">
              <Button
                variant={showOverlay ? "default" : "ghost"}
                size="sm"
                onClick={() => setShowOverlay((v) => !v)}
              >
                {showOverlay ? "Hide" : "Show"} Overlay
              </Button>
              <div className="flex gap-2">
                {["red", "lime", "cyan", "yellow"].map((color) => (
                  <Button
                    key={color}
                    variant={strokeColor === color ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setStrokeColor(color)}
                    className="flex-1"
                  >
                    {color}
                  </Button>
                ))}
              </div>
            </div>
          </section>

          <section>
            <Label className="mb-3 text-xs tracking-wider text-muted-foreground">
              INFO
            </Label>
            <div className="flex flex-col gap-1 text-sm text-muted-foreground">
              <p>Tier: {tier.name}</p>
              <p>Type: {isHighTier ? "High Tier" : "Low Tier"}</p>
              <p>Path: {tier.name === "Radiant" ? "HIGH_TIER" : isHighTier ? "MID_HIGH_TIER" : "CARD_SVG_PATH"}</p>
            </div>
          </section>
        </>
      }
    />
  );
};

export { SvgTest };
