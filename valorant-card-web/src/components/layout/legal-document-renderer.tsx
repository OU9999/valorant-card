"use client";

import { useState } from "react";

import type { LegalDocumentData } from "@/constants/legal";

import {
  LegalPageLayout,
  LegalSection,
  parseMarkdownLinks,
} from "./legal-page-layout";

type Lang = "en" | "ko";

interface LegalDocumentRendererProps {
  documents: Record<Lang, LegalDocumentData>;
}

const LegalDocumentRenderer = ({ documents }: LegalDocumentRendererProps) => {
  const [lang, setLang] = useState<Lang>("en");
  const data = documents[lang];

  const langToggle = (
    <div className="flex items-center gap-2">
      <button
        onClick={() => setLang("en")}
        className={`text-xs font-medium uppercase tracking-widest transition-colors ${
          lang === "en"
            ? "text-primary"
            : "text-muted-foreground hover:text-foreground"
        }`}
      >
        EN
      </button>
      <span className="text-muted-foreground/50">|</span>
      <button
        onClick={() => setLang("ko")}
        className={`text-xs font-medium uppercase tracking-widest transition-colors ${
          lang === "ko"
            ? "text-primary"
            : "text-muted-foreground hover:text-foreground"
        }`}
      >
        KO
      </button>
    </div>
  );

  return (
    <LegalPageLayout
      title={data.title}
      lastModified={data.lastModified}
      actions={langToggle}
    >
      {data.sections.map((section) => (
        <LegalSection key={section.title} title={section.title}>
          {section.paragraphs?.map((p, i) => (
            <p key={i} className={i > 0 ? "mt-2" : undefined}>
              {parseMarkdownLinks(p)}
            </p>
          ))}
          {section.items && (
            <ul
              className={`list-inside list-disc space-y-1${section.paragraphs && section.paragraphs.length > 0 ? " mt-3" : ""}`}
            >
              {section.items.map((item, i) => (
                <li key={i}>{parseMarkdownLinks(item)}</li>
              ))}
            </ul>
          )}
        </LegalSection>
      ))}
    </LegalPageLayout>
  );
};

export { LegalDocumentRenderer };
