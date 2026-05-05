"use client";

import type { ReactElement } from "react";
import { CardRevealAnimationView } from "./card-reveal-animation-test/_components/card-reveal-animation-view";
import { useCardRevealAnimation } from "./card-reveal-animation-test/_hooks/use-card-reveal-animation";

const CardRevealAnimationTest = (): ReactElement => {
  const animation = useCardRevealAnimation();

  return <CardRevealAnimationView animation={animation} />;
};

export { CardRevealAnimationTest };
