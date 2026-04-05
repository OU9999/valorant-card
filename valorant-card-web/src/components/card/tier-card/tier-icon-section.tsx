import Image from "next/image";
import type { TierDesign, TierName } from "@/constants/tier-design";
import { cn } from "@/lib/cn";
import { getTierIcon } from "@/lib/valorant/tiers";

interface TierIconSectionProps {
  tierName: TierName;
  competitiveTier: number;
  design: TierDesign;
  isHighTier: boolean;
  isSm: boolean;
  priority: boolean;
}

const TierIconSection = ({
  tierName,
  competitiveTier,
  design,
  isHighTier,
  isSm,
  priority,
}: TierIconSectionProps) => (
  <div
    className={cn(
      "absolute inset-x-0 flex justify-center",
      isSm ? "top-[83%]" : isHighTier ? "top-[83%]" : "top-[87%]",
    )}
  >
    <Image
      src={getTierIcon(competitiveTier)}
      alt={`${tierName} tier icon`}
      width={512}
      height={512}
      priority={priority}
      className={cn(
        "object-contain",
        isSm
          ? "h-[clamp(0.375rem,10cqw,2.25rem)] w-[clamp(0.375rem,10cqw,2.25rem)]"
          : "h-[clamp(0.5rem,12.7cqw,3rem)] w-[clamp(0.5rem,12.7cqw,3rem)]",
        design.iconGlow,
      )}
    />
  </div>
);

export { TierIconSection };
export type { TierIconSectionProps };
