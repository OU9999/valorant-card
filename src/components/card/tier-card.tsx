import { useId } from "react";
import Image, { type StaticImageData } from "next/image";
import { CARD_SVG_PATH_HIGH_TIER } from "@/constants/card";
import { HIGH_TIER_NAMES, TIER_DESIGNS } from "@/constants/tier-design";
import type { TierName } from "@/constants/tier-design";
import { cn } from "@/lib/cn";
import { getTierIcon } from "@/lib/valorant/tiers";

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
  className,
}: TierCardProps) => {
  const clipId = useId();
  const design = TIER_DESIGNS[tierName];
  const isHighTier = HIGH_TIER_NAMES.has(tierName);
  const clipStyle = isHighTier ? { clipPath: `url(#${clipId})` } : undefined;

  return (
    <div className={cn("relative aspect-2109/3218", className)}>
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
            isHighTier ? "left-[9%] top-[14%]" : "left-[6%] top-[10%]",
          )}
        >
          <span className={cn("text-[clamp(2.5rem,8cqw,5rem)] font-extrabold leading-none", design.ovr)}>
            {ovr}
          </span>
          <span className={cn("text-[clamp(0.875rem,2.8cqw,1.5rem)] font-bold tracking-wider", design.position)}>
            {region}
          </span>
          {weaponIconUrl && (
            <div
              role="img"
              aria-label="weapon"
              className={cn(
                "mt-[clamp(0.25rem,0.8cqw,0.5rem)] aspect-[4/1] w-[clamp(2rem,6cqw,3.5rem)] bg-current [mask-size:contain] [mask-repeat:no-repeat] [mask-position:center]",
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
            isHighTier ? "top-[65%]" : "top-[68%]",
          )}
        >
          <span className={cn("text-[clamp(1rem,3.5cqw,2.25rem)] font-bold uppercase tracking-widest", design.playerName)}>
            {playerName}
          </span>
        </div>

        {/* 스탯: 1행 × 6열 */}
        <div
          className={cn(
            "absolute flex text-center",
            isHighTier
              ? "inset-x-[10%] top-[74%] justify-evenly gap-[clamp(0.5rem,2cqw,1.25rem)]"
              : "inset-x-[6%] top-[76%] justify-between gap-[clamp(0.25rem,1cqw,0.75rem)]",
          )}
        >
          {stats.map((stat) => (
            <div key={stat.label} className="flex flex-col items-center">
              <span className={cn("text-[clamp(0.5rem,1.8cqw,0.875rem)] font-medium tracking-wide", design.statLabel)}>
                {stat.label}
              </span>
              <span className={cn("text-[clamp(0.875rem,3cqw,1.75rem)] font-bold leading-tight", design.statValue)}>
                {stat.value}
              </span>
            </div>
          ))}
        </div>

        {/* 티어 아이콘 */}
        <div
          className={cn(
            "absolute inset-x-0 flex justify-center",
            isHighTier ? "top-[83%]" : "top-[87%]",
          )}
        >
          <Image
            src={getTierIcon(competitiveTier)}
            alt={`${tierName} tier icon`}
            width={512}
            height={512}
            className={cn(
              "h-[clamp(1.5rem,5cqw,3rem)] w-[clamp(1.5rem,5cqw,3rem)] object-contain",
              design.iconGlow,
            )}
          />
        </div>
      </div>
    </div>
  );
};

export { TierCard };
export type { TierCardProps, CardStat };
