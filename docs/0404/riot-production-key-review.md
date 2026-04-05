---
tags:
  - api
  - riot-games
  - infrastructure
status: published
category: api
date: 2025-04-04
related:
  - "[[riot-api-key-guide]]"
---

# Riot Production Key 심사 분석

## 배경

VALORANT은 Personal Key를 제공하지 않음.
Development Key(24h 만료) 또는 Production Key(심사 필수)만 존재.
공개 서비스 운영 = Production Key 필수.

Henrik 비공식 API는 60 req/min 제한 + 공개 서비스 사용 시 키 취소 위험.
개발/프로토타이핑 단계에서만 유효한 수단.

## API Key 비교

| 구분 | Development | Production |
|------|-------------|------------|
| 만료 | 24시간 | 없음 |
| Rate Limit | 20req/s, 100req/2min | 500req/s, 30,000req/10min |
| 심사 | 불필요 | 필수 |
| 용도 | 프로토타입 개발 | 공개 서비스 |

## 심사 요구사항

### 필수 제출 항목

- 작동하는 웹사이트 또는 프로토타입
- 도메인 소유권 인증 (`https://yourdomain.com/riot.txt`)
- 이용약관(Terms of Service) 페이지
- 개인정보처리방침(Privacy Policy) 페이지
- 제품 설명 및 데이터 접근 목적
- 유저 플로우 데모 링크

### VALORANT 전용 요건

- RSO(Riot Sign On) OAuth 연동 필수
- 플레이어 본인이 데이터 공유에 명시적 opt-in해야 함
- "계정 연동 시 플레이어 데이터가 공개됩니다" 면책 고지 포함 필수
- 1개 API Key = 1개 제품/웹사이트에만 사용

### 심사 기간

- 공식 기준: 약 10 영업일 (2주)
- 실제: 최대 수개월 사례 존재

## 승인/거절 기준

### 승인되는 유형

- 플레이어 성장 추적, 실력 향상에 도움되는 도구
- 데이터를 변환적(transformative)으로 활용하는 서비스
- Riot 생태계에 긍정적 가치를 제공하는 앱

### 거절/금지되는 유형

| 유형 | 설명 |
|------|------|
| MMR/ELO 계산기 | 공식 랭킹 시스템 대안 제공 명시적 금지 |
| 불공정 이점 제공 | 치팅, 일부 플레이어에게만 유리한 도구 |
| 플레이어 비익명화 | opt-in 없이 타 플레이어 식별 정보 노출 |
| 도박/베팅 | 베팅 기능 포함 제품 |
| 미완성 앱 | 웹사이트 미완성 상태에서 신청 불가 |

## 본 프로젝트 심사 통과 가능성

**판단: 중상(Medium-High)**

### 긍정 요소

- 스탯 데이터를 시각적 카드로 변환 -> "변환적 콘텐츠" 요건 부합
- tracker.gg, blitz.gg 등 유사 스탯 서비스 승인 전례 존재
- 플레이어 성장 추적 도구로 분류 가능

### 위험 요소

- RSO OAuth 미구현 시 심사 자체 불가
- opt-in하지 않은 플레이어 데이터 노출 시 거절

### 문제없는 항목 (혼동 주의)

- **OVR 퍼포먼스 스코어**: 금지 대상인 "MMR/ELO 계산기"는 Riot 내부 매칭 점수를 역산/추정하는 도구를 의미함.
  공개 매치 스탯(K/D, HS%, 승률 등)을 종합한 퍼포먼스 스코어는 이에 해당하지 않음.
  tracker.gg의 "Tracker Score", blitz.gg의 퍼포먼스 레이팅도 동일 방식이며 모두 Production Key 보유.

## 참고

- [Production Key Applications](https://support-developer.riotgames.com/hc/en-us/articles/22801383038867-Production-Key-Applications)
- [VALORANT Developer Policy](https://support-developer.riotgames.com/hc/en-us/articles/22698769097107-VALORANT)
- [General Policies](https://developer.riotgames.com/policies/general)
- [RSO (Riot Sign On)](https://support-developer.riotgames.com/hc/en-us/articles/22801670382739-RSO-Riot-Sign-On)
- [API Terms and Conditions](https://developer.riotgames.com/terms)
