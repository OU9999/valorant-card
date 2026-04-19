"use client";

import { useEffect } from "react";
import { motion, useAnimate, useReducedMotion } from "motion/react";
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
const SCROLL_DURATION_S = 60;

const CardShowcaseMobile = () => {
  const [scope, animate] = useAnimate();
  const reducedMotion = useReducedMotion();

  /**
   * 모바일 가로 무한 스크롤. 카드 배열을 2배 복제한 뒤 x를 0% → -50%로 이동해
   * 시각적으로 끊김 없는 루프를 만든다.
   */
  useEffect(() => {
    if (reducedMotion) return;
    const controls = animate(
      scope.current,
      { x: ["0%", "-50%"] },
      { duration: SCROLL_DURATION_S, ease: "linear", repeat: Infinity },
    );
    return () => controls.stop();
  }, [animate, reducedMotion, scope]);

  return (
    <aside className="relative z-10 overflow-hidden py-8 md:hidden">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-background via-background/60 to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-background via-background/60 to-transparent" />

      <div ref={scope} className="flex w-max gap-3">
        {DOUBLED.map((card, i) => (
          <motion.div
            key={`${card.tierName}-${i}`}
            className="shrink-0"
            whileTap={{
              y: -6,
              scale: 1.03,
              filter: `brightness(1.08) ${SHOWCASE_GLOW[card.tierName]}`,
            }}
            transition={{ duration: 0.35, ease: [0.25, 0.8, 0.25, 1] }}
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
          </motion.div>
        ))}
      </div>
    </aside>
  );
};

export { CardShowcaseMobile };
