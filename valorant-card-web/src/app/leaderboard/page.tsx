import { getTranslations } from "next-intl/server";

export default async function LeaderboardPage() {
  const t = await getTranslations("Header");

  return (
    <section className="mx-auto flex min-h-[60vh] max-w-7xl flex-col items-start justify-center px-6 pt-32 pb-16 md:px-10">
      <p className="font-heading text-xs font-bold uppercase tracking-[0.3em] text-primary">
        VAL CARD
      </p>
      <h1 className="mt-3 font-heading text-5xl font-bold uppercase tracking-widest text-foreground md:text-6xl">
        {t("leaderboard")}
      </h1>
      <p className="mt-4 text-sm text-muted-foreground">{t("comingSoon")}</p>
    </section>
  );
}
