# Henrik Unofficial Valorant API 조사

> 출처: https://github.com/Henrik-3/unofficial-valorant-api · https://docs.henrikdev.xyz · https://api.henrikdev.xyz/docs
> 조사일: 2026-05-03 / API 버전: v4.6.1 (2025-12-18 기준)

## 1. 한 줄 요약

Riot 공식 prod key 심사 (3~8개월) 대기 동안 사용할 **비공식 Valorant API**. Riot 공식 API를 래핑 + VLR.gg/playvalorant.com 등에서 보강한 캐시 레이어. 키 발급 즉시(Basic) 또는 1~2주(Enhanced).

## 2. 키 등급 / Rate Limit / 가격

### 2.1 무료 티어

| 등급 | Rate Limit | 발급 | 비용 | 용도 |
|---|---|---|---|---|
| **Basic** | 30 req/min | 즉시 | 무료 | 트위치 봇, 학습용, 사적 디스코드 봇 |
| **Enhanced** | 90 req/min | 1~2주 심사 | 무료 | 공개 디스코드 봇, 공개 웹사이트 |

### 2.2 유료 티어 (Patreon, 2026-05-03 실측)

| Patreon Tier | 가격 | API Rate Limit | 비고 |
|---|---|---|---|
| Tier 1 Supporter | €3 / 월 | (없음, Discord 롤만) | 후원 |
| Tier 2 Supporter | €5 / 월 | (없음) | 후원 |
| **Tier 3 Supporter** ⭐ | **€10 / 월** | **130 req/min** | 추천 등급 |
| **Tier 4 Supporter** | **€20 / 월** | **200 req/min** | 최고 등급 |
| Custom | 협의 | 200+ | 별도 사유 심사 |

→ Patreon: https://www.patreon.com/cw/henrikdev/membership
→ **README의 "Lv4/5" 표현은 구버전 잔재. 실제 티어는 1~4뿐.**

### 2.3 Patreon 강제 가입 조건

다음 중 하나라도 해당하면 Tier 3 이상 의무:
- 90 req/min 초과 RL이 필요한 경우
- 프로젝트에 **유료 tier가 있는 경우** (수익화 자체가 트리거 — 매출 무관)

### 2.4 운영 정보

- 발급: Discord 가입 → https://api.henrikdev.xyz/dashboard/
- 인증: 헤더 `Authorization: <key>` 또는 쿼리 `?api_key=<key>`
- 초과 시 429 + `{ status: 429, errors: [{ message: "Rate Limited", ... }] }`
- Rate limit 계산: API 요청 1 + Riot backend 호출 1 (캐시 HIT는 1만 차감)
- 응답 헤더: `X-Cache-Status` (HIT/MISS), `X-Cache-TTL`, `ratelimit-policy`, `ratelimit`
- 키는 **서버 사이드 전용**. 클라이언트 노출 금지 → Next.js Route Handler / Server Action 경유 필수.

## 3. 정책 / 금지사항 (중요)

ToS 위반/차단 위험 항목:

- ❌ **Public store checker** — credential 유출 위험
- ❌ **대규모 analytics 프로젝트** — Riot이 RSO 요구하는 영역
- ❌ 숨김 닉네임 노출, 계정 거래용 checker, 기타 ToS 위반
- ✅ 사용자 동의(consent) 받은 데이터만 처리 — 미동의 analytics는 차단 대상

→ **본 프로젝트(카드 생성 서비스)는 사용자가 자기 닉네임/태그를 입력하는 형태이므로 consent 충족 가능.**

## 4. 핵심 엔드포인트 (베이스: `https://api.henrikdev.xyz`)

### 4.1 Account (puuid 조회)

| Method | Path | 용도 |
|---|---|---|
| GET | `/valorant/v2/account/{name}/{tag}` | name#tag → puuid, region, account_level, card, title, platforms, updated_at |
| GET | `/valorant/v2/by-puuid/account/{puuid}` | puuid 역조회 |

→ 모든 후속 호출의 진입점. 카드 생성 시 닉네임 입력 → puuid 확보.

### 4.2 MMR / 현재 티어 (v3 권장)

| Method | Path | 용도 |
|---|---|---|
| GET | `/valorant/v3/mmr/{region}/{platform}/{name}/{tag}` | current(tier, rr), peak, seasonal[] |
| GET | `/valorant/v3/by-puuid/mmr/{region}/{platform}/{puuid}` | puuid 버전 |

- `region`: `eu`, `na`, `kr`, `ap`, `latam`, `br`
- `platform`: `pc` | `console`
- **카드 디자인 핵심 데이터** (Iron~Radiant 티어 + RR + peak)

