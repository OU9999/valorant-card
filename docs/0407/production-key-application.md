---
tags:
  - api
  - riot-games
  - phase/3
status: published
category: api
date: 2025-04-07
related:
  - "docs/0407/production-key-readiness.md"
  - "docs/0407/valorant-dev-policy-ko.md"
---

# Production Key 신청 폼 작성

Developer Portal 신청 폼 항목별 작성 내용.

---

## Product Name

폼 설명: 제품 이름.

```
Valorant Card
```

## Product Description

폼 설명: API를 어떻게 사용할지 상세히 기술할 것. 완전하고 충분한 설명이 없는 신청은 리젝됨.

```
Valorant Card is a web-based tool that generates FC-style player cards from VALORANT competitive match statistics. The service will be available at https://valfc-card.com.

Key Summary:
- Generates visually rich cards based on a player's ranked match history (last 20 games) + current tier, after logging in via RSO
- Pre-generated agent portraits in various poses add randomness to each card
- Players can track their competitive growth visually and share their cards with friends to showcase achievements

How it works:
1. Player logs in via RSO (Riot Sign On) to opt-in to data sharing
2. A data disclosure dialog informs the player that their match history, rank, and performance stats will be displayed on their card
3. The app fetches the player's recent competitive matches via val-match-v1
4. Performance metrics (ACS, K/D, HS%, DDΔ, KAST%, ADR) are calculated from match data
5. An OVR score (1-99) is generated based on competitive tier + recent performance
6. A visually styled card is rendered with tier-specific design (Iron through Radiant)

APIs used:
- account-v1: Riot ID and PUUID lookup after RSO authentication
- val-match-v1: Match list and match details for competitive games
- val-content-v1: Game content data (agents, maps)
- val-ranked-v1: Leaderboard reference data

The product is transformative — rather than simply displaying raw stats, it creates unique visual cards combining calculated OVR scores (new insights), tier-specific and character-specific artwork (new aesthetics), and performance analysis. Players can view and share their generated cards.

Logic verification and testing will begin immediately upon Production Key approval. The site includes Privacy Policy, Terms of Service, and the required Riot Games disclaimer in both English and Korean.

Live site: https://valfc-card.com
Demo: Click "Riot 계정으로 로그인" → "카드 디자인 미리보기" to see a sample card.
```

## Product Group

폼 설명: 제품은 Developer Portal 내 그룹에 소속됨. Default Group 외의 그룹에 개발자 추가 가능.

```
Default Group
```

## Product URL

폼 설명: Production 앱은 검증 목적의 유효한 URL 필요.

```
https://valfc-card.com
```

## Product Game Focus

폼 설명: 여러 게임을 지원하는 경우, 게임별로 한 번씩 등록해야 함.

```
VALORANT
```

## Are you organizing tournaments?

폼 설명: 대회 운영 여부.

```
No
```

---

## 한국어 번역 (참고용)

### 제품명

```
Valorant Card
```

### 제품 설명

```
Valorant Card는 발로란트 경쟁전 매치 스탯을 기반으로 FC 스타일의 플레이어 카드를 생성하는 웹 기반 도구. https://valfc-card.com 에서 서비스 할 예정.

핵심 요약
- RSO로 로그인한 플레이어의 랭크 전적(20판) + 현재 티어를 기반으로 비주얼적으로 화려한 카드 생성
- 미리 생성해놓은 요원의 다양한 자세로 랜덤성 부여
- 플레이어는 자신의 경쟁전 성장을 시각적으로 확인하고, 생성된 카드를 친구들과 공유하며 성취를 자랑할 수 있음

작동 방식:
1. 플레이어가 RSO(Riot Sign On)로 로그인하여 데이터 공유에 opt-in
2. 데이터 공개 동의 다이얼로그에서 매치 기록, 랭크, 퍼포먼스 스탯이 카드에 표시됨을 안내
3. val-match-v1을 통해 최근 경쟁전 매치 데이터 조회
4. 매치 데이터에서 퍼포먼스 지표(ACS, K/D, HS%, DDΔ, KAST%, ADR) 산출
5. 경쟁전 티어 + 최근 퍼포먼스 기반으로 OVR 점수(1~99) 생성
6. 티어별 고유 디자인(아이언~레디언트)으로 시각화된 카드 렌더링

사용 API:
- account-v1: RSO 인증 후 Riot ID 및 PUUID 조회
- val-match-v1: 경쟁전 매치 리스트 및 매치 상세
- val-content-v1: 게임 콘텐츠 데이터 (요원, 맵)
- val-ranked-v1: 리더보드 참조 데이터

본 제품은 변환적(transformative) 콘텐츠 — 단순 스탯 나열이 아니라, 계산된 OVR 점수(새로운 통찰) + 티어별, 캐릭터별 고유 아트워크(새로운 미학) + 퍼포먼스 분석이 결합된 고유한 비주얼 카드를 생성.

Production Key 승인 후 즉시 로직 검증 및 테스트 후 적용 예정. 사이트에 개인정보처리방침, 이용약관, Riot Games 면책조항(영문+한국어) 포함.

라이브 사이트: https://valfc-card.com
데모: "Riot 계정으로 로그인" 클릭 → "카드 디자인 미리보기"로 샘플 카드 확인 가능.
```

### 제품 그룹

```
Default Group
```

### 제품 URL

```
https://valfc-card.com
```

### 제품 게임 포커스

```
VALORANT
```

### 대회 운영 여부

```
아니오
```
