import type { ApiResult, RiotRegion, ValorantShard, Locale } from "@/network/riot/common";
import type { RiotAccount, ActiveShard } from "@/network/riot/account";
import type { MatchDetails, MatchList, RecentMatches, ValorantQueue } from "@/network/riot/match";
import type { Leaderboard } from "@/network/riot/ranked";
import type { GameContent } from "@/network/riot/content";
import type { PlatformStatus } from "@/network/riot/status";
import { REGION_URLS, SHARD_URLS, SHARD_TO_REGION, API_PATHS } from "./constants";
import { RiotApiError, RiotRateLimitError } from "./errors";
import {
  parseRateLimitInfo,
  isRateLimited,
  recordRateLimit,
} from "./rate-limiter";

interface FetchConfig {
  baseUrl: string;
  path: string;
  params?: Record<string, string>;
  rateLimitKey: string;
}

const buildUrl = (baseUrl: string, path: string, params?: Record<string, string>): string => {
  const url = new URL(path, baseUrl);
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      url.searchParams.set(key, value);
    });
  }
  return url.toString();
};

const fetchWithApiKey = async <T>(config: FetchConfig): Promise<ApiResult<T>> => {
  const apiKey = process.env.RIOT_API_KEY;
  if (!apiKey) {
    return {
      ok: false,
      error: { status: 500, message: "RIOT_API_KEY is not configured", code: "MISSING_API_KEY" },
    };
  }

  if (isRateLimited(config.rateLimitKey)) {
    return {
      ok: false,
      error: { status: 429, message: "Rate limited", code: "RATE_LIMITED" },
    };
  }

  const url = buildUrl(config.baseUrl, config.path, config.params);

  const response = await fetch(url, {
    headers: { "X-Riot-Token": apiKey },
  });

  const rateLimit = parseRateLimitInfo(response.headers);

  if (response.status === 429) {
    const retryAfter = rateLimit.retryAfter ?? 10;
    recordRateLimit(config.rateLimitKey, retryAfter);
    throw new RiotRateLimitError(retryAfter);
  }

  if (!response.ok) {
    const body = await response.text();
    throw new RiotApiError(response.status, body, `HTTP_${response.status}`);
  }

  const data = (await response.json()) as T;
  return { ok: true, data, rateLimit };
};

// ─── Account API ───

const getAccountByRiotId = (
  gameName: string,
  tagLine: string,
  region: RiotRegion = "asia",
): Promise<ApiResult<RiotAccount>> =>
  fetchWithApiKey({
    baseUrl: REGION_URLS[region],
    path: `${API_PATHS.ACCOUNT_BY_RIOT_ID}/${encodeURIComponent(gameName)}/${encodeURIComponent(tagLine)}`,
    rateLimitKey: `account:${region}`,
  });

const getAccountByPuuid = (
  puuid: string,
  region: RiotRegion = "asia",
): Promise<ApiResult<RiotAccount>> =>
  fetchWithApiKey({
    baseUrl: REGION_URLS[region],
    path: `${API_PATHS.ACCOUNT_BY_PUUID}/${puuid}`,
    rateLimitKey: `account:${region}`,
  });

const getActiveShard = (
  puuid: string,
  region: RiotRegion = "asia",
): Promise<ApiResult<ActiveShard>> =>
  fetchWithApiKey({
    baseUrl: REGION_URLS[region],
    path: `${API_PATHS.ACTIVE_SHARD}/${puuid}`,
    rateLimitKey: `account:${region}`,
  });

// ─── Match API ───

const getMatchById = (
  matchId: string,
  shard: ValorantShard = "kr",
): Promise<ApiResult<MatchDetails>> =>
  fetchWithApiKey({
    baseUrl: SHARD_URLS[shard],
    path: `${API_PATHS.MATCH_BY_ID}/${matchId}`,
    rateLimitKey: `match:${shard}`,
  });

const getMatchListByPuuid = (
  puuid: string,
  shard: ValorantShard = "kr",
): Promise<ApiResult<MatchList>> =>
  fetchWithApiKey({
    baseUrl: SHARD_URLS[shard],
    path: `${API_PATHS.MATCH_LIST_BY_PUUID}/${puuid}/ids`,
    rateLimitKey: `matchlist:${shard}`,
  });

const getRecentMatches = (
  queue: ValorantQueue,
  shard: ValorantShard = "kr",
): Promise<ApiResult<RecentMatches>> =>
  fetchWithApiKey({
    baseUrl: SHARD_URLS[shard],
    path: `${API_PATHS.RECENT_MATCHES}/${queue}`,
    rateLimitKey: `recent:${shard}`,
  });

// ─── Ranked API ───

interface LeaderboardOptions {
  actId: string;
  shard?: ValorantShard;
  size?: number;
  startIndex?: number;
}

const getLeaderboard = ({
  actId,
  shard = "kr",
  size,
  startIndex,
}: LeaderboardOptions): Promise<ApiResult<Leaderboard>> => {
  const params: Record<string, string> = {};
  if (size !== undefined) params.size = size.toString();
  if (startIndex !== undefined) params.startIndex = startIndex.toString();

  return fetchWithApiKey({
    baseUrl: SHARD_URLS[shard],
    path: `${API_PATHS.RANKED_LEADERBOARD}/${actId}`,
    params,
    rateLimitKey: `ranked:${shard}`,
  });
};

// ─── Content API ───

const getContent = (
  shard: ValorantShard = "kr",
  locale?: Locale,
): Promise<ApiResult<GameContent>> =>
  fetchWithApiKey({
    baseUrl: SHARD_URLS[shard],
    path: API_PATHS.CONTENT,
    params: locale ? { locale } : undefined,
    rateLimitKey: `content:${shard}`,
  });

// ─── Status API ───

const getPlatformStatus = (
  shard: ValorantShard = "kr",
): Promise<ApiResult<PlatformStatus>> =>
  fetchWithApiKey({
    baseUrl: SHARD_URLS[shard],
    path: API_PATHS.STATUS,
    rateLimitKey: `status:${shard}`,
  });

// ─── Helper ───

const getRegionForShard = (shard: ValorantShard): RiotRegion => SHARD_TO_REGION[shard];

export {
  fetchWithApiKey,
  getAccountByRiotId,
  getAccountByPuuid,
  getActiveShard,
  getMatchById,
  getMatchListByPuuid,
  getRecentMatches,
  getLeaderboard,
  getContent,
  getPlatformStatus,
  getRegionForShard,
};

export type { FetchConfig, LeaderboardOptions };
