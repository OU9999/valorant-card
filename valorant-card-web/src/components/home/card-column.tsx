"use client";

import { useEffect, useState } from "react";
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
import { cn } from "@/lib/cn";

interface CardColumnProps {
  cards: ShowcaseCard[];
  direction: "up" | "down";
  speed: number;
  delay: number;
  className?: string;
}

const CardColumn = ({
  cards,
  direction,
  speed,
  delay,
  className,
}: CardColumnProps) => {
  const [scope, animate] = useAnimate();
  const [controls, setControls] = useState<AnimationPlaybackControls | null>(
    null,
  );
  const [hovered, setHovered] = useState(false);
  const reducedMotion = useReducedMotion();
  const doubled = [...cards, ...cards];

  /**
   * 세로 무한 스크롤 실행. direction에 따라 0% ↔ -50%를 선형 반복하며,
   * 생성된 controls를 상태에 저장해 speed/direction 변경 시 호버 동기화 효과가
   * 새 controls를 감지하도록 한다.
   */
  useEffect(() => {
    if (reducedMotion) return;
    const keyframes = direction === "up" ? ["0%", "-50%"] : ["-50%", "0%"];
    const animation = animate(
      scope.current,
      { y: keyframes },
      { duration: speed, ease: "linear", repeat: Infinity },
    );
    setControls(animation);
    return () => animation.stop();
  }, [animate, direction, reducedMotion, scope, speed]);

  /**
   * 호버 상태와 스크롤 재생 상태를 동기화. 진행 위치는 유지하고 재생만 토글.
   */
  useEffect(() => {
    if (!controls) return;
    if (hovered) controls.pause();
    else controls.play();
  }, [controls, hovered]);

  return (
    <motion.div
      className={cn("flex-1 overflow-hidden", className)}
      initial={reducedMotion ? { opacity: 0 } : { opacity: 0, y: 40 }}
      animate={reducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
    >
      <div ref={scope} className="flex w-full flex-col items-center">
        {doubled.map((card, i) => (
          <motion.div
            key={`${card.tierName}-${i}`}
            className="flex w-full justify-center pb-3"
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
              className="w-full max-w-[280px]"
            />
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export { CardColumn };
