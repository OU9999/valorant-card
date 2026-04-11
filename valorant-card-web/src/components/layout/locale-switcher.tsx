"use client";

import { useRouter } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";

const LocaleSwitcher = () => {
  const locale = useLocale();
  const router = useRouter();
  const t = useTranslations("LocaleSwitcher");

  const switchTo = locale === "ko" ? "en" : "ko";

  const handleSwitch = () => {
    document.cookie = `locale=${switchTo};path=/;max-age=31536000`;
    router.refresh();
  };

  return (
    <button
      type="button"
      onClick={handleSwitch}
      className="rounded border border-border px-2.5 py-1 text-xs font-medium text-muted-foreground transition-colors hover:border-foreground hover:text-foreground"
    >
      {t(switchTo)}
    </button>
  );
};

export { LocaleSwitcher };
