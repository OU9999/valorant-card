import { useState } from "react";

type HeroState =
  | { phase: "idle" }
  | { phase: "loading" }
  | { phase: "error"; message: string };

const resolveInitialState = (
  rsoSuccess: boolean,
  rsoError: boolean,
): HeroState => {
  if (rsoSuccess) return { phase: "loading" };
  if (rsoError)
    return {
      phase: "error",
      message: "로그인에 실패했습니다. 다시 시도해주세요.",
    };
  return { phase: "idle" };
};

interface UseCardStateParams {
  rsoSuccess: boolean;
  rsoError: boolean;
}

const useCardState = ({ rsoSuccess, rsoError }: UseCardStateParams) => {
  const [state, setState] = useState<HeroState>(() =>
    resolveInitialState(rsoSuccess, rsoError),
  );

  return {
    isLoading: state.phase === "loading",
    error: state.phase === "error" ? state.message : null,
    setIdle: () => setState({ phase: "idle" }),
    setLoading: () => setState({ phase: "loading" }),
    setError: (message: string) => setState({ phase: "error", message }),
  };
};

export { useCardState };