### 4.3 MMR History (RR 변동 그래프)

| Method | Path |
|---|---|
| GET | `/valorant/v2/mmr-history/{region}/{platform}/{name}/{tag}?size=N` |
| GET | `/valorant/v2/by-puuid/mmr-history/{region}/{platform}/{puuid}?size=N` |

→ refunded_rr, was_derank_protected 포함. "최근 N판 RR 변동" 시각화에 사용.

### 4.4 Match History

| Method | Path | 비고 |
|---|---|---|
| GET | `/valorant/v4/matches/{region}/{platform}/{name}/{tag}?size=&start=` | 최신 권장 |
| GET | `/valorant/v4/by-puuid/matches/{region}/{platform}/{puuid}?size=&start=` | puuid |
| GET | `/valorant/v4/match/{region}/{matchid}` | 단일 매치 상세 |

쿼리: `size`, `start` (페이지네이션). v3는 `queue`, `map` 필터 지원.

### 4.5 Stored (Henrik 캐시 DB)

| Path | 용도 |
|---|---|
| `/valorant/v1/stored-matches/{region}/{name}/{tag}` | Riot이 만료시킨 과거 매치까지 |
| `/valorant/v2/stored-mmr-history/{region}/{platform}/{name}/{tag}` | 장기 RR 추이 |

→ Riot은 보통 최근 ~25경기만 제공. 더 긴 히스토리가 필요하면 stored 사용.

### 4.6 Leaderboard

| Method | Path |
|---|---|
| GET | `/valorant/v3/leaderboard/{region}/{platform}?start_index=&size=` |

→ 현재 시즌 라이브, 5분 캐시. tier threshold + player[] (rank, rr, wins).
→ 본 프로젝트의 "리더보드 페이지"에 직결.

### 4.7 콘텐츠/메타

| Path | 용도 |
|---|---|
| `/valorant/v1/content?locale=` | 시즌 ID, 스킨, 무기, 요원, 맵 메타 |
| `/valorant/v1/version/{region}` | 클라이언트 버전 |
| `/valorant/v1/status/{region}` | 서버 상태 |
| `/valorant/v1/queue-status/{region}` | 큐 상태 |
| `/valorant/v1/crosshair/generate?code=` | 1024x1024 크로스헤어 PNG |
| `/valorant/v1/website/{countrycode}` | playvalorant 뉴스 |

### 4.8 스토어

| Path | 비고 |
|---|---|
| `/valorant/v2/store-featured` | 현재 번들 (개인 일일 스토어는 ❌) |

### 4.9 Esports (VLR 기반)

`/valorant/v1/esports/schedule?league=`, `/valorant/v2/esports/vlr/{events,matches,teams,players}/...`
→ 본 프로젝트와 거리 있음, 보류.

### 4.10 Premier

`/valorant/v1/premier/...` (팀, 시즌, 컨퍼런스, 디비전 리더보드). 3시간 단위 인덱싱.

### 4.11 Raw

| Method | Path |
|---|---|
| POST | `/valorant/v1/raw` | Riot API 응답 그대로 패스스루 (body로 호출 정보) |

→ 래퍼에 없는 엔드포인트 호출용 escape hatch.

## 5. 주요 에러 코드

| code | status | 의미 |
|---|---|---|
| 0 | 400/401/403/404/429 | 입력/키/RL |
| 22 | 404 | account not found |
| 23 | 404 | region not found |
| 25 | 404 | no MMR data (언랭) |
| 26 | 404 | match not found |
| 36 | 404 | user not on leaderboard |
| 42 | 400 | invalid platform (`pc`/`console`만) |
| 46 | 404 | Riot removed endpoint |

## 6. 본 프로젝트 적용 설계 (초안)

### 6.1 어댑터 레이어

```
src/network/
  fetch-api.ts                  # 기존
  valorant/
    types.ts                    # 도메인 타입 (Tier, RankSnapshot, MatchSummary…)
    client.ts                   # 인터페이스 (provider-agnostic)
    henrik-adapter.ts           # Henrik 응답 → 도메인 매핑
    riot-adapter.ts             # (prod key 받으면 추가)
    index.ts                    # provider 스위치 (env)
```

스위치: `VALORANT_API_PROVIDER=henrik|riot` (기본 `henrik`)
키: `HENRIK_API_KEY` (서버 전용. 클라이언트 노출 금지)

### 6.2 호출 위치

브라우저 → Henrik 직접 호출 ❌ (키 노출). Next.js Route Handler / Server Action 경유 필수.

### 6.3 카드 생성 MVP에 필요한 엔드포인트

