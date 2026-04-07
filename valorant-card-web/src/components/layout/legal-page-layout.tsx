import Link from "next/link";

interface LegalPageLayoutProps {
  title: string;
  lastModified: string;
  children: React.ReactNode;
}

const LegalPageLayout = ({
  title,
  lastModified,
  children,
}: LegalPageLayoutProps) => {
  return (
    <div className="min-h-screen">
      <div className="mx-auto max-w-3xl px-6 py-16">
        <Link
          href="/"
          className="text-xs font-medium uppercase tracking-widest text-muted-foreground transition-colors hover:text-foreground"
        >
          &larr; Back
        </Link>

        <h1 className="mt-6 font-heading text-3xl font-extrabold uppercase tracking-wide text-foreground">
          {title}
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          최종 수정일: {lastModified}
        </p>

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

export { LegalPageLayout, LegalSection };
export type { LegalPageLayoutProps, LegalSectionProps };
