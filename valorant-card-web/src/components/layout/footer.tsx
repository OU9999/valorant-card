import Link from "next/link";
import { getTranslations } from "next-intl/server";

const Footer = async () => {
  const t = await getTranslations("Footer");

  return (
    <footer className="relative border-t border-border bg-card">
      <div className="mx-auto max-w-7xl px-6 py-10">
        {/* Riot disclaimer */}
        <div className="border-l-2 border-primary px-5 py-4">
          <p className="text-xs leading-relaxed text-muted-foreground">
            {t("disclaimer")}
          </p>
        </div>

        {/* Links + Copyright */}
        <div className="mt-6 flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:justify-between">
          <nav className="flex gap-4">
            <Link
              href="/privacy"
              className="text-xs font-medium uppercase tracking-widest text-muted-foreground transition-colors hover:text-foreground"
            >
              {t("privacyPolicy")}
            </Link>
            <Link
              href="/terms"
              className="text-xs font-medium uppercase tracking-widest text-muted-foreground transition-colors hover:text-foreground"
            >
              {t("termsOfService")}
            </Link>
          </nav>
          <p className="text-xs text-muted-foreground/50">
            &copy; {new Date().getFullYear()} VAL CARD
          </p>
        </div>
      </div>
    </footer>
  );
};

export { Footer };
