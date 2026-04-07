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
  ovrGradient: string;
  position: string;
  playerName: string;
  statLabel: string;
  statValue: string;
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
    ovrGradient: "from-gray-900/85 via-gray-900/50 to-transparent",
    position: "text-gray-300",
    playerName: "text-gray-100 drop-shadow-lg",
    statLabel: "text-gray-400",
    statValue: "text-gray-100",

    gradient: "from-black/80 via-black/40 to-transparent",
    iconGlow: "drop-shadow-[0_0_12px_rgba(156,163,175,0.7)]",
  },
  Bronze: {
    ovr: "text-amber-50 drop-shadow-lg",
    ovrGradient: "from-amber-950/85 via-amber-950/50 to-transparent",
    position: "text-amber-100/90",
    playerName: "text-amber-50 drop-shadow-lg",
    statLabel: "text-amber-200/60",
    statValue: "text-amber-50",

    gradient: "from-black/80 via-black/40 to-transparent",
    iconGlow: "drop-shadow-[0_0_12px_rgba(217,119,6,0.7)]",
  },
  Silver: {
    ovr: "text-slate-800 drop-shadow-[0_1px_2px_rgba(255,255,255,0.3)]",
    ovrGradient: "from-slate-200/85 via-slate-200/50 to-transparent",
    position: "text-slate-700/90",
    playerName: "text-slate-800 drop-shadow-[0_1px_2px_rgba(255,255,255,0.3)]",
    statLabel: "text-slate-600/70",
    statValue: "text-slate-800",

    gradient: "from-slate-900/70 via-slate-900/30 to-transparent",
    iconGlow: "drop-shadow-[0_0_12px_rgba(148,163,184,0.8)]",
  },
  Gold: {
    ovr: "text-amber-950 drop-shadow-[0_1px_2px_rgba(255,255,255,0.2)]",
    ovrGradient: "from-amber-100/85 via-amber-100/50 to-transparent",
    position: "text-amber-900/90",
    playerName:
      "text-amber-950 drop-shadow-[0_1px_2px_rgba(255,255,255,0.2)]",
    statLabel: "text-amber-900/60",
    statValue: "text-amber-950",

    gradient: "from-amber-950/70 via-amber-950/30 to-transparent",
    iconGlow: "drop-shadow-[0_0_12px_rgba(245,158,11,0.7)]",
  },
  Platinum: {
    ovr: "text-cyan-50 drop-shadow-lg",
    ovrGradient: "from-cyan-950/85 via-cyan-950/50 to-transparent",
    position: "text-cyan-100/90",
    playerName: "text-cyan-50 drop-shadow-lg",
    statLabel: "text-cyan-200/60",
    statValue: "text-cyan-50",

    gradient: "from-black/80 via-black/40 to-transparent",
    iconGlow: "drop-shadow-[0_0_12px_rgba(6,182,212,0.7)]",
  },
  Diamond: {
    ovr: "text-fuchsia-50 drop-shadow-lg",
    ovrGradient: "from-fuchsia-950/85 via-fuchsia-950/50 to-transparent",
    position: "text-fuchsia-100/90",
    playerName: "text-fuchsia-50 drop-shadow-lg",
    statLabel: "text-fuchsia-200/60",
    statValue: "text-fuchsia-50",

    gradient: "from-black/80 via-black/40 to-transparent",
    iconGlow: "drop-shadow-[0_0_12px_rgba(192,38,211,0.7)]",
  },
  Ascendant: {
    ovr: "text-emerald-50 drop-shadow-lg",
    ovrGradient: "from-emerald-950/85 via-emerald-950/50 to-transparent",
    position: "text-emerald-100/90",
    playerName: "text-emerald-50 drop-shadow-lg",
    statLabel: "text-emerald-200/60",
    statValue: "text-emerald-50",

    gradient: "from-black/80 via-black/40 to-transparent",
    iconGlow: "drop-shadow-[0_0_14px_rgba(16,185,129,0.8)]",
  },
  Immortal: {
    ovr: "text-rose-50 drop-shadow-lg",
    ovrGradient: "from-rose-950/85 via-rose-950/50 to-transparent",
    position: "text-rose-100/90",
    playerName: "text-rose-50 drop-shadow-lg",
    statLabel: "text-rose-200/70",
    statValue: "text-rose-50",

    gradient: "from-black/80 via-black/40 to-transparent",
    iconGlow: "drop-shadow-[0_0_14px_rgba(225,29,72,0.8)]",
  },
  Radiant: {
    ovr: "text-amber-900 drop-shadow-[0_1px_3px_rgba(212,175,55,0.4)]",
    ovrGradient: "from-amber-50/90 via-amber-50/55 to-transparent",
    position: "text-amber-800/90",
    playerName:
      "text-amber-900 drop-shadow-[0_1px_3px_rgba(212,175,55,0.4)]",
    statLabel: "text-amber-800/60",
    statValue: "text-amber-900",

    gradient: "from-stone-900/70 via-stone-900/30 to-transparent",
    iconGlow: "drop-shadow-[0_0_14px_rgba(40,20,0,0.85)]",
  },
};

export { HIGH_TIER_NAMES, TIER_DESIGNS, TIER_NAMES };
export type { TierName, TierDesign };
