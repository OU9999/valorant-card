// ─── Henrik API v4 응답 타입 ───

interface HenrikPlayerRef {
  puuid: string;
  name: string;
  tag: string;
  team: string;
}

interface HenrikLocation {
  x: number;
  y: number;
}

interface HenrikPlayerLocation {
  player: HenrikPlayerRef;
  view_radians: number;
  location: HenrikLocation;
}

interface HenrikWeapon {
  id: string;
  name: string;
  type: string;
}

// ─── Match-level ───

interface HenrikMetadata {
  match_id: string;
  map: { id: string; name: string };
  game_version: string;
  game_length_in_ms: number;
  started_at: string;
  is_completed: boolean;
  queue: { id: string; name: string; mode_type: string };
  season: { id: string; short: string };
  platform: string;
  premier: unknown;
  region: string;
  cluster: string | null;
}

interface HenrikPlayer {
  puuid: string;
  name: string;
  tag: string;
  team_id: string;
  platform: string;
  party_id: string;
  agent: { id: string; name: string };
  stats: {
    score: number;
    kills: number;
    deaths: number;
    assists: number;
    headshots: number;
    bodyshots: number;
    legshots: number;
    damage: { dealt: number; received: number };
  };
  ability_casts: {
    grenade: number;
    ability1: number;
    ability2: number;
    ultimate: number;
  };
  tier: { id: number; name: string };
  customization: {
    card: string;
    title: string;
    preferred_level_border: string;
  };
  account_level: number;
  session_playtime_in_ms: number;
  behavior: {
    afk_rounds: number;
    friendly_fire: { incoming: number; outgoing: number };
    rounds_in_spawn: number;
  };
  economy: {
    spent: { overall: number; average: number };
    loadout_value: { overall: number; average: number };
  };
}

interface HenrikTeam {
  team_id: string;
  rounds: { won: number; lost: number };
  won: boolean;
  premier_roster: unknown;
}

// ─── Round-level ───

interface HenrikDamageEvent {
  player: HenrikPlayerRef;
  bodyshots: number;
  headshots: number;
  legshots: number;
  damage: number;
}

interface HenrikRoundStats {
  player: HenrikPlayerRef;
  ability_casts: {
    grenade: number | null;
    ability_1: number | null;
    ability_2: number | null;
    ultimate: number | null;
  };
  damage_events: HenrikDamageEvent[];
  stats: {
    score: number;
    kills: number;
    headshots: number;
    bodyshots: number;
    legshots: number;
  };
  economy: {
    loadout_value: number;
    remaining: number;
    weapon: HenrikWeapon | null;
    armor: { id: string; name: string } | null;
  };
  was_afk: boolean;
  received_penalty: boolean;
  stayed_in_spawn: boolean;
}

interface HenrikPlant {
  round_time_in_ms: number;
  site: string;
  location: HenrikLocation;
  player: HenrikPlayerRef;
  player_locations: HenrikPlayerLocation[];
}

interface HenrikDefuse {
  round_time_in_ms: number;
  location: HenrikLocation;
  player: HenrikPlayerRef;
  player_locations: HenrikPlayerLocation[];
}

interface HenrikRound {
  id: number;
  result: string;
  ceremony: string;
  winning_team: string;
  plant: HenrikPlant | null;
  defuse: HenrikDefuse | null;
  stats: HenrikRoundStats[];
}

// ─── Kill ───

interface HenrikKill {
  time_in_round_in_ms: number;
  time_in_match_in_ms: number;
  round: number;
  killer: HenrikPlayerRef;
  victim: HenrikPlayerRef;
  assistants: HenrikPlayerRef[];
  location: HenrikLocation;
  weapon: HenrikWeapon;
  secondary_fire_mode: boolean;
  player_locations: HenrikPlayerLocation[];
}

// ─── Top-level ───

interface HenrikMatch {
  metadata: HenrikMetadata;
  players: HenrikPlayer[];
  observers: unknown[];
  coaches: unknown[];
  teams: HenrikTeam[];
  rounds: HenrikRound[];
  kills: HenrikKill[];
}

// ─── API Responses ───

interface HenrikMatchesResponse {
  status: number;
  data: HenrikMatch[];
}

interface HenrikAccountResponse {
  status: number;
  data: {
    puuid: string;
    region: string;
    account_level: number;
    name: string;
    tag: string;
    card: string;
    title: string;
    platforms: string[];
    updated_at: string;
  };
}

interface HenrikMmrResponse {
  status: number;
  data: {
    account: { name: string; tag: string; puuid: string };
    peak: {
      season: { id: string; short: string };
      tier: { id: number; name: string };
      rr: number;
    };
    current: {
      tier: { id: number; name: string };
      rr: number;
      last_change: number;
      elo: number;
      games_needed_for_rating: number;
    };
    seasonal: Array<{
      season: { id: string; short: string };
      wins: number;
      games: number;
      end_tier: { id: number; name: string };
      end_rr: number;
    }>;
  };
}

export type {
  HenrikPlayerRef,
  HenrikLocation,
  HenrikPlayerLocation,
  HenrikWeapon,
  HenrikMetadata,
  HenrikPlayer,
  HenrikTeam,
  HenrikDamageEvent,
  HenrikRoundStats,
  HenrikPlant,
  HenrikDefuse,
  HenrikRound,
  HenrikKill,
  HenrikMatch,
  HenrikMatchesResponse,
  HenrikAccountResponse,
  HenrikMmrResponse,
};
