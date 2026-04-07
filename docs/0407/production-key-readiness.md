---
tags:
  - api
  - riot-games
  - phase/3
status: published
category: api
date: 2025-04-07
related:
  - "[[riot-production-key-review]]"
  - "[[production-key-todo]]"
  - "[[legal-pages-spec]]"
---

# Production Key 신청 준비 상태 평가

valfc-card.com 라이브 사이트를 Riot 공식 요구사항과 교차 검증한 결과.

## 검증 환경

- 대상: https://valfc-card.com/
- 호스팅: Vercel (icn1 리전, HTTP/2)
- 검증일: 2025-04-07

---

## VALORANT API 접근 제한

VALORANT은 타 Riot 타이틀과 달리 **모든 `val-*` 엔드포인트가 Production Key 전용**. Dev Key, Personal Key 모두 접근 불가. Personal Key 자체가 VALORANT에는 제공되지 않음.

| 엔드포인트 | Dev Key | Production Key | 비고 |
|------------|---------|---------------|------|
| `account-v1` (Riot ID/PUUID 조회) | O | O | 크로스게임 플랫폼 API. val 전용 아님 |
| `val-match-v1` (매치 히스토리) | X | O | RSO 플레이어 opt-in 필수 |
| `val-ranked-v1` (랭크/리더보드) | X | O | |
| `val-content-v1` (게임 콘텐츠) | X | O | 대안: valorant-api.com (키 불필요) |
| `val-status-v1` (서버 상태) | X | O | |
| RSO OAuth 클라이언트 생성 | X | O | 승인된 Production App ID 필요 |

결론: Production Key 없이는 매치/랭크 조회, RSO 인증 모두 불가. Dev Key로는 Riot ID 조회만 가능.

---

## 체크리스트

### 통과 항목

| 항목 | 근거 |
|------|------|
| HTTPS/SSL | HTTP/2, `strict-transport-security: max-age=63072000` 확인 |
| 개인정보처리방침 | `/privacy` 200 응답. 수집 항목, RSO OAuth 방식, 보관/삭제, 제3자 제공 명시 |
| 이용약관 | `/terms` 200 응답. 서비스 설명, Riot 비제휴, 금지행위, 면책, 준거법(한국) |
| Riot 면책조항 | Footer에 영문+한국어 이중 표기. 트레이드마크 귀속 포함 |
| RSO OAuth | authorize/token/userinfo 플로우 완비. PKCE 지원 |
| 데이터 공개 동의 UI | 로그인 전 동의 모달 구현 (`data-disclosure-dialog.tsx`) |
| API Key 보안 | 서버사이드 `X-Riot-Token` 헤더. 클라이언트 노출 없음 |
| Rate Limit 처리 | 엔드포인트별 추적, 429 핸들링, Retry-After 헤더 |
| 에러 핸들링 | RiotApiError, RiotRateLimitError, RiotAuthError 커스텀 클래스 |
| 동시 요청 제한 | MAX_CONCURRENT = 2 |
| 금지 콘텐츠 없음 | 도박/크립토/MMR계산기/치트 해당 없음 |
| 변환적 가치 | FC카드 시각화. tracker.gg와 차별화된 콘텐츠 |
| 본인 계정만 조회 | RSO 인증 PUUID 기반. 타인 데이터 접근 불가 |

### 신청 과정 중 처리 항목

사전 준비가 아닌, Production Key 신청 프로세스 도중에 처리하는 항목.

| 항목 | 설명 |
|------|------|
| riot.txt | 앱 등록 후 신청 과정에서 Riot이 검증 문자열 발급. 발급 후 `public/riot.txt`에 배포 |
| 사용자 플로우 데모 | 신청 폼에서 제출. 화면 녹화 또는 서비스 URL 제공 |

### 권장 보완 항목

| 항목 | 현재 상태 | 권장 조치 |
|------|-----------|-----------|
| 개인정보 보관 기간 | "임시 처리"로만 기술 | "세션 유효 기간(24시간) 동안 처리 후 자동 삭제"로 구체화 |
| 데이터 보안 조치 | 미기재 | iron-session 암호화, httpOnly 쿠키, 서버사이드 처리 등 명시 |
| 국외 이전 보호조치 | Vercel(미국) 사실만 기재 | 전송 암호화(TLS), Vercel SOC2 인증 등 보호조치 추가 |
| API 응답 캐싱 | 미구현 | 프로덕션 트래픽 대비 캐싱 전략 구현 권장 |