1. **`/v2/account/{name}/{tag}`** — puuid, region, account_level, card_id, title_id 확보
2. **`/v3/mmr/{region}/{platform}/{name}/{tag}`** — 현재 티어, RR, peak 티어
3. **`/v4/matches/{region}/{platform}/{name}/{tag}?size=10`** — 최근 전적 (KDA, agent, map)
4. (옵션) **`/v1/content`** — 카드/타이틀 ID → 이름 매핑

→ 4개 엔드포인트 조합으로 카드 한 장 생성 가능.

### 6.4 캐시 전략 (자체 DB 기반)

본 프로젝트 방침: **DB에 데이터 + "갱신 시간" 컬럼 → 24h 이내면 API 호출 스킵.**

| 데이터 | TTL | 비고 |
|---|---|---|
| `content` (시즌/요원/맵 메타) | 24h+ | 사실상 패치 단위 |
| `account` (puuid, card_id, level) | 24h | DB 우선, 만료시만 호출 |
| `mmr` 현재 티어 / RR | 24h (또는 사용자 강제 새로고침) | 카드 핵심 데이터 |
| `matches` 리스트 | 24h | 신규 매치만 incremental fetch |
| 매치 상세 (matchid) | **영구 immutable** | matchid는 절대 변하지 않음 |

추가 안전장치:
- **Stale-while-revalidate**: TTL 만료해도 일단 DB 값 반환 + 백그라운드 갱신
- **Request coalescing**: 같은 puuid 동시 in-flight 요청은 1건으로 합치기 (Map<puuid, Promise>)
- **Token bucket**: 자체 limiter로 RL 안에 줄 세우기, 429 받기 전에 큐잉
- **TTL Jitter**: 24h ± 2h 랜덤 — 일괄 만료로 인한 burst 방지

### 6.5 Riot 공식 마이그레이션

도메인 타입을 동일 인터페이스로 두면 어댑터 교체만으로 끝. Henrik의 `seasonal[]` 구조가 Riot의 `match-v1` + `mmr-v1` 매핑과 다르므로, **도메인 타입을 Riot 공식에 가깝게 정의**해두면 후일 작업량 ↓.

## 7. 트래픽 시나리오 / 결정 가이드

### 7.1 카드 1장 생성 = 약 4 req (cold)

`account` + `mmr` + `matches` + (옵션)`content`. DB 캐시 HIT시 0~1 req.

### 7.2 규모별 권장 키 (24h DB 캐시 가정)

| 규모 | 평균 req/min | 권장 등급 | 월 비용 |
|---|---|---|---|
| 친구 ~50명 | < 1 | Basic (30) | 무료 |
| DAU ~1k | 2~3 | Enhanced (90) | 무료 |
| DAU ~10k | ~28 (peak ~100+) | Enhanced (90) + 캐시 강화 | 무료 |
| DAU ~30k | ~80 | Tier 3 (130) | €10 |
| DAU ~50k+ | 130+ | Tier 4 (200) | €20 |
| 그 이상 | — | Custom 협의 | 별도 |

→ **평균이 아니라 burst가 진짜 한계.** Coalescing + token bucket 적용 시 위 표 한 단계씩 미뤄도 됨.

### 7.3 유료 모델 도입 시

매출과 무관하게 **Tier 3 €10/월부터 의무**. → Henrik과의 일종의 라이선스 비용.

### 7.4 Riot prod key와의 관계

- Riot 공식 prod key: 심사 3~8개월, 받으면 Henrik 의존 종료 가능
- 받기 전까지는 Henrik이 사실상 유일한 대안
- 받은 후에도 Henrik의 stored-matches / Premier / esports 같은 보강 데이터는 가치 있음 → 하이브리드 가능

## 8. 다음 액션

- [ ] Discord 가입 (https://discord.gg/X3GaVkX2YN) → Basic 키 발급 → `.env.local`에 `HENRIK_API_KEY`
- [ ] `src/network/valorant/types.ts` 도메인 타입 정의 (Riot 공식 스키마 기준)
- [ ] `henrik-adapter.ts` 4개 엔드포인트 구현 + Zod 검증
- [ ] Next.js Route Handler 1개 (`/api/profile/[name]/[tag]`)에서 어댑터 호출
- [ ] DB 스키마: `accounts`, `mmr_snapshots`, `matches` + 각 테이블 `fetched_at` 컬럼
- [ ] Stale-while-revalidate + request coalescing 미들웨어
- [ ] 카드 생성 페이지에서 mock data 대신 실데이터 결합
- [ ] (병행) Enhanced 키 신청 — 출시 전 1~2주 여유 두고
- [ ] (장기) Riot prod key 심사 계속 대기
