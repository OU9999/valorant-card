import { motion } from "motion/react";
import { cn } from "@/lib/cn";
import type { CardRevealAnimationState } from "../types";

interface TestTextLayersProps {
  animation: CardRevealAnimationState;
}

const TEST_TEXT_CLASS =
  "font-heading text-[clamp(5rem,19vw,17rem)] font-extrabold tracking-normal";

const TestTextLayers = ({ animation }: TestTextLayersProps) => (
  <>
    <div className="absolute inset-0 z-30 flex items-center justify-center">
      <motion.h1
        animate={{ opacity: animation.phaseView.baseTextOpacity }}
        className={cn(TEST_TEXT_CLASS, "text-[#d8d3ca]")}
        initial={false}
        transition={animation.baseTextTransition}
      >
        TEST
      </motion.h1>
    </div>

    <motion.div
      aria-hidden
      animate={{
        clipPath: animation.phaseView.activeText.clipPath,
        opacity: animation.phaseView.activeText.opacity,
      }}
      className="absolute inset-0 z-40 flex items-center justify-center"
      initial={false}
      transition={animation.activeTextTransition}
    >
      <motion.h1
        key={animation.phase}
        animate={animation.blinkAnimation}
        className={cn(TEST_TEXT_CLASS, "text-primary")}
        initial={{ opacity: 0 }}
        transition={animation.blinkTransition}
      >
        TEST
      </motion.h1>
    </motion.div>
  </>
);

export { TestTextLayers };
