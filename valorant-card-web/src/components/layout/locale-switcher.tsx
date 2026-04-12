"use client";

import { useLocale, useTranslations } from "next-intl";
import { setLocale } from "@/i18n/actions";
import type { Locale } from "@/i18n/request";

const LocaleSwitcher = () => {
  const locale = useLocale();
  const t = useTranslations("LocaleSwitcher");

  const switchTo: Locale = locale === "ko" ? "en" : "ko";

  const handleSwitch = async () => {
    await setLocale(switchTo);
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
