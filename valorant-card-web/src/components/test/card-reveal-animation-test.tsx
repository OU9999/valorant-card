"use client";

import { CardRevealAnimationView } from "./card-reveal-animation-test/_components/card-reveal-animation-view";
import { useCardRevealAnimation } from "./card-reveal-animation-test/_hooks/use-card-reveal-animation";

const CardRevealAnimationTest = () => {
  const animation = useCardRevealAnimation();

  return <CardRevealAnimationView animation={animation} />;
};

export { CardRevealAnimationTest };
