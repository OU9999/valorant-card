import { cookies } from "next/headers";
import { getRequestConfig } from "next-intl/server";

const SUPPORTED_LOCALES = ["ko", "en"] as const;
const DEFAULT_LOCALE = "ko";

type Locale = (typeof SUPPORTED_LOCALES)[number];

const isValidLocale = (value: string): value is Locale =>
  SUPPORTED_LOCALES.includes(value as Locale);

export default getRequestConfig(async () => {
  const store = await cookies();
  const raw = store.get("locale")?.value ?? "";
  const locale = isValidLocale(raw) ? raw : DEFAULT_LOCALE;

  return {
    locale,
    messages: (await import(`../../messages/${locale}.json`)).default,
  };
});

export { SUPPORTED_LOCALES, DEFAULT_LOCALE };
export type { Locale };
