# Valorant API 통합 설계 (Riot ↔ Henrik)

> 조사일: 2026-05-03
> 목표: `provider = "riot" | "henrik"` 두 구현체를 **하나의 도메인 인터페이스** 뒤에 둔다.
> 출처: Riot 공식 샘플 응답 (riotapi-schema repo) · Henrik llms-full.txt

## 0. 핵심 아이디어

```
┌──────────────┐     ┌────────────────────────┐     ┌────────────┐
│ UI / 카드    │ ──► │ ValorantClient (도메인) │ ──► │ HenrikAdapter │
│ (page, ssr)  │     │   - getProfile         │     └────────────┘
└──────────────┘     │   - getRank            │     ┌────────────┐
                     │   - getMatches         │ ──► │ RiotAdapter   │
                     │   - getMatch           │     └────────────┘
                     │   - getLeaderboard     │
                     └────────────────────────┘
```

- 도메인 타입은 **Riot 공식 스키마에 가깝게** 정의 (Henrik이 더 풍부하지만 호환성 우선)
- Henrik은 데이터를 추가로 제공 (peak tier, Premier, esports 등) → 도메인에서 **optional 확장 필드**로 흡수
- env 스위치: `VALORANT_API_PROVIDER=henrik|riot` (기본 `henrik`)

## 1. 양 API 비교 매트릭스

| 기능 | Riot 공식 | Henrik | 도메인 처리 |
|---|---|---|---|
| name#tag → puuid | ❌ ACCOUNT-V1만 (RSO production 필요) | ✅ `/v2/account` | Henrik 우선, Riot은 puuid 직접 사용 |
| account_level, card, title | ❌ | ✅ | Henrik만 — optional |
| 현재 티어 / RR | ⚠️ 매치 단위 `competitiveTier`만 | ✅ `/v3/mmr` 직접 | Riot은 최근 매치에서 추출 |
| Peak 티어 | ❌ | ✅ | Henrik만 — optional |
| RR 변동 히스토리 | ❌ (직접 계산 필요) | ✅ `/v2/mmr-history` | Henrik만 — optional |
| 매치 리스트 | ✅ matchlist (puuid 필요) | ✅ name#tag + puuid 둘다 | 양쪽 매핑 |
| 매치 상세 | ✅ 풍부 (kills, damage, economy) | ✅ 동등 | 양쪽 매핑, Riot 스키마가 베이스 |
| 리더보드 | ✅ `/leaderboards/by-act/{actId}` | ✅ `/v3/leaderboard` | 양쪽 매핑 |
| 콘텐츠 메타 | ✅ `/contents` | ✅ `/v1/content` | 양쪽 매핑 |
| 서버 상태 | ✅ `/status/v1` | ✅ `/v1/status` | 양쪽 매핑 |
| Premier / Esports | ❌ | ✅ | Henrik 전용 (선택 기능) |
| 인증 | API Key (header) | API Key (header/query) | 동일 처리 가능 |

## 2. Riot 공식 API 타입 (실측 샘플 기반)

### 2.1 ACCOUNT-V1 (puuid ↔ riot id)

```ts
// GET /riot/account/v1/accounts/by-riot-id/{gameName}/{tagLine}
interface RiotAccountDto {
  puuid: string;       // 78자 base64 변종
  gameName: string;
  tagLine: string;
}
```

⚠️ **production key 없으면 사용 불가** — 본 프로젝트가 prod 심사를 기다리는 핵심 이유.

### 2.2 VAL-MATCH-V1: GET /val/match/v1/matches/{matchId}

