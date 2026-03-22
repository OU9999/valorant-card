import { describe, it, expect } from "vitest";
import type { MatchDetails } from "@/network/riot/match";
import { calculateCardScore } from "../card-stats";

// ─── Test Helpers ───

const PUUID = "player-1";
const TEAM_ID = "Blue";
const ENEMY_TEAM = "Red";
const CHARACTER_ID = "jett-uuid";

const makeKill = (
  killer: string,
  victim: string,
  timeMs: number,
  assistants: string[] = []
) => ({
  timeSinceGameStartMillis: timeMs,
  timeSinceRoundStartMillis: timeMs,
  killer,
  victim,
  victimLocation: { x: 0, y: 0 },
  assistants,
  playerLocations: [],
  finishingDamage: {
    damageType: "Weapon",
    damageItem: "rifle",
    isSecondaryFireMode: false,
  },
});

const makeDamage = (
  receiver: string,
  damage: number,
  headshots = 0,
  bodyshots = 0,
  legshots = 0
) => ({
  receiver,
  damage,
  headshots,
  bodyshots,
  legshots,
});

const defaultEconomy = {
  loadoutValue: 3900,
  weapon: "rifle",
  armor: "heavy",
  remaining: 0,
  spent: 3900,
};

const defaultAbility = {
  grenadeEffects: null,
  ability1Effects: null,
  ability2Effects: null,
  ultimateEffects: null,
};

const makeRound = (
  roundNum: number,
  winningTeam: string,
  playerKills: number,
  playerDied: boolean,
  opts: {
    headshots?: number;
    bodyshots?: number;
    damage?: number;
    receivedDamage?: number;
    assists?: number;
    isClutch?: boolean;
    teammatesDiedFirst?: boolean;
  } = {}
) => {
  const {
    headshots = 0,
    bodyshots = playerKills,
    damage = playerKills * 130,
    receivedDamage = playerDied ? 150 : 50,
    assists = 0,
    teammatesDiedFirst = false,
  } = opts;

  const kills = [];
  const enemyIds = ["enemy-1", "enemy-2", "enemy-3", "enemy-4", "enemy-5"];
  const teammateIds = ["tm-1", "tm-2", "tm-3", "tm-4"];

  let timeCounter = 1000;

  if (teammatesDiedFirst) {
    for (const tm of teammateIds) {
      kills.push(
        makeKill(enemyIds[0], tm, timeCounter)
      );
      timeCounter += 500;
    }
  }

  for (let k = 0; k < playerKills; k++) {
    const assistList = assists > 0 && k === 0 ? ["tm-1"] : [];
    kills.push(makeKill(PUUID, enemyIds[k], timeCounter, assistList));
    timeCounter += 500;
  }

  if (playerDied) {
    kills.push(makeKill(enemyIds[4], PUUID, timeCounter));
  }

  const playerStats = {
    puuid: PUUID,
    kills: kills.filter((k) => k.killer === PUUID),
    damage: [
      makeDamage("enemy-1", damage, headshots, bodyshots, 0),
    ],
    score: playerKills * 200 + assists * 50,
    economy: defaultEconomy,
    ability: defaultAbility,
  };

  const enemyStats = enemyIds.map((id) => ({
    puuid: id,
    kills: kills.filter((k) => k.killer === id),
    damage: [makeDamage(PUUID, receivedDamage, 0, 1, 0)],
    score: 100,
    economy: defaultEconomy,
    ability: defaultAbility,
  }));

  const teammateStats = teammateIds.map((id) => ({
    puuid: id,
    kills: kills.filter((k) => k.killer === id),
    damage: [makeDamage("enemy-2", 80, 0, 1, 0)],
    score: 100,
    economy: defaultEconomy,
    ability: defaultAbility,
  }));

  return {
    roundNum,
    roundResult: "Eliminated",
    roundCeremony: "Default",
    winningTeam,
    bombPlanter: null,
    bombDefuser: null,
    plantRoundTime: 0,
    plantPlayerLocations: null,
    plantLocation: { x: 0, y: 0 },
    plantSite: "A",
    defuseRoundTime: 0,
    defusePlayerLocations: null,
    defuseLocation: { x: 0, y: 0 },
    playerStats: [playerStats, ...enemyStats, ...teammateStats],
  };
};

