import type { TierName } from "@/constants/card/tier-design";

interface ShowcaseCard {
  tierName: TierName;
  portrait: string;
  ovr: number;
  playerName: string;
}

const SHOWCASE_GLOW: Record<TierName, string> = {
  Iron: "drop-shadow(0 0 12px rgba(156,163,175,0.5))",
  Bronze: "drop-shadow(0 0 12px rgba(217,119,6,0.5))",
  Silver: "drop-shadow(0 0 12px rgba(148,163,184,0.6))",
  Gold: "drop-shadow(0 0 12px rgba(245,158,11,0.5))",
  Platinum: "drop-shadow(0 0 12px rgba(6,182,212,0.5))",
  Diamond: "drop-shadow(0 0 12px rgba(192,38,211,0.5))",
  Ascendant: "drop-shadow(0 0 14px rgba(16,185,129,0.6))",
  Immortal: "drop-shadow(0 0 14px rgba(225,29,72,0.6))",
  Radiant: "drop-shadow(0 0 14px rgba(212,175,55,0.6))",
};

const COLUMN_1: ShowcaseCard[] = [
  {
    tierName: "Iron",
    portrait: "/characters/sage/pose2.png",
    ovr: 12,
    playerName: "s0m",
  },
  {
    tierName: "Gold",
    portrait: "/characters/phoenix/pose2.png",
    ovr: 45,
    playerName: "aspas",
  },
  {
    tierName: "Silver",
    portrait: "/characters/yoru/pose3.png",
    ovr: 34,
    playerName: "Boaster",
  },
  {
    tierName: "Diamond",
    portrait: "/characters/viper/pose2.png",
    ovr: 68,
    playerName: "nAts",
  },
  {
    tierName: "Bronze",
    portrait: "/characters/neon/pose1.png",
    ovr: 21,
    playerName: "Meteor",
  },
  {
    tierName: "Radiant",
    portrait: "/characters/jett/pose3.png",
    ovr: 97,
    playerName: "Demon1",
  },
];

const COLUMN_2: ShowcaseCard[] = [
  {
    tierName: "Bronze",
    portrait: "/characters/breach/pose1.png",
    ovr: 23,
    playerName: "t3xture",
  },
  {
    tierName: "Platinum",
    portrait: "/characters/iso/pose3.png",
    ovr: 56,
    playerName: "stax",
  },
  {
    tierName: "Iron",
    portrait: "/characters/kayo/pose2.png",
    ovr: 10,
    playerName: "Jinggg",
  },
  {
    tierName: "Immortal",
    portrait: "/characters/reyna/pose3.png",
    ovr: 91,
    playerName: "Alfajer",
  },
  {
    tierName: "Silver",
    portrait: "/characters/tejo/pose1.png",
    ovr: 32,
    playerName: "crashies",
  },
  {
    tierName: "Diamond",
    portrait: "/characters/skye/pose1.png",
    ovr: 65,
    playerName: "Shao",
  },
];

const COLUMN_3: ShowcaseCard[] = [
  {
    tierName: "Silver",
    portrait: "/characters/cypher/pose1.png",
    ovr: 35,
    playerName: "Lakia",
  },
  {
    tierName: "Gold",
    portrait: "/characters/sova/pose2.png",
    ovr: 48,
    playerName: "zekken",
  },
  {
    tierName: "Bronze",
    portrait: "/characters/chamber/pose3.png",
    ovr: 19,
    playerName: "f0rsakeN",
  },
  {
    tierName: "Ascendant",
    portrait: "/characters/vyse/pose3.png",
    ovr: 84,
    playerName: "MaKo",
  },
  {
    tierName: "Iron",
    portrait: "/characters/astra/pose2.png",
    ovr: 8,
    playerName: "BuZz",
  },
  {
    tierName: "Platinum",
    portrait: "/characters/gekko/pose3.png",
    ovr: 58,
    playerName: "Derke",
  },
];

export { SHOWCASE_GLOW, COLUMN_1, COLUMN_2, COLUMN_3 };
export type { ShowcaseCard };
