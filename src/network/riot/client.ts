import type { ApiResult, RiotRegion, ValorantShard, Locale } from "@/network/riot/types/common";
import type { RiotAccount, ActiveShard } from "@/network/riot/types/account";
import type { MatchDetails, MatchList, RecentMatches, ValorantQueue } from "@/network/riot/types/match";
import type { Leaderboard } from "@/network/riot/types/ranked";
import type { GameContent } from "@/network/riot/types/content";
import type { PlatformStatus } from "@/network/riot/types/status";
import { REGION_URLS, SHARD_URLS, SHARD_TO_REGION, API_PATHS } from "@/lib/riot/constants";
import { RiotApiError, RiotRateLimitError } from "@/lib/riot/errors";
import {
  parseRateLimitInfo,
  isRateLimited,
  recordRateLimit,
} from "@/lib/riot/rate-limiter";

type FetchConfig = {
  baseUrl: string;
  path: string;
  params?: Record<string, string>;
  rateLimitKey: string;
};

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

const fetchWithBearer = async <T>(
  accessToken: string,
  config: FetchConfig,
): Promise<ApiResult<T>> => {
  if (isRateLimited(config.rateLimitKey)) {
    return {
      ok: false,
      error: { status: 429, message: "Rate limited", code: "RATE_LIMITED" },
    };
  }

  const url = buildUrl(config.baseUrl, config.path, config.params);

  const response = await fetch(url, {
    headers: { Authorization: `Bearer ${accessToken}` },
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

const getAccountByAccessToken = (
  accessToken: string,
  region: RiotRegion = "asia",
): Promise<ApiResult<RiotAccount>> =>
  fetchWithBearer(accessToken, {
    baseUrl: REGION_URLS[region],
    path: "/riot/account/v1/accounts/me",
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

type LeaderboardOptions = {
  actId: string;
  shard?: ValorantShard;
  size?: number;
  startIndex?: number;
};

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
  fetchWithBearer,
  getAccountByRiotId,
  getAccountByPuuid,
  getActiveShard,
  getAccountByAccessToken,
  getMatchById,
  getMatchListByPuuid,
  getRecentMatches,
  getLeaderboard,
  getContent,
  getPlatformStatus,
  getRegionForShard,
};

export type { FetchConfig, LeaderboardOptions };
