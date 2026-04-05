const RSO_CLIENT_ID = process.env.RSO_CLIENT_ID ?? "placeholder";
const RSO_CLIENT_SECRET = process.env.RSO_CLIENT_SECRET ?? "placeholder";
const RSO_REDIRECT_URI =
  process.env.RSO_REDIRECT_URI ?? "http://localhost:3000/api/auth/rso/callback";

const RSO_AUTHORIZE_URL = "https://auth.riotgames.com/authorize";
const RSO_TOKEN_URL = "https://auth.riotgames.com/token";
const RSO_USERINFO_URL = "https://auth.riotgames.com/userinfo";

const RSO_SCOPES = "openid offline_access";

const isRsoConfigured = (): boolean =>
  RSO_CLIENT_ID !== "placeholder" && RSO_CLIENT_SECRET !== "placeholder";

export {
  RSO_CLIENT_ID,
  RSO_CLIENT_SECRET,
  RSO_REDIRECT_URI,
  RSO_AUTHORIZE_URL,
  RSO_TOKEN_URL,
  RSO_USERINFO_URL,
  RSO_SCOPES,
  isRsoConfigured,
};
