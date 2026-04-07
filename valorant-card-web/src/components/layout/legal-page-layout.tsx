import Link from "next/link";
import { Fragment } from "react";

interface LegalPageLayoutProps {
  title: string;
  lastModified: string;
  actions?: React.ReactNode;
  children: React.ReactNode;
}

const LegalPageLayout = ({
  title,
  lastModified,
  actions,
  children,
}: LegalPageLayoutProps) => {
  return (
    <div className="min-h-screen">
      <div className="mx-auto max-w-3xl px-6 py-16">
        <div className="flex items-center justify-between">
          <Link
            href="/"
            className="text-xs font-medium uppercase tracking-widest text-muted-foreground transition-colors hover:text-foreground"
          >
            &larr; Back
          </Link>
          {actions}
        </div>

        <h1 className="mt-6 font-heading text-3xl font-extrabold uppercase tracking-wide text-foreground">
          {title}
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">{lastModified}</p>

        <div className="mt-10 space-y-10">{children}</div>
      </div>
    </div>
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
  const parts = text.split(/(\[[^\]]+\]\([^)]+\))/);
  if (parts.length === 1) return text;

  return parts.map((part, i) => {
    const match = part.match(/\[([^\]]+)\]\(([^)]+)\)/);
    if (!match) return <Fragment key={i}>{part}</Fragment>;
    const isExternal = !match[2].startsWith("mailto:");
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

export { LegalPageLayout, LegalSection, parseMarkdownLinks };
export type { LegalPageLayoutProps, LegalSectionProps };
