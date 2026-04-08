"use client";

import { useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/cn";
import type { LegalDocumentData } from "@/constants/legal";

import {
  LegalSection,
  parseMarkdownLinks,
} from "@/components/legal/legal-shared";

type Lang = "en" | "ko";

const LANGS: Lang[] = ["en", "ko"];

interface LegalDocumentRendererProps {
  documents: Record<Lang, LegalDocumentData>;
}

const LegalDocumentRenderer = ({ documents }: LegalDocumentRendererProps) => {
  const [lang, setLang] = useState<Lang>("en");
  const data = documents[lang];

  return (
    <>
      <div className="flex items-center justify-between">
        <Link
          href="/"
          className="text-xs font-medium uppercase tracking-widest text-muted-foreground transition-colors hover:text-foreground"
        >
          &larr; Back
        </Link>
        <div className="flex items-center gap-2">
          {LANGS.map((l, i) => (
            <div key={l} className="flex items-center gap-2">
              {i > 0 && (
                <span className="text-muted-foreground/50">|</span>
              )}
              <button
                onClick={() => setLang(l)}
                className={cn(
                  "text-xs font-medium uppercase tracking-widest transition-colors",
                  lang === l
                    ? "text-primary"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                {l.toUpperCase()}
              </button>
            </div>
          ))}
        </div>
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
