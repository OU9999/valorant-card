import type { MatchDetails, RoundPlayerStats } from "@/network/riot/match";
import type { MatchMetrics } from "./tracker-score";
import { collectAllKills, detectClutch } from "./match-utils";

// ─── Types ───

type BadgeId =
  | "ace_hunter"
  | "ironwall"
  | "sharpshooter"
  | "clutch_king"
  | "undefeated"
  | "one_trick";

interface Badge {
  id: BadgeId;
  name: string;
  description: string;
}

// ─── Badge Definitions ───

const BADGE_DEFS: Record<BadgeId, Omit<Badge, "id">> = {
  ace_hunter: { name: "에이스 헌터", description: "최근 20경기에서 에이스 3회 이상" },
  ironwall: { name: "철벽", description: "평균 KAST 80% 이상" },
  sharpshooter: { name: "저격수", description: "평균 HS% 30% 이상" },
  clutch_king: { name: "클러치 킹", description: "최근 20경기에서 1vX 클러치 성공 5회 이상" },
  undefeated: { name: "무패 행진", description: "최근 10경기 연속 승리" },
  one_trick: { name: "원챔 장인", description: "모스트 에이전트 점유율 70% 이상" },
};

// ─── Badge Checkers ───

const countAces = (matches: MatchDetails[], puuid: string): number => {
  let aces = 0;

  for (const match of matches) {
    for (const round of match.roundResults) {
      const kills = collectKillsByPlayer(round.playerStats, puuid);
      if (kills >= 5) aces++;
    }
  }

  return aces;
};

const collectKillsByPlayer = (
  playerStats: RoundPlayerStats[],
  puuid: string
): number => {
  let count = 0;
  for (const ps of playerStats) {
    for (const kill of ps.kills) {
      if (kill.killer === puuid) count++;
    }
  }
  return count;
};

const countClutches = (matches: MatchDetails[], puuid: string): number => {
  let successes = 0;

  for (const match of matches) {
    const player = match.players.find((p) => p.puuid === puuid);
    if (!player) continue;

    const teammatePuuids = new Set(
      match.players
        .filter((p) => p.teamId === player.teamId && p.puuid !== puuid)
        .map((p) => p.puuid)
    );

    for (const round of match.roundResults) {
      const allKills = collectAllKills(round.playerStats);
      const result = detectClutch(
        allKills,
        puuid,
        player.teamId,
        teammatePuuids,
        round.winningTeam
      );
      if (result === true) successes++;
    }
  }

  return successes;
};

const checkUndefeated = (matchMetrics: MatchMetrics[]): boolean =>
  matchMetrics.length >= 10 &&
  matchMetrics.slice(0, 10).every((m) => m.win === 1);

const getMostPlayedRate = (
  matches: MatchDetails[],
  puuid: string
): number => {
  if (matches.length === 0) return 0;

  const counts = new Map<string, number>();

  for (const match of matches) {
    const player = match.players.find((p) => p.puuid === puuid);
    if (!player) continue;

    const id = player.characterId;
    counts.set(id, (counts.get(id) ?? 0) + 1);
  }

  const maxCount = Math.max(...counts.values(), 0);
  return maxCount / matches.length;
};

// ─── Main Entry ───

const calculateBadges = (
  matches: MatchDetails[],
  puuid: string,
  matchMetrics: MatchMetrics[]
): Badge[] => {
  const badges: Badge[] = [];

  const makeBadge = (id: BadgeId): Badge => ({ id, ...BADGE_DEFS[id] });

  if (countAces(matches, puuid) >= 3) {
    badges.push(makeBadge("ace_hunter"));
  }

  const avgKast =
    matchMetrics.reduce((sum, m) => sum + m.kast, 0) / matchMetrics.length;
  if (avgKast >= 80) {
    badges.push(makeBadge("ironwall"));
  }

  const avgHs =
    matchMetrics.reduce((sum, m) => sum + m.hsPercent, 0) / matchMetrics.length;
  if (avgHs >= 30) {
    badges.push(makeBadge("sharpshooter"));
  }

  if (countClutches(matches, puuid) >= 5) {
    badges.push(makeBadge("clutch_king"));
  }

  if (checkUndefeated(matchMetrics)) {
    badges.push(makeBadge("undefeated"));
  }

  if (getMostPlayedRate(matches, puuid) >= 0.7) {
    badges.push(makeBadge("one_trick"));
  }

  return badges;
};

export { calculateBadges, BADGE_DEFS };
export type { Badge, BadgeId };
