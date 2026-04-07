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
  "#0F1923 linear-gradient(180deg, rgba(255,70,85,0) 60%, rgba(255,70,85,0.4) 100%)";
const ROAST_BG =
  "#FF4655 linear-gradient(180deg, rgba(20,0,5,0) 60%, rgba(20,0,5,0.5) 100%)";

const TICK_PATTERNS = [
  { left: "top-[25%]", top: "left-[20%]", bottom: "right-[35%]", right: "bottom-[40%]" },
  { left: "top-[50%]", top: "left-[45%]", bottom: "left-[15%]", right: "top-[25%]" },
  { left: "top-[70%]", top: "left-[60%]", bottom: "right-[50%]", right: "bottom-[55%]" },
] as const;

const TacticalFrame = ({ variant, pattern = 0, children, className }: TacticalFrameProps) => {
  const isBoast = variant === "boast";
  const borderColor = isBoast ? "rgba(255,70,85,0.3)" : "#1A0008";
  const tickClass = isBoast ? "bg-[rgba(255,70,85,0.3)]" : "bg-[#1A0008]";
  const ticks = TICK_PATTERNS[pattern];

  return (
    <div className="relative" style={{ clipPath: CLIP_PATH, background: borderColor }}>
      {/* Tick marks — thicker border segments */}
      <div className={cn("absolute z-10 left-0 h-8 w-1", ticks.left, tickClass)} />
      <div className={cn("absolute z-10 top-0 h-1 w-10", ticks.top, tickClass)} />
      <div className={cn("absolute z-10 bottom-0 h-1 w-10", ticks.bottom, tickClass)} />
      <div className={cn("absolute z-10 right-0 h-8 w-1", ticks.right, tickClass)} />

      {/* Content */}
      <div
        className={cn("relative p-6", className)}
        style={{
          clipPath: CLIP_PATH,
          margin: "2px",
          background: isBoast ? BOAST_BG : ROAST_BG,
        }}
      >
        {children}
      </div>
    </div>
  );
};

export { TacticalFrame };
export type { TacticalFrameProps };
