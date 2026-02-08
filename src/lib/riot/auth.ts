import type { RsoTokenResponse } from "@/types/riot/auth";
import { RSO } from "./constants";

const getClientId = (): string => {
  const id = process.env.RSO_CLIENT_ID;
  if (!id) throw new Error("RSO_CLIENT_ID is not configured");
  return id;
};

const getClientSecret = (): string => {
  const secret = process.env.RSO_CLIENT_SECRET;
  if (!secret) throw new Error("RSO_CLIENT_SECRET is not configured");
  return secret;
};

const getRedirectUri = (): string => {
  const uri = process.env.RSO_REDIRECT_URI;
  if (!uri) throw new Error("RSO_REDIRECT_URI is not configured");
  return uri;
};

const generateState = (): string => {
  const bytes = crypto.getRandomValues(new Uint8Array(32));
  return Array.from(bytes, (b) => b.toString(16).padStart(2, "0")).join("");
};

const buildAuthorizationUrl = (state: string): string => {
  const params = new URLSearchParams({
    client_id: getClientId(),
    redirect_uri: getRedirectUri(),
    response_type: RSO.RESPONSE_TYPE,
    scope: RSO.SCOPES,
    state,
  });

  return `${RSO.AUTHORIZATION_URL}?${params.toString()}`;
};

const exchangeCodeForTokens = async (code: string): Promise<RsoTokenResponse> => {
  const body = new URLSearchParams({
    grant_type: "authorization_code",
    code,
    redirect_uri: getRedirectUri(),
  });

  const credentials = btoa(`${getClientId()}:${getClientSecret()}`);

  const response = await fetch(RSO.TOKEN_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Basic ${credentials}`,
    },
    body: body.toString(),
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Token exchange failed: ${response.status} ${text}`);
  }

  return response.json() as Promise<RsoTokenResponse>;
};

const refreshAccessToken = async (refreshToken: string): Promise<RsoTokenResponse> => {
  const body = new URLSearchParams({
    grant_type: "refresh_token",
    refresh_token: refreshToken,
  });

  const credentials = btoa(`${getClientId()}:${getClientSecret()}`);

  const response = await fetch(RSO.TOKEN_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Basic ${credentials}`,
    },
    body: body.toString(),
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Token refresh failed: ${response.status} ${text}`);
  }

  return response.json() as Promise<RsoTokenResponse>;
};

export {
  generateState,
  buildAuthorizationUrl,
  exchangeCodeForTokens,
  refreshAccessToken,
};