```ts
interface RiotMatchDto {
  matchInfo: {
    matchId: string;
    mapId: string;                // "/Game/Maps/Duality/Duality"
    gameVersion: string;
    gameLengthMillis: number;
    region: string;
    gameStartMillis: number;      // unix ms
    provisioningFlowId: string;   // "Matchmaking"
    isCompleted: boolean;
    customGameName: string;
    queueId: string;              // "competitive" | "unrated" | …
    gameMode: string;             // "/Game/GameModes/Bomb/BombGameMode.BombGameMode_C"
    isRanked: boolean;
    seasonId: string;
    premierMatchInfo: object;     // {} 또는 premier 정보
  };
  players: Array<{
    puuid: string;
    gameName: string;
    tagLine: string;
    teamId: "Red" | "Blue";
    partyId: string;
    characterId: string;          // agent uuid
    stats: {
      score: number;
      roundsPlayed: number;
      kills: number;
      deaths: number;
      assists: number;
      playtimeMillis: number;
      abilityCasts: {
        grenadeCasts: number;
        ability1Casts: number;
        ability2Casts: number;
        ultimateCasts: number;
      } | null;
    };
    competitiveTier: number;      // 0~27 (Iron 1 ~ Radiant)
    isObserver: boolean;
    playerCard: string;           // uuid
    playerTitle: string;          // uuid
    accountLevel: number;
  }>;
  coaches: Array<{ puuid: string; teamId: string }>;
  teams: Array<{
    teamId: "Red" | "Blue";
    won: boolean;
    roundsPlayed: number;
    roundsWon: number;
    numPoints: number;
  }>;
  roundResults: Array<{
    roundNum: number;
    roundResult: string;          // "Eliminated" | "Defused" | …
    roundCeremony: string;
    winningTeam: "Red" | "Blue";
    bombPlanter: string | null;
    bombDefuser: string | null;
    plantRoundTime: number;
    plantPlayerLocations: Array<unknown> | null;
    plantLocation: { x: number; y: number };
    plantSite: "A" | "B" | "C" | "";
    defuseRoundTime: number;
    defusePlayerLocations: Array<unknown> | null;
    defuseLocation: { x: number; y: number };
    playerStats: Array<{
      puuid: string;
      kills: Array<{
        timeSinceGameStartMillis: number;
        timeSinceRoundStartMillis: number;
        killer: string;
        victim: string;
        victimLocation: { x: number; y: number };
        assistants: string[];
        playerLocations: Array<{
          puuid: string;
          viewRadians: number;
          location: { x: number; y: number };
        }>;
        finishingDamage: {
          damageType: string;
          damageItem: string;
          isSecondaryFireMode: boolean;
        };
      }>;
      damage: Array<{
        receiver: string;
        damage: number;
        legshots: number;
        bodyshots: number;
        headshots: number;
      }>;
      score: number;
      economy: {
        loadoutValue: number;
        weapon: string;
        armor: string;
        remaining: number;
        spent: number;
      };
      ability: {
        grenadeEffects: unknown | null;
        ability1Effects: unknown | null;
        ability2Effects: unknown | null;
        ultimateEffects: unknown | null;
      };
    }>;
    roundResultCode: string;
  }>;
}
```

```ts
// GET /val/match/v1/matchlists/by-puuid/{puuid}
interface RiotMatchlistDto {
  puuid: string;
  history: Array<{
    matchId: string;
    gameStartTimeMillis: number;
    queueId: string;
  }>;
}

// GET /val/match/v1/recent-matches/by-queue/{queue}
interface RiotRecentMatchesDto {
  currentTime: number;
  matchIds: string[];
}
```

### 2.3 VAL-RANKED-V1: GET /val/ranked/v1/leaderboards/by-act/{actId}

```ts
interface RiotLeaderboardDto {
  actId: string;
  totalPlayers?: number;          // 없을 수도
  players: Array<{
    puuid: string;
    gameName: string;
    tagLine: string;
    leaderboardRank: number;
    rankedRating: number;
    numberOfWins: number;
    competitiveTier: number;
  }>;
}
```

### 2.4 VAL-CONTENT-V1: GET /val/content/v1/contents

```ts
interface RiotContentDto {
  version: string;
  characters: ContentItem[];      // agents
  maps: ContentItem[];
  chromas: ContentItem[];
  skins: ContentItem[];
  skinLevels: ContentItem[];
  equips: ContentItem[];
  gameModes: ContentItem[];
  sprays: ContentItem[];
  sprayLevels: ContentItem[];
  charms: ContentItem[];
  charmLevels: ContentItem[];
  playerCards: ContentItem[];
  playerTitles: ContentItem[];
  acts: Array<{
    id: string;
    parentId?: string;
    name: string;
    isActive: boolean;
    type?: string;
  }>;
}
interface ContentItem {
  name: string;
  localizedNames?: Record<string, string>;
  id: string;
  assetName: string;
  assetPath?: string;
}
```

### 2.5 VAL-STATUS-V1

```ts
interface RiotPlatformDataDto {
  id: string;
  name: string;
  locales: string[];
  maintenances: StatusEntry[];
  incidents: StatusEntry[];
}
```

## 3. Henrik API 타입 (실측 docs 기반)

모든 응답 wrapper:
```ts
interface HenrikEnvelope<T> { status: number; data: T; }
// 에러
interface HenrikError { status: number; errors: Array<{ message: string; code: number; details?: string }> }
```

### 3.1 /v2/account/{name}/{tag}

