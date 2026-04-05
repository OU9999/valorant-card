import { NextResponse } from "next/server";
import { saveCard } from "@/lib/card/store";
import type { GeneratedCardData } from "@/lib/card/generate";

const DEMO_CARD_DATA: GeneratedCardData = {
  playerName: "Player",
  tagLine: "KR1",
  tierName: "Diamond",
  competitiveTier: 20,
  ovr: 72,
  stats: [
    { label: "ACS", value: "243" },
    { label: "K/D", value: "1.32" },
    { label: "HS%", value: "28.4" },
    { label: "DDΔ", value: "+12" },
    { label: "KAST", value: "71.2" },
    { label: "ADR", value: "158" },
  ],
  agentId: "add6443a-41bd-e414-f6ad-e58d267f4e95",
  weaponId: "9c82e19d-4575-0200-1a81-3eacf00cf872",
  region: "KR",
  trend: "stable",
  badges: [],
};

const POST = async (): Promise<NextResponse> => {
  const id = saveCard(DEMO_CARD_DATA);
  return NextResponse.json({ id });
};

export { POST };
