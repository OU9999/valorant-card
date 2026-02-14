type RiotRegion = "americas" | "asia" | "europe" | "esports";

type ValorantShard = "ap" | "br" | "eu" | "kr" | "latam" | "na";

interface ApiSuccess<T> {
  ok: true;
  data: T;
  rateLimit: RateLimitInfo | null;
}

interface ApiError {
  ok: false;
  error: {
    status: number;
    message: string;
    code: string;
  };
}

type ApiResult<T> = ApiSuccess<T> | ApiError;

interface RateLimitInfo {
  appRateLimit: string | null;
  appRateLimitCount: string | null;
  methodRateLimit: string | null;
  methodRateLimitCount: string | null;
  retryAfter: number | null;
}

type Locale =
  | "ar-AE"
  | "de-DE"
  | "en-US"
  | "es-ES"
  | "es-MX"
  | "fr-FR"
  | "id-ID"
  | "it-IT"
  | "ja-JP"
  | "ko-KR"
  | "pl-PL"
  | "pt-BR"
  | "ru-RU"
  | "th-TH"
  | "tr-TR"
  | "vi-VN"
  | "zh-CN"
  | "zh-TW";

export type {
  RiotRegion,
  ValorantShard,
  ApiSuccess,
  ApiError,
  ApiResult,
  RateLimitInfo,
  Locale,
};
