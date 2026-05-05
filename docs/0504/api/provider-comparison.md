# Provider 비교 — Henrik vs Riot 공식

> 관련 문서: [henrik.md](./henrik.md) · [riot-official.md](./riot-official.md)
> 작성일: 2026-05-05

## 0. 한 줄 요약

**Henrik은 1콜 정제형 / Riot은 다콜 raw형**. 응답 구조와 라우팅 규칙이 본질적으로 달라서, 어댑터 외부에 노출되는 **공통 도메인 타입을 Riot 공식 스키마에 가깝게** 정의해두는 것이 마이그레이션 비용을 가장 크게 줄인다.

## 1. 사용 시나리오

| 상황 | 권장 Provider |
|---|---|
| 현재 (Riot prod key 대기) | **Henrik 단일** |
| dev key로 로컬 개발 | content / status / leaderboard만 Riot 직접 시도, 나머진 Henrik |
| prod key 확보 직후 | **Riot 우선 + Henrik 백업** (RR/peak/stored) |
| 장기 운영 | Riot 메인 + Henrik 보강 (stored/Premier/esports) |

→ 운영 가능한 단일 옵션은 **Henrik뿐**. dev key는 24h 만료 + 공개 서비스 금지로 프로덕션 부적격.

## 2. 호출 방식 비교

### 2.1 라우팅

| 항목 | Henrik | Riot 공식 |
|---|---|---|
| 베이스 URL | 단일: `api.henrikdev.xyz` | **호스트가 region/cluster** |
| region 표현 | path: `/v3/mmr/kr/pc/...` | host: `kr.api.riotgames.com` |
| cluster 라우팅 | 없음 | account-v1만 cluster (`asia/europe/americas/sea`) |
| 헬퍼 필요성 | 낮음 | **2단계 매핑 헬퍼 필수** (cluster ↔ platform) |

### 2.2 인증

| 항목 | Henrik | Riot |
|---|---|---|
| 헤더 | `Authorization: <key>` | `X-Riot-Token: <key>` |
| 쿼리 대안 | `?api_key=<key>` | 없음 |
| 키 만료 | 영구 | dev/personal 영구, **dev는 24h 비활성화** |
| 등급 | Basic / Enhanced / Tier3 / Tier4 | Dev / Personal / Production |

### 2.3 Rate Limit 구조

| 항목 | Henrik | Riot |
|---|---|---|
| 차원 | 키 단일 | **App + Method 이중** |
| dev/저등급 한계 | 30~90 req/min | 20 req/sec, 100 req/2min |
| prod 한계 | 130~200 req/min (Patreon) | 500 req/10sec, 30k req/10min |
| 응답 헤더 | `ratelimit`, `X-Cache-Status` | `X-App-Rate-Limit*`, `X-Method-Rate-Limit*`, `Retry-After` |
| Token bucket 구현 | 키별 1개 | **app용 1개 + method별 N개** |

### 2.4 페이지네이션

| 엔드포인트 | Henrik | Riot |
|---|---|---|
| matches | `?size=&start=` | 공식 페이지네이션 없음, matchlist 일괄 반환 |
| leaderboard | `?start_index=&size=` | `?size=&startIndex=` |
| match history filter | v3는 `queue`, `map` 지원 | 없음 (recent-matches는 큐별 별도 엔드포인트) |

### 2.5 식별자

| Henrik | Riot |
|---|---|
| `name#tag` 직접 받음 | **반드시 puuid 선행** — name#tag는 account-v1 한 번 거쳐야 함 |

## 3. 응답 타입 비교

### 3.1 MMR / 현재 티어

**Henrik** (`/v3/mmr/{region}/{platform}/{name}/{tag}`):
```ts
{
  current: {
    tier: { id: 24, name: "Diamond 2" },
    rr: 73,
    last_change: -10,
    elo: 2073,
    games_needed_for_rating: 0
  },
  peak: { tier: { id: 26, name: "Diamond 3" }, season: { id, short: "e8a3" } },
  seasonal: [...]
}
```

**Riot 공식**: 개인 MMR 직접 조회 엔드포인트 없음. `val-match-v1`의 매치별 `players[].competitiveTier` (정수 enum)에서 역산. **RR(LP) 정보는 어디에도 없다.**

| 필드 | Henrik | Riot |
|---|---|---|
| 현재 티어 | ✅ | △ (최근 매치에서 추출) |
| 현재 RR | ✅ | ❌ |
| Peak | ✅ | ❌ (DB 누적 자체 계산) |
| Seasonal | ✅ | ❌ (자체 계산) |
| 티어 표현 | 문자열 `"Diamond 2"` (가공) | 정수 enum + division 별도 |

### 3.2 Match

**Henrik** (`/v4/matches/...`):
```ts
{
  metadata: { match_id, map, queue, started_at, game_length_in_ms, ... },
  players: [{ puuid, name, tag, team_id, agent: { name, id }, stats: { kills, deaths, assists, score, headshots, ... }, ability_casts, ... }],
  teams: [{ team_id, won, rounds: { won, lost } }],
  rounds: [...]
}
```

