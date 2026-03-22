import { useId } from "react";
import Image, { type StaticImageData } from "next/image";
import { CARD_SVG_PATH_HIGH_TIER } from "@/constants/card";
import { HIGH_TIER_NAMES, TIER_DESIGNS } from "@/constants/tier-design";
import type { TierName } from "@/constants/tier-design";
import { cn } from "@/lib/cn";
import { getTierIcon } from "@/lib/valorant/tiers";

type CardSize = "default" | "sm";

interface CardStat {
  label: string;
  value: string;
}

interface TierCardProps {
  tierName: TierName;
  competitiveTier: number;
  backgroundImage: StaticImageData;
  portraitUrl: string;
  ovr: number;
  playerName: string;
  region?: string;
  weaponIconUrl?: string;
  stats: CardStat[];
  size?: CardSize;
  className?: string;
}

const TierCard = ({
  tierName,
  competitiveTier,
  backgroundImage,
  portraitUrl,
  ovr,
  playerName,
  region = "AP",
  weaponIconUrl,
  stats,
  size = "default",
  className,
}: TierCardProps) => {
  const clipId = useId();
  const design = TIER_DESIGNS[tierName];
  const isHighTier = HIGH_TIER_NAMES.has(tierName);
  const clipStyle = isHighTier ? { clipPath: `url(#${clipId})` } : undefined;
  const isSm = size === "sm";

  return (
    <div className={cn("@container relative overflow-hidden aspect-2109/3218", className)}>
      {/* SVG clipPath 정의 (상위 티어 전용) */}
      {isHighTier && (
        <svg className="absolute h-0 w-0">
          <defs>
            <clipPath id={clipId} clipPathUnits="objectBoundingBox">
              <path d={CARD_SVG_PATH_HIGH_TIER} transform="scale(0.01, 0.01)" />
            </clipPath>
          </defs>
        </svg>
      )}

      {/* Layer 1: Card background */}
      <Image
        src={backgroundImage}
        alt={`${tierName} card background`}
        fill
        className="object-contain"
      />

      {/* Layer 2: Agent portrait (clipped + faded) */}
      <Image
        src={portraitUrl}
        alt="agent portrait"
        fill
        sizes="600px"
        className={cn(
          "object-cover object-top",
          "card-portrait-fade",
          !isHighTier && "card-clip",
        )}
        style={clipStyle}
      />

      {/* Layer 3: Bottom gradient (clipped) */}
      <div
        className={cn(
          "absolute inset-x-0 bottom-0 bg-linear-to-t",
          design.gradient,
          isHighTier ? "h-[33%]" : "h-[38%]",
          !isHighTier && "card-clip",
        )}
        style={clipStyle}
      />

      {/* Layer 4: Text content */}
      <div className="absolute inset-0">
        {/* OVR 영역 */}
        <div
          className={cn(
            "absolute flex flex-col items-center",
            isSm
              ? "left-[7%] top-[12%]"
              : (isHighTier ? "left-[9%] top-[14%]" : "left-[6%] top-[10%]"),
          )}
        >
          <span className={cn(
            "font-extrabold leading-none",
            isSm ? "text-[clamp(0.75rem,18cqw,4rem)]" : "text-[clamp(1rem,21.2cqw,5rem)]",
            design.ovr,
          )}>
            {ovr}
          </span>
          {!isSm && (
            <span className={cn(
              "text-[clamp(0.375rem,6.4cqw,1.5rem)] font-bold tracking-wider",
              design.position,
            )}>
              {region}
            </span>
          )}
          {!isSm && weaponIconUrl && (
            <div
              role="img"
              aria-label="weapon"
              className={cn(
                "mt-[clamp(0.125rem,2.1cqw,0.5rem)] aspect-[4/1] w-[clamp(0.75rem,14.9cqw,3.5rem)] bg-current [mask-size:contain] [mask-repeat:no-repeat] [mask-position:center]",
                design.position,
              )}
              style={{
                maskImage: `url(${weaponIconUrl})`,
              }}
            />
          )}
        </div>

        {/* 플레이어 이름 */}
        <div
          className={cn(
            "absolute inset-x-0 text-center",
            isSm
              ? "top-[73%]"
              : (isHighTier ? "top-[65%]" : "top-[68%]"),
          )}
        >
          <span className={cn(
            "font-bold uppercase tracking-widest",
            isSm ? "text-[clamp(0.375rem,7cqw,1.75rem)]" : "text-[clamp(0.5rem,9.5cqw,2.25rem)]",
            design.playerName,
          )}>
            {playerName}
          </span>
        </div>

        {/* 스탯: default only */}
        {!isSm && (
          <div
            className={cn(
              "absolute flex text-center",
              isHighTier
                ? "inset-x-[10%] top-[74%] justify-evenly gap-[clamp(0.25rem,5.3cqw,1.25rem)]"
                : "inset-x-[6%] top-[76%] justify-between gap-[clamp(0.125rem,3.2cqw,0.75rem)]",
            )}
          >
            {stats.map((stat) => (
              <div key={stat.label} className="flex flex-col items-center">
                <span className={cn("text-[clamp(0.25rem,3.7cqw,0.875rem)] font-medium tracking-wide", design.statLabel)}>
                  {stat.label}
                </span>
                <span className={cn("text-[clamp(0.375rem,7.4cqw,1.75rem)] font-bold leading-tight", design.statValue)}>
                  {stat.value}
                </span>
              </div>
            ))}
          </div>
        )}

        {/* 티어 아이콘 */}
        <div
          className={cn(
            "absolute inset-x-0 flex justify-center",
            isSm
              ? "top-[83%]"
              : (isHighTier ? "top-[83%]" : "top-[87%]"),
          )}
        >
          <Image
            src={getTierIcon(competitiveTier)}
            alt={`${tierName} tier icon`}
            width={512}
            height={512}
            className={cn(
              "object-contain",
              isSm
                ? "h-[clamp(0.375rem,10cqw,2.25rem)] w-[clamp(0.375rem,10cqw,2.25rem)]"
                : "h-[clamp(0.5rem,12.7cqw,3rem)] w-[clamp(0.5rem,12.7cqw,3rem)]",
              design.iconGlow,
            )}
          />
        </div>
      </div>
    </div>
  );
};

export { TierCard };
export type { TierCardProps, CardStat, CardSize };
