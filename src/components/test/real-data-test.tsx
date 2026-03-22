"use client";

import { useEffect, useState } from "react";
import type { StaticImageData } from "next/image";
import ironCard from "@/asset/example/tier-card/iron.png";
import bronzeCard from "@/asset/example/tier-card/bronze.png";
import silverCard from "@/asset/example/tier-card/silver.png";
import goldCard from "@/asset/example/tier-card/gold.png";
import platinumCard from "@/asset/example/tier-card/platinum.png";
import diamondCard from "@/asset/example/tier-card/diamond.png";
import ascendantCard from "@/asset/example/tier-card/ascendant.png";
import immortalCard from "@/asset/example/tier-card/immortal.png";
import radiantCard from "@/asset/example/tier-card/radiant.png";
import { TierCard } from "@/components/card/tier-card";
import { Label } from "@/components/ui/label";
import { TestLayout } from "./test-layout";
import { adaptHenrikMatch } from "@/lib/henrik/adapter";
import { calculateCardScore, formatCardStats, findMostUsedWeapon } from "@/lib/valorant/card-stats";
import type { CardScoreResult } from "@/lib/valorant/card-stats";
import { getTierIndex } from "@/lib/valorant/tiers";
import { CHARACTERS } from "@/constants/characters";
import { SHARD_DISPLAY_NAMES } from "@/constants/regions";
import { getWeaponIconUrl } from "@/constants/weapons";
import { TIER_NAMES } from "@/constants/tier-design";
import type { TierName } from "@/constants/tier-design";
import type { MatchDetails } from "@/network/riot/match";
import type {
  HenrikMatchesResponse,
  HenrikAccountResponse,
  HenrikMmrResponse,
} from "@/lib/henrik/types";

// ─── Constants ───

const TIER_CARD_IMAGES: Record<TierName, StaticImageData> = {
  Iron: ironCard,
  Bronze: bronzeCard,
  Silver: silverCard,
  Gold: goldCard,
  Platinum: platinumCard,
  Diamond: diamondCard,
  Ascendant: ascendantCard,
  Immortal: immortalCard,
  Radiant: radiantCard,
};

// ─── Helpers ───

const getTierName = (competitiveTier: number): TierName => {
  const index = getTierIndex(competitiveTier);
  if (index < 0 || index >= TIER_NAMES.length) return "Iron";
  return TIER_NAMES[index];
};

const findMostPlayedAgent = (
  matches: MatchDetails[],
  puuid: string,
): string => {
  const counts = new Map<string, number>();

  for (const match of matches) {
    const player = match.players.find((p) => p.puuid === puuid);
    if (!player) continue;
    const id = player.characterId;
    counts.set(id, (counts.get(id) ?? 0) + 1);
  }

  let maxId = "";
  let maxCount = 0;
  for (const [id, count] of counts) {
    if (count > maxCount) {
      maxId = id;
      maxCount = count;
    }
  }

  return maxId;
};

const getPortraitUrl = (characterId: string): string => {
  const char = CHARACTERS.find(
    (c) => c.id.toUpperCase() === characterId.toUpperCase(),
  );
  return char?.fullPortrait ?? CHARACTERS[0].fullPortrait;
};

// ─── Data Fetching ───

interface FixtureData {
  matches: MatchDetails[];
  puuid: string;
  name: string;
  tag: string;
  competitiveTier: number;
  rr: number;
  region: string;
}

const loadFixtures = async (): Promise<FixtureData> => {
  const [accountRes, mmrRes, matchesRes] = await Promise.all([
    fetch("/fixtures/henrik-account.json"),
    fetch("/fixtures/henrik-mmr.json"),
    fetch("/fixtures/henrik-matches.json"),
  ]);

  const account: HenrikAccountResponse = await accountRes.json();
  const mmr: HenrikMmrResponse = await mmrRes.json();
  const matchesData: HenrikMatchesResponse = await matchesRes.json();

  const matches = matchesData.data.map(adaptHenrikMatch);

  return {
    matches,
    puuid: account.data.puuid,
    name: account.data.name,
    tag: account.data.tag,
    competitiveTier: mmr.data.current.tier.id,
    rr: mmr.data.current.rr,
    region: account.data.region,
  };
};

// ─── Component ───

