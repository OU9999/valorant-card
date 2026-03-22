import type {
  MatchDetails,
  MatchInfo,
  MatchPlayer,
  MatchTeam,
  RoundResult,
  RoundPlayerStats,
  Kill,
  Damage,
  PlayerLocation,
} from "@/network/riot/match";
import type {
  HenrikMatch,
  HenrikKill,
  HenrikPlayerLocation,
  HenrikRound,
  HenrikRoundStats,
} from "./types";

// ─── Kill Index ───

type KillIndex = Map<number, Map<string, Kill[]>>;

/** match-level kills를 Map<round, Map<killerPuuid, Kill[]>>로 사전 그룹핑 */
const buildKillIndex = (henrikKills: HenrikKill[]): KillIndex => {
  const index: KillIndex = new Map();

  for (const k of henrikKills) {
    if (!index.has(k.round)) {
      index.set(k.round, new Map());
    }
    const roundMap = index.get(k.round)!;
    const killerPuuid = k.killer.puuid;

    if (!roundMap.has(killerPuuid)) {
      roundMap.set(killerPuuid, []);
    }

    roundMap.get(killerPuuid)!.push(adaptKill(k));
  }

  return index;
};

// ─── Adapters ───

const adaptKill = (k: HenrikKill): Kill => ({
  timeSinceGameStartMillis: k.time_in_match_in_ms,
  timeSinceRoundStartMillis: k.time_in_round_in_ms,
  killer: k.killer.puuid,
  victim: k.victim.puuid,
  victimLocation: k.location,
  assistants: k.assistants.map((a) => a.puuid),
  playerLocations: k.player_locations.map(adaptPlayerLocation),
  finishingDamage: {
    damageType: k.weapon.type,
    damageItem: k.weapon.id,
    isSecondaryFireMode: k.secondary_fire_mode,
  },
});

const adaptPlayerLocation = (pl: HenrikPlayerLocation): PlayerLocation => ({
  puuid: pl.player.puuid,
  viewRadians: pl.view_radians,
  location: pl.location,
});

const adaptMatchInfo = (m: HenrikMatch): MatchInfo => ({
  matchId: m.metadata.match_id,
  mapId: m.metadata.map.id,
  gameLengthMillis: m.metadata.game_length_in_ms,
  gameStartMillis: new Date(m.metadata.started_at).getTime(),
  provisioningFlowId: "",
  isCompleted: m.metadata.is_completed,
  customGameName: "",
  queueId: m.metadata.queue.id,
  gameMode: m.metadata.queue.mode_type,
  isRanked: m.metadata.queue.id === "competitive",
  seasonId: m.metadata.season.id,
});

const adaptPlayers = (m: HenrikMatch): MatchPlayer[] =>
  m.players.map((p) => ({
    puuid: p.puuid,
    gameName: p.name,
    tagLine: p.tag,
    teamId: p.team_id,
    partyId: p.party_id,
    characterId: p.agent.id.toUpperCase(),
    stats: {
      score: p.stats.score,
      roundsPlayed: m.rounds.length,
      kills: p.stats.kills,
      deaths: p.stats.deaths,
      assists: p.stats.assists,
      playtimeMillis: m.metadata.game_length_in_ms,
      abilityCasts: {
        grenadeCasts: p.ability_casts.grenade,
        ability1Casts: p.ability_casts.ability1,
        ability2Casts: p.ability_casts.ability2,
        ultimateCasts: p.ability_casts.ultimate,
      },
    },
    competitiveTier: p.tier.id,
    playerCard: p.customization.card,
    playerTitle: p.customization.title,
  }));

const adaptTeams = (m: HenrikMatch): MatchTeam[] =>
  m.teams.map((t) => ({
    teamId: t.team_id,
    won: t.won,
    roundsPlayed: t.rounds.won + t.rounds.lost,
    roundsWon: t.rounds.won,
    numPoints: 0,
  }));

const adaptDamage = (rs: HenrikRoundStats): Damage[] =>
  rs.damage_events.map((d) => ({
    receiver: d.player.puuid,
    damage: d.damage,
    headshots: d.headshots,
    bodyshots: d.bodyshots,
    legshots: d.legshots,
  }));

const adaptRoundPlayerStats = (
  rs: HenrikRoundStats,
  killIndex: KillIndex,
  roundId: number,
): RoundPlayerStats => {
  const puuid = rs.player.puuid;
  const roundKills = killIndex.get(roundId)?.get(puuid) ?? [];

  return {
    puuid,
    kills: roundKills,
    damage: adaptDamage(rs),
    score: rs.stats.score,
    economy: {
      loadoutValue: rs.economy.loadout_value,
      weapon: rs.economy.weapon?.id ?? "",
      armor: rs.economy.armor?.id ?? "",
      remaining: rs.economy.remaining,
      spent: 0, // Henrik API에서 실제 spent 값을 제공하지 않음
    },
    ability: {
      grenadeEffects: null,
      ability1Effects: null,
      ability2Effects: null,
      ultimateEffects: null,
    },
  };
};

const adaptRound = (
  round: HenrikRound,
  killIndex: KillIndex,
): RoundResult => ({
  roundNum: round.id,
  roundResult: round.result,
  roundCeremony: round.ceremony,
  winningTeam: round.winning_team,
  bombPlanter: round.plant?.player.puuid ?? null,
  bombDefuser: round.defuse?.player.puuid ?? null,
  plantRoundTime: round.plant?.round_time_in_ms ?? 0,
  plantPlayerLocations: round.plant?.player_locations.map(adaptPlayerLocation) ?? null,
  plantLocation: round.plant?.location ?? { x: 0, y: 0 },
  plantSite: round.plant?.site ?? "",
  defuseRoundTime: round.defuse?.round_time_in_ms ?? 0,
  defusePlayerLocations: round.defuse?.player_locations.map(adaptPlayerLocation) ?? null,
  defuseLocation: round.defuse?.location ?? { x: 0, y: 0 },
  playerStats: round.stats.map((rs) =>
    adaptRoundPlayerStats(rs, killIndex, round.id),
  ),
});

// ─── Main Entry ───

const adaptHenrikMatch = (henrikMatch: HenrikMatch): MatchDetails => {
  const killIndex = buildKillIndex(henrikMatch.kills);

  return {
    matchInfo: adaptMatchInfo(henrikMatch),
    players: adaptPlayers(henrikMatch),
    coaches: [],
    teams: adaptTeams(henrikMatch),
    roundResults: henrikMatch.rounds.map((r) => adaptRound(r, killIndex)),
  };
};

export { adaptHenrikMatch };
