import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

interface HudButtonProps {
  variant?: "primary" | "secondary";
  disabled?: boolean;
  onClick?: () => void;
  children: ReactNode;
}

const HudButton = ({
  variant = "primary",
  disabled,
  onClick,
  children,
}: HudButtonProps) => {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className="group relative cursor-pointer p-1 disabled:cursor-not-allowed disabled:opacity-50"
    >
      <span className="absolute inset-0 border border-foreground/15 transition-colors group-hover:border-foreground/30" />
      <span className="absolute left-0 top-0 h-3 w-8 border-l-2 border-t-2 border-foreground/70 transition-colors group-hover:border-foreground" />
      <span className="absolute right-0 top-0 h-3 w-8 border-r-2 border-t-2 border-foreground/70 transition-colors group-hover:border-foreground" />
      <span className="absolute bottom-0 left-0 h-3 w-8 border-b-2 border-l-2 border-foreground/70 transition-colors group-hover:border-foreground" />
      <span className="absolute bottom-0 right-0 h-3 w-8 border-b-2 border-r-2 border-foreground/70 transition-colors group-hover:border-foreground" />
      <span
        className={cn(
          "relative flex items-center justify-center gap-2 px-4 py-2 text-xs font-bold uppercase tracking-wider",
          variant === "primary"
            ? "bg-primary text-white"
            : "bg-card text-foreground",
        )}
      >
        {children}
      </span>
    </button>
  );
};

export { HudButton };
export type { HudButtonProps };
