import type { KeyboardEventHandler, ReactElement, ReactNode } from "react";

interface AnimationPhaseSurfaceProps {
  children: ReactNode;
  onAdvance: () => void;
  onKeyDown: KeyboardEventHandler<HTMLElement>;
}

const AnimationPhaseSurface = ({
  children,
  onAdvance,
  onKeyDown,
}: AnimationPhaseSurfaceProps): ReactElement => {
  return (
    <section
      role="button"
      tabIndex={0}
      aria-label="Advance animation phase"
      className="relative -mt-16 min-h-screen cursor-pointer overflow-hidden bg-[#0d1722]"
      onClick={onAdvance}
      onKeyDown={onKeyDown}
    >
      {children}
    </section>
  );
};

export { AnimationPhaseSurface };
