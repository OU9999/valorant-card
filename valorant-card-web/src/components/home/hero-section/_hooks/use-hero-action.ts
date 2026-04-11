"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { fetchApi } from "@/network/fetch-api";
import { useCardState } from "./use-hero-action/use-card-state";
import { useHeroAuth } from "./use-hero-action/use-hero-auth";
import { useRsoCallback } from "./use-hero-action/use-rso-callback";

interface CardGenerateSuccess {
  id: string;
}

type CardResult =
  | { type: "success"; id: string }
  | { type: "unauthorized" }
  | { type: "error"; message: string };

const fetchCardGeneration = async (
  fallbackError: string,
): Promise<CardResult> => {
  const result = await fetchApi<CardGenerateSuccess>("/api/card/generate", {
    method: "POST",
  });

  if (result.ok) return { type: "success", id: result.data.id };
  if (result.status === 401) return { type: "unauthorized" };

  try {
    const { error } = JSON.parse(result.error) as { error: string };
    return { type: "error", message: error };
  } catch {
    return { type: "error", message: fallbackError };
  }
};

const useHeroAction = () => {
  const searchParams = useSearchParams();
  const rsoSuccess = searchParams.get("authenticated") === "true";
  const rsoError = searchParams.has("auth_error");

  const t = useTranslations("Error");
  const card = useCardState({ rsoSuccess, rsoError });
  const auth = useHeroAuth();
  const [dialogOpen, setDialogOpen] = useState(false);
  const router = useRouter();

  const applyCardResult = (result: CardResult) => {
    if (result.type === "unauthorized") {
      setDialogOpen(true);
      card.setIdle();
      return;
    }
    if (result.type === "error") {
      card.setError(result.message);
      return;
    }
    router.push(`/card/${result.id}`);
  };

  const generateCard = async () => {
    card.setLoading();
    const result = await fetchCardGeneration(t("generic"));
    applyCardResult(result);
  };

  const handleLogout = async () => {
    await auth.logout();
    card.setIdle();
  };

  useRsoCallback({
    rsoSuccess,
    rsoError,
    onAuthRefresh: auth.refresh,
    onSuccess: async () => {
      const result = await fetchCardGeneration(t("generic"));
      applyCardResult(result);
    },
  });

  return {
    isLoading: card.isLoading,
    isAuthenticated: auth.isAuthenticated,
    error: card.error,
    dialogOpen,
    setDialogOpen,
    generateCard,
    handleLogout,
    navigateToPreview: () => router.push("/card/test"),
  };
};

export { useHeroAction };
