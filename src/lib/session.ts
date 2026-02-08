import { cookies } from "next/headers";
import type { RsoSession } from "@/types/riot/auth";
import { RSO } from "./riot/constants";

const ALGORITHM = "AES-GCM";
const IV_LENGTH = 12;
const TAG_LENGTH = 128;

const getSessionSecret = (): string => {
  const secret = process.env.SESSION_SECRET;
  if (!secret) throw new Error("SESSION_SECRET is not configured");
  return secret;
};

const deriveKey = async (secret: string): Promise<CryptoKey> => {
  const encoder = new TextEncoder();
  const keyMaterial = await crypto.subtle.importKey(
    "raw",
    encoder.encode(secret),
    "PBKDF2",
    false,
    ["deriveKey"],
  );

  return crypto.subtle.deriveKey(
    {
      name: "PBKDF2",
      salt: encoder.encode("valorant-card-session"),
      iterations: 100_000,
      hash: "SHA-256",
    },
    keyMaterial,
    { name: ALGORITHM, length: 256 },
    false,
    ["encrypt", "decrypt"],
  );
};

const encrypt = async (plaintext: string): Promise<string> => {
  const key = await deriveKey(getSessionSecret());
  const iv = crypto.getRandomValues(new Uint8Array(IV_LENGTH));
  const encoder = new TextEncoder();

  const ciphertext = await crypto.subtle.encrypt(
    { name: ALGORITHM, iv, tagLength: TAG_LENGTH },
    key,
    encoder.encode(plaintext),
  );

  const combined = new Uint8Array(IV_LENGTH + ciphertext.byteLength);
  combined.set(iv, 0);
  combined.set(new Uint8Array(ciphertext), IV_LENGTH);

  return btoa(String.fromCharCode(...combined));
};

const decrypt = async (encoded: string): Promise<string> => {
  const key = await deriveKey(getSessionSecret());
  const combined = Uint8Array.from(atob(encoded), (c) => c.charCodeAt(0));

  const iv = combined.slice(0, IV_LENGTH);
  const ciphertext = combined.slice(IV_LENGTH);

  const plaintext = await crypto.subtle.decrypt(
    { name: ALGORITHM, iv, tagLength: TAG_LENGTH },
    key,
    ciphertext,
  );

  return new TextDecoder().decode(plaintext);
};

const setSession = async (session: RsoSession): Promise<void> => {
  const encrypted = await encrypt(JSON.stringify(session));
  const cookieStore = await cookies();

  cookieStore.set(RSO.SESSION_COOKIE_NAME, encrypted, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: RSO.SESSION_MAX_AGE_SECONDS,
  });
};

const getSession = async (): Promise<RsoSession | null> => {
  const cookieStore = await cookies();
  const cookie = cookieStore.get(RSO.SESSION_COOKIE_NAME);
  if (!cookie) return null;

  try {
    const decrypted = await decrypt(cookie.value);
    return JSON.parse(decrypted) as RsoSession;
  } catch {
    return null;
  }
};

const clearSession = async (): Promise<void> => {
  const cookieStore = await cookies();
  cookieStore.delete(RSO.SESSION_COOKIE_NAME);
};

export { setSession, getSession, clearSession, encrypt, decrypt };
