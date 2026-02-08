import type { RateLimitInfo } from "@/network/riot/types/common";

type RateLimitEntry = {
  retryAfter: number | null;
  blockedUntil: number;
};

const limitMap = new Map<string, RateLimitEntry>();

const parseRateLimitInfo = (headers: Headers): RateLimitInfo => ({
  appRateLimit: headers.get("x-app-rate-limit"),
  appRateLimitCount: headers.get("x-app-rate-limit-count"),
  methodRateLimit: headers.get("x-method-rate-limit"),
  methodRateLimitCount: headers.get("x-method-rate-limit-count"),
  retryAfter: headers.has("retry-after")
    ? parseInt(headers.get("retry-after")!, 10)
    : null,
});

const isRateLimited = (key: string): boolean => {
  const entry = limitMap.get(key);
  if (!entry) return false;

  if (Date.now() >= entry.blockedUntil) {
    limitMap.delete(key);
    return false;
  }

  return true;
};

const getBlockedUntil = (key: string): number => {
  const entry = limitMap.get(key);
  if (!entry) return 0;
  return entry.blockedUntil;
};

const recordRateLimit = (key: string, retryAfterSeconds: number): void => {
  limitMap.set(key, {
    retryAfter: retryAfterSeconds,
    blockedUntil: Date.now() + retryAfterSeconds * 1000,
  });
};

const clearRateLimit = (key: string): void => {
  limitMap.delete(key);
};

export {
  parseRateLimitInfo,
  isRateLimited,
  getBlockedUntil,
  recordRateLimit,
  clearRateLimit,
};
