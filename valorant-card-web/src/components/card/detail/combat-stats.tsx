import { TacticalFrame } from "./tactical-frame";
import type { CardStat } from "@/lib/valorant/card-stats";

interface CombatStatsProps {
  stats: CardStat[];
  matchCount?: number;
}

const CombatStats = ({ stats, matchCount }: CombatStatsProps) => {
  return (
    <TacticalFrame variant="boast" pattern={0} className="sm:p-8">
      <div className="mb-8 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-8 w-1 bg-primary" />
          <h2 className="text-lg font-bold uppercase tracking-widest text-foreground sm:text-xl">
            Combat Stats
          </h2>
        </div>
        <span className="text-xs uppercase tracking-widest text-muted-foreground">
          Last {matchCount ?? 20} Matches
        </span>
      </div>
      <div className="grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-3">
        {stats.map((stat) => (
          <div key={stat.label} className="flex flex-col">
            <span className="mb-1 text-xs uppercase tracking-tight text-muted-foreground">
              {STAT_LABELS[stat.label] ?? stat.label}
            </span>
            <span className="text-3xl font-black tracking-tight text-foreground sm:text-4xl">
              {stat.value}
            </span>
          </div>
        ))}
      </div>
    </TacticalFrame>
  );
};

const STAT_LABELS: Record<string, string> = {
  ACS: "Combat Score (ACS)",
  "K/D": "K/D Ratio",
  "HS%": "Headshot %",
  "DDΔ": "Dmg Delta (DDΔ)",
  KAST: "KAST (Impact)",
  ADR: "ADR",
};

export { CombatStats };
export type { CombatStatsProps };
