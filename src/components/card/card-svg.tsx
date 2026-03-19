import { CARD_SVG_PATH } from "@/constants/card";

interface CardSvgProps {
  fill?: string;
  stroke?: string;
  strokeWidth?: number;
  className?: string;
}

const CardSvg = ({
  fill = "currentColor",
  stroke,
  strokeWidth = 0.3,
  className,
}: CardSvgProps) => (
  <svg
    viewBox="0 0 100 100"
    preserveAspectRatio="none"
    className={className}
  >
    <path
      d={CARD_SVG_PATH}
      fill={fill}
      stroke={stroke}
      strokeWidth={stroke ? strokeWidth : undefined}
    />
  </svg>
);

export { CardSvg };
export type { CardSvgProps };
