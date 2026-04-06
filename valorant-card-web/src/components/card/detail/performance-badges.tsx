import { Zap, Shield, Crosshair, Crown, Flame, Swords, Trophy } from "lucide-react";
import { cn } from "@/lib/cn";
import { BADGE_DEFS } from "@/lib/valorant/badges";
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
    <div className="rounded-lg border-l-2 border-emerald-500/40 bg-card p-6">
      <div className="mb-5 flex items-center gap-3">
        <Trophy className="size-5 text-emerald-400" />
        <h3 className="text-sm font-bold uppercase tracking-widest text-foreground">
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
                "flex items-center gap-2 rounded border bg-background px-3 py-2",
                earned
                  ? "border-border"
                  : "border-border/50 opacity-40",
              )}
              title={def.description}
            >
              <Icon
                className={cn(
                  "size-3.5",
                  earned ? "text-emerald-400" : "text-muted-foreground",
                )}
              />
              <span className="text-[10px] font-bold uppercase tracking-widest text-foreground">
                {def.name}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export { PerformanceBadges };
export type { PerformanceBadgesProps };
