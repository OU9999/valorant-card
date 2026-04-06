import type { TierDesign } from "@/constants/tier-design";
import { cn } from "@/lib/cn";
import type { CardStat } from "./types";

interface StatsSectionProps {
  stats: CardStat[];
  design: TierDesign;
  isHighTier: boolean;
  isSm: boolean;
}

const StatsSection = ({ stats, design, isHighTier, isSm }: StatsSectionProps) => (
  <div
    className={cn(
      "absolute flex text-center",
      isSm
        ? cn(
            "inset-x-[8%] justify-evenly gap-[clamp(0.125rem,2.5cqw,0.5rem)]",
            isHighTier ? "top-[77.5%]" : "top-[79%]",
          )
        : isHighTier
          ? "inset-x-[10%] top-[74%] justify-evenly gap-[clamp(0.25rem,5.3cqw,1.25rem)]"
          : "inset-x-[6%] top-[76%] justify-between gap-[clamp(0.125rem,3.2cqw,0.75rem)]",
    )}
  >
    {stats.map((stat) => (
      <div key={stat.label} className="flex flex-col items-center">
        <span
          className={cn(
            isSm
              ? "text-[clamp(0.125rem,2.8cqw,0.625rem)]"
              : "text-[clamp(0.25rem,3.7cqw,0.875rem)]",
            "font-medium tracking-wide",
            design.statLabel,
          )}
        >
          {stat.label}
        </span>
        <span
          className={cn(
            isSm
              ? "text-[clamp(0.25rem,5.5cqw,1.25rem)]"
              : "text-[clamp(0.375rem,7.4cqw,1.75rem)]",
            "font-bold leading-tight",
            design.statValue,
          )}
        >
          {stat.value}
        </span>
      </div>
    ))}
  </div>
);

export { StatsSection };
export type { StatsSectionProps };
