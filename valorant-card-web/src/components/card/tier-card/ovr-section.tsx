import Image from "next/image";
import type { TierDesign } from "@/constants/tier-design";
import { cn } from "@/lib/cn";
import { getTierIcon } from "@/lib/valorant/tiers";
import type { ClipStyle } from "./types";

interface OvrSectionProps {
  ovr: number;
  region: string;
  weaponIconUrl: string | undefined;
  competitiveTier: number;
  tierName: string;
  design: TierDesign;
  isHighTier: boolean;
  isSm: boolean;
  clipStyle: ClipStyle;
}

const OvrSection = ({
  ovr,
  region,
  weaponIconUrl,
  competitiveTier,
  tierName,
  design,
  isHighTier,
  isSm,
  clipStyle,
}: OvrSectionProps) => (
  <div
    className={cn(
      "absolute inset-0 pointer-events-none",
      !isHighTier && "card-clip",
    )}
    style={clipStyle}
  >
    <div
      className={cn(
        "absolute flex flex-col items-center px-2.5 gap-[clamp(0.0625rem,0.4cqw,0.125rem)]",
        isSm
          ? "left-[7%] top-[12%]"
          : isHighTier
            ? "left-[10%] top-[14%]"
            : "left-[6%] top-[10%]",
      )}
    >
      {/* Gradient bg — mask로 상하 페이드, 텍스트 뒤에 깔림 */}
      <div
        className={cn(
          "absolute inset-0 bg-linear-to-b",
          isSm ? "pb-40" : "pb-96",
          "[mask-image:linear-gradient(to_bottom,transparent,black_30%,black_70%,transparent)]",
          design.ovrGradient,
        )}
      />
      {/* Text — mask 없이 항상 선명 */}
      <span
        className={cn(
          "relative font-extrabold leading-none",
          isSm
            ? "text-[clamp(0.75rem,18cqw,4rem)]"
            : "text-[clamp(1rem,21.2cqw,5rem)]",
          design.ovr,
        )}
      >
        {ovr}
      </span>
      <Image
        src={getTierIcon(competitiveTier)}
        alt={`${tierName} tier icon`}
        width={128}
        height={128}
        className={cn(
          "relative object-contain",
          isSm
            ? "h-[clamp(0.375rem,10cqw,2.25rem)] w-[clamp(0.375rem,10cqw,2.25rem)]"
            : "h-[clamp(0.5rem,12.7cqw,3rem)] w-[clamp(0.5rem,12.7cqw,3rem)]",
          design.iconGlow,
        )}
      />
      <span
        className={cn(
          "relative text-[clamp(0.4375rem,7.5cqw,1.75rem)] font-bold tracking-wider",
          design.position,
        )}
      >
        {region}
      </span>
      {weaponIconUrl && (
        <div
          role="img"
          aria-label="weapon"
          className={cn(
            "relative aspect-[4/1] w-[clamp(0.875rem,17cqw,4rem)] bg-current [mask-size:contain] [mask-repeat:no-repeat] [mask-position:center]",
            design.position,
          )}
          style={{
            maskImage: `url(${weaponIconUrl})`,
          }}
        />
      )}
    </div>
  </div>
);

export { OvrSection };
export type { OvrSectionProps };
