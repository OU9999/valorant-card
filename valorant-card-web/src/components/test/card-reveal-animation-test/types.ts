import type { KeyboardEventHandler } from "react";

type AnimationPhase = "base" | "reveal" | "restore";

interface PanelAnimation {
  x: string | string[];
  opacity: number | number[];
}

interface ActiveTextAnimation {
  clipPath: string;
  opacity: number;
}

interface PhaseView {
  panel: PanelAnimation;
  baseTextOpacity: number;
  activeText: ActiveTextAnimation;
}

interface CardRevealAnimationState {
  phase: AnimationPhase;
  phaseView: PhaseView;
  panelTransition: {
    duration: number;
    ease: "easeInOut";
    times?: number[];
  };
  baseTextTransition: {
    duration: number;
    ease: "easeInOut";
  };
  activeTextTransition: {
    duration: number;
    ease: "easeInOut";
  };
  blinkAnimation: {
    opacity: number | number[];
  };
  blinkTransition:
    | {
        delay: number;
        duration: number;
        ease: "linear";
        times: number[];
      }
    | {
        duration: number;
        ease: "linear";
      };
  advancePhase: () => void;
  handleKeyDown: KeyboardEventHandler<HTMLElement>;
}

export type {
  ActiveTextAnimation,
  AnimationPhase,
  CardRevealAnimationState,
  PanelAnimation,
  PhaseView,
};
