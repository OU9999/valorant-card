import type { ReactNode } from "react";

interface CardDetailLayoutProps {
  children: ReactNode;
}

const CardDetailLayout = ({ children }: CardDetailLayoutProps) => {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center">
      <div className="flex w-full max-w-7xl flex-col items-center gap-8 px-6 lg:flex-row lg:items-start lg:justify-center lg:gap-12">
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
