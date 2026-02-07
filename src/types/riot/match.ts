type MatchInfo = {
  matchId: string;
  mapId: string;
  gameLengthMillis: number;
  gameStartMillis: number;
  provisioningFlowId: string;
  isCompleted: boolean;
  customGameName: string;
  queueId: string;
  gameMode: string;
  isRanked: boolean;
  seasonId: string;
};

type PlayerStats = {
  score: number;
  roundsPlayed: number;
  kills: number;
  deaths: number;
  assists: number;
  playtimeMillis: number;
  abilityCasts: AbilityCasts | null;
};

type AbilityCasts = {
  grenadeCasts: number;
  ability1Casts: number;
  ability2Casts: number;
  ultimateCasts: number;
};

type MatchPlayer = {
  puuid: string;
  gameName: string;
  tagLine: string;
  teamId: string;
  partyId: string;
  characterId: string;
  stats: PlayerStats;
  competitiveTier: number;
  playerCard: string;
  playerTitle: string;
};

type MatchTeam = {
  teamId: string;
  won: boolean;
  roundsPlayed: number;
  roundsWon: number;
  numPoints: number;
};

type RoundResult = {
  roundNum: number;
  roundResult: string;
  roundCeremony: string;
  winningTeam: string;
  bombPlanter: string | null;
  bombDefuser: string | null;
  plantRoundTime: number;
  plantPlayerLocations: PlayerLocation[] | null;
  plantLocation: Location;
  plantSite: string;
  defuseRoundTime: number;
  defusePlayerLocations: PlayerLocation[] | null;
  defuseLocation: Location;
  playerStats: RoundPlayerStats[];
};

type PlayerLocation = {
  puuid: string;
  viewRadians: number;
  location: Location;
};

type Location = {
  x: number;
  y: number;
};

type RoundPlayerStats = {
  puuid: string;
  kills: Kill[];
  damage: Damage[];
  score: number;
  economy: Economy;
  ability: Ability;
};

type Kill = {
  timeSinceGameStartMillis: number;
  timeSinceRoundStartMillis: number;
  killer: string;
  victim: string;
  victimLocation: Location;
  assistants: string[];
  playerLocations: PlayerLocation[];
  finishingDamage: FinishingDamage;
};

type FinishingDamage = {
  damageType: string;
  damageItem: string;
  isSecondaryFireMode: boolean;
};

type Damage = {
  receiver: string;
  damage: number;
  legshots: number;
  bodyshots: number;
  headshots: number;
};

type Economy = {
  loadoutValue: number;
  weapon: string;
  armor: string;
  remaining: number;
  spent: number;
};

type Ability = {
  grenadeEffects: string | null;
  ability1Effects: string | null;
  ability2Effects: string | null;
  ultimateEffects: string | null;
};

type Coach = {
  puuid: string;
  teamId: string;
};

type MatchDetails = {
  matchInfo: MatchInfo;
  players: MatchPlayer[];
  coaches: Coach[];
  teams: MatchTeam[];
  roundResults: RoundResult[];
};

type MatchList = {
  puuid: string;
  history: MatchListEntry[];
};

type MatchListEntry = {
  matchId: string;
  gameStartTimeMillis: number;
  queueId: string;
};

type RecentMatches = {
  currentTime: number;
  matchIds: string[];
};

type ValorantQueue =
  | "competitive"
  | "unrated"
  | "spikerush"
  | "tournamentmode"
  | "deathmatch"
  | "onefa"
  | "ggteam"
  | "newmap"
  | "snowball";

export type {
  MatchInfo,
  PlayerStats,
  AbilityCasts,
  MatchPlayer,
  MatchTeam,
  RoundResult,
  PlayerLocation,
  Location,
  RoundPlayerStats,
  Kill,
  FinishingDamage,
  Damage,
  Economy,
  Ability,
  Coach,
  MatchDetails,
  MatchList,
  MatchListEntry,
  RecentMatches,
  ValorantQueue,
};
