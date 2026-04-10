"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { Loader2, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { RiotButton } from "@/components/button/riot-button";
import { DataDisclosureDialog } from "@/components/home/data-disclosure-dialog";
import { CardColumn } from "@/components/home/card-column";
import { useAuthStatus } from "@/hooks/use-auth-status";
import { fetchApi } from "@/network/fetch-api";
import { COLUMN_1, COLUMN_2, COLUMN_3 } from "@/constants/card/showcase-cards";

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
    <div className="relative flex min-h-screen flex-col md:flex-row">
      <div className="flex flex-col items-center justify-center px-6 py-20 md:w-[55%] md:py-0">
        <h1 className="flex items-center gap-1.5 font-heading text-5xl font-bold tracking-wide uppercase md:text-7xl">
          <span className="text-primary">VALORANT</span>
          <span className="text-foreground">CARD</span>
        </h1>
        <p className="mt-4 text-center text-sm text-muted-foreground md:text-base">
          나만의 발로란트 카드를 만들어보세요
        </p>

        <div className="mt-8 flex flex-col items-center gap-3">
          {isLoading ? (
            <Button size="lg" className="h-12 gap-2 px-8" disabled>
              <Loader2 className="size-4 animate-spin" />
              카드 생성 중...
            </Button>
          ) : isAuthenticated ? (
            <div className="flex items-center gap-3">
              <Button
                size="lg"
                className="h-12 gap-2 px-8"
                onClick={generateCard}
              >
                카드 생성
              </Button>
              <button
                type="button"
                onClick={handleLogout}
                className="flex items-center gap-1.5 text-xs text-muted-foreground transition-colors hover:text-foreground"
              >
                <LogOut className="size-3" />
                로그아웃
              </button>
            </div>
          ) : (
            <RiotButton onClick={() => setDialogOpen(true)} />
          )}

          {state.phase === "error" && (
            <p className="text-sm text-destructive">{state.message}</p>
          )}
        </div>

        {/* TODO: DB 연동 후 실제 데이터로 교체 */}
        <div className="mt-16 flex gap-12">
          <div>
            <span className="text-4xl font-black text-foreground">0</span>
            <div className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 bg-primary" />
              <span className="text-[10px] tracking-[0.2em] text-muted-foreground uppercase">
                Cards Generated
              </span>
            </div>
          </div>
          <div>
            <span className="text-4xl font-black text-foreground">0</span>
            <div className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 bg-emerald-500" />
              <span className="text-[10px] tracking-[0.2em] text-muted-foreground uppercase">
                Cards Shared
              </span>
            </div>
          </div>
        </div>

        <DataDisclosureDialog
          open={dialogOpen}
          onOpenChange={setDialogOpen}
          onPreview={() => router.push("/card/test")}
        />
      </div>

      <div className="relative z-10 flex h-screen items-center overflow-hidden md:w-[45%]">
        <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-32 bg-gradient-to-b from-background via-background/60 to-transparent" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-32 bg-gradient-to-t from-background via-background/60 to-transparent" />

        <div className="flex h-full w-full gap-3 px-4">
          <CardColumn cards={COLUMN_1} direction="up" speed={60} delay={0.1} />
          <CardColumn
            cards={COLUMN_2}
            direction="down"
            speed={44}
            delay={0.3}
          />
          <CardColumn cards={COLUMN_3} direction="up" speed={52} delay={0.5} />
        </div>
      </div>
    </div>
  );
};

export { HeroSection };