const makeMatch = (
  rounds: ReturnType<typeof makeRound>[],
  won: boolean,
  characterId = CHARACTER_ID
): MatchDetails => {
  const totalKills = rounds.reduce(
    (sum, r) =>
      sum +
      r.playerStats[0].kills.length,
    0
  );
  const totalDeaths = rounds.reduce(
    (sum, r) =>
      sum +
      (r.playerStats
        .flatMap((ps) => ps.kills)
        .some((k) => k.victim === PUUID)
        ? 1
        : 0),
    0
  );
  const totalAssists = rounds.reduce(
    (sum, r) =>
      sum +
      r.playerStats
        .flatMap((ps) => ps.kills)
        .filter((k) => k.assistants.includes(PUUID)).length,
    0
  );
  const totalScore = rounds.reduce(
    (sum, r) => sum + r.playerStats[0].score,
    0
  );

  return {
    matchInfo: {
      matchId: `match-${Math.random().toString(36).slice(2)}`,
      mapId: "ascent",
      gameLengthMillis: rounds.length * 60000,
      gameStartMillis: Date.now(),
      provisioningFlowId: "",
      isCompleted: true,
      customGameName: "",
      queueId: "competitive",
      gameMode: "/Game/GameModes/Bomb/BombGameMode",
      isRanked: true,
      seasonId: "season-1",
    },
    players: [
      {
        puuid: PUUID,
        gameName: "TestPlayer",
        tagLine: "KR1",
        teamId: TEAM_ID,
        partyId: "party-1",
        characterId,
        stats: {
          score: totalScore,
          roundsPlayed: rounds.length,
          kills: totalKills,
          deaths: totalDeaths,
          assists: totalAssists,
          playtimeMillis: rounds.length * 60000,
          abilityCasts: null,
        },
        competitiveTier: 27,
        playerCard: "",
        playerTitle: "",
      },
      ...["tm-1", "tm-2", "tm-3", "tm-4"].map((id) => ({
        puuid: id,
        gameName: `Teammate${id}`,
        tagLine: "KR1",
        teamId: TEAM_ID,
        partyId: "party-1",
        characterId: "sage-uuid",
        stats: {
          score: 2000,
          roundsPlayed: rounds.length,
          kills: 10,
          deaths: 8,
          assists: 5,
          playtimeMillis: rounds.length * 60000,
          abilityCasts: null,
        },
        competitiveTier: 27,
        playerCard: "",
        playerTitle: "",
      })),
      ...["enemy-1", "enemy-2", "enemy-3", "enemy-4", "enemy-5"].map(
        (id) => ({
          puuid: id,
          gameName: `Enemy${id}`,
          tagLine: "KR1",
          teamId: ENEMY_TEAM,
          partyId: "party-2",
          characterId: "phoenix-uuid",
          stats: {
            score: 2000,
            roundsPlayed: rounds.length,
            kills: 8,
            deaths: 10,
            assists: 3,
            playtimeMillis: rounds.length * 60000,
            abilityCasts: null,
          },
          competitiveTier: 27,
          playerCard: "",
          playerTitle: "",
        })
      ),
    ],
    coaches: [],
    teams: [
      {
        teamId: TEAM_ID,
        won,
        roundsPlayed: rounds.length,
        roundsWon: rounds.filter((r) => r.winningTeam === TEAM_ID).length,
        numPoints: 0,
      },
      {
        teamId: ENEMY_TEAM,
        won: !won,
        roundsPlayed: rounds.length,
        roundsWon: rounds.filter((r) => r.winningTeam === ENEMY_TEAM).length,
        numPoints: 0,
      },
    ],
    roundResults: rounds,
  };
};

/**
 * 고성능 매치 생성 (듀얼리스트 스타일)
 * 높은 킬, 높은 HS%, 낮은 데스
 */
const makeHighPerfMatch = (won: boolean): MatchDetails => {
  const rounds = Array.from({ length: 24 }, (_, i) =>
    makeRound(i, i < 13 ? TEAM_ID : ENEMY_TEAM, 2, i >= 20, {
      headshots: 1,
      bodyshots: 1,
      damage: 260,
      receivedDamage: 80,
    })
  );
  return makeMatch(rounds, won);
};

/**
 * 저성능 매치 생성
 */
const makeLowPerfMatch = (won: boolean): MatchDetails => {
  const rounds = Array.from({ length: 24 }, (_, i) =>
    makeRound(i, i < 8 ? TEAM_ID : ENEMY_TEAM, 0, true, {
      headshots: 0,
      bodyshots: 0,
      damage: 60,
      receivedDamage: 150,
    })
  );
  return makeMatch(rounds, won);
};

// ─── Tests ───

