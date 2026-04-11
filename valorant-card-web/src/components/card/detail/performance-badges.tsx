"use client";

import { useTranslations } from "next-intl";
import { TacticalFrame } from "./tactical-frame";
import type { Badge } from "@/lib/valorant/badges";

interface PerformanceBadgesProps {
  badges: Badge[];
}

const PerformanceBadges = ({ badges }: PerformanceBadgesProps) => {
  const t = useTranslations("PerformanceBadges");

  return (
    <TacticalFrame variant="roast" pattern={1}>
      <div className="mb-8 flex items-center gap-3">
        <div className="h-8 w-1 bg-[#1A0008]" />
        <h2 className="text-lg font-bold uppercase tracking-widest text-[#1A0008] sm:text-xl">
          {t("title")}
        </h2>
      </div>
      <p className="mt-2 text-xs text-[#6B1525]">{t("comingSoon")}</p>
    </TacticalFrame>
  );
};

export { PerformanceBadges };
export type { PerformanceBadgesProps };