const RealDataTest = () => {
  const [fixture, setFixture] = useState<FixtureData | null>(null);
  const [result, setResult] = useState<CardScoreResult | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  /** fixture 로드 → 어댑터 변환 → 알고리즘 실행 */
  useEffect(() => {
    loadFixtures()
      .then((data) => {
        setFixture(data);
        const score = calculateCardScore(
          data.matches,
          data.puuid,
          data.competitiveTier,
        );
        setResult(score);
        setLoading(false);
      })
      .catch((err: unknown) => {
        const message = err instanceof Error ? err.message : String(err);
        setError(message);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-950">
        <p className="text-white/60">Loading fixture data...</p>
      </div>
    );
  }

  if (error || !fixture || !result) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-950">
        <p className="text-red-400">{error ?? "알고리즘 실행 실패"}</p>
      </div>
    );
  }

  const tierName = getTierName(fixture.competitiveTier);
  const agentId = findMostPlayedAgent(fixture.matches, fixture.puuid);
  const portraitUrl = getPortraitUrl(agentId);
  const formattedStats = formatCardStats(result.stats);
  const regionDisplay =
    SHARD_DISPLAY_NAMES[fixture.region as keyof typeof SHARD_DISPLAY_NAMES] ??
    fixture.region.toUpperCase();
  const topWeaponId = findMostUsedWeapon(fixture.matches, fixture.puuid);
  const weaponIconUrl = topWeaponId ? getWeaponIconUrl(topWeaponId) : undefined;

  const trendLabel =
    result.trend === "up" ? "상승" : result.trend === "down" ? "하락" : "유지";
  const trendIcon =
    result.trend === "up" ? "▲" : result.trend === "down" ? "▼" : "─";
  const trendColor =
    result.trend === "up"
      ? "text-green-400"
      : result.trend === "down"
        ? "text-red-400"
        : "text-white/60";

  return (
    <TestLayout
      cardArea={
        <TierCard
          tierName={tierName}
          competitiveTier={fixture.competitiveTier}
          backgroundImage={TIER_CARD_IMAGES[tierName]}
          portraitUrl={portraitUrl}
          ovr={result.ovr}
          playerName={fixture.name}
          region={regionDisplay}
          weaponIconUrl={weaponIconUrl}
          stats={formattedStats}
          className="h-[80vh]"
        />
      }
      sidePanel={
        <>
          {/* Player Info */}
          <section>
            <Label className="mb-3 text-xs tracking-wider text-white/50">
              PLAYER
            </Label>
            <div className="flex flex-col gap-1">
              <p className="text-lg font-bold text-white">
                {fixture.name}#{fixture.tag}
              </p>
              <p className="text-sm text-white/60">
                {tierName} · RR {fixture.rr} · {fixture.matches.length} matches
              </p>
            </div>
          </section>

          {/* OVR */}
          <section>
            <Label className="mb-3 text-xs tracking-wider text-white/50">
              OVERALL RATING
            </Label>
            <p className="text-5xl font-black text-white">{result.ovr}</p>
          </section>

          {/* Stats */}
          <section>
            <Label className="mb-3 text-xs tracking-wider text-white/50">
              STATS (weighted avg)
            </Label>
            <div className="flex flex-col gap-2">
              {formattedStats.map((stat) => (
                <div
                  key={stat.label}
                  className="flex items-center justify-between"
                >
                  <span className="text-sm text-white/60">{stat.label}</span>
                  <span className="font-mono text-sm font-semibold text-white">
                    {stat.value}
                  </span>
                </div>
              ))}
            </div>
          </section>

          {/* Form Trend */}
          <section>
            <Label className="mb-3 text-xs tracking-wider text-white/50">
              FORM TREND
            </Label>
            <p className={`text-lg font-bold ${trendColor}`}>
              {trendIcon} {trendLabel}
            </p>
          </section>

          {/* Badges */}
          <section>
            <Label className="mb-3 text-xs tracking-wider text-white/50">
              BADGES
            </Label>
            {result.badges.length > 0 ? (
              <div className="flex flex-col gap-2">
                {result.badges.map((badge) => (
                  <div
                    key={badge.id}
                    className="rounded-md bg-white/5 px-3 py-2"
                  >
                    <p className="text-sm font-semibold text-white">
                      {badge.name}
                    </p>
                    <p className="text-xs text-white/40">{badge.description}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-white/40">뱃지 없음</p>
            )}
          </section>

          {/* Raw Data */}
          <section>
            <Label className="mb-3 text-xs tracking-wider text-white/50">
              RAW ALGORITHM OUTPUT
            </Label>
            <pre className="max-h-48 overflow-auto rounded-md bg-black/40 p-3 text-xs text-white/60">
              {JSON.stringify(result, null, 2)}
            </pre>
          </section>
        </>
      }
    />
  );
};

export { RealDataTest };
