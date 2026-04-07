interface RiotAccount {
  puuid: string;
  gameName: string;
  tagLine: string;
}

import type { ValorantShard } from "./common";

interface ActiveShard {
  puuid: string;
  game: string;
  activeShard: ValorantShard;
}

export type { RiotAccount, ActiveShard };
