"use client";

import { Globe } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { setLocale } from "@/i18n/actions";
import type { Locale } from "@/i18n/request";

const LOCALES: Locale[] = ["ko", "en"];

const LocaleSwitcher = () => {
  const locale = useLocale() as Locale;
  const t = useTranslations("LocaleSwitcher");

  const handleChange = async (value: string) => {
    await setLocale(value as Locale);
  };

  return (
    <div className="fixed top-4 right-4 z-50">
      <Select value={locale} onValueChange={handleChange}>
        <SelectTrigger
          size="sm"
          className="cursor-pointer gap-2 rounded-none border-0 border-l-2 border-primary bg-card/80 px-3 py-1.5 font-heading text-xs font-bold uppercase tracking-widest text-foreground shadow-none backdrop-blur-sm transition-colors hover:bg-primary/10 hover:text-primary focus-visible:ring-primary/40 data-[state=open]:bg-primary/10 data-[state=open]:text-primary"
        >
          <Globe className="size-3.5 text-primary" />
          <SelectValue />
        </SelectTrigger>
        <SelectContent
          align="end"
          className="rounded-none border-l-2 border-primary bg-card/95 backdrop-blur-sm"
        >
          {LOCALES.map((loc) => (
            <SelectItem
              key={loc}
              value={loc}
              className="cursor-pointer font-heading text-xs font-bold uppercase tracking-widest transition-colors focus:bg-primary/10 focus:text-primary data-[state=checked]:text-primary"
            >
              {t(loc)}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export { LocaleSwitcher };
