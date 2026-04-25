"use client";

import { useEffect, useRef } from "react";
import {
  animate,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
} from "motion/react";

const CORNER_COUNT = 4;
const PERIOD_S = 4;
const MIN = -200;
const MAX = 300;
const RANGE = MAX - MIN;

const SiteBackground = () => {
  const layerARefs = useRef<(HTMLDivElement | null)[]>(
    Array.from({ length: CORNER_COUNT }, () => null),
  );
  const layerBRefs = useRef<(HTMLDivElement | null)[]>(
    Array.from({ length: CORNER_COUNT }, () => null),
  );
  const phase = useMotionValue(0);
  const reducedMotion = useReducedMotion();

  /**
   * phase(0~1)에서 두 레이어 mask-position을 0.5 위상차로 산출해 코너에 적용.
   * 한쪽이 사이클 끝으로 가서 코너에서 사라지는 순간 다른 쪽은 중간(가장 잘 보이는 지점)에
   * 위치하므로 배경 패턴이 끊기지 않고 항상 보인다.
   */
  useMotionValueEvent(phase, "change", (p) => {
    const a = MIN + p * RANGE;
    const b = MIN + ((p + 0.5) % 1) * RANGE;
    const aPos = `${a}px ${a}px`;
    const bPos = `${b}px ${b}px`;
    for (const el of layerARefs.current) {
      if (!el) continue;
      el.style.maskPosition = aPos;
      el.style.webkitMaskPosition = aPos;
    }
    for (const el of layerBRefs.current) {
      if (!el) continue;
      el.style.maskPosition = bPos;
      el.style.webkitMaskPosition = bPos;
    }
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

  const setLayerA = (i: number) => (el: HTMLDivElement | null) => {
    layerARefs.current[i] = el;
  };
  const setLayerB = (i: number) => (el: HTMLDivElement | null) => {
    layerBRefs.current[i] = el;
  };

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-[#101923]"
    >
      <div
        ref={setLayerA(0)}
        className="site-bg-radtech pointer-events-none absolute -top-8 -right-8 h-[630px] w-[570px]"
      />
      <div
        ref={setLayerB(0)}
        className="site-bg-radtech pointer-events-none absolute -top-8 -right-8 h-[630px] w-[570px]"
      />
      <div
        ref={setLayerA(1)}
        className="site-bg-radtech pointer-events-none absolute -top-8 -left-8 h-[570px] w-[630px] -scale-x-100"
      />
      <div
        ref={setLayerB(1)}
        className="site-bg-radtech pointer-events-none absolute -top-8 -left-8 h-[570px] w-[630px] -scale-x-100"
      />
      <div
        ref={setLayerA(2)}
        className="site-bg-radtech pointer-events-none absolute -right-8 -bottom-8 h-[570px] w-[630px] -scale-y-100"
      />
      <div
        ref={setLayerB(2)}
        className="site-bg-radtech pointer-events-none absolute -right-8 -bottom-8 h-[570px] w-[630px] -scale-y-100"
      />
      <div
        ref={setLayerA(3)}
        className="site-bg-radtech pointer-events-none absolute -bottom-8 -left-8 h-[630px] w-[570px] -scale-x-100 -scale-y-100"
      />
      <div
        ref={setLayerB(3)}
        className="site-bg-radtech pointer-events-none absolute -bottom-8 -left-8 h-[630px] w-[570px] -scale-x-100 -scale-y-100"
      />
    </div>
  );
};

export { SiteBackground };
