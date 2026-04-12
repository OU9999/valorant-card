import Link from "next/link";
import { getLocale, getTranslations } from "next-intl/server";
import { cn } from "@/lib/cn";
import type { LegalDocumentData } from "@/constants/site/legal";
import type { Locale } from "@/i18n/request";

import {
  LegalSection,
  parseMarkdownLinks,
} from "@/components/legal/legal-shared";

interface LegalDocumentRendererProps {
  documents: Record<Locale, LegalDocumentData>;
}

const LegalDocumentRenderer = async ({
  documents,
}: LegalDocumentRendererProps) => {
  const locale = (await getLocale()) as Locale;
  const t = await getTranslations("Card");
  const data = documents[locale];

  return (
    <>
      <div className="flex items-center justify-between">
        <Link
          href="/"
          className="text-xs font-medium uppercase tracking-widest text-muted-foreground transition-colors hover:text-foreground"
        >
          &larr; {t("back")}
        </Link>
      </div>

      <h1 className="mt-6 font-heading text-3xl font-extrabold uppercase tracking-wide text-foreground">
        {data.title}
      </h1>
      <p className="mt-2 text-sm text-muted-foreground">{data.lastModified}</p>

      <div className="mt-10 space-y-10">
        {data.sections.map((section) => (
          <LegalSection key={section.title} title={section.title}>
            {section.paragraphs?.map((p, i) => (
              <p key={i} className={i > 0 ? "mt-2" : undefined}>
                {parseMarkdownLinks(p)}
              </p>
            ))}
            {section.items && (
              <ul
                className={cn(
                  "list-inside list-disc space-y-1",
                  section.paragraphs?.length && "mt-3",
                )}
              >
                {section.items.map((item, i) => (
                  <li key={i}>{parseMarkdownLinks(item)}</li>
                ))}
              </ul>
            )}
          </LegalSection>
        ))}
      </div>
    </>
  );
};

export { LegalDocumentRenderer };
