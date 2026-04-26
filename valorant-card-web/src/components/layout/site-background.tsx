"use client";

import React, { useEffect } from "react";
import {
  animate,
  motion,
  useMotionValue,
  useReducedMotion,
  useTransform,
} from "motion/react";

const PERIOD_S = 4;
const MIN = -200;
const MAX = 300;
const RANGE = MAX - MIN;

interface Corner {
  className: string;
  transform: string;
}

const CORNERS: readonly Corner[] = [
  { className: "-top-8 -right-8 h-[630px] w-[570px]", transform: "" },
  {
    className: "-top-8 -left-8 h-[570px] w-[630px]",
    transform: "-scale-x-100",
  },
  {
    className: "-right-8 -bottom-8 h-[570px] w-[630px]",
    transform: "-scale-y-100",
  },
  {
    className: "-bottom-8 -left-8 h-[630px] w-[570px]",
    transform: "-scale-x-100 -scale-y-100",
  },
];

/**
 * 큰 사이즈 코너 데코 — 4 코너 small radtech 의 1.5x 크기.
 * 가운데 빈 영역까지 패턴이 들어와 BG 공백 메움.
 */
const LARGE_CORNERS: readonly Corner[] = [
  {
    className: "-top-12 -right-12 h-[945px] w-[855px] opacity-60",
    transform: "",
  },
  {
    className: "-top-12 -left-12 h-[855px] w-[945px] opacity-60",
    transform: "-scale-x-100",
  },
  {
    className: "-bottom-12 -right-12 h-[855px] w-[945px] opacity-60",
    transform: "-scale-y-100",
  },
  {
    className: "-bottom-12 -left-12 h-[945px] w-[855px] opacity-60",
    transform: "-scale-x-100 -scale-y-100",
  },
];

const SiteBackground = () => {
  const phase = useMotionValue(0);
  const reducedMotion = useReducedMotion();

  const maskPosA = useTransform(phase, (p) => {
    const v = MIN + p * RANGE;
    return `${v}px ${v}px`;
  });
  const maskPosB = useTransform(phase, (p) => {
    const v = MIN + ((p + 0.5) % 1) * RANGE;
    return `${v}px ${v}px`;
  });

  /**
   * phase를 4초 주기 ease-in-out으로 0 → 1 슬라이드, 사이클 끝에서 wrap.
   * 발로란트 flashback 사이트의 곡선을 그대로 가져오되, 두 레이어 위상차로
   * "패턴이 사라지는 순간"을 메워 시각 공백 제거.
   */
  useEffect(() => {
    if (reducedMotion) return;
    const controls = animate(phase, [0, 1], {
      duration: PERIOD_S,
      ease: "easeInOut",
      repeat: Infinity,
      repeatType: "loop",
    });
    return () => controls.stop();
  }, [phase, reducedMotion]);

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-[#101923]"
    >
      {LARGE_CORNERS.map((corner) => (
        <React.Fragment key={corner.className}>
          <motion.div
            style={{ maskPosition: maskPosA, WebkitMaskPosition: maskPosA }}
            className={`site-bg-radtech pointer-events-none absolute ${corner.className} ${corner.transform}`}
          />
          <motion.div
            style={{ maskPosition: maskPosB, WebkitMaskPosition: maskPosB }}
            className={`site-bg-radtech pointer-events-none absolute ${corner.className} ${corner.transform}`}
          />
        </React.Fragment>
      ))}
      {CORNERS.map((corner) => (
        <React.Fragment key={corner.className}>
          <motion.div
            style={{ maskPosition: maskPosA, WebkitMaskPosition: maskPosA }}
            className={`site-bg-radtech pointer-events-none absolute ${corner.className} ${corner.transform}`}
          />
          <motion.div
            style={{ maskPosition: maskPosB, WebkitMaskPosition: maskPosB }}
            className={`site-bg-radtech pointer-events-none absolute ${corner.className} ${corner.transform}`}
          />
        </React.Fragment>
      ))}
    </div>
  );
};

export { SiteBackground };
