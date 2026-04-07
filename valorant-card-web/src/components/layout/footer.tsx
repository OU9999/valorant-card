import Link from "next/link";

const Footer = () => {
  return (
    <footer className="relative border-t border-border bg-card">
      <div className="mx-auto max-w-7xl px-6 py-10">
        {/* Riot disclaimer */}
        <div className="border-l-2 border-primary px-5 py-4">
          <p className="text-xs leading-relaxed text-muted-foreground">
            Valorant Card isn&apos;t endorsed by Riot Games and doesn&apos;t
            reflect the views or opinions of Riot Games or anyone officially
            involved in producing or managing Riot Games properties. Riot Games,
            and all associated properties are trademarks or registered trademarks
            of Riot Games, Inc.
          </p>
          <p className="mt-2 text-xs leading-relaxed text-muted-foreground/70">
            Valorant Card는 Riot Games의 보증을 받지 않았으며, Riot Games 또는
            Riot Games 자산의 제작/관리에 공식적으로 관여하는 관계자의 견해나
            의견을 반영하지 않습니다. Riot Games 및 모든 관련 자산은 Riot Games,
            Inc.의 상표 또는 등록상표입니다.
          </p>
        </div>

        {/* Links + Copyright */}
        <div className="mt-6 flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:justify-between">
          <nav className="flex gap-4">
            <Link
              href="/privacy"
              className="text-xs font-medium uppercase tracking-widest text-muted-foreground transition-colors hover:text-foreground"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="text-xs font-medium uppercase tracking-widest text-muted-foreground transition-colors hover:text-foreground"
            >
              Terms of Service
            </Link>
          </nav>
          <p className="text-xs text-muted-foreground/50">
            &copy; {new Date().getFullYear()} Valorant Card
          </p>
        </div>
      </div>
    </footer>
  );
};

export { Footer };
