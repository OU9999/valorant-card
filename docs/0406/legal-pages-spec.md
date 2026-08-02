---
tags:
  - infrastructure
  - riot-games
  - specification
  - phase/2
status: published
category: api
date: 2025-04-06
related:
  - "docs/0404/riot-production-key-review.md"
  - "docs/0405/production-key-todo.md"
---

# 법적 페이지 작성 명세

Production Key 심사 통과를 위해 필요한 법적 페이지 3종의 작성 가이드.

## 필요 페이지 목록

| 페이지 | 경로 | 비고 |
|--------|------|------|
| 개인정보처리방침 | `/privacy` | 한국어 작성, PIPA 준수 |
| 이용약관 | `/terms` | 한국어 작성 |
| Riot 면책 고지 | Footer 상시 노출 | 영문 필수, 한국어 병기 |

## 개인정보처리방침 (Privacy Policy)

### 수집하는 정보

Riot API를 통해 수집하는 데이터 항목 명시 필요.

- Riot ID (게임 이름 + 태그라인)
- PUUID (계정 고유 식별자)
- 매치 히스토리 (최근 경쟁전 기록)
- 랭크/티어 정보
- 에이전트 사용 통계
- 라운드별 킬/데스/어시스트

### 수집 방법

- RSO OAuth 동의 후 Riot Games API를 통해 수집
- 플레이어 본인의 명시적 opt-in 필수
- Riot 계정 자격증명(비밀번호 등)은 수집하지 않음

### 이용 목적

- 발로란트 플레이어 카드 생성 및 표시
- 플레이어 퍼포먼스 스코어 산출

### 보관 및 파기

- 서버 사이드 캐시 보관 기간 명시 필요
- 세션 만료 시 세션 데이터 삭제
- 이용자 요청 시 데이터 삭제 절차 안내

### 제3자 제공

- 제3자에게 판매하지 않음
- Riot Games API 이용약관 준수
- 호스팅 서비스(Vercel 등) 인프라 이용 사실 고지

### 이용자 권리

- 데이터 열람, 정정, 삭제 요청 가능
- 연락처(이메일) 명시

### 한국 개인정보보호법(PIPA) 준수 항목

- 개인정보 처리 목적 명시
- 개인정보 보호책임자 성명 및 연락처
- 국외 이전 고지 (서버가 해외인 경우 이전 국가, 업체명, 이전 항목 명시)

### 외부 참조 링크

- Riot Games 개인정보방침: https://www.riotgames.com/en/privacy-notice

## 이용약관 (Terms of Service)

### 서비스 설명

- 발로란트 공개 매치 스탯 기반 플레이어 카드 생성 도구
- Riot Games와 제휴/보증 관계 없는 독립 서비스

### 이용 조건

- RSO 로그인 및 데이터 공개 동의 필수
- 본인 계정 데이터만 조회 가능

### 지적재산권

- VALORANT, Riot Games 및 관련 자산은 Riot Games, Inc. 소유
- 생성된 카드는 개인 비상업적 용도

### 금지 행위

- 서비스 악용, 자동화 스크래핑
- Rate limit 우회 시도
- 타인 계정 사칭

### 면책 조항

- 서비스 "있는 그대로(as-is)" 제공
- 데이터 정확성, 서비스 가용성 미보장
- API 제공 중단 시 서비스 중단 가능

### 준거법

- 대한민국 법률 적용

## Riot 면책 고지 (필수 문구)

Footer에 상시 노출. 영문 필수, 한국어 병기 권장.

### 영문 (필수)

> Valorant Card isn't endorsed by Riot Games and doesn't reflect the views or opinions of Riot Games or anyone officially involved in producing or managing Riot Games properties. Riot Games, and all associated properties are trademarks or registered trademarks of Riot Games, Inc.

### 한국어 (권장)

> Valorant Card는 Riot Games의 보증을 받지 않았으며, Riot Games 또는 Riot Games 자산의 제작/관리에 공식적으로 관여하는 관계자의 견해나 의견을 반영하지 않습니다. Riot Games 및 모든 관련 자산은 Riot Games, Inc.의 상표 또는 등록상표입니다.

## RSO 데이터 공개 면책 고지

RSO 로그인 전 UI에 별도 노출 필요. Production Key 심사 시 확인 대상.

> 계정 연동 시 플레이어 데이터(Riot ID, 매치 기록, 랭크 정보)가 카드에 공개됩니다.

## 구현 우선순위

1. Riot 면책 고지 Footer 추가 (가장 단순)
2. 개인정보처리방침 페이지
3. 이용약관 페이지
4. RSO 데이터 공개 면책 고지 UI
