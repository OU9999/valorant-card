import { Fragment } from "react";

const MARKDOWN_LINK_SPLIT_RE = /(\[[^\]]+\]\([^)]+\))/;
const MARKDOWN_LINK_MATCH_RE = /\[([^\]]+)\]\(([^)]+)\)/;

interface LegalLayoutProps {
  children: React.ReactNode;
}

const LegalLayout = ({ children }: LegalLayoutProps) => {
  return (
    <section className="min-h-screen">
      <div className="mx-auto max-w-3xl px-6 py-16">{children}</div>
    </section>
  );
};

interface LegalSectionProps {
  title: string;
  children: React.ReactNode;
}

const LegalSection = ({ title, children }: LegalSectionProps) => {
  return (
    <section className="border-l-2 border-primary px-5 py-1">
      <h2 className="text-sm font-bold uppercase tracking-widest text-foreground">
        {title}
      </h2>
      <div className="mt-3 text-sm leading-relaxed text-muted-foreground">
        {children}
      </div>
    </section>
  );
};

const parseMarkdownLinks = (text: string): React.ReactNode => {
  const parts = text.split(MARKDOWN_LINK_SPLIT_RE);
  if (parts.length === 1) return text;

  return parts.map((part, i) => {
    const match = part.match(MARKDOWN_LINK_MATCH_RE);
    if (!match) return <Fragment key={i}>{part}</Fragment>;
    const isExternal = match[2].startsWith("http");
    return (
      <a
        key={i}
        href={match[2]}
        className="text-primary transition-colors hover:text-primary/80"
        {...(isExternal
          ? { target: "_blank", rel: "noopener noreferrer" }
          : {})}
      >
        {match[1]}
      </a>
    );
  });
};

export { LegalLayout, LegalSection, parseMarkdownLinks };
export type { LegalLayoutProps, LegalSectionProps };
