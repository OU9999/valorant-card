import { cn } from "@/lib/cn";
import type { ReactNode } from "react";

interface TacticalFrameProps {
  variant: "boast" | "roast";
  pattern?: 0 | 1 | 2;
  children: ReactNode;
  className?: string;
}

const CLIP_PATH =
  "polygon(0 0, calc(100% - 16px) 0, 100% 16px, 100% 100%, 0 100%)";

const BOAST_BG =
  "#0F1923 linear-gradient(180deg, rgba(255,70,85,0) 0%, rgba(255,70,85,0.4) 100%)";
const ROAST_BG =
  "#FF4655 linear-gradient(180deg, rgba(20,0,5,0) 0%, rgba(20,0,5,0.5) 100%)";

const TICK_PATTERNS = [
  // Pattern 0: 좌 상단쪽, 상 좌측, 하 우측, 우 하단쪽
  { left: "top-[25%]", top: "left-[20%]", bottom: "right-[35%]", right: "bottom-[40%]" },
  // Pattern 1: 좌 중앙, 상 중앙, 하 좌측, 우 상단쪽
  { left: "top-[50%]", top: "left-[45%]", bottom: "left-[15%]", right: "top-[25%]" },
  // Pattern 2: 좌 하단쪽, 상 우측, 하 중앙, 우 중앙
  { left: "top-[70%]", top: "left-[60%]", bottom: "right-[50%]", right: "bottom-[55%]" },
] as const;

const TacticalFrame = ({ variant, pattern = 0, children, className }: TacticalFrameProps) => {
  const isBoast = variant === "boast";
  const borderColor = isBoast ? "rgba(255,70,85,0.3)" : "rgba(26,0,8,0.2)";
  const tickClass = isBoast ? "bg-[#FF4655]/50" : "bg-[#1A0008]/25";
  const ticks = TICK_PATTERNS[pattern];

  return (
    <div style={{ clipPath: CLIP_PATH, background: borderColor }}>
      <div
        className={cn("relative p-6", className)}
        style={{
          clipPath: CLIP_PATH,
          margin: "1px",
          background: isBoast ? BOAST_BG : ROAST_BG,
        }}
      >
        {/* Tick marks — thicker border segments */}
        <div className={cn("absolute left-0 h-8 w-[2px]", ticks.left, tickClass)} />
        <div className={cn("absolute top-0 h-[2px] w-10", ticks.top, tickClass)} />
        <div className={cn("absolute bottom-0 h-[2px] w-10", ticks.bottom, tickClass)} />
        <div className={cn("absolute right-0 h-8 w-[2px]", ticks.right, tickClass)} />

        {children}
      </div>
    </div>
  );
};

export { TacticalFrame };
export type { TacticalFrameProps };
