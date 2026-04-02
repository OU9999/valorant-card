const TIER_MEDIA_BASE =
  "https://media.valorant-api.com/competitivetiers/03621f52-342b-cf4e-4f86-9350a49c6d04";

interface TierInfo {
  index: number;
  name: string;
  base: number;
  ceiling: number;
  adjustedBase: number;
}

/**
 * competitiveTier(0~27) → 티어 인덱스(0~8) 매핑
 *
 * 0: 언랭크, 1~3: 아이언, 4~6: 브론즈, ..., 22~24: 불멸, 25~26: 미사용, 27: 레디언트
 */
const getTierIndex = (competitiveTier: number): number => {
  if (competitiveTier === 0) return -1;
  if (competitiveTier === 27) return 8;
  if (competitiveTier >= 25) return -1;

  return Math.floor((competitiveTier - 1) / 3);
};

/**
 * 티어별 점수 범위
 *
 * 공식: base(i) = 1 + i × 11, ceiling(i) = min(99, base(i) + 16)
 * 인접 티어 간 6점 오버랩
 */
const TIERS: readonly TierInfo[] = [
  { index: 0, name: "아이언", base: 1, ceiling: 17, adjustedBase: 1 },
  { index: 1, name: "브론즈", base: 12, ceiling: 28, adjustedBase: 12 },
  { index: 2, name: "실버", base: 23, ceiling: 39, adjustedBase: 23 },
  { index: 3, name: "골드", base: 34, ceiling: 50, adjustedBase: 34 },
  { index: 4, name: "플래티넘", base: 45, ceiling: 61, adjustedBase: 45 },
  { index: 5, name: "다이아몬드", base: 56, ceiling: 72, adjustedBase: 56 },
  { index: 6, name: "초월자", base: 67, ceiling: 83, adjustedBase: 67 },
  { index: 7, name: "불멸", base: 78, ceiling: 94, adjustedBase: 78 },
  { index: 8, name: "레디언트", base: 89, ceiling: 99, adjustedBase: 89 },
];

const getTierInfo = (competitiveTier: number): TierInfo | null => {
  const index = getTierIndex(competitiveTier);
  if (index < 0) return null;

  const tier = TIERS[index];
  if (!tier) return null;

  const division = getDivision(competitiveTier);
  const divisionOffset = division > 0 ? (division - 1) / 2 : 0;
  const adjustedBase =
    tier.base + divisionOffset * (tier.ceiling - tier.base) * 0.3;

  return { ...tier, adjustedBase };
};

const getTierIcon = (competitiveTier: number): string =>
  `${TIER_MEDIA_BASE}/${competitiveTier}/largeicon.png`;

const getDivision = (competitiveTier: number): number => {
  if (competitiveTier === 0 || competitiveTier === 27) return 0;
  if (competitiveTier >= 25) return 0;

  return ((competitiveTier - 1) % 3) + 1;
};

export { TIERS, getTierIndex, getTierInfo, getTierIcon, getDivision };
export type { TierInfo };
