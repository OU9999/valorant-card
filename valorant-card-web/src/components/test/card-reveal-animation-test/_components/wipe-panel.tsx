import { motion } from "motion/react";
import { WIPE_PANEL_STYLE } from "../phase-config";
import type { CardRevealAnimationState } from "../types";

interface WipePanelProps {
  animation: CardRevealAnimationState["phaseView"]["panel"];
  transition: CardRevealAnimationState["panelTransition"];
}

const WipePanel = ({ animation, transition }: WipePanelProps) => (
  <motion.div
    aria-hidden
    animate={{ x: animation.x, opacity: animation.opacity }}
    className="absolute top-0 -left-[34vw] z-20 h-full w-[180vw] bg-[#f3ebdd] shadow-[0_0_120px_rgba(255,255,255,0.12)]"
    initial={false}
    style={WIPE_PANEL_STYLE}
    transition={transition}
  />
);

export { WipePanel };
