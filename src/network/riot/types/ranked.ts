interface LeaderboardPlayer {
  puuid: string;
  gameName: string;
  tagLine: string;
  leaderboardRank: number;
  rankedRating: number;
  numberOfWins: number;
}

interface Leaderboard {
  shard: string;
  actId: string;
  totalPlayers: number;
  players: LeaderboardPlayer[];
}

export type { LeaderboardPlayer, Leaderboard };
