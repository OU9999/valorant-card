import { AnimationPhaseSurface } from "./animation-phase-surface";
import { AnimationStage } from "./animation-stage";
import { BackgroundFrame } from "./background-frame";
import { TestTextLayers } from "./test-text-layers";
import { WipePanel } from "./wipe-panel";
import type { CardRevealAnimationState } from "../types";

interface CardRevealAnimationViewProps {
  animation: CardRevealAnimationState;
}

const CardRevealAnimationView = ({
  animation,
}: CardRevealAnimationViewProps) => (
  <AnimationPhaseSurface
    onAdvance={animation.advancePhase}
    onKeyDown={animation.handleKeyDown}
  >
    <AnimationStage>
      <BackgroundFrame />
      <WipePanel
        animation={animation.phaseView.panel}
        transition={animation.panelTransition}
      />
      <TestTextLayers animation={animation} />
    </AnimationStage>
  </AnimationPhaseSurface>
);

export { CardRevealAnimationView };
