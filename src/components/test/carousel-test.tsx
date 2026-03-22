"use client";

import { useEffect, useState } from "react";
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
import { ChevronLeft, ChevronRight } from "lucide-react";
import { TierCard } from "@/components/card/tier-card";
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
import { CHARACTERS } from "@/constants/characters";
import type { TierName } from "@/constants/tier-design";

const DEFAULT_STATS = [
  { label: "ACS", value: "280" },
  { label: "K/D", value: "1.3" },
  { label: "HS%", value: "27%" },
  { label: "DDΔ", value: "+31" },
  { label: "KAST", value: "74%" },
  { label: "ADR", value: "168" },
];

const JETT_INDEX = CHARACTERS.findIndex((c) => c.name === "제트");

interface TierCardEntry {
  name: TierName;
  competitiveTier: number;
  image: StaticImageData;
}

const TIER_CARDS: TierCardEntry[] = [
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

const SLIDE_OFFSETS = [
  "-translate-x-[0%]",
  "-translate-x-[100%]",
  "-translate-x-[200%]",
  "-translate-x-[300%]",
  "-translate-x-[400%]",
  "-translate-x-[500%]",
  "-translate-x-[600%]",
  "-translate-x-[700%]",
  "-translate-x-[800%]",
] as const;

const CarouselTest = () => {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [stats, setStats] = useState(DEFAULT_STATS);
  const [ovr, setOvr] = useState(92);
  const [playerName, setPlayerName] = useState("Player#KR1");
  const [characterIndex, setCharacterIndex] = useState(JETT_INDEX);

  const handleStatChange = (index: number, value: string) => {
    setStats((prev) => prev.map((s, i) => (i === index ? { ...s, value } : s)));
  };

  const goToPrev = () => {
    setActiveIndex((prev) => (prev > 0 ? prev - 1 : TIER_CARDS.length - 1));
  };

  const goToNext = () => {
    setActiveIndex((prev) => (prev < TIER_CARDS.length - 1 ? prev + 1 : 0));
  };

  /** ArrowLeft/ArrowRight 키보드 네비게이션 */
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") goToPrev();
      if (e.key === "ArrowRight") goToNext();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-950">
      {/* Left: Card display */}
      <div className="flex flex-1 items-center justify-center overflow-hidden">
        <div className="relative w-full overflow-hidden">
          <div
            className={`flex transition-transform duration-500 ease-out ${SLIDE_OFFSETS[activeIndex]}`}
          >
            {TIER_CARDS.map((tier, i) => (
              <div
                key={tier.name}
                className="flex w-full shrink-0 items-center justify-center"
              >
                <TierCard
                  tierName={tier.name}
                  competitiveTier={tier.competitiveTier}
                  backgroundImage={tier.image}
                  portraitUrl={CHARACTERS[characterIndex].fullPortrait}
                  ovr={ovr}
                  playerName={playerName}
                  stats={stats}
                  className="h-[80vh]"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right: Debug panel */}
      <div className="flex w-80 flex-col gap-6 border-l border-white/10 bg-gray-900 p-6">
        {/* Tier select buttons */}
        <section>
          <Label className="mb-3 text-xs tracking-wider text-white/50">
            TIER
          </Label>
          <div className="grid grid-cols-3 gap-2">
            {TIER_CARDS.map((tier, i) => (
              <Button
                key={tier.name}
                variant={i === activeIndex ? "default" : "ghost"}
                size="sm"
                onClick={() => setActiveIndex(i)}
              >
                {tier.name}
              </Button>
            ))}
          </div>
        </section>

        {/* Carousel controls */}
        <section>
          <Label className="mb-3 text-xs tracking-wider text-white/50">
            CAROUSEL
          </Label>
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" onClick={goToPrev}>
              <ChevronLeft />
            </Button>

            <span className="flex-1 text-center text-sm font-medium text-white">
              {TIER_CARDS[activeIndex].name} ({activeIndex + 1}/
              {TIER_CARDS.length})
            </span>

            <Button variant="ghost" size="icon" onClick={goToNext}>
              <ChevronRight />
            </Button>
          </div>
        </section>

        {/* Character select */}
        <section>
          <Label className="mb-3 text-xs tracking-wider text-white/50">
            CHARACTER
          </Label>
          <Select
            value={String(characterIndex)}
            onValueChange={(val) => setCharacterIndex(Number(val))}
          >
            <SelectTrigger className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {CHARACTERS.map((c, i) => (
                <SelectItem key={c.id} value={String(i)}>
                  {c.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </section>

        {/* Stats controls */}
        <section>
          <Label className="mb-3 text-xs tracking-wider text-white/50">
            STATS
          </Label>
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between gap-3">
              <Label className="text-sm text-white/60">OVR</Label>
              <Input
                type="number"
                min={0}
                max={99}
                value={ovr}
                onChange={(e) => setOvr(Number(e.target.value))}
                className="w-20 text-right"
              />
            </div>
            <div className="flex items-center justify-between gap-3">
              <Label className="text-sm text-white/60">NAME</Label>
              <Input
                type="text"
                value={playerName}
                onChange={(e) => setPlayerName(e.target.value)}
                className="w-36 text-right"
              />
            </div>
            {stats.map((stat, i) => (
              <div
                key={stat.label}
                className="flex items-center justify-between gap-3"
              >
                <Label className="text-sm text-white/60">{stat.label}</Label>
                <Input
                  type="text"
                  value={stat.value}
                  onChange={(e) => handleStatChange(i, e.target.value)}
                  className="w-20 text-right"
                />
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export { CarouselTest };
