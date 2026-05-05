import type { ReactElement, ReactNode } from "react";

interface AnimationStageProps {
  children: ReactNode;
}

const AnimationStage = ({ children }: AnimationStageProps): ReactElement => {
  return (
    <div className="absolute inset-0 z-50 overflow-hidden">{children}</div>
  );
};

export { AnimationStage };
