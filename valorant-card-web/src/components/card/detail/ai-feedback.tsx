"use client";

import { useTranslations } from "next-intl";
import { cn } from "@/lib/cn";
import { TacticalFrame } from "./tactical-frame";
import type { CardStat } from "@/lib/valorant/card-stats";
import type { FormTrend } from "@/lib/valorant/card-stats";
import type { ReactNode } from "react";

interface AIFeedbackProps {
  stats: CardStat[];
  trend: FormTrend;
}

const TREND_KEYS: Record<FormTrend, string> = {
  up: "trendUp",
  stable: "trendStable",
  down: "trendDown",
};

const TREND_STYLES: Record<FormTrend, string> = {
  up: "bg-white/10 text-white",
  stable: "bg-muted text-muted-foreground",
  down: "bg-primary/20 text-primary",
};

const V = ({ children }: { children: ReactNode }) => (
  <span className="font-bold text-foreground">{children}</span>
);

const findStat = (stats: CardStat[], label: string): string | undefined =>
  stats.find((s) => s.label === label)?.value;

const AIFeedback = ({ stats, trend }: AIFeedbackProps) => {
  const t = useTranslations("AIAnalysis");
  const trendStyle = TREND_STYLES[trend];
  const acs = findStat(stats, "ACS");
  const kd = findStat(stats, "K/D");
  const hs = findStat(stats, "HS%");
  const dd = findStat(stats, "DDΔ");
  const kast = findStat(stats, "KAST");
  const isPositiveDd = dd?.startsWith("+");

  return (
    <TacticalFrame variant="boast" pattern={2}>
      <div className="mb-8 flex items-center gap-3">
        <div className="h-8 w-1 bg-primary" />
        <h2 className="text-lg font-bold uppercase tracking-widest text-foreground sm:text-xl">
          {t("title")}
        </h2>
      </div>
      <div className="space-y-3 text-sm leading-relaxed text-muted-foreground">
        {acs && (
          <p>
            {t.rich("avgCombatScore", {
              acs,
              v: (chunks) => <V>{chunks}</V>,
            })}
          </p>
        )}
        {kd && hs && (
          <p>
            {t.rich("kdAndHs", {
              kd,
              hs,
              v: (chunks) => <V>{chunks}</V>,
            })}
          </p>
        )}
        {dd && (
          <p>
            {t.rich("damageDelta", {
              dd,
              v: (chunks) => <V>{chunks}</V>,
            })}{" "}
            {isPositiveDd ? t("positiveDd") : t("negativeDd")}
          </p>
        )}
        {kast && (
          <p>
            {t.rich("kast", {
              kast,
              v: (chunks) => <V>{chunks}</V>,
            })}
          </p>
        )}
        <p>
          {t("currentStatus")}{" "}
          <span className={cn("rounded px-1.5 py-0.5 text-xs font-bold", trendStyle)}>
            {t(TREND_KEYS[trend])}
          </span>
        </p>
      </div>
    </TacticalFrame>
  );
};

export { AIFeedback };
export type { AIFeedbackProps };
