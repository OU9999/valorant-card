/**
 * 클라이언트에서 호출하는 Next.js API Route 경로.
 * Riot Games API 엔드포인트는 `src/lib/riot/constants.ts`의 `API_PATHS` 참고.
 */
const API_ENDPOINTS = {
  ACCOUNT: "/api/valorant/account",
  MATCH: "/api/valorant/matches",
  MATCH_BY_PUUID: "/api/valorant/matches/by-puuid",
  RECENT_MATCHES: "/api/valorant/matches/recent",
  RANKED: "/api/valorant/ranked",
  CONTENT: "/api/valorant/content",
  STATUS: "/api/valorant/status",
} as const;

const accountUrl = (gameName: string, tagLine: string) =>
  `${API_ENDPOINTS.ACCOUNT}/${encodeURIComponent(gameName)}/${encodeURIComponent(tagLine)}`;

export { API_ENDPOINTS, accountUrl };
