interface RsoTokenResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
  refresh_token: string;
  scope: string;
  id_token: string;
  sub: string;
}

interface RsoSession {
  accessToken: string;
  refreshToken: string;
  expiresAt: number;
  puuid: string;
  gameName: string;
  tagLine: string;
}

interface RsoState {
  value: string;
  createdAt: number;
}

export type { RsoTokenResponse, RsoSession, RsoState };
