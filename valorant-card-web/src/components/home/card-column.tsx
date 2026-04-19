"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  useAnimate,
  useReducedMotion,
  type AnimationPlaybackControls,
} from "motion/react";
import { TierCard } from "@/components/tier-card";
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
  const [scope, animate] = useAnimate();
  const controlsRef = useRef<AnimationPlaybackControls | null>(null);
  const [hovered, setHovered] = useState(false);
  const reducedMotion = useReducedMotion();
  const doubled = [...cards, ...cards];

  /**
   * 세로 무한 스크롤 실행. direction에 따라 0% ↔ -50%를 선형 반복하며,
   * 생성된 controls를 ref에 보관해 호버 시 pause/play로 제어한다.
   */
  useEffect(() => {
    if (reducedMotion) return;
    const keyframes = direction === "up" ? ["0%", "-50%"] : ["-50%", "0%"];
    const controls = animate(
      scope.current,
      { y: keyframes },
      { duration: speed, ease: "linear", repeat: Infinity },
    );
    controlsRef.current = controls;
    return () => controls.stop();
  }, [animate, direction, reducedMotion, scope, speed]);

  /**
   * 호버 상태와 스크롤 재생 상태를 동기화. 진행 위치는 유지하고 재생만 토글.
   */
  useEffect(() => {
    const controls = controlsRef.current;
    if (!controls) return;
    if (hovered) controls.pause();
    else controls.play();
  }, [hovered]);

  return (
    <motion.div
      className="flex-1 overflow-hidden"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
    >
      <div ref={scope} className="flex flex-col">
        {doubled.map((card, i) => (
          <motion.div
            key={`${card.tierName}-${i}`}
            className="pb-3"
            whileHover={{
              y: -6,
              scale: 1.03,
              filter: `brightness(1.08) ${SHOWCASE_GLOW[card.tierName]}`,
              zIndex: 20,
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
              className="w-[280px]"
            />
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export { CardColumn };
