import type { SearchParams } from "next/dist/server/request/search-params";
import { HeroSection } from "@/components/home/hero-section";

interface HomePageProps {
  searchParams: Promise<SearchParams>;
}

export default async function Home({ searchParams }: HomePageProps) {
  const params = await searchParams;
  const rsoSuccess = params.authenticated === "true";
  const rsoError = typeof params.auth_error === "string";

  return <HeroSection rsoSuccess={rsoSuccess} rsoError={rsoError} />;
}
