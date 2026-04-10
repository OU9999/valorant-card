import { useEffect, useRef } from "react";

interface UseRsoCallbackParams {
  rsoSuccess: boolean;
  rsoError: boolean;
  onAuthRefresh: () => void;
  onSuccess: () => void;
}

/**
 * RSO 콜백 처리: 인증 성공 시 onSuccess 호출, URL 히스토리 정리.
 * ref guard로 Strict Mode 등에서의 중복 실행 방지.
 */
const useRsoCallback = ({
  rsoSuccess,
  rsoError,
  onAuthRefresh,
  onSuccess,
}: UseRsoCallbackParams) => {
  const handled = useRef(false);

  /** RSO 콜백 처리: 인증 성공 시 onSuccess 호출 및 URL 히스토리 정리 */
  useEffect(() => {
    if (handled.current || (!rsoSuccess && !rsoError)) return;
    handled.current = true;
    window.history.replaceState({}, "", "/");

    if (rsoSuccess) {
      onAuthRefresh();
      onSuccess();
    }
  }, [rsoSuccess, rsoError, onAuthRefresh, onSuccess]);
};

export { useRsoCallback };
