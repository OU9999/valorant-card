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
두 가지 방식 중 택일:

- **방식 A**: 실제 서비스 URL + 테스트 계정 제공
- **방식 B**: 화면 녹화 (RSO 로그인 -> 카드 생성 -> 카드 조회 전체 플로우)

방식 B가 심사 편의상 권장됨. 심사관이 직접 RSO 로그인할 필요 없음.

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
