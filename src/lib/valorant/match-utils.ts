import type { RoundPlayerStats, Kill } from "@/network/riot/match";

// ─── Constants ───

const RECENCY_DECAY = 0.97;
const BAYESIAN_PRIOR_WINS = 5;
const BAYESIAN_PRIOR_TOTAL = 10;

// ─── Helpers ───

const clamp = (value: number, min: number, max: number): number =>
  Math.min(max, Math.max(min, value));

const collectAllKills = (playerStats: RoundPlayerStats[]): Kill[] => {
  const kills: Kill[] = [];
  for (const ps of playerStats) {
    kills.push(...ps.kills);
  }
  return kills;
};

/**
 * First Blood 판정: 라운드 최초 킬/데스 이벤트에서 해당 플레이어 관여 여부
 */
const detectFirstBlood = (
  allKills: Kill[],
  puuid: string
): "kill" | "death" | null => {
  if (allKills.length === 0) return null;

  const sorted = [...allKills].sort(
    (a, b) => a.timeSinceRoundStartMillis - b.timeSinceRoundStartMillis
  );
  const first = sorted[0];

  if (first.killer === puuid) return "kill";
  if (first.victim === puuid) return "death";
  return null;
};

/**
 * 클러치 판정: 팀원이 모두 죽고 혼자 남은 상태에서 라운드 승리
 * 킬 이벤트를 시간순으로 추적하여 팀원 생존 수를 계산
 */
const detectClutch = (
  allKills: Kill[],
  puuid: string,
  teamId: string,
  teammatePuuids: Set<string>,
  winningTeam: string
): boolean | null => {
  const sorted = [...allKills].sort(
    (a, b) => a.timeSinceRoundStartMillis - b.timeSinceRoundStartMillis
  );

  let teammatesAlive = teammatePuuids.size;
  let playerDied = false;

  for (const kill of sorted) {
    if (kill.victim === puuid) {
      playerDied = true;
      break;
    }
    if (teammatePuuids.has(kill.victim)) {
      teammatesAlive--;
    }
  }

  if (playerDied) return null;
  if (teammatesAlive > 0) return null;

  return winningTeam === teamId;
};

export {
  RECENCY_DECAY,
  BAYESIAN_PRIOR_WINS,
  BAYESIAN_PRIOR_TOTAL,
  clamp,
  collectAllKills,
  detectFirstBlood,
  detectClutch,
};
