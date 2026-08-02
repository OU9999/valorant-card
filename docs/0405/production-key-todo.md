---
tags:
  - api
  - riot-games
  - todo
status: published
category: api
date: 2025-04-05
related:
  - "docs/0404/riot-production-key-review.md"
  - "docs/0214/riot-api-key-guide.md"
  - "docs/0405/card-view-system.md"
---

# Production Key 취득 TODO

## Phase 1: 프로토타입 완성

Production Key 신청 전 반드시 완료해야 하는 항목.

- [x] RSO(Riot Sign On) OAuth 플로우 구현
  - authorize, callback, logout 라우트 구현 완료
  - token exchange, refresh, userinfo 유틸 구현 완료
  - iron-session 기반 세션 관리 연동 완료
  - `isRsoConfigured()` 가드로 미설정 시 503 반환
- [x] 카드 생성 파이프라인 구현
  - Riot ID 파싱 -> 계정 조회 -> 매치 리스트 -> 매치 상세 -> 스코어 산출 -> 카드 데이터 반환
  - RSO 세션 인증 필수 (puuid 기반)
  - 동시 생성 제한 (MAX_CONCURRENT = 2)
- [ ] 데이터 공개 면책 고지 UI 추가
  - "계정 연동 시 플레이어 데이터가 공개됩니다" 문구 포함 필요
- [ ] 도메인 확보
  - `riot.txt` 인증을 위해 공개 접근 가능한 도메인 필요
- [ ] 서비스 배포
  - 심사관이 직접 접속하여 유저 플로우를 확인할 수 있는 상태

## Phase 2: 법적 준비

- [ ] 이용약관(Terms of Service) 페이지 작성 및 게시
- [ ] 개인정보처리방침(Privacy Policy) 페이지 작성 및 게시

## Phase 3: Production Key 신청

- [ ] Riot Developer Portal에서 앱 등록
- [ ] `riot.txt` 파일을 도메인 루트에 업로드
- [ ] 제품 설명 작성 (무엇을 만들고, 어떤 데이터에 접근하는지)
- [ ] 유저 플로우 데모 링크 제출
- [ ] 심사 대기 (공식 2주, 실제 최대 수개월)

## Phase 4: Production 전환

- [ ] Henrik API 의존성 제거, Riot 공식 API로 전환
- [ ] Rate Limiter 설정 Production 기준으로 조정
- [ ] opt-in하지 않은 플레이어 데이터 비노출 검증
