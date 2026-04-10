import type { CSSProperties } from "react";
import { TierCard } from "@/components/card/tier-card";
import { TIER_CARD_IMAGES } from "@/constants/card/tier-card-images";
import {
  VANDAL_ICON_URL,
  SHOWCASE_STATS,
  COMPETITIVE_TIERS,
} from "@/components/design/mock-data";
import { SHOWCASE_GLOW } from "@/constants/card/showcase-cards";
import type { ShowcaseCard } from "@/constants/card/showcase-cards";

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
            style={
              { "--tier-glow": SHOWCASE_GLOW[card.tierName] } as CSSProperties
            }
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

export { CardColumn };
