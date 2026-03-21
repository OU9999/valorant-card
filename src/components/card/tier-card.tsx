import { useId } from "react";
import Image, { type StaticImageData } from "next/image";
import { CARD_SVG_PATH_HIGH_TIER } from "@/constants/card";
import { cn } from "@/lib/cn";

const HIGH_TIER_NAMES = new Set(["Ascendant", "Immortal", "Radiant"]);

interface CardStat {
  label: string;
  value: number;
}

interface TierCardProps {
  tierName: string;
  backgroundImage: StaticImageData;
  portraitUrl: string;
  ovr: number;
  playerName: string;
  position?: string;
  stats: CardStat[];
  className?: string;
}

const TierCard = ({
  tierName,
  backgroundImage,
  portraitUrl,
  ovr,
  playerName,
  position = "DLT",
  stats,
  className,
}: TierCardProps) => {
  const clipId = useId();
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
          isHighTier ? "card-portrait-fade-high" : "card-portrait-fade",
          !isHighTier && "card-clip",
        )}
        style={clipStyle}
      />

      {/* Layer 3: Bottom gradient (clipped) */}
      <div
        className={cn(
          "absolute inset-x-0 bottom-0 bg-linear-to-t from-black/80 via-black/40 to-transparent",
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
          <span className="text-[clamp(2.5rem,8cqw,5rem)] font-extrabold leading-none text-white drop-shadow-lg">
            {ovr}
          </span>
          <span className="text-[clamp(0.625rem,2cqw,1.125rem)] font-bold tracking-wider text-white/90">
            {position}
          </span>
          <div className="mt-[clamp(0.25rem,0.8cqw,0.5rem)] flex flex-col items-center gap-[clamp(0.125rem,0.5cqw,0.375rem)]">
            <div className="h-[clamp(0.75rem,2.5cqw,1.5rem)] w-[clamp(1rem,3.5cqw,2rem)] rounded-sm bg-white/20" />
            <div className="h-[clamp(0.875rem,3cqw,1.75rem)] w-[clamp(0.875rem,3cqw,1.75rem)] rounded-full bg-white/20" />
          </div>
        </div>

        {/* 플레이어 이름 */}
        <div
          className={cn(
            "absolute inset-x-0 text-center",
            isHighTier ? "top-[68%]" : "top-[70%]",
          )}
        >
          <span className="text-[clamp(1rem,3.5cqw,2.25rem)] font-bold uppercase tracking-widest text-white drop-shadow-lg">
            {playerName}
          </span>
        </div>

        {/* 스탯: 1행 × 6열 */}
        <div
          className={cn(
            "absolute flex text-center",
            isHighTier
              ? "inset-x-[10%] top-[77%] justify-evenly gap-[clamp(0.375rem,1.5cqw,1rem)]"
              : "inset-x-[6%] top-[78%] justify-between",
          )}
        >
          {stats.map((stat) => (
            <div key={stat.label} className="flex flex-col items-center">
              <span className="text-[clamp(0.5rem,1.8cqw,0.875rem)] font-medium tracking-wide text-white/60">
                {stat.label}
              </span>
              <span className="text-[clamp(1rem,3.5cqw,2rem)] font-bold leading-tight text-white">
                {stat.value}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export { TierCard, HIGH_TIER_NAMES };
export type { TierCardProps, CardStat };
