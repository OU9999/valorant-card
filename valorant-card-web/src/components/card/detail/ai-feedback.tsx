import { Terminal } from "lucide-react";
import { cn } from "@/lib/cn";
import type { CardStat } from "@/lib/valorant/card-stats";
import type { FormTrend } from "@/lib/valorant/card-stats";
import type { ReactNode } from "react";

interface AIFeedbackProps {
  stats: CardStat[];
  trend: FormTrend;
}

const TREND_STATUS: Record<FormTrend, { label: string; className: string }> = {
  up: { label: "OPTIMIZED FOR CLIMBING", className: "bg-emerald-400/20 text-emerald-400" },
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
    <div className="rounded-lg border border-primary/20 bg-background p-6">
      <div className="mb-4 flex items-center gap-3">
        <Terminal className="size-4 text-primary" />
        <h3 className="text-sm font-bold uppercase tracking-widest text-primary">
          AI Analysis Report
        </h3>
      </div>
      <div className="space-y-3 font-mono text-sm leading-relaxed text-emerald-400/80">
        <p>&gt; INITIATING BEHAVIORAL DIAGNOSTICS...</p>
        {acs && (
          <p>
            &gt; YOUR AVERAGE COMBAT SCORE IS <V>{acs}</V>. ANALYZING
            ENGAGEMENT PATTERNS...
          </p>
        )}
        {kd && hs && (
          <p>
            &gt; K/D RATIO <V>{kd}</V> WITH <V>{hs}</V> HEADSHOT ACCURACY.
          </p>
        )}
        {dd && (
          <p>
            &gt; DAMAGE DIFFERENTIAL <V>{dd}</V>:{" "}
            {isPositiveDd
              ? "CONSISTENTLY OUT-DAMAGING OPPONENTS."
              : "ADVISORY — IMPROVE TRADE EFFICIENCY."}
          </p>
        )}
        {kast && (
          <p>
            &gt; ROUND IMPACT (KAST): <V>{kast}</V>. TEAM CONTRIBUTION LOGGED.
          </p>
        )}
        <p>
          &gt; STATUS:{" "}
          <span className={cn("px-1", status.className)}>{status.label}</span>
        </p>
        <div className="my-4 h-px w-full bg-primary/10" />
        <p className="text-[10px] text-muted-foreground/40">
          &gt; END OF REPORT. DATA SYNC COMPLETE.
        </p>
      </div>
    </div>
  );
};

export { AIFeedback };
export type { AIFeedbackProps };
