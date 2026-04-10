"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { HeroLayout } from "@/components/home/hero-section/hero-layout";
import { HeroContent } from "@/components/home/hero-section/hero-content";
import { HeroCta } from "@/components/home/hero-section/hero-cta";
import { HeroStats } from "@/components/home/hero-section/hero-stats";
import { CardShowcase } from "@/components/home/hero-section/card-showcase";
import { DataDisclosureDialog } from "@/components/home/data-disclosure-dialog";
import { useAuthStatus } from "@/hooks/use-auth-status";
import { fetchApi } from "@/network/fetch-api";

type HeroState =
  | { phase: "idle" }
  | { phase: "loading" }
  | { phase: "error"; message: string };

interface CardGenerateSuccess {
  id: string;
}

type CardResult =
  | { type: "success"; id: string }
  | { type: "unauthorized" }
  | { type: "error"; message: string };

const fetchCardGeneration = async (): Promise<CardResult> => {
  const result = await fetchApi<CardGenerateSuccess>("/api/card/generate", {
    method: "POST",
  });

  if (result.ok) return { type: "success", id: result.data.id };
  if (result.status === 401) return { type: "unauthorized" };

  try {
    const { error } = JSON.parse(result.error) as { error: string };
    return { type: "error", message: error };
  } catch {
    return {
      type: "error",
      message: "오류가 발생했습니다. 다시 시도해주세요.",
    };
  }
};

interface HeroSectionProps {
  rsoSuccess: boolean;
  rsoError: boolean;
}

const HeroSection = ({ rsoSuccess, rsoError }: HeroSectionProps) => {
  const [state, setState] = useState<HeroState>(() => {
    if (rsoSuccess) return { phase: "loading" };
    if (rsoError)
      return {
        phase: "error",
        message: "로그인에 실패했습니다. 다시 시도해주세요.",
      };
    return { phase: "idle" };
  });
  const [dialogOpen, setDialogOpen] = useState(false);
  const { status: authStatus, refresh: refreshAuth } = useAuthStatus();
  const router = useRouter();
  const rsoHandled = useRef(false);

  const applyCardResult = (result: CardResult) => {
    if (result.type === "unauthorized") {
      setDialogOpen(true);
      setState({ phase: "idle" });
      return;
    }
    if (result.type === "error") {
      setState({ phase: "error", message: result.message });
      return;
    }
    router.push(`/card/${result.id}`);
  };

  const generateCard = async () => {
    setState({ phase: "loading" });
    const result = await fetchCardGeneration();
    applyCardResult(result);
  };

  /**
   * RSO 콜백 처리: 인증 성공 시 카드 생성 및 /card/[id]로 이동, 실패 시 에러 표시.
   * ref guard로 Strict Mode 등에서의 중복 실행 방지.
   * loading/error 초기 상태는 useState initializer에서 설정.
   */
  useEffect(() => {
    if (rsoHandled.current || (!rsoSuccess && !rsoError)) return;
    rsoHandled.current = true;
    window.history.replaceState({}, "", "/");

    if (rsoSuccess) {
      refreshAuth();
      const run = async () => {
        const result = await fetchCardGeneration();
        applyCardResult(result);
      };
      run();
    }
  }, [rsoSuccess, rsoError, refreshAuth]);

  const handleLogout = async () => {
    await fetchApi("/api/auth/rso/logout", { method: "POST" });
    refreshAuth();
    setState({ phase: "idle" });
  };

  const isLoading = state.phase === "loading";
  const isAuthenticated = authStatus?.authenticated === true;

  return (
    <HeroLayout>
      <HeroContent>
        <HeroCta
          isLoading={isLoading}
          isAuthenticated={isAuthenticated}
          error={state.phase === "error" ? state.message : null}
          onGenerate={generateCard}
          onLogout={handleLogout}
          onLoginClick={() => setDialogOpen(true)}
        />
        <HeroStats />
        <DataDisclosureDialog
          open={dialogOpen}
          onOpenChange={setDialogOpen}
          onPreview={() => router.push("/card/test")}
        />
      </HeroContent>
      <CardShowcase />
    </HeroLayout>
  );
};

export { HeroSection };
