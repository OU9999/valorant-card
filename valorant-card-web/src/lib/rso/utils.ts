import {
  RSO_CLIENT_ID,
  RSO_CLIENT_SECRET,
  RSO_REDIRECT_URI,
  RSO_AUTHORIZE_URL,
  RSO_TOKEN_URL,
  RSO_USERINFO_URL,
  RSO_SCOPES,
} from "./config";

// ─── Types ───

interface RsoTokenResponse {
  access_token: string;
  refresh_token: string;
  expires_in: number;
  token_type: string;
  id_token: string;
  scope: string;
}

interface RsoUserInfo {
  sub: string; // puuid
}

// ─── Authorize ───

const buildAuthorizeUrl = (state: string): string => {
  const params = new URLSearchParams({
    redirect_uri: RSO_REDIRECT_URI,
    client_id: RSO_CLIENT_ID,
    response_type: "code",
    scope: RSO_SCOPES,
    state,
    riot_theme: "valorant",
  });

  return `${RSO_AUTHORIZE_URL}?${params.toString()}`;
};

// ─── Token Exchange ───

const exchangeCodeForToken = async (code: string): Promise<RsoTokenResponse> => {
  const response = await fetch(RSO_TOKEN_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Basic ${Buffer.from(`${RSO_CLIENT_ID}:${RSO_CLIENT_SECRET}`).toString("base64")}`,
    },
    body: new URLSearchParams({
      grant_type: "authorization_code",
      code,
      redirect_uri: RSO_REDIRECT_URI,
    }),
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`RSO token exchange failed: ${response.status} ${text}`);
  }

  return response.json() as Promise<RsoTokenResponse>;
};

// ─── Refresh Token ───

const refreshAccessToken = async (refreshToken: string): Promise<RsoTokenResponse> => {
  const response = await fetch(RSO_TOKEN_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Basic ${Buffer.from(`${RSO_CLIENT_ID}:${RSO_CLIENT_SECRET}`).toString("base64")}`,
    },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: refreshToken,
    }),
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`RSO token refresh failed: ${response.status} ${text}`);
  }

  return response.json() as Promise<RsoTokenResponse>;
};

// ─── User Info ───

const getUserInfo = async (accessToken: string): Promise<RsoUserInfo> => {
  const response = await fetch(RSO_USERINFO_URL, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`RSO userinfo failed: ${response.status} ${text}`);
  }

  return response.json() as Promise<RsoUserInfo>;
};

export { buildAuthorizeUrl, exchangeCodeForToken, refreshAccessToken, getUserInfo };
export type { RsoTokenResponse, RsoUserInfo };
