type CardSize = "default" | "sm";
type ClipStyle = { clipPath: string } | undefined;

interface CardStat {
  label: string;
  value: string;
}

export type { CardStat, CardSize, ClipStyle };
