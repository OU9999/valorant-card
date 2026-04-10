import { TIER_CARD_IMAGES } from "@/constants/card/tier-card-images";
import { TIER_NAMES } from "@/constants/card/tier-design";
import type { TierName } from "@/constants/card/tier-design";
import type { CardStat } from "@/components/card/tier-card";
import type { StaticImageData } from "next/image";
import type { Badge } from "@/lib/valorant/badges";
import type { FormTrend } from "@/lib/valorant/card-stats";
import { getWeaponIconUrl } from "@/constants/game/weapons";

/* ─── Weapon Icon ─── */

const VANDAL_ICON_URL = getWeaponIconUrl(
  "9c82e19d-4575-0200-1a81-3eacf00cf872",
);

/* ─── Showcase Stats (per tier) ─── */

const SHOWCASE_STATS: Record<TierName, CardStat[]> = {
  Iron: [
    { label: "ACS", value: "128" },
    { label: "K/D", value: "0.7" },
    { label: "HS%", value: "12" },
    { label: "DDΔ", value: "-18" },
    { label: "KAST", value: "48" },
    { label: "ADR", value: "105" },
  ],
  Bronze: [
    { label: "ACS", value: "152" },
    { label: "K/D", value: "0.8" },
    { label: "HS%", value: "15" },
    { label: "DDΔ", value: "-11" },
    { label: "KAST", value: "54" },
    { label: "ADR", value: "118" },
  ],
  Silver: [
    { label: "ACS", value: "173" },
    { label: "K/D", value: "0.9" },
    { label: "HS%", value: "18" },
    { label: "DDΔ", value: "-5" },
    { label: "KAST", value: "60" },
    { label: "ADR", value: "132" },
  ],
  Gold: [
    { label: "ACS", value: "198" },
    { label: "K/D", value: "1.0" },
    { label: "HS%", value: "21" },
    { label: "DDΔ", value: "+2" },
    { label: "KAST", value: "65" },
    { label: "ADR", value: "148" },
  ],
  Platinum: [
    { label: "ACS", value: "218" },
    { label: "K/D", value: "1.1" },
    { label: "HS%", value: "24" },
    { label: "DDΔ", value: "+7" },
    { label: "KAST", value: "69" },
    { label: "ADR", value: "158" },
  ],
  Diamond: [
    { label: "ACS", value: "241" },
    { label: "K/D", value: "1.2" },
    { label: "HS%", value: "26" },
    { label: "DDΔ", value: "+12" },
    { label: "KAST", value: "73" },
    { label: "ADR", value: "168" },
  ],
  Ascendant: [
    { label: "ACS", value: "262" },
    { label: "K/D", value: "1.4" },
    { label: "HS%", value: "29" },
    { label: "DDΔ", value: "+18" },
    { label: "KAST", value: "76" },
    { label: "ADR", value: "179" },
  ],
  Immortal: [
    { label: "ACS", value: "285" },
    { label: "K/D", value: "1.6" },
    { label: "HS%", value: "31" },
    { label: "DDΔ", value: "+23" },
    { label: "KAST", value: "80" },
    { label: "ADR", value: "192" },
  ],
  Radiant: [
    { label: "ACS", value: "312" },
    { label: "K/D", value: "1.8" },
    { label: "HS%", value: "34" },
    { label: "DDΔ", value: "+29" },
    { label: "KAST", value: "84" },
    { label: "ADR", value: "208" },
  ],
};

/* ─── Tier Card Entries ─── */

interface TierEntry {
  tierName: TierName;
  competitiveTier: number;
  image: StaticImageData;
  portrait: string;
  ovr: number;
  playerName: string;
}

const PORTRAITS: Record<TierName, string> = {
  Iron: "/characters/sage/pose2.png",
  Bronze: "/characters/neon/pose1.png",
  Silver: "/characters/yoru/pose3.png",
  Gold: "/characters/phoenix/pose2.png",
  Platinum: "/characters/iso/pose3.png",
  Diamond: "/characters/omen/pose1.png",
  Ascendant: "/characters/vyse/pose3.png",
  Immortal: "/characters/reyna/pose3.png",
  Radiant: "/characters/jett/pose3.png",
};

const COMPETITIVE_TIERS: Record<TierName, number> = {
  Iron: 5,
  Bronze: 8,
  Silver: 11,
  Gold: 14,
  Platinum: 17,
  Diamond: 20,
  Ascendant: 23,
  Immortal: 26,
  Radiant: 27,
};

const OVR_VALUES: Record<TierName, number> = {
  Iron: 12,
  Bronze: 21,
  Silver: 34,
  Gold: 45,
  Platinum: 56,
  Diamond: 68,
  Ascendant: 84,
  Immortal: 91,
  Radiant: 97,
};

const PLAYER_NAMES: Record<TierName, string> = {
  Iron: "s0m",
  Bronze: "Meteor",
  Silver: "Boaster",
  Gold: "aspas",
  Platinum: "stax",
  Diamond: "nAts",
  Ascendant: "MaKo",
  Immortal: "Alfajer",
  Radiant: "Demon1",
};

const TIER_ENTRIES: TierEntry[] = TIER_NAMES.map((name) => ({
  tierName: name,
  competitiveTier: COMPETITIVE_TIERS[name],
  image: TIER_CARD_IMAGES[name],
  portrait: PORTRAITS[name],
  ovr: OVR_VALUES[name],
  playerName: PLAYER_NAMES[name],
}));

/* ─── Mock Data for Detail Components ─── */

const MOCK_COMBAT_STATS: CardStat[] = [
  { label: "ACS", value: "262" },
  { label: "K/D", value: "1.4" },
  { label: "HS%", value: "29" },
  { label: "DDΔ", value: "+18" },
  { label: "KAST", value: "76" },
  { label: "ADR", value: "179" },
];

const MOCK_BADGES: Badge[] = [
  { id: "ace_hunter", name: "에이스 헌터", description: "최근 20경기에서 에이스 3회 이상" },
  { id: "sharpshooter", name: "명사수", description: "평균 헤드샷 확률 30% 이상" },
  { id: "ironwall", name: "철벽", description: "평균 KAST 80% 이상" },
];

const MOCK_AI_STATS: CardStat[] = MOCK_COMBAT_STATS;
const MOCK_TREND: FormTrend = "up";

export {
  VANDAL_ICON_URL,
  SHOWCASE_STATS,
  COMPETITIVE_TIERS,
  TIER_ENTRIES,
  MOCK_COMBAT_STATS,
  MOCK_BADGES,
  MOCK_AI_STATS,
  MOCK_TREND,
};
export type { TierEntry };
