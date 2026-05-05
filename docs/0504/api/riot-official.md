# Riot 공식 Valorant API 조사

> 출처: https://developer.riotgames.com/apis · https://developer.riotgames.com/docs/portal · https://developer.riotgames.com/docs/valorant
> 조사일: 2026-05-05

## 1. 한 줄 요약

Valorant의 **퍼스트파티 공식 API**. 안정성/ToS는 최상위지만, **개인 플레이어의 현재 티어/RR을 직접 조회하는 엔드포인트가 없고**, match 계열은 **production key (심사 3~8개월)** 가 필수. 본 프로젝트(카드 생성)에는 **prod key 없이는 사실상 활용 불가**.

## 2. 키 등급 / Rate Limit / 만료

| 등급 | Rate Limit | 만료 | 용도 |
|---|---|---|---|
| **Development** | 20 req/sec, 100 req/2min | **24시간마다 자동 비활성화** (수동 reset) | 프로토타이핑, 비공개 학습 |
| **Personal** | 20 req/sec, 100 req/2min | 영구 (등록 단위) | 사적 디스코드, 스트리밍 봇 등 소규모 |
| **Production** | 500 req/10sec, 30,000 req/10min | 영구 | 공개 서비스. 심사 3~8개월. RL 증액 협의 가능 |

### 2.1 핵심 함정

- **dev key의 24h 만료** → Vercel 배포 환경에서 매일 죽음. 자동 갱신 API 없음. **프로덕션 부적합.**
- **Personal key**는 만료는 없지만 **공개 서비스 금지** (open alpha/beta 포함). 카드 생성 사이트는 공개 서비스이므로 personal key로도 운영 불가.
- **Production key**는 valorant-card 같은 third-party 서비스에 대해 **신청 → 데모 → 심사** 단계. 거절률 높음. ToS·UX·데이터 사용처 명확해야 함.

### 2.2 인증

- 헤더: `X-Riot-Token: <key>`
- 키는 **서버 사이드 전용**. 클라이언트 노출 절대 금지.

## 3. 라우팅 (host-based)

Riot API는 베이스 URL 자체에 region/cluster를 박는 host-based 라우팅이다.

### 3.1 Platform routing (Valorant 게임 데이터)

`https://{platform}.api.riotgames.com`

| platform | 지역 |
|---|---|
| `kr` | 한국 |
| `ap` | 아시아 (일본, 동남아) |
| `na` | 북미 |
| `latam` | 중남미 |
| `br` | 브라질 |
| `eu` | 유럽 |
| `esports` | esports 전용 데이터 |

→ `val-match-v1`, `val-ranked-v1`, `val-content-v1`, `val-status-v1` 모두 platform 라우팅.

### 3.2 Cluster routing (account / RSO)

`https://{cluster}.api.riotgames.com`

| cluster | 커버 |
|---|---|
| `americas` | NA, LATAM, BR |
| `asia` | KR, JP |
| `europe` | EUW, EUNE, TR, RU |
| `sea` | OCE, PH, SG, TW, VN, TH |

→ `account-v1` 전용. **platform과 cluster를 혼동하면 404.**

### 3.3 본 프로젝트 라우팅 헬퍼 필요성

플레이어 닉네임 입력 → cluster로 account-v1 → puuid 확보 → platform으로 match/ranked 호출. **두 단계 라우팅 매핑 헬퍼가 필수**.

## 4. 핵심 엔드포인트

### 4.1 Account (account-v1, cluster routing)

| Method | Path | 용도 | 키 등급 |
|---|---|---|---|
| GET | `/riot/account/v1/accounts/by-riot-id/{gameName}/{tagLine}` | name#tag → puuid | dev OK (일반적으로) |
| GET | `/riot/account/v1/accounts/by-puuid/{puuid}` | puuid → name#tag | dev OK |
| GET | `/riot/account/v1/accounts/me` | 로그인한 본인 (RSO) | **prod + RSO** |

→ 모든 후속 호출의 진입점. 본 프로젝트는 by-riot-id로 진입.

### 4.2 Match (val-match-v1, platform routing) — **prod key 필수**

| Method | Path | 용도 |
|---|---|---|
| GET | `/val/match/v1/matches/{matchId}` | 단일 매치 상세 |
| GET | `/val/match/v1/matchlists/by-puuid/{puuid}` | 플레이어 매치 리스트 (matchId 배열) |
| GET | `/val/match/v1/recent-matches/by-queue/{queue}` | 큐별 최근 매치 (분석용) |

- **dev key로 호출 불가 (403).**
- 페이지네이션 없음. matchlist는 일정 분량의 matchId 목록을 반환하고, 각각 별도 호출로 상세 조회.

### 4.3 Ranked (val-ranked-v1, platform routing)

| Method | Path | 용도 | 키 등급 |
|---|---|---|---|
| GET | `/val/ranked/v1/leaderboards/by-act/{actId}?size=&startIndex=` | 액트별 리더보드 | dev OK |

- **개인 플레이어의 현재 티어/RR을 조회하는 엔드포인트는 없다.** 리더보드 상위 N명만 노출.
- `actId`는 `val-content-v1`에서 현재 act 조회 후 사용.

### 4.4 Content (val-content-v1, platform routing)

| Method | Path | 용도 | 키 등급 |
|---|---|---|---|
| GET | `/val/content/v1/contents?locale=` | 시즌/액트, 요원, 맵, 카드, 타이틀 메타 | dev OK |

→ ID → 이름 매핑 테이블 빌드용. 24h+ 캐시.

