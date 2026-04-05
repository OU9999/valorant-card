import { useState, useEffect } from "react";

interface AuthStatus {
  authenticated: boolean;
}

interface UseAuthStatusReturn {
  status: AuthStatus | null;
  refresh: () => void;
}

const useAuthStatus = (): UseAuthStatusReturn => {
  const [status, setStatus] = useState<AuthStatus | null>(null);
  const [trigger, setTrigger] = useState(0);

  /**
   * 마운트 시 및 trigger 변경 시 /api/auth/status를 fetch하여 인증 상태를 갱신한다.
   * trigger는 refresh() 호출 시 증가하여 재요청을 유발한다.
   */
  useEffect(() => {
    let cancelled = false;

    const fetchStatus = async () => {
      try {
        const res = await fetch("/api/auth/status");
        const data = (await res.json()) as AuthStatus;
        if (!cancelled) setStatus(data);
      } catch {
        if (!cancelled) setStatus({ authenticated: false });
      }
    };

    fetchStatus();

    return () => {
      cancelled = true;
    };
  }, [trigger]);

  const refresh = () => setTrigger((prev) => prev + 1);

  return { status, refresh };
};

export { useAuthStatus };
export type { AuthStatus };
