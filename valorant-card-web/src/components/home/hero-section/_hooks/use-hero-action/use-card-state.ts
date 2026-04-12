import { useState } from "react";
import { useTranslations } from "next-intl";

type HeroState =
  | { phase: "idle" }
  | { phase: "loading" }
  | { phase: "error"; message: string };

interface UseCardStateParams {
  rsoSuccess: boolean;
  rsoError: boolean;
}

const useCardState = ({ rsoSuccess, rsoError }: UseCardStateParams) => {
  const t = useTranslations("Error");

  const [state, setState] = useState<HeroState>(() => {
    if (rsoSuccess) return { phase: "loading" };
    if (rsoError) return { phase: "error", message: t("loginFailed") };
    return { phase: "idle" };
  });

  return {
    isLoading: state.phase === "loading",
    error: state.phase === "error" ? state.message : null,
    setIdle: () => setState({ phase: "idle" }),
    setLoading: () => setState({ phase: "loading" }),
    setError: (message: string) => setState({ phase: "error", message }),
  };
};

export { useCardState };
