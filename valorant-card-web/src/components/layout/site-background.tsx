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

const toMaskPos = (p: number) => {
  const v = MIN + (((p % 1) + 1) % 1) * RANGE;
  return `${v}px ${v}px`;
};

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

const SiteBackground = () => {
  const phaseA = useMotionValue(0.25);
  const phaseB = useMotionValue(0.75);
  const reducedMotion = useReducedMotion();

  const maskPosA = useTransform(phaseA, toMaskPos);
  const maskPosB = useTransform(phaseB, toMaskPos);

  /**
   * 두 레이어를 독립 motion value로 운용. 동일 주기·동일 선형 속도지만 시작
   * 위상이 0.5 cycle 어긋나 있어 wrap 순간이 2초 간격으로 분산 → 한 레이어가
   * 점프해도 나머지 레이어가 항상 mask를 채워 시각 공백 제거.
   * linear easing으로 끝점 정지 구간을 제거해 어느 시점에도 mask 위치가 멈추지 않음.
   */
  useEffect(() => {
    if (reducedMotion) return;
    const a = animate(phaseA, 1.25, {
      duration: PERIOD_S,
      ease: "linear",
      repeat: Infinity,
      repeatType: "loop",
    });
    const b = animate(phaseB, 1.75, {
      duration: PERIOD_S,
      ease: "linear",
      repeat: Infinity,
      repeatType: "loop",
    });
    return () => {
      a.stop();
      b.stop();
    };
  }, [phaseA, phaseB, reducedMotion]);

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-[#101923]"
    >
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
