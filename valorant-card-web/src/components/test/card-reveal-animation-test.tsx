"use client";

import type { CSSProperties } from "react";
import { useState } from "react";
import { RotateCcw } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";

const DURATION_MS = 2300;
const REDUCED_DURATION_MS = 900;
const PHASES = [0, 0.109, 0.348, 0.565, 0.826, 1];

const HUD_BACKGROUND_STYLE = {
  backgroundImage: [
    "radial-gradient(circle at 50% 42%, rgba(255, 70, 85, 0.18), transparent 34%)",
    "linear-gradient(rgba(255, 70, 85, 0.12) 1px, transparent 1px)",
    "linear-gradient(90deg, rgba(255, 70, 85, 0.08) 1px, transparent 1px)",
    "linear-gradient(135deg, transparent 0 48%, rgba(255, 255, 255, 0.04) 48% 49%, transparent 49% 100%)",
  ].join(", "),
  backgroundSize: "100% 100%, 56px 56px, 56px 56px, 180px 180px",
} satisfies CSSProperties;

const WIPE_PANEL_STYLE = {
  clipPath: "polygon(18% 0, 100% 0, 82% 100%, 0 100%)",
} satisfies CSSProperties;

const TEXT_CLIP_KEYFRAMES = [
  "polygon(126% 0, 126% 0, 108% 100%, 108% 100%)",
  "polygon(126% 0, 126% 0, 108% 100%, 108% 100%)",
  "polygon(-18% 0, 126% 0, 108% 100%, -36% 100%)",
  "polygon(-18% 0, 126% 0, 108% 100%, -36% 100%)",
  "polygon(-126% 0, -18% 0, -36% 100%, -144% 100%)",
  "polygon(-126% 0, -18% 0, -36% 100%, -144% 100%)",
];

const REDUCED_TEXT_CLIP_KEYFRAMES = [
  "inset(0 0 0 0)",
  "inset(0 0 0 0)",
  "inset(0 0 0 0)",
  "inset(0 0 0 0)",
  "inset(0 0 0 0)",
  "inset(0 0 0 0)",
];

const HudFrame = () => (
  <div aria-hidden className="absolute inset-0">
    <div className="absolute inset-0 opacity-80" style={HUD_BACKGROUND_STYLE} />
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(4,9,15,0.18)_48%,rgba(4,9,15,0.72)_100%)]" />
    <div className="absolute top-[12vh] right-[6vw] left-[6vw] h-px bg-primary/50" />
    <div className="absolute right-[10vw] bottom-[12vh] left-[10vw] h-px bg-primary/35" />
    <div className="absolute right-[12vw] bottom-[18vh] h-px w-[22vw] bg-primary/75" />
    <div className="absolute top-[18vh] left-[8vw] h-px w-[18vw] bg-primary/70" />
    <div className="absolute top-[18vh] right-[8vw] h-[18vh] w-px bg-primary/45" />
    <div className="absolute bottom-[20vh] left-[12vw] h-[12vh] w-px bg-primary/45" />
    <div className="absolute top-6 left-6 h-14 w-28 border-t-2 border-l-2 border-primary/80 sm:top-10 sm:left-10" />
    <div className="absolute top-6 right-6 h-14 w-28 border-t-2 border-r-2 border-primary/70 sm:top-10 sm:right-10" />
    <div className="absolute bottom-6 left-6 h-14 w-28 border-b-2 border-l-2 border-primary/55 sm:bottom-10 sm:left-10" />
    <div className="absolute right-6 bottom-6 h-14 w-28 border-r-2 border-b-2 border-primary/70 sm:right-10 sm:bottom-10" />
  </div>
);

const BrightPanelLines = () => (
  <div aria-hidden className="absolute inset-0">
    <div className="absolute top-[14vh] right-[14vw] left-[15vw] h-px bg-primary/75" />
    <div className="absolute right-[18vw] bottom-[14vh] left-[20vw] h-px bg-primary/55" />
    <div className="absolute top-[22vh] right-[16vw] h-[18vh] w-px bg-primary/60" />
    <div className="absolute bottom-[22vh] left-[18vw] h-[15vh] w-px bg-primary/50" />
    <div className="absolute top-[20vh] left-[19vw] h-px w-[18vw] bg-primary/70" />
    <div className="absolute right-[24vw] bottom-[22vh] h-px w-[16vw] bg-primary/70" />
  </div>
);

