import Link from "next/link";

const TEST_PAGES = [
  { href: "/test/real-data", label: "Real Data Test", description: "실제 플레이어 데이터로 카드 렌더링" },
  { href: "/test/carousel", label: "Carousel Test", description: "전 티어 카드 캐러셀 & 컨트롤" },
] as const;

export default function TestPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6 bg-gray-950 p-8">
      <h1 className="text-2xl font-bold text-white">Test Pages</h1>
      <div className="flex flex-col gap-4">
        {TEST_PAGES.map((page) => (
          <Link
            key={page.href}
            href={page.href}
            className="rounded-lg bg-white/5 px-6 py-4 transition-colors hover:bg-white/10"
          >
            <p className="font-semibold text-white">{page.label}</p>
            <p className="text-sm text-white/50">{page.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
