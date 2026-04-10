import type { ReactNode } from "react";

interface HeroContentProps {
  children: ReactNode;
}

const HeroContent = ({ children }: HeroContentProps) => {
  return (
    <div className="flex flex-col items-center justify-center px-6 py-20 md:w-[55%] md:py-0">
      <header>
        <h1 className="flex items-center gap-1.5 font-heading text-5xl font-bold tracking-wide uppercase md:text-7xl">
          <span className="text-primary">VALORANT</span>
          <span className="text-foreground">CARD</span>
        </h1>
        <p className="mt-4 text-center text-sm text-muted-foreground md:text-base">
          나만의 발로란트 카드를 만들어보세요
        </p>
      </header>
      {children}
    </div>
  );
};

export { HeroContent };