### 4.5 Status (val-status-v1, platform routing)

| Method | Path | 용도 | 키 등급 |
|---|---|---|---|
| GET | `/val/status/v1/platform-data` | 서버 상태/유지보수 | dev OK |

### 4.6 Console 계열

`val-console-match-v1`, `val-console-ranked-v1` — **prod key 필수**. 본 프로젝트(PC 우선) 범위 밖.

## 5. 응답 envelope / 에러

### 5.1 정상

각 엔드포인트가 도메인 객체를 그대로 반환 (envelope 없음). 예: `/accounts/by-riot-id/...` →
```json
{ "puuid": "...", "gameName": "...", "tagLine": "..." }
```

### 5.2 에러

```json
{ "status": { "status_code": 404, "message": "Data not found" } }
```

주요 status_code:
- `400` — bad request (param 형식)
- `401` — Unauthorized (키 누락)
- `403` — Forbidden (키 등급 부족 / 비활성)
- `404` — not found (account, match, leaderboard 미존재)
- `429` — Rate limited
- `503` — service unavailable

### 5.3 Rate limit 응답 헤더

- `X-App-Rate-Limit`, `X-App-Rate-Limit-Count` — 앱 단위
- `X-Method-Rate-Limit`, `X-Method-Rate-Limit-Count` — 메서드 단위
- `Retry-After` — 429 시 대기 초

→ **app + method 이중 limit**. 둘 중 하나라도 초과 시 429. 어댑터에서 두 버킷을 동시에 추적해야 함.

## 6. 응답 데이터의 한계 (Henrik과의 가장 큰 차이)

### 6.1 개인 현재 티어/RR — 직접 조회 불가

- `val-ranked-v1`은 리더보드(상위 N명)만.
- `val-match-v1`의 매치 데이터에는 매치 종료 시점의 `competitiveTier`(정수 enum, division 포함)는 있으나 **RR(LP)은 없다.**
- 결과적으로 "이 사람의 현재 랭크/RR" 데이터는 공식 API로 직접 못 가져옴.
- **우회**: 최근 competitive 매치의 `competitiveTier`를 fetch하여 "최근 매치 시점 티어"로 표시. RR은 표시 불가.

### 6.2 Peak rank — 없음

Riot은 peak rank를 별도로 노출하지 않음. **DB에 매치별 competitiveTier를 누적 저장하여 자체 계산** 필요.

### 6.3 Stored matches — 없음

Riot은 일정 기간 지난 매치를 expire 시킴 (체감상 ~25경기 또는 일정 시간). 장기 추이가 필요하면 자체 DB 누적이 유일.

### 6.4 카드/타이틀 — ID-only

매치/account 응답엔 `playerCard`, `playerTitle`이 ID로만 옴. 이름/이미지는 `val-content-v1` lookup 필요.

## 7. 본 프로젝트 적용

### 7.1 prod key 없을 때 가능한 것

| 기능 | 가능 여부 |
|---|---|
| name#tag → puuid 변환 | ✅ (account-v1) |
| 시즌/요원/맵 메타 | ✅ (content-v1) |
| 서버 상태 | ✅ (status-v1) |
| 리더보드 상위 N명 | ✅ (ranked-v1) |
| **개인 매치 히스토리** | ❌ (match-v1 = prod) |
| **개인 현재 티어** | ❌ (전용 엔드포인트 자체 없음) |
| **개인 peak / RR** | ❌ |

→ **카드 생성 서비스의 핵심 데이터(개인 티어, RR, 매치)가 모두 막혀 있다.** prod key 받기 전에는 Riot 공식 단일 운영 불가.

### 7.2 prod key 확보 후

- account, content, status, ranked는 dev key 호환 그대로.
- match-v1 활성화 → 매치 리스트 + 매치별 competitiveTier 추출 → 최근 티어 도출.
- RR/peak는 자체 DB 누적으로 보강.
- → 그래도 Henrik의 정제된 `current+peak+seasonal` 한 번에 비하면 **호출 수와 후처리 비용이 더 큼.**

### 7.3 하이브리드 가치 (Henrik과 병행)

| 데이터 | Riot prod | Henrik | 권장 |
|---|---|---|---|
| account, content, status, leaderboard | ✅ 깔끔 | ✅ 가능 | **Riot 직접** (정확/공식) |
| 개인 현재 티어/RR | ❌ RR 없음 | ✅ | **Henrik 유지** |
| stored matches (오래된 매치) | ❌ | ✅ | **Henrik 유지** |
| 일반 match | ✅ | ✅ | **Riot 우선, Henrik 백업** |
| Premier / Esports | ❌ (esports platform 한정) | ✅ | **Henrik** |

→ prod key 확보 후에도 Henrik은 stored / RR / Premier 영역에서 가치 유지.

## 8. 다음 액션

- [ ] prod key 신청서 작성 (현재 사이트 데모 + ToS 준수 항목 정리)
- [ ] Riot 공식 도메인 타입을 **공통 도메인 타입의 베이스라인**으로 잡기 (Henrik 어댑터에서 변환)
- [ ] account-v1 dev key 호출 검증용 스크립트 (`pnpm dlx tsx scripts/check-riot-account.ts`) — name#tag → puuid 200 응답 확인
- [ ] (prod 확보 후) `riot-adapter.ts` 구현, `VALORANT_API_PROVIDER=riot` 토글
- [ ] (prod 확보 후) match→competitiveTier 누적 → 자체 peak/현재 티어 계산 파이프라인
