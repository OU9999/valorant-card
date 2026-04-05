import type { ReactNode } from "react";

interface CardDetailLayoutProps {
  children: ReactNode;
}

const CardDetailLayout = ({ children }: CardDetailLayoutProps) => {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center bg-background">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_oklch(0.668_0.220_21_/_0.12)_0%,_transparent_60%)]" />
      <div className="relative z-10 flex w-full max-w-7xl flex-col items-center gap-8 px-6 lg:flex-row lg:items-start lg:justify-center lg:gap-12">
        {children}
      </div>
    </div>
  );
};

interface CardSlotProps {
  children: ReactNode;
}

const CardSlot = ({ children }: CardSlotProps) => {
  return (
    <div className="flex shrink-0 justify-center lg:basis-[55%]">
      {children}
    </div>
  );
};

interface DetailSlotProps {
  children: ReactNode;
}

const DetailSlot = ({ children }: DetailSlotProps) => {
  return (
    <div className="flex w-full flex-col gap-4 lg:basis-[45%]">{children}</div>
  );
};

export { CardDetailLayout, CardSlot, DetailSlot };
