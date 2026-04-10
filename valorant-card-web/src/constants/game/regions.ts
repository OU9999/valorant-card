import type { ValorantShard } from "@/network/riot/common";

const SHARD_DISPLAY_NAMES = {
  ap: "AP",
  br: "BR",
  eu: "EU",
  kr: "KR",
  latam: "LA",
  na: "NA",
} as const satisfies Record<ValorantShard, string>;

type ShardDisplayName =
  (typeof SHARD_DISPLAY_NAMES)[keyof typeof SHARD_DISPLAY_NAMES];

export { SHARD_DISPLAY_NAMES };
export type { ShardDisplayName };
