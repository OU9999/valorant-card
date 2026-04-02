interface RiotAccount {
  puuid: string;
  gameName: string;
  tagLine: string;
}

interface ActiveShard {
  puuid: string;
  game: string;
  activeShard: string;
}

export type { RiotAccount, ActiveShard };
