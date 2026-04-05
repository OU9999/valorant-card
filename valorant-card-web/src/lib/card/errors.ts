type CardErrorCode =
  | "INVALID_RIOT_ID"
  | "ACCOUNT_NOT_FOUND"
  | "NO_MATCHES"
  | "RATE_LIMITED"
  | "API_KEY_EXPIRED"
  | "INTERNAL_ERROR";

class CardGenerationError extends Error {
  readonly code: CardErrorCode;
  readonly statusCode: number;
  readonly retryAfter?: number;

  constructor(code: CardErrorCode, message: string, statusCode: number, retryAfter?: number) {
    super(message);
    this.name = "CardGenerationError";
    this.code = code;
    this.statusCode = statusCode;
    this.retryAfter = retryAfter;
  }
}

const ERROR_MESSAGES: Record<CardErrorCode, string> = {
  INVALID_RIOT_ID: "올바른 Riot ID 형식이 아닙니다. (예: Player#TAG)",
  ACCOUNT_NOT_FOUND: "해당 Riot ID를 찾을 수 없습니다.",
  NO_MATCHES: "최근 경쟁전 매치 기록이 없습니다.",
  RATE_LIMITED: "요청이 많아 잠시 후 다시 시도해주세요.",
  API_KEY_EXPIRED: "서버 점검 중입니다. 잠시 후 다시 시도해주세요.",
  INTERNAL_ERROR: "오류가 발생했습니다. 다시 시도해주세요.",
};

export { CardGenerationError, ERROR_MESSAGES };
export type { CardErrorCode };
