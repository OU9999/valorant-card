import { useId } from "react";
import Image, { type StaticImageData } from "next/image";
import { CARD_SVG_PATH_HIGH_TIER } from "@/constants/card";

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
  stats: CardStat[];
  className?: string;
}

const TierCard = ({
  tierName,
  backgroundImage,
  portraitUrl,
  ovr,
  playerName,
  stats,
  className = "",
}: TierCardProps) => {
  const clipId = useId();
  const isHighTier = HIGH_TIER_NAMES.has(tierName);
  const clipStyle = isHighTier
    ? { clipPath: `url(#${clipId})` }
    : undefined;
  const clipClass = isHighTier ? "" : "card-clip";

  return (
    <div className={`relative aspect-2109/3218 ${className}`}>
      {/* SVG clipPath 정의 (상위 티어 전용) */}
      {isHighTier && (
        <svg className="absolute h-0 w-0">
          <defs>
            <clipPath id={clipId} clipPathUnits="objectBoundingBox">
              <path
                d={CARD_SVG_PATH_HIGH_TIER}
                transform="scale(0.01, 0.01)"
              />
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
        className={`object-cover object-top card-portrait-fade ${clipClass}`}
        style={clipStyle}
      />

      {/* Layer 3: Bottom gradient (clipped) */}
      <div
        className={`absolute inset-x-0 bottom-0 h-[45%] bg-linear-to-t from-black/80 via-black/40 to-transparent ${clipClass}`}
        style={clipStyle}
      />

      {/* Layer 4: Text content */}
      <div className="absolute inset-0">
        <div className="absolute left-[12%] top-[12%]">
          <span className="text-[clamp(1.5rem,5cqw,3.5rem)] font-bold text-white drop-shadow-lg">
            {ovr}
          </span>
        </div>

        <div className="absolute inset-x-0 top-[62%] text-center">
          <span className="text-[clamp(0.75rem,2.5cqw,1.5rem)] font-semibold text-white drop-shadow-lg">
            {playerName}
          </span>
        </div>

        <div className="absolute inset-x-[15%] top-[70%] grid grid-cols-2 gap-x-[clamp(0.5rem,2cqw,1.5rem)] gap-y-[clamp(0.125rem,0.5cqw,0.25rem)] text-[clamp(0.625rem,2cqw,1rem)] text-white">
          {stats.map((stat) => (
            <div key={stat.label} className="flex justify-between">
              <span className="text-white/70">{stat.label}</span>
              <span className="font-bold">{stat.value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export { TierCard, HIGH_TIER_NAMES };
export type { TierCardProps, CardStat };