**Riot 공식** (`/val/match/v1/matches/{matchId}`):
```ts
{
  matchInfo: { matchId, mapId, queueId, gameStartMillis, gameLengthMillis, ... },
  players: [{ puuid, gameName, tagLine, teamId, partyId, characterId, competitiveTier, playerCard, playerTitle, stats: { score, roundsPlayed, kills, deaths, assists, playtimeMillis, abilityCasts: { ... } } }],
  coaches: [...],
  teams: [{ teamId, won, roundsPlayed, roundsWon }],
  roundResults: [...]
}
```

차이:
- Riot은 **ID만** (`mapId`, `characterId`, `playerCard`, `playerTitle`) → content-v1 lookup 필수
- Henrik은 이름/이미지 URL까지 미리 매핑됨
- Riot의 `stats`엔 headshots 같은 세부 통계 없음 (총 점수/KDA/playtime 위주)
- 키 이름이 camelCase (Riot) vs snake_case (Henrik)
- Henrik은 round-by-round abilities/economy 더 풍부

### 3.3 Account

| 필드 | Henrik | Riot |
|---|---|---|
| puuid | ✅ | ✅ |
| name, tag | ✅ | ✅ (`gameName`, `tagLine`) |
| region | ✅ | ❌ (별도 추론 필요) |
| account_level | ✅ | ❌ |
| card_id | ✅ + 이름까지 | ❌ |
| title_id | ✅ + 이름까지 | ❌ |
| platforms | ✅ | ❌ |
| updated_at | ✅ | ❌ |

→ Riot account-v1은 puuid 변환만 담당. 부가 정보는 모두 다른 호출 합성으로 만들어야 함.

### 3.4 에러 envelope

| Henrik | Riot |
|---|---|
| `{ status, errors: [{ code, message, details? }] }` | `{ status: { status_code, message } }` |
| Henrik 자체 code (22, 25, 36...) | HTTP status 그대로 + 메시지 |

## 4. 파이프라인 비교

### 4.1 카드 1장 생성

**Henrik**:
```
Route Handler
  ├─ GET /v2/account/{name}/{tag}             → puuid, region, card_id, title_id, level
  ├─ GET /v3/mmr/{region}/pc/{name}/{tag}     → current/peak/seasonal
  ├─ GET /v4/matches/{region}/pc/{name}/{tag}?size=10 → 최근 10
  └─ (캐시) GET /v1/content                   → 메타
≈ 4 req (cold), 캐시 시 0~1 req
```

**Riot prod**:
```
Route Handler
  ├─ GET /riot/account/v1/accounts/by-riot-id/{name}/{tag}  [cluster: asia]
  │     → puuid
  ├─ GET /val/match/v1/matchlists/by-puuid/{puuid}          [platform: kr]
  │     → matchId[] (~25개)
  ├─ GET /val/match/v1/matches/{matchId} × N (최근 10건)    [platform: kr]
  │     → 매치별 상세 + competitiveTier
  ├─ (캐시) GET /val/content/v1/contents                    → ID→이름
  └─ DB lookup: peak/RR 자체 계산
≈ 12+ req (cold), 매치 상세를 N번 호출해야 하므로 method-RL이 큰 변수
```

→ **Riot은 콜 수가 3배 이상**. method rate limit이 매치 상세 엔드포인트에 집중되므로 token bucket 분리가 더 중요.

### 4.2 캐시 정책

공통 (자체 DB 캐시):

| 데이터 | TTL | 비고 |
|---|---|---|
| content / 메타 | 24h+ | 패치 단위 |
| account | 24h | DB 우선 |
| 매치 상세 | **영구 immutable** | matchId 기준 |
| matchlist | 24h | incremental |
| current MMR/RR | 24h or 강제 새로고침 | Henrik: API / Riot: DB 누적 산출 |
| peak / seasonal | DB 누적 | Riot은 누적이 유일 수단 |

## 5. 도메인 타입 설계

### 5.1 핵심 원칙

> **공통 도메인 타입은 Riot 공식 스키마 기준에 가깝게.**

이유: Henrik은 가공된 형태로 주지만, 그걸 그대로 도메인에 박으면 prod key 시 reverse-engineering 비용이 폭발. 반대로 raw에 가깝게 잡으면 Henrik 어댑터에서 한 번 풀어주는 게 끝.

### 5.2 예시 — Tier

**Bad** (Henrik 형태 그대로):
```ts
interface Tier {
  name: string;  // "Diamond 2"
  rr: number;
}
```

**Good** (provider-agnostic):
```ts
interface Tier {
  rank: "IRON" | "BRONZE" | "SILVER" | "GOLD" | "PLATINUM" | "DIAMOND" | "ASCENDANT" | "IMMORTAL" | "RADIANT";
  division: "I" | "II" | "III" | null;  // RADIANT/IMMORTAL은 null
  rr: number | null;                    // Riot은 null이 될 수 있음
  tierId: number;                       // Riot competitiveTier 정수 (0~27)
}
```

