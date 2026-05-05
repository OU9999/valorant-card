"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";

import { cn } from "@/lib/cn";

interface NavItem {
  href: string;
  label: string;
}

const SiteHeader = () => {
  const pathname = usePathname();
  const t = useTranslations("Header");

  const items: NavItem[] = [
    { href: "/card/test", label: t("myCard") },
    { href: "/leaderboard", label: t("leaderboard") },
  ];

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-40 h-16">
      <div className="pointer-events-auto relative flex h-full items-center border-b border-white/[0.06] bg-background/40 px-4 backdrop-blur-md sm:px-6 md:px-10">
        <Link
          href="/"
          aria-label="VAL CARD"
          className="flex items-center transition-opacity hover:opacity-80"
        >
          <Image
            src="/brand/vc-mark.svg"
            alt="VAL CARD"
            width={48}
            height={43}
            priority
            className="h-8 w-auto"
          />
        </Link>

        <nav className="ml-4 flex items-center gap-3 sm:ml-6 sm:gap-5 md:ml-8 md:gap-7">
          {items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "font-heading text-xs font-bold uppercase tracking-wider transition-colors sm:text-sm sm:tracking-widest",
                isActive(item.href)
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-primary/80 to-transparent"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 -bottom-1 h-2 bg-gradient-to-r from-transparent via-primary/30 to-transparent blur-md"
        />
      </div>
    </header>
  );
};

export { SiteHeader };
