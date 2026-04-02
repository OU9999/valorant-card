// ─── Types ───

interface FetchOptions {
  method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  headers?: Record<string, string>;
  body?: unknown;
  cache?: RequestCache;
  signal?: AbortSignal;
  next?: NextFetchRequestConfig;
}

interface FetchSuccess<T> {
  ok: true;
  data: T;
  status: number;
}

interface FetchError {
  ok: false;
  error: string;
  status: number;
}

type FetchResult<T> = FetchSuccess<T> | FetchError;

/**
 * Next.js fetch 확장 옵션
 * @see https://nextjs.org/docs/app/api-reference/functions/fetch#fetchurl-options
 */
interface NextFetchRequestConfig {
  revalidate?: number | false;
  tags?: string[];
}

// ─── Helpers ───

const buildRequestInit = (options: FetchOptions): RequestInit => {
  const {
    method = "GET",
    headers = {},
    body,
    cache = "no-store",
    signal,
    next,
  } = options;

  const init: RequestInit & { next?: NextFetchRequestConfig } = {
    method,
    headers: { "Content-Type": "application/json", ...headers },
    cache,
    signal,
  };

  if (next) {
    init.next = next;
  }

  if (body) {
    init.body = JSON.stringify(body);
  }

  return init;
};

// ─── Core ───

const fetchApi = async <T>(
  endpoint: string,
  options: FetchOptions = {},
): Promise<FetchResult<T>> => {
  const init = buildRequestInit(options);

  let response: Response;

  try {
    response = await fetch(endpoint, init);
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "알 수 없는 네트워크 오류";
    return { ok: false, error: message, status: 0 };
  }

  if (!response.ok) {
    const errorText = await response.text().catch(() => "");
    return {
      ok: false,
      error: errorText || response.statusText,
      status: response.status,
    };
  }

  const text = await response.text();

  if (!text) {
    return { ok: true, data: null as T, status: response.status };
  }

  try {
    const data = JSON.parse(text) as T;
    return { ok: true, data, status: response.status };
  } catch {
    return {
      ok: false,
      error: "유효하지 않은 JSON 응답",
      status: response.status,
    };
  }
};

export { fetchApi };
export type { FetchOptions, FetchSuccess, FetchError, FetchResult };
