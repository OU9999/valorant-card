---
tags:
  - ui-ux
  - routing
  - architecture
status: published
category: ui-ux
date: 2025-04-05
related:
  - "docs/0405/card-view-system.md"
  - "docs/0405/production-key-todo.md"
---

# 카드 페이지 라우팅 시스템

## 개요

카드 결과를 인라인 상태 전환 대신 독립 페이지(`/card/[id]`)로 분리.
공유 가능한 URL 구조 확보 및 향후 DB 연동 기반 마련.

## 변경 사항

### 이전 구조

```
HeroSection (idle -> loading -> result -> idle)
                                  └── CardResult 인라인 렌더링
```

- 카드 생성 결과가 클라이언트 상태(`useState`)에만 존재
- URL 변경 없음, 공유 불가
- 새로고침 시 카드 소실

### 현재 구조

```
HeroSection (idle -> loading -> router.push('/card/[id]'))
                                  └── /card/[id] 페이지에서 렌더링

/api/card/generate  POST -> { id }  (카드 생성 + 저장)
/api/card/preview   POST -> { id }  (데모 카드 저장)
/card/[id]          GET  -> Server Component -> CardView
```

- 카드 데이터에 고유 ID 부여, 저장소에 보관
- 독립 URL로 접근 가능 (`/card/{12자리ID}`)
- 돌아가기: `Link href="/"`

## 신규 파일

| 파일 | 역할 |
|------|------|
| `src/lib/card/store.ts` | 카드 저장소 인터페이스. 현재 in-memory Map, 향후 DB 교체 |
| `src/app/card/[id]/page.tsx` | 카드 뷰 페이지. Server Component, `getCard(id)` 직접 호출 |
| `src/components/card/card-view.tsx` | 카드 뷰 클라이언트 컴포넌트. TierCard 렌더링 + 돌아가기 링크 |
| `src/app/api/card/preview/route.ts` | 데모 카드 저장 API. `DEMO_CARD_DATA` (Diamond Jett OVR 72) |

## 수정 파일

| 파일 | 변경 내용 |
|------|-----------|
| `src/app/api/card/generate/route.ts` | `saveCard()` 추가, 응답을 `{ id }`로 변경 (기존: 카드 데이터 직접 반환) |
| `src/components/home/hero-section.tsx` | `result` 상태 제거, `router.push('/card/[id]')` 이동, 인라인 CardResult 제거 |

## 저장소 설계

```typescript
// src/lib/card/store.ts
saveCard(data: GeneratedCardData): string   // 12자리 UUID 기반 ID 반환
getCard(id: string): GeneratedCardData | null
```

현재: `Map<string, GeneratedCardData>` (in-memory, 서버 재시작 시 소실)
향후: DB(Supabase, Upstash Redis 등)로 교체 예정. `saveCard`/`getCard` 시그니처 유지.

## 상태 머신 변경

```
이전: idle | loading | result | error
현재: idle | loading | error
```

`result` 상태가 제거되고, 카드 생성 성공 시 페이지 이동으로 대체.

## 유저 플로우

### 카드 생성 (인증 완료)

```
카드 생성 클릭
  -> POST /api/card/generate
  -> 서버: generateCard(puuid) -> saveCard(data) -> { id }
  -> 클라이언트: router.push('/card/{id}')
  -> /card/[id] 페이지: getCard(id) -> CardView 렌더링
```

### 데모 미리보기 (심사 대기 중)

```
카드 디자인 미리보기 클릭
  -> POST /api/card/preview
  -> 서버: saveCard(DEMO_CARD_DATA) -> { id }
  -> 클라이언트: router.push('/card/{id}')
  -> /card/[id] 페이지: getCard(id) -> CardView 렌더링
```

### RSO 콜백 자동 생성

```
Riot OAuth 완료 -> /?authenticated=true
  -> useEffect: refreshAuth() + generateCard()
  -> POST /api/card/generate -> { id }
  -> router.push('/card/{id}')
```

## 미해결

- [ ] 저장소 영속화 (DB 연동)
- [ ] 카드 공유 기능 (OG 메타태그, 이미지 export)
- [ ] 카드 만료/정리 정책
