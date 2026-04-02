import Link from "next/link";

const TEST_PAGES = [
  { href: "/test/real-data", label: "Real Data Test", description: "실제 플레이어 데이터로 카드 렌더링" },
  { href: "/test/carousel", label: "Carousel Test", description: "전 티어 카드 캐러셀 & 컨트롤" },
  { href: "/test/size", label: "Card Size Test", description: "카드 크기별 비율 비교 (Original vs cqw)" },
] as const;

export default function TestPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6 bg-background p-8">
      <h1 className="text-2xl font-bold text-foreground">Test Pages</h1>
      <div className="flex flex-col gap-4">
        {TEST_PAGES.map((page) => (
          <Link
            key={page.href}
            href={page.href}
            className="rounded-lg bg-secondary px-6 py-4 transition-colors hover:bg-accent"
          >
            <p className="font-semibold text-foreground">{page.label}</p>
            <p className="text-sm text-muted-foreground">{page.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
