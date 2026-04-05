import type { TierDesign } from "@/constants/tier-design";
import { cn } from "@/lib/cn";

interface PlayerNameSectionProps {
  playerName: string;
  design: TierDesign;
  isHighTier: boolean;
  isSm: boolean;
}

const PlayerNameSection = ({
  playerName,
  design,
  isHighTier,
  isSm,
}: PlayerNameSectionProps) => (
  <div
    className={cn(
      "absolute inset-x-0 text-center",
      isSm ? "top-[73%]" : isHighTier ? "top-[65%]" : "top-[68%]",
    )}
  >
    <span
      className={cn(
        "font-bold tracking-widest",
        isSm
          ? "text-[clamp(0.375rem,7cqw,1.75rem)]"
          : "text-[clamp(0.5rem,9.5cqw,2.25rem)]",
        design.playerName,
      )}
    >
      {playerName}
    </span>
  </div>
);

export { PlayerNameSection };
export type { PlayerNameSectionProps };
