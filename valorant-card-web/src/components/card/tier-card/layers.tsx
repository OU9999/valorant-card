import Image, { type StaticImageData } from "next/image";
import { CARD_SVG_PATH_HIGH_TIER } from "@/constants/card";
import type { TierDesign, TierName } from "@/constants/tier-design";
import { cn } from "@/lib/cn";
import type { ClipStyle } from "./types";

/* ------------------------------------------------------------------ */
/*  ClipPathDefs                                                      */
/* ------------------------------------------------------------------ */

interface ClipPathDefsProps {
  clipId: string;
}

const ClipPathDefs = ({ clipId }: ClipPathDefsProps) => (
  <svg className="absolute h-0 w-0">
    <defs>
      <clipPath id={clipId} clipPathUnits="objectBoundingBox">
        <path d={CARD_SVG_PATH_HIGH_TIER} transform="scale(0.01, 0.01)" />
      </clipPath>
    </defs>
  </svg>
);

/* ------------------------------------------------------------------ */
/*  BackgroundLayer                                                   */
/* ------------------------------------------------------------------ */

interface BackgroundLayerProps {
  backgroundImage: StaticImageData;
  tierName: TierName;
  priority: boolean;
}

const BackgroundLayer = ({
  backgroundImage,
  tierName,
  priority,
}: BackgroundLayerProps) => (
  <Image
    src={backgroundImage}
    alt={`${tierName} card background`}
    fill
    priority={priority}
    className="object-contain"
  />
);

/* ------------------------------------------------------------------ */
/*  PortraitLayer                                                     */
/* ------------------------------------------------------------------ */

interface PortraitLayerProps {
  portraitUrl: string;
  isHighTier: boolean;
  clipStyle: ClipStyle;
  priority: boolean;
}

const PortraitLayer = ({
  portraitUrl,
  isHighTier,
  clipStyle,
  priority,
}: PortraitLayerProps) => (
  <Image
    src={portraitUrl}
    alt="agent portrait"
    fill
    sizes="600px"
    priority={priority}
    className={cn(
      "object-cover object-top",
      "card-portrait-fade",
      !isHighTier && "card-clip",
    )}
    style={clipStyle}
  />
);

/* ------------------------------------------------------------------ */
/*  BottomGradientLayer                                               */
/* ------------------------------------------------------------------ */

interface BottomGradientLayerProps {
  design: TierDesign;
  isHighTier: boolean;
  clipStyle: ClipStyle;
}

const BottomGradientLayer = ({
  design,
  isHighTier,
  clipStyle,
}: BottomGradientLayerProps) => (
  <div
    className={cn(
      "absolute inset-x-0 bottom-0 bg-linear-to-t",
      design.gradient,
      isHighTier ? "h-[33%]" : "h-[38%]",
      !isHighTier && "card-clip",
    )}
    style={clipStyle}
  />
);

export {
  ClipPathDefs,
  BackgroundLayer,
  PortraitLayer,
  BottomGradientLayer,
};
