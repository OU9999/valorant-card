import type { RiotRegion, ValorantShard } from "@/network/riot/types/common";

const REGION_URLS: Record<RiotRegion, string> = {
  americas: "https://americas.api.riotgames.com",
  asia: "https://asia.api.riotgames.com",
  europe: "https://europe.api.riotgames.com",
  esports: "https://esports.api.riotgames.com",
};

const SHARD_URLS: Record<ValorantShard, string> = {
  ap: "https://ap.api.riotgames.com",
  br: "https://br.api.riotgames.com",
  eu: "https://eu.api.riotgames.com",
  kr: "https://kr.api.riotgames.com",
  latam: "https://latam.api.riotgames.com",
  na: "https://na.api.riotgames.com",
};

const SHARD_TO_REGION: Record<ValorantShard, RiotRegion> = {
  ap: "asia",
  br: "americas",
  eu: "europe",
  kr: "asia",
  latam: "americas",
  na: "americas",
};

const RSO = {
  AUTHORIZATION_URL: "https://auth.riotgames.com/authorize",
  TOKEN_URL: "https://auth.riotgames.com/token",
  SCOPES: "openid cpid",
  RESPONSE_TYPE: "code",
  STATE_COOKIE_NAME: "rso_state",
  SESSION_COOKIE_NAME: "rso_session",
  STATE_MAX_AGE_SECONDS: 300,
  SESSION_MAX_AGE_SECONDS: 7 * 24 * 60 * 60,
} as const;

const API_PATHS = {
  ACCOUNT_BY_RIOT_ID: "/riot/account/v1/accounts/by-riot-id",
  ACCOUNT_BY_PUUID: "/riot/account/v1/accounts/by-puuid",
  ACTIVE_SHARD: "/riot/account/v1/active-shards/by-game/val/by-puuid",
  MATCH_BY_ID: "/val/match/v1/matches",
  MATCH_LIST_BY_PUUID: "/val/match/v1/matchlists/by-puuid",
  RECENT_MATCHES: "/val/match/v1/recent-matches/by-queue",
  RANKED_LEADERBOARD: "/val/ranked/v1/leaderboards/by-act",
  CONTENT: "/val/content/v1/contents",
  STATUS: "/val/status/v1/platform-data",
} as const;

export { REGION_URLS, SHARD_URLS, SHARD_TO_REGION, RSO, API_PATHS };
