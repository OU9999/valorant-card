import { Loader2, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { RiotButton } from "@/components/button/riot-button";

interface HeroCtaProps {
  isLoading: boolean;
  isAuthenticated: boolean;
  error: string | null;
  onGenerate: () => void;
  onLogout: () => void;
  onLoginClick: () => void;
}

const HeroCta = ({
  isLoading,
  isAuthenticated,
  error,
  onGenerate,
  onLogout,
  onLoginClick,
}: HeroCtaProps) => {
  return (
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
            onClick={onGenerate}
          >
            카드 생성
          </Button>
          <button
            type="button"
            onClick={onLogout}
            className="flex items-center gap-1.5 text-xs text-muted-foreground transition-colors hover:text-foreground"
          >
            <LogOut className="size-3" />
            로그아웃
          </button>
        </div>
      ) : (
        <RiotButton onClick={onLoginClick} />
      )}

      {error && (
        <p role="alert" className="text-sm text-destructive">
          {error}
        </p>
      )}
    </div>
  );
};

export { HeroCta };
export type { HeroCtaProps };
