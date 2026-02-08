class RiotApiError extends Error {
  readonly status: number;
  readonly code: string;

  constructor(status: number, message: string, code: string = "RIOT_API_ERROR") {
    super(message);
    this.name = "RiotApiError";
    this.status = status;
    this.code = code;
  }
}

class RiotRateLimitError extends RiotApiError {
  readonly retryAfter: number;

  constructor(retryAfter: number) {
    super(429, `Rate limited. Retry after ${retryAfter}s`, "RATE_LIMITED");
    this.name = "RiotRateLimitError";
    this.retryAfter = retryAfter;
  }
}

class RiotAuthError extends RiotApiError {
  constructor(message: string = "Authentication required") {
    super(401, message, "AUTH_ERROR");
    this.name = "RiotAuthError";
  }
}

export { RiotApiError, RiotRateLimitError, RiotAuthError };