→ Henrik 어댑터: `"Diamond 2"` → `{ rank:"DIAMOND", division:"II", tierId:24 }` 파싱
→ Riot 어댑터: 정수 → enum 매핑 + RR null

### 5.3 예시 — Match

```ts
interface MatchSummary {
  matchId: string;
  startedAt: Date;
  durationMs: number;
  map: { id: string; name: string };
  queue: { id: string; name: string };
  team: { won: boolean; rounds: { won: number; lost: number } };
  player: {
    puuid: string;
    agent: { id: string; name: string };
    competitiveTier: number | null;   // Riot enum, Henrik도 동일하게 정수로 정규화
    stats: { kills: number; deaths: number; assists: number; score: number; playtimeMs: number };
  };
}
```

→ ID 우선, 이름은 부가. content-v1 lookup 결과를 어댑터 단에서 join.

## 6. 어댑터 레이어 구조

```
src/network/valorant/
  types.ts                  # 공통 도메인 타입 (Tier, Account, MatchSummary, RankSnapshot)
  client.ts                 # interface ValorantClient { getAccount, getRank, getMatches, ... }
  index.ts                  # env switch — VALORANT_API_PROVIDER=henrik|riot

  henrik/
    adapter.ts              # implements ValorantClient
    schema.ts               # Zod (Henrik 응답)
    parse-tier.ts           # "Diamond 2" → Tier
    error.ts                # Henrik code → 공통 에러

  riot/
    adapter.ts              # implements ValorantClient (다콜 합성)
    schema.ts               # Zod (Riot 응답)
    routing.ts              # region → cluster + platform
    rate-limit.ts           # app + method 이중 bucket
    content-cache.ts        # ID→name lookup
    error.ts                # status_code → 공통 에러
    derive-rank.ts          # 매치 → 최근 competitiveTier (RR null)
    accumulate-peak.ts      # DB 매치 누적 → peak

  shared/
    cache.ts                # SWR + request coalescing
    errors.ts               # 공통 에러 타입
```

스위치:
```ts
// index.ts
const provider = process.env.VALORANT_API_PROVIDER ?? "henrik";
export const valorant: ValorantClient =
  provider === "riot" ? riotAdapter() : henrikAdapter();
```

## 7. 마이그레이션 체크리스트 (Henrik → Riot)

### 7.1 어댑터 작업

- [ ] `riot/routing.ts` — `kr → { cluster: "asia", platform: "kr" }` 매핑
- [ ] `riot/schema.ts` — account-v1, match-v1, ranked-v1, content-v1 응답 Zod
- [ ] `riot/rate-limit.ts` — `X-App-Rate-Limit` + method별 bucket, 429 + Retry-After 처리
- [ ] `riot/content-cache.ts` — content-v1 24h 캐시, ID→name lookup
- [ ] `riot/derive-rank.ts` — 매치리스트 → 최근 competitive 매치의 `competitiveTier`
- [ ] `riot/accumulate-peak.ts` — DB 매치 테이블 → peak tier 산출
- [ ] `riot/adapter.ts` — 다콜 합성 (account → matchlist → matches × N → content lookup)

### 7.2 데이터 정합성

- [ ] **RR 표시 fallback** — Riot에선 RR null. UI에서 null일 때 "—" 또는 "RR 정보 없음" 처리
- [ ] **Peak 백필** — Henrik 시기 누적이 없으면 prod 전환 직후엔 peak 비정상. 마이그레이션 윈도우 동안 두 provider 응답 비교
- [ ] **Stored matches** — Riot은 만료된 매치 못 가져옴. 기존 Henrik DB 보존 + 신규는 Riot으로
- [ ] **Card/title** — Riot은 ID-only. content-v1 lookup 누락 시 "—" 표시 안전망

### 7.3 운영

- [ ] env: `VALORANT_API_PROVIDER=riot`, `RIOT_API_KEY=...`
- [ ] 헬스체크: cluster + platform 각 1콜
- [ ] 모니터링: app vs method RL 사용률 분리 메트릭
- [ ] 점진 전환: feature flag로 트래픽 N% Riot, 응답 diff 로깅

### 7.4 불변

- 도메인 타입 (`types.ts`) — 손대지 않음
- UI/Route Handler — 어댑터 인터페이스만 호출하므로 무영향
- DB 스키마 — `accounts`, `mmr_snapshots`, `matches` 그대로. peak/RR 컬럼은 Riot도 동일하게 채움 (RR은 nullable)

## 8. 결론

| 결정 | 근거 |
|---|---|
| 현재 Henrik 단일 운영 | dev key 24h 만료, personal key 공개 금지, prod key 미보유 |
| 도메인 타입은 Riot 스키마 기준 | 마이그레이션 시 Henrik 어댑터만 변환 작업, 그 외 무영향 |
| Riot 어댑터는 prod key 확보 후 | match-v1이 prod 전용, 그 전엔 작성해도 검증 불가 |
| 장기적으론 하이브리드 | RR/peak/stored는 Henrik이 우월, 그 외는 Riot 공식 |