---

## 조치 계획

### 신청 과정 중 처리

#### 1. riot.txt 배포

- 앱 등록 후 Production Key 신청 시 도메인 입력
- Riot이 검증 문자열 발급
- `public/riot.txt`에 해당 문자열 저장 후 배포
- `https://valfc-card.com/riot.txt` 접근 확인

#### 2. 사용자 플로우 데모

신청 폼에서 Riot 심사관이 서비스를 이해할 수 있는 자료 제출.

VALORANT `val-*` 엔드포인트와 RSO는 Production Key 전용이므로, 신청 시점에 공식 API 기반 실제 플로우 시연은 불가. Riot은 planning stage 신청도 수용하므로 아래 방식으로 대응.

- **방식 A (권장)**: Henrik 비공식 API 기반 현재 동작 상태를 화면 녹화. 신청서에 "Production Key 승인 후 공식 API + RSO 전환 예정" 명시
- **방식 B**: 목업 + 상세 설명서. 각 화면 스크린샷과 의도된 플로우 문서화
- **방식 C**: 데모 미리보기 API(`POST /api/card/preview`) 활용. 샘플 카드 생성 플로우 시연

### 권장 (신청과 병행 가능)

#### 3. 개인정보처리방침 보완

`/privacy` 페이지에서 아래 항목 보강:

```
- 보관 기간: "세션 유효 기간(24시간) 동안 처리 후 자동 삭제"
- 보안 조치: "iron-session 기반 암호화 쿠키, HTTPS 전송 암호화, 서버사이드 API 키 관리"
- 국외 이전: "Vercel Inc.(미국) 인프라 사용. TLS 암호화 전송, Vercel SOC 2 Type II 인증"
```

#### 4. 캐싱 전략 구현

현재 인메모리 rate limit만 존재. 프로덕션 rate limit(500req/s, 30,000req/2min)을 효율적으로 활용하려면 응답 캐싱 필요.
Upstash Redis 또는 Vercel KV 활용 가능.

---

## 종합 판단

승인 가능성: **중상**.

핵심 요건(RSO OAuth, 법적 페이지 3종, 변환적 콘텐츠, 본인 데이터 한정)은 모두 충족.
riot.txt와 데모 자료는 신청 과정 중에 처리하면 됨. 사전 준비 항목은 모두 충족.

PIPA 세부사항 미흡은 Riot 심사 블로커가 아님. Riot은 Privacy Policy 존재 여부와 기본 내용을 확인하며, 한국 개인정보보호법 세부 준수까지 심사하지 않음.

리스크 요인:
- 심사 기간 공식 2주, 실제 수개월 소요 가능
- 인메모리 카드 저장소는 서버 재시작 시 유실. DB 마이그레이션 별도 필요

---

## 성공 사례 및 심사 현실

### 승인된 대형 서비스

OP.GG, Tracker.gg, Blitz.gg, Mobalytics, DAK.GG 등. 공통점:
- 완성된 사이트 + 명확한 유저 플로우
- 법적 페이지 완비 (Privacy, ToS, Riot Disclaimer)
- 측정 가능한 플레이어 이익 (스탯 추적, 성장 도구)
- 무료 티어 제공

### 실제 심사 기간 (2025~2026 커뮤니티 제보 기준)

| 구분 | 공식 | 현실 |
|------|------|------|
| 일반 (LoL 등) | 1~3주 | 6~9개월 |
| VALORANT | 1~3주 | **8~12개월** |

담당자가 수천 건을 소수 인원이 처리. 대기열이 지속적으로 증가 추세.

### 리젝 사례

- 빈 페이지 또는 깨진 링크 (심사 시점에 URL 미작동)
- 불완전한 사이트
- 앱 설명 부족
- riot.txt 미검증

### 신청 시 주의사항

- **신청 후 수정하면 대기열 리셋된다는 제보 존재.** 한 번에 완벽하게 제출 필요
- **링크가 수개월 후에도 작동해야 함.** 심사 시점에 깨져있으면 즉시 리젝
- **심사관이 직접 로그인하지 않음.** 스크린샷/목업으로 기능을 보여주는 방식이 유효
- **Production Key 초기 rate limit은 Dev Key와 동일** (20req/s, 100req/2min). 증가는 별도 요청
- **1 Product = 1 Key.** 프로젝트 간 키 공유 불가
