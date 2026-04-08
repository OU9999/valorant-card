"use client";

import { useRef } from "react";
import { TierCard } from "@/components/card/tier-card";
import { SaveCardButton } from "@/components/card/save-card-button";
import { CopyUrlButton } from "@/components/card/copy-url-button";
import {
  CardDetailLayout,
  CardSlot,
  DetailSlot,
} from "@/components/card/card-detail-layout";
import { CombatStats } from "@/components/card/detail/combat-stats";
import { PerformanceBadges } from "@/components/card/detail/performance-badges";
import { AIFeedback } from "@/components/card/detail/ai-feedback";
import { CHARACTERS } from "@/constants/characters";
import { TIER_CARD_IMAGES } from "@/constants/tier-card-images";
import { getWeaponIconUrl } from "@/constants/weapons";
import type { CardStat, FormTrend } from "@/lib/valorant/card-stats";
import type { Badge } from "@/lib/valorant/badges";

// ─── Mock Data ───

const MOCK_STATS: CardStat[] = [
  { label: "ACS", value: "247.3" },
  { label: "K/D", value: "1.42" },
  { label: "HS%", value: "28.5" },
  { label: "DD/Δ", value: "+18.7" },
  { label: "KAST", value: "71.2" },
];

const MOCK_BADGES: Badge[] = [
  {
    id: "sharpshooter",
    name: "Sharpshooter",
    description: "높은 헤드샷 비율 달성",
  },
  { id: "ace_hunter", name: "Ace Hunter", description: "에이스 다수 기록" },
];

const MOCK_TREND: FormTrend = "up";

const JETT = CHARACTERS.find(
  (c) => c.id === "ADD6443A-41BD-E414-F6AD-E58D267F4E95",
)!;

const MOCK_DATA = {
  tierName: "Immortal" as const,
  competitiveTier: 24,
  portraitUrl: JETT.poses[0],
  ovr: 82,
  playerName: "PLAYER1",
  region: "KR",
  weaponIconUrl: getWeaponIconUrl("29A0CFAB-485B-F5D5-779A-B59F85E204A8"),
  stats: MOCK_STATS,
  trend: MOCK_TREND,
  badges: MOCK_BADGES,
};

// ─── Component ───

const CardTestView = () => {
  const data = MOCK_DATA;
  const cardRef = useRef<HTMLDivElement>(null);

  return (
    <CardDetailLayout>
      <CardSlot>
        <TierCard
          ref={cardRef}
          tierName={data.tierName}
          competitiveTier={data.competitiveTier}
          backgroundImage={TIER_CARD_IMAGES[data.tierName]}
          portraitUrl={data.portraitUrl}
          ovr={data.ovr}
          playerName={data.playerName}
          region={data.region}
          weaponIconUrl={data.weaponIconUrl}
          stats={data.stats}
          className="h-[800px]"
          priority
        />
      </CardSlot>
      <DetailSlot>
        <div className="flex w-1/2 gap-2 [&>button]:flex-1">
          <SaveCardButton
            cardRef={cardRef}
            fileName={`${data.playerName}-${data.tierName}`}
          />
          <CopyUrlButton />
        </div>
        <CombatStats stats={data.stats} />
        <PerformanceBadges badges={data.badges} />
        <AIFeedback stats={data.stats} trend={data.trend} />
      </DetailSlot>
    </CardDetailLayout>
  );
};

export { CardTestView };
