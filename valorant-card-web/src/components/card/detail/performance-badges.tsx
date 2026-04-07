import { Zap, Shield, Crosshair, Crown, Flame, Swords, Trophy } from "lucide-react";
import { cn } from "@/lib/cn";
import { BADGE_DEFS } from "@/lib/valorant/badges";
import { TacticalFrame } from "./tactical-frame";
import type { Badge, BadgeId } from "@/lib/valorant/badges";
import type { ComponentType } from "react";

interface PerformanceBadgesProps {
  badges: Badge[];
}

const BADGE_ICONS: Record<BadgeId, ComponentType<{ className?: string }>> = {
  ace_hunter: Zap,
  ironwall: Shield,
  sharpshooter: Crosshair,
  clutch_king: Crown,
  undefeated: Flame,
  one_trick: Swords,
};

const ALL_BADGE_IDS = Object.keys(BADGE_DEFS) as BadgeId[];

const PerformanceBadges = ({ badges }: PerformanceBadgesProps) => {
  const earnedIds = new Set(badges.map((b) => b.id));

  return (
    <TacticalFrame variant="roast" pattern={1}>
      <div className="mb-5 flex items-center gap-3">
        <Trophy className="size-5 text-[#1A0008]" />
        <h3 className="text-sm font-bold uppercase tracking-widest text-[#1A0008]">
          Performance Badges
        </h3>
      </div>
      <div className="flex flex-wrap gap-3">
        {ALL_BADGE_IDS.map((id) => {
          const earned = earnedIds.has(id);
          const Icon = BADGE_ICONS[id];
          const def = BADGE_DEFS[id];

          return (
            <div
              key={id}
              className={cn(
                "flex items-center gap-2 rounded border px-3 py-2",
                earned
                  ? "border-[#1A0008]/20 bg-[#1A0008]/10"
                  : "border-[#1A0008]/10 opacity-40",
              )}
              title={def.description}
            >
              <Icon
                className={cn(
                  "size-3.5",
                  earned ? "text-[#1A0008]" : "text-[#6B1525]",
                )}
              />
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#1A0008]">
                {def.name}
              </span>
            </div>
          );
        })}
      </div>
    </TacticalFrame>
  );
};

export { PerformanceBadges };
export type { PerformanceBadgesProps };
