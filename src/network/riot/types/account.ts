type RiotAccount = {
  puuid: string;
  gameName: string;
  tagLine: string;
};

type ActiveShard = {
  puuid: string;
  game: string;
  activeShard: string;
};

export type { RiotAccount, ActiveShard };