```ts
interface HenrikAccountV2 {
  puuid: string;
  region: string;                 // "eu" | "na" | "kr" | "ap" | "latam" | "br"
  account_level: number;
  name: string;
  tag: string;
  card: string;                   // uuid
  title: string;                  // uuid
  platforms: Array<"pc" | "console">;
  updated_at: string;             // ISO8601
}
```

### 3.2 /v3/mmr/{region}/{platform}/{name}/{tag}

```ts
interface HenrikMmrV3 {
  account: { puuid: string; name: string; tag: string };
  peak: {
    season: { id: string; short: string };  // e.g. short: "e7a3"
    ranking_schema: string;
    tier: { id: number; name: string };
  };
  current: {
    tier: { id: number; name: string };     // id 0~27
    rr: number;                             // 0~100 (Radiant는 누적)
    last_change: number;                    // 마지막 게임 RR 변동 (-30 ~ +30)
    elo: number;                            // tier*100 + rr 형태
    leaderboard_placement: number | null;
  };
  seasonal: Array<{
    season: { id: string; short: string };
    wins: number;
    games: number;
    end_tier: { id: number; name: string };
    ranking_schema: string;
    leaderboard_placement: number | null;
    act_wins: Array<{ id: number; name: string }>;
  }>;
}
```

### 3.3 /v4/matches/{region}/{platform}/{name}/{tag}

응답: `data: HenrikMatchV4[]` (각 항목이 단일 매치 — Riot의 MatchDto와 거의 동형)

```ts
interface HenrikMatchV4 {
  metadata: {
    match_id: string;
    map: { id: string; name: string };
    game_version: string;
    game_length_in_ms: number;
    started_at: string;            // ISO8601
    is_completed: boolean;
    queue: { id: string; name: string; mode_type: string };
    season: { id: string; short: string };
    platform: "pc" | "console";
    premier: object | null;
    party_rr_penaltys: Array<{ party_id: string; penalty: number }>;
    region: string;
    cluster: string;
  };
  players: Array<{
    puuid: string;
    name: string;
    tag: string;
    team_id: "Red" | "Blue";
    platform: "pc" | "console";
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
      ability_casts: {
        grenade: number; ability_1: number; ability_2: number; ultimate: number;
      };
    };
    tier: { id: number; name: string };
    customization: { card: string; title: string; preferred_level_border: string };
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
  }>;
  observers: Array<unknown>;
  coaches: Array<{ puuid: string; team_id: string }>;
  teams: Array<{
    team_id: "Red" | "Blue";
    rounds: { won: number; lost: number };
    won: boolean;
    premier_roster: object | null;
  }>;
  rounds: Array<{
    id: number;
    result: string;
    ceremony: string;
    winning_team: "Red" | "Blue";
    plant: { round_time_in_ms: number; site: string; location: { x: number; y: number }; player: { puuid: string }; player_locations: unknown[] } | null;
    defuse: { round_time_in_ms: number; location: { x: number; y: number }; player: { puuid: string }; player_locations: unknown[] } | null;
    stats: Array<{
      ability_casts: { grenade: number; ability_1: number; ability_2: number; ultimate: number };
      player: { puuid: string; team: string };
      damage_events: Array<{ player_puuid: string; damage: number; legshots: number; bodyshots: number; headshots: number }>;
      stats: { score: number; kills: number; damage: number; assists: number };
      economy: { loadout_value: number; remaining: number; weapon: { id: string; name: string; type: string }; armor: { id: string; name: string } };
      was_afk: boolean;
      received_economy_inspect: boolean;
      was_penalized: boolean;
      stayed_in_spawn: boolean;
    }>;
  }>;
  kills: Array<{
    time_in_round_in_ms: number;
    time_in_match_in_ms: number;
    round: number;
    killer: { puuid: string; team: string };
    victim: { puuid: string; team: string };
    assistants: Array<{ puuid: string; team: string }>;
    location: { x: number; y: number };
    weapon: { id: string; name: string; type: string };
    secondary_fire_mode: boolean;
    player_locations: unknown[];
  }>;
}
```

### 3.4 /v3/leaderboard/{region}/{platform}

```ts
interface HenrikLeaderboardV3 {
  total_players: number;
  returned_players: number;
  before: number; after: number;
  radiant_threshold: number;
  immortal_3_threshold: number;
  immortal_2_threshold: number;
  immortal_1_threshold: number;
  thresholds?: Array<{ tier: number; threshold: number }>;
  last_update: number;
  next_update: number;
  players: Array<{
    card: string;
    title: string;
    is_banned: boolean;
    is_anonymized: boolean;
    puuid: string;
    name: string;
    tag: string;
    leaderboard_rank: number;
    tier: number;
    rr: number;
    wins: number;
    updated_at: string;
  }>;
}
```

