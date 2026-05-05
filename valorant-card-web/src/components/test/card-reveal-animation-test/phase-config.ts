import type { AnimationPhase, PhaseView } from "./types";

const PANEL_START_X = "134vw";
const PANEL_CENTER_X = "0vw";
const PANEL_END_X = "-146vw";

const FULL_TEXT_CLIP = "inset(0 0 0 0)";
const HIDDEN_TEXT_CLIP_RIGHT = "polygon(126% 0, 126% 0, 108% 100%, 108% 100%)";
const HIDDEN_TEXT_CLIP_LEFT = "polygon(-126% 0, -18% 0, -36% 100%, -144% 100%)";

const REVEAL_DURATION_MS = 720;
const RESTORE_DURATION_MS = 720;
const BLINK_DURATION_MS = 460;
const REDUCED_REVEAL_DURATION_MS = 280;
const REDUCED_RESTORE_DURATION_MS = 280;
const REDUCED_BLINK_DURATION_MS = 220;

const BLINK_OPACITY = [0, 1, 0, 1, 1];
const BLINK_TIMES = [0, 0.18, 0.42, 0.66, 1];
const BLINK_START_PANEL_PROGRESS = 0.78;
const BLINK_RESET_DURATION_SECONDS = 0.16;
const REDUCED_BLINK_OPACITY = [0, 1, 1];
const REDUCED_BLINK_TIMES = [0, 0.45, 1];
const RESTORE_PANEL_TIMES = [0, 0.92, 1];

const PHASE_VIEW = {
  base: {
    panel: {
      x: PANEL_START_X,
      opacity: 0,
    },
    baseTextOpacity: 0.18,
    activeText: {
      clipPath: HIDDEN_TEXT_CLIP_RIGHT,
      opacity: 0,
    },
  },
  reveal: {
    panel: {
      x: PANEL_CENTER_X,
      opacity: 1,
    },
    baseTextOpacity: 0,
    activeText: {
      clipPath: FULL_TEXT_CLIP,
      opacity: 1,
    },
  },
  restore: {
    panel: {
      x: [PANEL_CENTER_X, PANEL_END_X, PANEL_END_X],
      opacity: [1, 1, 0],
    },
    baseTextOpacity: 0.18,
    activeText: {
      clipPath: HIDDEN_TEXT_CLIP_LEFT,
      opacity: 0,
    },
  },
} satisfies Record<AnimationPhase, PhaseView>;

const getNextPhase = (phase: AnimationPhase): AnimationPhase => {
  if (phase === "base") return "reveal";
  if (phase === "reveal") return "restore";
  return "base";
};

export {
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
};