describe("calculateCardScore", () => {
  describe("OVR 티어 범위 검증", () => {
    it("레디언트 (tier 27) OVR이 89~99 범위 내", () => {
      const matches = Array.from({ length: 10 }, (_, i) =>
        makeHighPerfMatch(i % 2 === 0)
      );
      const result = calculateCardScore(matches, PUUID, 27);

      expect(result).not.toBeNull();
      expect(result!.ovr).toBeGreaterThanOrEqual(89);
      expect(result!.ovr).toBeLessThanOrEqual(99);
    });

    it("골드 2 (tier 11) OVR이 34~50 범위 내", () => {
      const matches = Array.from({ length: 10 }, (_, i) =>
        makeHighPerfMatch(i % 2 === 0)
      );
      const result = calculateCardScore(matches, PUUID, 11);

      expect(result).not.toBeNull();
      expect(result!.ovr).toBeGreaterThanOrEqual(34);
      expect(result!.ovr).toBeLessThanOrEqual(50);
    });

    it("언랭크 (tier 0)는 null 반환", () => {
      const matches = [makeHighPerfMatch(true)];
      const result = calculateCardScore(matches, PUUID, 0);
      expect(result).toBeNull();
    });
  });

  describe("실제 스탯 검증", () => {
    it("고성능 매치 → ACS, ADR이 유의미한 수치", () => {
      const matches = Array.from({ length: 10 }, () =>
        makeHighPerfMatch(true)
      );
      const result = calculateCardScore(matches, PUUID, 27);

      expect(result).not.toBeNull();
      const { stats } = result!;
      expect(stats.acs).toBeGreaterThan(100);
      expect(stats.adr).toBeGreaterThan(100);
      expect(stats.kd).toBeGreaterThan(1.0);
    });

    it("스탯이 실제 수치 범위를 반영", () => {
      const matches = Array.from({ length: 10 }, (_, i) =>
        makeHighPerfMatch(i % 2 === 0)
      );
      const result = calculateCardScore(matches, PUUID, 11);

      expect(result).not.toBeNull();
      const { stats } = result!;
      expect(stats.acs).toBeGreaterThan(0);
      expect(stats.kd).toBeGreaterThan(0);
      expect(stats.hsPercent).toBeGreaterThanOrEqual(0);
      expect(stats.hsPercent).toBeLessThanOrEqual(100);
      expect(stats.kast).toBeGreaterThanOrEqual(0);
      expect(stats.kast).toBeLessThanOrEqual(100);
      expect(stats.adr).toBeGreaterThan(0);
    });
  });

  describe("FormTrend 검증", () => {
    it("6경기 미만이면 stable", () => {
      const matches = Array.from({ length: 5 }, () =>
        makeHighPerfMatch(true)
      );
      const result = calculateCardScore(matches, PUUID, 27);
      expect(result).not.toBeNull();
      expect(result!.trend).toBe("stable");
    });

    it("최근 5경기가 이전보다 좋으면 up", () => {
      const oldBad = Array.from({ length: 10 }, () =>
        makeLowPerfMatch(false)
      );
      const recentGood = Array.from({ length: 5 }, () =>
        makeHighPerfMatch(true)
      );
      const matches = [...recentGood, ...oldBad];
      const result = calculateCardScore(matches, PUUID, 27);

      expect(result).not.toBeNull();
      expect(result!.trend).toBe("up");
    });

    it("최근 5경기가 이전보다 나쁘면 down", () => {
      const oldGood = Array.from({ length: 10 }, () =>
        makeHighPerfMatch(true)
      );
      const recentBad = Array.from({ length: 5 }, () =>
        makeLowPerfMatch(false)
      );
      const matches = [...recentBad, ...oldGood];
      const result = calculateCardScore(matches, PUUID, 27);

      expect(result).not.toBeNull();
      expect(result!.trend).toBe("down");
    });
  });

  describe("뱃지 검증", () => {
    it("HS% 30%+ → sharpshooter 뱃지", () => {
      const matches = Array.from({ length: 10 }, () => {
        const rounds = Array.from({ length: 20 }, (_, i) =>
          makeRound(i, i < 13 ? TEAM_ID : ENEMY_TEAM, 2, false, {
            headshots: 3,
            bodyshots: 1,
            damage: 260,
            receivedDamage: 50,
          })
        );
        return makeMatch(rounds, true);
      });

      const result = calculateCardScore(matches, PUUID, 27);
      expect(result).not.toBeNull();

      const badgeIds = result!.badges.map((b) => b.id);
      expect(badgeIds).toContain("sharpshooter");
    });

    it("모스트 에이전트 70%+ → one_trick 뱃지", () => {
      const matches = Array.from({ length: 10 }, () =>
        makeHighPerfMatch(true)
      );
      // 모든 매치가 같은 characterId → 100% 점유율
      const result = calculateCardScore(matches, PUUID, 27);
      expect(result).not.toBeNull();

      const badgeIds = result!.badges.map((b) => b.id);
      expect(badgeIds).toContain("one_trick");
    });

    it("최근 10경기 연승 → undefeated 뱃지", () => {
      const matches = Array.from({ length: 10 }, () =>
        makeHighPerfMatch(true)
      );
      const result = calculateCardScore(matches, PUUID, 27);
      expect(result).not.toBeNull();

      const badgeIds = result!.badges.map((b) => b.id);
      expect(badgeIds).toContain("undefeated");
    });
  });

  describe("엣지 케이스", () => {
    it("매치 0개 → null", () => {
      const result = calculateCardScore([], PUUID, 27);
      expect(result).toBeNull();
    });

    it("매치 1개도 정상 작동", () => {
      const result = calculateCardScore(
        [makeHighPerfMatch(true)],
        PUUID,
        27
      );
      expect(result).not.toBeNull();
      expect(result!.ovr).toBeGreaterThanOrEqual(89);
    });
  });
});
