import { cn } from "@/lib/cn";
import { TacticalFrame } from "./tactical-frame";
import type { CardStat } from "@/lib/valorant/card-stats";
import type { FormTrend } from "@/lib/valorant/card-stats";
import type { ReactNode } from "react";

interface AIFeedbackProps {
  stats: CardStat[];
  trend: FormTrend;
}

const TREND_STATUS: Record<FormTrend, { label: string; className: string }> = {
  up: { label: "OPTIMIZED FOR CLIMBING", className: "bg-white/10 text-white" },
  stable: { label: "HOLDING STEADY", className: "bg-muted text-muted-foreground" },
  down: { label: "PERFORMANCE DECLINING", className: "bg-primary/20 text-primary" },
};

const V = ({ children }: { children: ReactNode }) => (
  <span className="font-bold text-foreground">{children}</span>
);

const findStat = (stats: CardStat[], label: string): string | undefined =>
  stats.find((s) => s.label === label)?.value;

const AIFeedback = ({ stats, trend }: AIFeedbackProps) => {
  const status = TREND_STATUS[trend];
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
          AI Analysis Report
        </h2>
      </div>
      <div className="space-y-3 text-sm leading-relaxed text-muted-foreground">
        {acs && (
          <p>
            평균 전투 점수는 <V>{acs}</V>입니다.
          </p>
        )}
        {kd && hs && (
          <p>
            K/D <V>{kd}</V>, 헤드샷 정확도 <V>{hs}</V>.
          </p>
        )}
        {dd && (
          <p>
            데미지 차이 <V>{dd}</V> —{" "}
            {isPositiveDd
              ? "상대보다 꾸준히 높은 딜량을 기록하고 있습니다."
              : "트레이드 효율 개선이 필요합니다."}
          </p>
        )}
        {kast && (
          <p>
            라운드 기여도(KAST) <V>{kast}</V>.
          </p>
        )}
        <p>
          현재 상태:{" "}
          <span className={cn("rounded px-1.5 py-0.5 text-xs font-bold", status.className)}>
            {status.label}
          </span>
        </p>
      </div>
    </TacticalFrame>
  );
};

export { AIFeedback };
export type { AIFeedbackProps };
