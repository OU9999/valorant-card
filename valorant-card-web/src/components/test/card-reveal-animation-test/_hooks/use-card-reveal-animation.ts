"use client";

import { useEffect, useState, type KeyboardEvent } from "react";
import { useReducedMotion } from "motion/react";
import {
  BLINK_DURATION_MS,
  BLINK_OPACITY,
  BLINK_RESET_DURATION_SECONDS,
  BLINK_START_PANEL_PROGRESS,
  BLINK_TIMES,
  getNextPhase,
  PHASE_VIEW,
  REDUCED_BLINK_DURATION_MS,
  REDUCED_BLINK_OPACITY,
  REDUCED_BLINK_TIMES,
  REDUCED_RESTORE_DURATION_MS,
  REDUCED_REVEAL_DURATION_MS,
  RESTORE_PANEL_TIMES,
  RESTORE_DURATION_MS,
  REVEAL_DURATION_MS,
} from "../phase-config";
import type { AnimationPhase, CardRevealAnimationState } from "../types";

interface AnimationDurations {
  blinkDuration: number;
  panelDuration: number;
  restoreDuration: number;
}

const toSeconds = (ms: number) => ms / 1000;

const createAnimationDurations = (
  phase: AnimationPhase,
  shouldReduceMotion: boolean,
): AnimationDurations => {
  const revealDuration = toSeconds(
    shouldReduceMotion ? REDUCED_REVEAL_DURATION_MS : REVEAL_DURATION_MS,
  );
  const restoreDuration = toSeconds(
    shouldReduceMotion ? REDUCED_RESTORE_DURATION_MS : RESTORE_DURATION_MS,
  );
  const blinkDuration = toSeconds(
    shouldReduceMotion ? REDUCED_BLINK_DURATION_MS : BLINK_DURATION_MS,
  );
  const panelDuration = phase === "restore" ? restoreDuration : revealDuration;

  return {
    blinkDuration,
    panelDuration,
    restoreDuration,
  };
};

const createPanelTransition = (
  phase: AnimationPhase,
  panelDuration: number,
): CardRevealAnimationState["panelTransition"] => {
  const transition = {
    duration: phase === "base" ? 0 : panelDuration,
    ease: "easeInOut" as const,
  };

  if (phase !== "restore") return transition;

  return {
    ...transition,
    times: RESTORE_PANEL_TIMES,
  };
};

const createTextTransition = (
  phase: AnimationPhase,
  panelDuration: number,
): CardRevealAnimationState["baseTextTransition"] => ({
  duration: phase === "base" ? 0 : panelDuration,
  ease: "easeInOut" as const,
});

const createBlinkAnimation = (
  phase: AnimationPhase,
  shouldReduceMotion: boolean,
): CardRevealAnimationState["blinkAnimation"] => {
  if (phase !== "reveal") return { opacity: 0 };
  if (shouldReduceMotion) return { opacity: REDUCED_BLINK_OPACITY };

  return { opacity: BLINK_OPACITY };
};

const createBlinkTransition = (
  phase: AnimationPhase,
  panelDuration: number,
  blinkDuration: number,
  shouldReduceMotion: boolean,
): CardRevealAnimationState["blinkTransition"] => {
  if (phase !== "reveal") {
    return { duration: BLINK_RESET_DURATION_SECONDS, ease: "linear" as const };
  }

  return {
    delay: panelDuration * BLINK_START_PANEL_PROGRESS,
    duration: blinkDuration,
    ease: "linear" as const,
    times: shouldReduceMotion ? REDUCED_BLINK_TIMES : BLINK_TIMES,
  };
};

const useCardRevealAnimation = (): CardRevealAnimationState => {
  const [phase, setPhase] = useState<AnimationPhase>("base");
  const reducedMotion = useReducedMotion();
  const shouldReduceMotion = reducedMotion === true;
  const phaseView = PHASE_VIEW[phase];
  const { blinkDuration, panelDuration, restoreDuration } =
    createAnimationDurations(phase, shouldReduceMotion);

  const panelTransition = createPanelTransition(phase, panelDuration);
  const baseTextTransition = createTextTransition(phase, panelDuration);

  const activeTextTransition = baseTextTransition;
  const blinkAnimation = createBlinkAnimation(phase, shouldReduceMotion);
  const blinkTransition = createBlinkTransition(
    phase,
    panelDuration,
    blinkDuration,
    shouldReduceMotion,
  );

  /**
   * restore 단계의 패널 퇴장 애니메이션이 끝난 뒤 기본 대기 상태로 되돌린다.
   */
  useEffect(() => {
    if (phase !== "restore") return;

    const timeoutId = window.setTimeout(() => {
      setPhase("base");
    }, restoreDuration * 1000);

    return () => window.clearTimeout(timeoutId);
  }, [phase, restoreDuration]);

  const advancePhase = () => {
    setPhase((currentPhase) => getNextPhase(currentPhase));
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    if (event.key !== "Enter" && event.key !== " ") return;

    event.preventDefault();
    advancePhase();
  };

  return {
    phase,
    phaseView,
    panelTransition,
    baseTextTransition,
    activeTextTransition,
    blinkAnimation,
    blinkTransition,
    advancePhase,
    handleKeyDown,
  };
};

export { useCardRevealAnimation };
