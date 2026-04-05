---
tags:
  - ui-ux
  - card-design
  - api
status: published
category: ui-ux
date: 2025-04-05
related:
  - "[[card-design-review]]"
  - "[[production-key-todo]]"
---

# 카드 뷰 시스템

## 개요

RSO 인증 -> 카드 생성 API -> 카드 렌더링까지의 전체 유저 플로우 구현.
히어로 섹션에 검색 폼과 쇼케이스 통합.

## 구조

### RSO 인증 플로우

```
/api/auth/rso/authorize  -> Riot OAuth 페이지로 리다이렉트
/api/auth/rso/callback   -> 토큰 교환 후 세션에 puuid 저장
/api/auth/rso/logout     -> 세션 초기화
```

- CSRF 방지: `crypto.randomUUID()` state 생성 + `timingSafeEqual` 검증
- 세션: `iron-session` 기반. puuid, accessToken, refreshToken, expiresAt 저장
- 미설정 가드: RSO 클라이언트 미설정 시 모든 엔드포인트 503 반환

### 카드 생성 API

`POST /api/card/generate`

파이프라인:

1. 세션에서 puuid 확인 (미인증 시 401)
2. Riot ID 파싱 (`gameName#tagLine`)
3. 계정 조회 (`getAccountByRiotId`)
4. 매치 리스트 조회 -> 경쟁전 필터 -> 최근 5경기 추출
5. 매치 상세 병렬 fetch (`Promise.all`)
6. 최근 매치에서 경쟁 티어 추출
7. 카드 스코어 산출 (`calculateCardScore`)
8. 모스트 에이전트/무기 결정
9. `GeneratedCardData` 반환

에러 처리: `CardGenerationError` 클래스로 에러 코드 통일.
동시성 제한: in-memory 카운터, MAX_CONCURRENT = 2.

### 히어로 섹션 상태 머신

```
idle -> loading -> result
                -> error -> idle
```

- `idle`: 검색 폼 + 3열 카드 쇼케이스 노출
- `loading`: 스피너 표시, 입력 비활성화
- `result`: `CardResult` 컴포넌트로 전환. 생성된 카드 렌더링
- `error`: 에러 메시지 표시. 입력 변경 시 idle로 복귀

### TierCard 리팩토링

단일 컴포넌트에서 서브 컴포넌트로 분리:

- `tier-card/layers.tsx` -- 배경 이미지 + 포트레이트 레이어
- `tier-card/ovr-section.tsx` -- OVR 스코어 표시
- `tier-card/player-name-section.tsx` -- 플레이어 이름 + 리전
- `tier-card/stats-section.tsx` -- 6종 스탯 그리드
- `tier-card/tier-icon-section.tsx` -- 티어 아이콘 + 무기 아이콘
- `tier-card/types.ts` -- 공유 타입 정의

### 쇼케이스 시스템

3열 무한 스크롤 카드 쇼케이스. 각 열 독립 속도/방향 설정.

- 열 1: 상향, 60s 주기
- 열 2: 하향, 44s 주기
- 열 3: 상향, 52s 주기
- CSS 애니메이션 기반. `card-scroll-up`, `card-scroll-down` 클래스.
- 18장(6장 x 3열) 쇼케이스 카드. 9개 티어 전체 커버.
