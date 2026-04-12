import type { ReactNode } from "react";
import { getTranslations } from "next-intl/server";
import { VMark } from "@/components/brand/v-mark";
import { CMark } from "@/components/brand/c-mark";

interface HeroContentProps {
  children: ReactNode;
}

const HeroContent = async ({ children }: HeroContentProps) => {
  const t = await getTranslations("Home");

  return (
    <div className="flex flex-col items-center justify-center px-6 py-20 md:w-[55%] md:py-0">
      <header>
        <h1
          aria-label="VAL CARD"
          className="flex items-end gap-1.5 font-heading text-5xl font-bold leading-none tracking-wide uppercase md:text-7xl"
        >
          <VMark className="h-[0.806em] w-auto text-primary" />
          <span className="text-primary">AL</span>
          <CMark className="ml-1.5 h-[0.806em] w-auto text-foreground" />
          <span className="text-foreground">ARD</span>
        </h1>
        <p className="mt-4 text-center text-sm text-muted-foreground md:text-base">
          {t("subtitle")}
        </p>
      </header>
      {children}
    </div>
  );
};

export { HeroContent };