const CardRevealAnimationTest = () => {
  const [runId, setRunId] = useState(0);
  const reducedMotion = useReducedMotion();
  const shouldReduceMotion = reducedMotion === true;
  const durationMs = shouldReduceMotion ? REDUCED_DURATION_MS : DURATION_MS;
  const duration = durationMs / 1000;

  const panelX = shouldReduceMotion
    ? ["0vw", "0vw", "0vw", "0vw", "0vw", "0vw"]
    : ["118vw", "118vw", "0vw", "0vw", "-118vw", "-118vw"];
  const panelOpacity = shouldReduceMotion
    ? [0, 0, 0.92, 0.92, 0, 0]
    : [0, 1, 1, 1, 1, 0];
  const textClip = shouldReduceMotion
    ? REDUCED_TEXT_CLIP_KEYFRAMES
    : TEXT_CLIP_KEYFRAMES;
  const baseTextOpacity = shouldReduceMotion
    ? [0.08, 0.08, 0.16, 0.16, 0.2, 0.2]
    : [0.03, 0.06, 0.12, 0.08, 0.18, 0.18];

  return (
    <section className="relative -mt-16 min-h-screen overflow-hidden bg-[#0d1722]">
      <div key={runId} className="absolute inset-0 z-50 overflow-hidden">
        <HudFrame />

        <motion.div
          aria-hidden
          animate={{
            opacity: panelOpacity,
            x: panelX,
          }}
          className="absolute top-0 -left-[18vw] z-20 h-full w-[136vw] bg-[#f3ebdd] shadow-[0_0_120px_rgba(255,70,85,0.18)]"
          initial={{ opacity: 0, x: shouldReduceMotion ? "0vw" : "118vw" }}
          style={WIPE_PANEL_STYLE}
          transition={{ duration, ease: "easeInOut", times: PHASES }}
        >
          <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,70,85,0.08)_0_1px,transparent_1px_100%)] bg-[length:160px_160px]" />
          <BrightPanelLines />
        </motion.div>

        <div className="absolute inset-0 z-30 flex items-center justify-center">
          <motion.h1
            animate={{ opacity: baseTextOpacity }}
            className="font-heading text-[clamp(5rem,19vw,17rem)] font-extrabold tracking-normal text-[#d8d3ca]"
            initial={{ opacity: 0.03 }}
            transition={{ duration, ease: "easeInOut", times: PHASES }}
          >
            TEST
          </motion.h1>
        </div>

        <motion.div
          aria-hidden
          animate={{
            clipPath: textClip,
            opacity: [0, 0, 0.45, 1, 0.95, 0],
          }}
          className="absolute inset-0 z-40 flex items-center justify-center"
          initial={{ clipPath: textClip[0], opacity: 0 }}
          transition={{ duration, ease: "easeInOut", times: PHASES }}
        >
          <h1 className="font-heading text-[clamp(5rem,19vw,17rem)] font-extrabold tracking-normal text-primary">
            TEST
          </h1>
        </motion.div>

        <motion.div
          aria-hidden
          animate={{
            opacity: [0, 0, 0, 0, 0.25, 0.55],
            scale: [0.98, 0.98, 0.98, 0.98, 0.99, 1],
            y: [18, 18, 18, 18, 10, 0],
          }}
          className="absolute bottom-[8vh] left-1/2 z-30 h-[min(22vh,180px)] w-[min(70vw,440px)] -translate-x-1/2 border border-primary/35 bg-[#0d1722]/35 shadow-[0_0_40px_rgba(255,70,85,0.08)]"
          initial={{ opacity: 0, scale: 0.98, y: 18 }}
          transition={{ duration, ease: "easeOut", times: PHASES }}
        >
          <div className="absolute top-0 left-0 h-8 w-16 border-t-2 border-l-2 border-primary/70" />
          <div className="absolute top-0 right-0 h-8 w-16 border-t-2 border-r-2 border-primary/70" />
          <div className="absolute bottom-0 left-0 h-8 w-16 border-b-2 border-l-2 border-primary/70" />
          <div className="absolute right-0 bottom-0 h-8 w-16 border-r-2 border-b-2 border-primary/70" />
        </motion.div>
      </div>

      <div className="absolute top-4 right-4 z-[70] sm:top-6 sm:right-6">
        <button
          type="button"
          aria-label="Replay animation"
          className="flex size-11 cursor-pointer items-center justify-center border border-white/15 bg-[#0d1722]/80 text-white backdrop-blur-md transition-colors hover:border-primary/80 hover:text-primary"
          title="Replay animation"
          onClick={() => setRunId((current) => current + 1)}
        >
          <RotateCcw className="size-4" />
        </button>
      </div>
    </section>
  );
};

export { CardRevealAnimationTest };
