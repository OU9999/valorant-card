import type { CSSProperties } from "react";
import { TierCard } from "@/components/tier-card";
import { TIER_CARD_IMAGES } from "@/constants/card/tier-card-images";
import {
  VANDAL_ICON_URL,
  SHOWCASE_STATS,
  COMPETITIVE_TIERS,
} from "@/components/design/mock-data";
import {
  SHOWCASE_GLOW,
  COLUMN_1,
  COLUMN_2,
  COLUMN_3,
} from "@/constants/card/showcase-cards";

const ALL_CARDS = [...COLUMN_1, ...COLUMN_2, ...COLUMN_3];
const DOUBLED = [...ALL_CARDS, ...ALL_CARDS];

const CardShowcaseMobile = () => {
  return (
    <aside className="relative z-10 overflow-hidden py-8 md:hidden">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-background via-background/60 to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-background via-background/60 to-transparent" />

      <div
        className="card-scroll-left flex w-max gap-3"
        style={{ "--scroll-duration": "30s" } as CSSProperties}
      >
        {DOUBLED.map((card, i) => (
          <div
            key={`${card.tierName}-${i}`}
            className="showcase-card shrink-0"
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
              className="w-[200px]"
            />
          </div>
        ))}
      </div>
    </aside>
  );
};

export { CardShowcaseMobile };