### 3.5 /v1/content

Riot CONTENT-V1을 간략화한 형태. agents/maps/seasons 위주. 세부 이미지·스킨은 [valorant-api.com](https://valorant-api.com) 권장 (Henrik 본인이 추천).

## 4. 도메인 인터페이스 설계

### 4.1 도메인 타입 (`src/network/valorant/types.ts`)

```ts
// 정규화된 도메인 모델 — Riot 스키마 기반, Henrik 추가 정보는 optional

export type Region = "eu" | "na" | "kr" | "ap" | "latam" | "br";
export type Platform = "pc" | "console";
export type Team = "Red" | "Blue";

export interface RiotId { gameName: string; tagLine: string }

export interface AccountProfile {
  puuid: string;
  riotId: RiotId;
  region: Region;
  platforms: Platform[];
  // optional (Henrik만 제공)
  accountLevel?: number;
  cardId?: string;
  titleId?: string;
  updatedAt?: string;
}

export interface RankSnapshot {
  puuid: string;
  current: {
    tier: number;                 // 0~27 (공식 competitiveTier 스케일)
    tierName?: string;
    rr: number;
    lastChange?: number;
    elo?: number;
    leaderboardPlacement?: number | null;
  };
  // optional (Henrik만 제공)
  peak?: {
    tier: number;
    tierName?: string;
    seasonId?: string;
    seasonShort?: string;
  };
  seasonal?: Array<{
    seasonId: string;
    seasonShort: string;
    endTier: number;
    wins: number;
    games: number;
    leaderboardPlacement: number | null;
  }>;
}

export interface MatchSummary {
  matchId: string;
  mapId: string;
  mapName?: string;
  queueId: string;                // "competitive" 등
  gameMode: string;
  startedAt: number;              // unix ms
  durationMs: number;
  isRanked: boolean;
  isCompleted: boolean;
  region: Region;
  platform: Platform;
  seasonId?: string;
  // 요청자 본인 관점 요약 (조회 puuid 기준)
  self?: {
    puuid: string;
    teamId: Team;
    agentId: string;
    competitiveTier: number;
    stats: { kills: number; deaths: number; assists: number; score: number; headshots?: number; bodyshots?: number; legshots?: number };
    win: boolean;
  };
}

export interface MatchDetail extends MatchSummary {
  players: Array<{
    puuid: string;
    riotId: RiotId;
    teamId: Team;
    partyId: string;
    agentId: string;
    competitiveTier: number;
    accountLevel: number;
    cardId: string;
    titleId: string;
    stats: {
      score: number;
      kills: number; deaths: number; assists: number;
      roundsPlayed: number;
      playtimeMs: number;
      headshots?: number; bodyshots?: number; legshots?: number;
      damageDealt?: number; damageReceived?: number;
      abilityCasts?: { grenade: number; ability1: number; ability2: number; ultimate: number } | null;
    };
  }>;
  teams: Array<{ teamId: Team; won: boolean; roundsWon: number; roundsLost: number }>;
  rounds: Array<{ /* 필요 시 점진적 확장 */ }>;
}

export interface LeaderboardEntry {
  puuid: string;
  riotId: RiotId;
  rank: number;
  rr: number;
  wins: number;
  competitiveTier: number;
  // optional
  cardId?: string;
  titleId?: string;
  isBanned?: boolean;
  isAnonymized?: boolean;
}

export interface Leaderboard {
  actId: string;
  total: number;
  entries: LeaderboardEntry[];
  thresholds?: { radiant: number; immortal3: number; immortal2: number; immortal1: number };
}
```

### 4.2 클라이언트 인터페이스 (`src/network/valorant/client.ts`)

```ts
export interface ValorantClient {
  // 식별
  getProfileByRiotId(region: Region, platform: Platform, riotId: RiotId): Promise<AccountProfile>;
  getProfileByPuuid(region: Region, puuid: string): Promise<AccountProfile>;

  // 랭크
  getRank(region: Region, platform: Platform, puuid: string): Promise<RankSnapshot>;

  // 매치
  getRecentMatches(region: Region, platform: Platform, puuid: string, opts?: { size?: number; start?: number }): Promise<MatchSummary[]>;
  getMatch(region: Region, matchId: string): Promise<MatchDetail>;

  // 리더보드
  getLeaderboard(region: Region, platform: Platform, opts?: { size?: number; startIndex?: number; actId?: string }): Promise<Leaderboard>;
}
```

### 4.3 어댑터 책임

| 어댑터 | 책임 |
|---|---|
| **HenrikAdapter** | Henrik 응답 → 도메인 매핑. peak/seasonal 등 풍부 데이터 채움. |
| **RiotAdapter** | Riot 응답 → 도메인 매핑. account_level/card/title은 매치 내 player에서 추출. peak는 N/A. |

매핑 규칙 예시:
- `competitiveTier` ↔ `current.tier` (양쪽 동일 스케일)
- Henrik `agent.id` ↔ Riot `characterId` (동일 uuid)
- Henrik `tier.id` ↔ Riot `competitiveTier`
- Henrik `metadata.queue.id` ↔ Riot `queueId`

### 4.4 팩토리 (`src/network/valorant/index.ts`)

```ts
import { HenrikAdapter } from "./henrik-adapter";
import { RiotAdapter } from "./riot-adapter";
import type { ValorantClient } from "./client";

const provider = process.env.VALORANT_API_PROVIDER ?? "henrik";

let client: ValorantClient | null = null;

const getValorantClient = (): ValorantClient => {
  if (client) return client;
  if (provider === "riot") {
    client = new RiotAdapter({ apiKey: process.env.RIOT_API_KEY! });
    return client;
  }
  client = new HenrikAdapter({ apiKey: process.env.HENRIK_API_KEY! });
  return client;
};

export { getValorantClient };
```

## 5. 디렉터리 구조

```
src/network/
  fetch-api.ts                    # 기존
  valorant/
    types.ts                      # AccountProfile, RankSnapshot, MatchSummary, …
    client.ts                     # ValorantClient 인터페이스
    constants.ts                  # tier 매핑, agent uuid → name, region 코드
    schemas/
      henrik.ts                   # Zod 스키마 (HenrikAccountV2 등)
      riot.ts                     # Zod 스키마 (RiotMatchDto 등)
    henrik-adapter.ts             # Henrik 구현 + 매핑
    riot-adapter.ts               # Riot 구현 + 매핑 (prod key 받은 후)
    cache/
      memory.ts                   # in-flight coalescing
      db.ts                       # DB(accounts/mmr_snapshots/matches) lookup + fetched_at
    index.ts                      # 팩토리
```

## 6. 매핑 시 주의점

1. **Henrik의 puuid는 base64url 78자**, Riot도 동일 — 그대로 사용.
2. **mapId 형태가 다름**: Riot은 `/Game/Maps/Duality/Duality`, Henrik은 `Bind` 등 사람 이름. 도메인은 둘 다 보관 (`mapId` raw + `mapName` resolved).
3. **agent uuid는 양쪽 동일**. Henrik은 name까지 줘서 편하지만, agent name 매핑 테이블을 자체 보관하는 게 안전 (네트워크 의존 ↓).
4. **tier id 0~27 매핑** (Iron 1=3, Iron 2=4, … Radiant=27). Iron 1 미만(언랭/플레이스먼트)도 0~2 존재. constants에 enum 정의.
5. **Riot은 평균 RR/peak를 안 줌** — 가능한 도메인 필드는 optional로, UI는 fallback (Henrik 기준 "—" 표시).
6. **에러 정규화**: 양쪽 다 `DomainError { code: "ACCOUNT_NOT_FOUND" | "RATE_LIMITED" | "UPSTREAM_DOWN" | "REGION_INVALID" | … }`로 통일.

## 7. 단계별 구현 로드맵

1. `types.ts` + `constants.ts` (tier/agent/queue enum) — 코드 변경 없는 기반.
2. `schemas/henrik.ts` Zod — runtime 검증 (Henrik 응답은 자주 진화).
3. `henrik-adapter.ts` — 5개 핵심 메서드.
4. `cache/db.ts` — DB lookup with `fetched_at` 24h TTL.
5. `cache/memory.ts` — in-flight coalescing (Map<key, Promise>).
6. Next.js Route Handler `/api/profile/[name]/[tag]` 한 개로 흐름 검증.
7. UI 결합 (mock → 실데이터).
8. (Riot prod key 도착 후) `schemas/riot.ts` + `riot-adapter.ts` 추가, 팩토리에서 스위칭만.

## 8. 테스트 전략

- **샘플 응답 fixture**: riotapi-schema repo의 examples/ 그대로 가져와 fixture로 — 파서 검증.
- **어댑터 단위 테스트**: 동일 도메인 입력 → 양 어댑터 결과가 핵심 필드(puuid, tier, kills 등)에서 일치하는지 contract test.
- **에러 매핑 테스트**: 429, 404(account_not_found), 5xx 각각 `DomainError`로 정규화되는지.
