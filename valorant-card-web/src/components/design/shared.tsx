import type { ReactNode } from "react";

/* ─── Section Title ─── */

const SectionTitle = ({ id, children }: { id?: string; children: ReactNode }) => (
  <div id={id} className="flex items-center gap-3 scroll-mt-24">
    <div className="h-6 w-1 bg-primary" />
    <h2 className="text-lg font-bold uppercase tracking-widest text-foreground">
      {children}
    </h2>
  </div>
);

const SubSectionTitle = ({ children }: { children: ReactNode }) => (
  <h3 className="text-sm font-bold uppercase tracking-widest text-foreground">
    {children}
  </h3>
);

const SectionDescription = ({ children }: { children: ReactNode }) => (
  <p className="text-sm leading-relaxed text-muted-foreground">{children}</p>
);

/* ─── Color Swatch ─── */

interface ColorSwatchProps {
  color: string;
  label: string;
  sub: string;
  useCssVar?: boolean;
}

const ColorSwatch = ({ color, label, sub, useCssVar }: ColorSwatchProps) => (
  <div className="space-y-2">
    <div
      className="h-20 w-20 rounded-lg border border-border"
      style={{
        backgroundColor: useCssVar ? `var(${color})` : color,
      }}
    />
    <div>
      <p className="text-xs font-medium text-foreground">{label}</p>
      <p className="font-mono text-[10px] text-muted-foreground">{color}</p>
      <p className="text-[10px] text-muted-foreground">{sub}</p>
    </div>
  </div>
);

/* ─── Code Block ─── */

const CodeBlock = ({ children }: { children: ReactNode }) => (
  <div className="overflow-x-auto rounded-lg bg-secondary p-4">
    <pre className="font-mono text-xs leading-relaxed text-foreground">
      {children}
    </pre>
  </div>
);

/* ─── Info Card ─── */

interface InfoCardProps {
  title: string;
  children: ReactNode;
}

const InfoCard = ({ title, children }: InfoCardProps) => (
  <div className="rounded-lg border border-border bg-card p-5">
    <p className="mb-2 text-xs font-bold uppercase tracking-widest text-foreground">
      {title}
    </p>
    <div className="text-sm text-muted-foreground">{children}</div>
  </div>
);

/* ─── Table ─── */

interface SimpleTableProps {
  headers: string[];
  rows: string[][];
}

const SimpleTable = ({ headers, rows }: SimpleTableProps) => (
  <div className="overflow-x-auto rounded-lg border border-border">
    <table className="w-full text-left text-sm">
      <thead>
        <tr className="border-b border-border bg-secondary">
          {headers.map((h) => (
            <th
              key={h}
              className="px-4 py-2.5 text-xs font-bold uppercase tracking-widest text-foreground"
            >
              {h}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row, i) => (
          <tr key={i} className="border-b border-border last:border-b-0">
            {row.map((cell, j) => (
              <td
                key={j}
                className="px-4 py-2.5 font-mono text-xs text-muted-foreground"
              >
                {cell}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export {
  SectionTitle,
  SubSectionTitle,
  SectionDescription,
  ColorSwatch,
  CodeBlock,
  InfoCard,
  SimpleTable,
};
