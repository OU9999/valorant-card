import { cookies, headers } from "next/headers";
import { getRequestConfig } from "next-intl/server";

const SUPPORTED_LOCALES = ["ko", "en"] as const;

type Locale = (typeof SUPPORTED_LOCALES)[number];

const FALLBACK_LOCALE: Locale = "en";

const isValidLocale = (value: string): value is Locale =>
  SUPPORTED_LOCALES.includes(value as Locale);

const detectLocaleFromHeader = (header: string): Locale => {
  const primary = header.split(",")[0]?.trim().toLowerCase() ?? "";
  if (primary.startsWith("ko")) return "ko";
  return FALLBACK_LOCALE;
};

const resolveLocale = async (): Promise<Locale> => {
  const store = await cookies();
  const stored = store.get("locale")?.value ?? "";
  if (isValidLocale(stored)) return stored;

  const h = await headers();
  return detectLocaleFromHeader(h.get("accept-language") ?? "");
};

export default getRequestConfig(async () => {
  const locale = await resolveLocale();

  return {
    locale,
    messages: (await import(`../../messages/${locale}.json`)).default,
  };
});

export { SUPPORTED_LOCALES, FALLBACK_LOCALE };
export type { Locale };
