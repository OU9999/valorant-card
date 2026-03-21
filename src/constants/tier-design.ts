const TIER_NAMES = [
  "Iron",
  "Bronze",
  "Silver",
  "Gold",
  "Platinum",
  "Diamond",
  "Ascendant",
  "Immortal",
  "Radiant",
] as const;

type TierName = (typeof TIER_NAMES)[number];

interface TierDesign {
  ovr: string;
  position: string;
  playerName: string;
  statLabel: string;
  statValue: string;
  placeholder: string;
  gradient: string;
  iconGlow: string;
}

const HIGH_TIER_NAMES: Set<TierName> = new Set([
  "Ascendant",
  "Immortal",
  "Radiant",
]);

const TIER_DESIGNS: Record<TierName, TierDesign> = {
  Iron: {
    ovr: "text-gray-100 drop-shadow-lg",
    position: "text-gray-300",
    playerName: "text-gray-100 drop-shadow-lg",
    statLabel: "text-gray-400",
    statValue: "text-gray-100",
    placeholder: "bg-gray-400/20",
    gradient: "from-black/80 via-black/40 to-transparent",
    iconGlow: "drop-shadow-[0_0_6px_rgba(156,163,175,0.4)]",
  },
  Bronze: {
    ovr: "text-amber-50 drop-shadow-lg",
    position: "text-amber-100/90",
    playerName: "text-amber-50 drop-shadow-lg",
    statLabel: "text-amber-200/60",
    statValue: "text-amber-50",
    placeholder: "bg-amber-200/20",
    gradient: "from-black/80 via-black/40 to-transparent",
    iconGlow: "drop-shadow-[0_0_6px_rgba(217,119,6,0.4)]",
  },
  Silver: {
    ovr: "text-slate-800 drop-shadow-[0_1px_2px_rgba(255,255,255,0.3)]",
    position: "text-slate-700/90",
    playerName: "text-slate-800 drop-shadow-[0_1px_2px_rgba(255,255,255,0.3)]",
    statLabel: "text-slate-600/70",
    statValue: "text-slate-800",
    placeholder: "bg-slate-700/20",
    gradient: "from-slate-900/70 via-slate-900/30 to-transparent",
    iconGlow: "drop-shadow-[0_0_6px_rgba(148,163,184,0.5)]",
  },
  Gold: {
    ovr: "text-amber-950 drop-shadow-[0_1px_2px_rgba(255,255,255,0.2)]",
    position: "text-amber-900/90",
    playerName:
      "text-amber-950 drop-shadow-[0_1px_2px_rgba(255,255,255,0.2)]",
    statLabel: "text-amber-900/60",
    statValue: "text-amber-950",
    placeholder: "bg-amber-900/20",
    gradient: "from-amber-950/70 via-amber-950/30 to-transparent",
    iconGlow: "drop-shadow-[0_0_6px_rgba(245,158,11,0.4)]",
  },
  Platinum: {
    ovr: "text-cyan-50 drop-shadow-lg",
    position: "text-cyan-100/90",
    playerName: "text-cyan-50 drop-shadow-lg",
    statLabel: "text-cyan-200/60",
    statValue: "text-cyan-50",
    placeholder: "bg-cyan-200/20",
    gradient: "from-black/80 via-black/40 to-transparent",
    iconGlow: "drop-shadow-[0_0_6px_rgba(6,182,212,0.4)]",
  },
  Diamond: {
    ovr: "text-fuchsia-50 drop-shadow-lg",
    position: "text-fuchsia-100/90",
    playerName: "text-fuchsia-50 drop-shadow-lg",
    statLabel: "text-fuchsia-200/60",
    statValue: "text-fuchsia-50",
    placeholder: "bg-fuchsia-200/20",
    gradient: "from-black/80 via-black/40 to-transparent",
    iconGlow: "drop-shadow-[0_0_6px_rgba(192,38,211,0.4)]",
  },
  Ascendant: {
    ovr: "text-emerald-50 drop-shadow-lg",
    position: "text-emerald-100/90",
    playerName: "text-emerald-50 drop-shadow-lg",
    statLabel: "text-emerald-200/60",
    statValue: "text-emerald-50",
    placeholder: "bg-emerald-200/20",
    gradient: "from-black/80 via-black/40 to-transparent",
    iconGlow: "drop-shadow-[0_0_8px_rgba(16,185,129,0.5)]",
  },
  Immortal: {
    ovr: "text-rose-50 drop-shadow-lg",
    position: "text-rose-100/90",
    playerName: "text-rose-50 drop-shadow-lg",
    statLabel: "text-rose-200/70",
    statValue: "text-rose-50",
    placeholder: "bg-rose-200/20",
    gradient: "from-black/80 via-black/40 to-transparent",
    iconGlow: "drop-shadow-[0_0_8px_rgba(225,29,72,0.5)]",
  },
  Radiant: {
    ovr: "text-amber-900 drop-shadow-[0_1px_3px_rgba(212,175,55,0.4)]",
    position: "text-amber-800/90",
    playerName:
      "text-amber-900 drop-shadow-[0_1px_3px_rgba(212,175,55,0.4)]",
    statLabel: "text-amber-800/60",
    statValue: "text-amber-900",
    placeholder: "bg-amber-800/20",
    gradient: "from-stone-900/70 via-stone-900/30 to-transparent",
    iconGlow: "drop-shadow-[0_0_8px_rgba(212,175,55,0.5)]",
  },
};

export { HIGH_TIER_NAMES, TIER_DESIGNS, TIER_NAMES };
export type { TierName, TierDesign };
