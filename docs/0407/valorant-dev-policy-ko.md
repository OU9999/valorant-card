---
tags:
  - api
  - riot-games
  - phase/3
status: published
category: api
date: 2025-04-07
related:
  - "[[production-key-readiness]]"
  - "[[riot-production-key-review]]"
---

# Riot Games 개발자 정책 (번역)

Riot Games 공식 Developer Portal 및 VALORANT Developer API Policy 번역본.

---

## Developer Portal 개요

원문: https://developer.riotgames.com/docs/portal

### 시작하기

Riot Games 계정으로 로그인하면 Developer Portal 계정 생성. 기본 Development API Key 자동 발급. 제품 제안을 Developer Relations 팀에 등록 가능.

### 제품 등록

#### 신청 절차

모든 제품 소유자는 정책을 읽고 이해해야 함. 위반 시 징계 가능.

API 미사용이더라도 제품 등록 권장. 등록하면 Riot이 개발자 존재를 인지하고, 유익한 기회 안내 가능.

등록 방법:
1. Developer Portal 메인 페이지에서 "Register Product" 클릭
2. 대규모 제품 또는 개인 프로젝트 선택
3. 온라인 폼에 제품 주요 정보 기입
4. 제품 검증 (본인이 실제 개발자인지 확인)

완료 후 Developer Relations 팀이 검토. 승인되면 API 키 rate limit 증가 및 팀과의 관계 구축 가능.

#### 심사 기준

- 법률 또는 기존 정책 위반 여부
- 플레이어에게 측정 가능한 도움을 주는지
- 게임 실력 향상 또는 성장 추적에 도움이 되는 제품 선호
- 게임을 "풀어버리거나" 너무 단순화하는 제품은 비선호
- 웹사이트가 미완성이면 승인 가능성 낮음
- 질문은 Developer Portal 메시징으로 문의

#### 리젝 시

Developer Portal 메시지로 리젝 사유 안내. 메시징 시스템을 통해 우려 사항 해결 및 재신청 가능.

### 메시지

승인/리젝 알림은 Developer Portal 앱 메시지로 전송. 제품 등록 관련 질문은 Support Site 이용. Support Site가 가장 빠른 응답 경로. 메시징 시스템은 비즈니스 채널이며 캐주얼 대화용이 아님.

### API 키

#### Development API Key
- Developer Portal 로그인 시 자동 발급
- 공개 서비스가 아닌 개발/프로토타이핑용
- 24시간마다 만료. 주기적으로 재생성 필요

#### Personal API Key
- 제품 등록 시 신청 가능
- 개발자 본인 또는 소규모 비공개 커뮤니티용
- 검증 절차 없이 등록 가능, rate limit 증가 미승인
- Standard API만 접근 가능, Tournaments API 불가

허용 용도: 스트리밍/보드/음성채팅 서버용 봇, 개인 웹사이트 스탯 표시, 개인 스탯 수집/리서치, 개인 사용 프로젝트.

Rate Limit: 20 req/1초, 100 req/2분 (리전별 적용).

Personal Key로 공개 서비스 운영 금지. Production Key 승인 대기 중이라도 마찬가지. 공개 알파/베타 포함.

#### Production API Key
- 플레이어에게 공개할 앱에 사용
- Development Key로 공개 제품 운영 금지
- 대규모 커뮤니티 또는 인터넷 전체 대상

Rate Limit: 500 req/10초, 30,000 req/10분 (리전별 적용).

신청: 대시보드에서 "Register Project" 클릭. 승인 기간은 프로젝트와 대상 리전에 따라 상이.

표준 rate limit은 대다수 개발자에게 충분. 우수 상태(good standing) + 커뮤니티 기여 + 지속적 성장 시 확장 가능.

여러 프로젝트는 각각 별도 등록 및 별도 Production Key 승인 필요.

#### API Key 보안
키가 적절히 보안되지 않으면 회수 가능성 높음. 키 보안은 프로젝트 공개의 필수 요건.

### 응답 코드

모든 데이터는 유효한 JSON 반환. 빈 값(0, 빈 문자열, 빈 리스트, null)은 대역폭 절약을 위해 미반환.

#### 4XX 에러 코드

| 코드 | 의미 | 주요 원인 |
|------|------|----------|
| 400 | Bad Request | 파라미터 형식 오류, 유효하지 않은 값, 필수 파라미터 누락 |
| 401 | Unauthorized | API 키 미포함 |
| 403 | Forbidden | 유효하지 않은/차단된 API 키, 지원하지 않는 경로 |
| 404 | Not Found | 해당 리소스 없음 |
| 415 | Unsupported Media Type | Content-Type 헤더 미설정 |
| 429 | Rate Limit Exceeded | API 호출 제한 초과. Retry-After 헤더 대기 후 재시도 |

#### 5XX 에러 코드

| 코드 | 의미 |
|------|------|
| 500 | Internal Server Error — 서버 예기치 않은 오류 |
| 503 | Service Unavailable — 서버 일시 불가 |

### Rate Limiting

게임을 지원하는 동일 시스템이 API 뒤에 있으므로, 과부하 시 플레이어 경험 저하. 이를 방지하기 위한 제한.

| 유형 | 단위 | 설명 |
|------|------|------|
| Application | API 키별, 리전별 | 모든 엔드포인트 호출 합산 |
| Method | 엔드포인트별, API 키별, 리전별 | 개별 엔드포인트 단위 제한 |
| Service | 서비스별, 리전별 | 모든 앱이 공유하는 서비스 단위 제한 |

기타: 일부 하위 서비스가 자체 rate limit 적용 가능. 이 경우 429 응답이지만 `X-Rate-Limit-Type` 헤더 없음.

### 버전 관리 및 지원 중단

- 현재 LoL API는 모두 v4
- API 변경/지원 중단 시 60일간 신구 버전 병행 지원 목표
- 지원 중단된 엔드포인트 호출 시 에러 코드 반환

---

## VALORANT 개발자 API 정책

원문: https://developer.riotgames.com/policies/valorant

### 등록

플레이어에게 서비스를 제공하는 제품은 공식 API 사용 여부와 관계없이 반드시 등록 필요. 설명 및 메타데이터는 최신 버전에 맞게 유지할 것.

### 수익화

- 도박/베팅 기능 금지
- Developer Portal 등록 + Approved 또는 Acknowledged 상태에서만 수익화 가능
- 플레이어를 위한 무료 티어 필수 (광고 포함 가능)
- 유료 콘텐츠는 변환적(transformative)이어야 함
  - 변환적이란: 원본에 새로운 정보, 미학, 통찰, 이해가 추가된 경우
- 허용 과금 방식: 구독/후원/크라우드펀딩, 대회 참가비, 법정화폐로 재환전 불가 통화
- 과도하거나 불공정한 과금 금지 (Riot이 판단)

### 보안

- Riot Games 계정 정보 타인 공유 금지
- Production API 키 하나로 여러 프로젝트 운영 금지 (1 제품 = 1 키)
- API 접근 시 SSL/HTTPS 필수
- 코드에 API 키 포함 금지 (특히 바이너리 배포 시)
- 팀 내 키 공유는 Developer Portal의 "그룹" 기능으로 관리

### 게임 무결성

- 게임 목표 변경 금지
- 치팅 등 불공정한 이점 제공 금지
- 게임 결정의 다양성을 늘려야 하며, 줄여서는 안 됨
- 공식 랭크 시스템의 대안 생성 금지. MMR/ELO 계산기 금지
- 게임에서 의도적으로 숨겨진 플레이어의 익명성 해제 금지

### 게임 정책

Personal Key 신청은 현재 VALORANT에서 지원되지 않음.

#### 심사 기준

Riot은 신청 시 두 가지를 평가:
1. 사용 사례가 적절하고 승인 가능한가
2. 개발자가 해당 사용 사례를 실현할 역량이 있는가

앱이 사용 사례를 충족함을 보여주기 위해 아래 중 하나 이상 필요:
- 기존 브랜드가 Riot Games를 포트폴리오에 추가하려는 경우
- 완전히 기능하고 Riot이 테스트 가능한 신규 앱
- 대부분 테스트 가능한 프로토타입
- 의도와 사용자 플로우를 명확히 파악 가능한 목업
- 포부와 의도, 사용자 플로우 일부를 보여주는 발표 자료

Riot은 사용자 플로우(계정 생성, 로그인, 매칭 등)를 이해해야 함. 작동하는 사이트, 목업, 프로토타입, 또는 렌더링 링크 제출 필수.

모든 앱은 플레이어 데이터 공유 opt-in 기능 포함 필요. RSO 연동 + 계정 연결 시 데이터 공개 면책조항 필수.

#### 승인 사용 사례

opt-in 필요:
- 플레이어 스탯 표시
- 인증된 플레이어 대회 대진표
- 대회
- 본인 매치 히스토리 및 종합 스탯 조회 트레이닝 도구
- LFG(같이 할 사람 찾기) 도구
- 라이브 스트리밍 보조 앱
- 디스코드 봇 (커뮤니티 리더보드, 서버 멤버 스탯)

opt-in 불필요:
- 특정 플레이어 없는 종합 통계
- 공식 래더 리더보드

#### 비승인 사용 사례

- 스카우팅 (매치 시작 전 상대 스탯 조회)
- 공개되지 않는 개인 전용 앱
- 온라인 상점 추적/업데이트
- 실시간 인게임 앱/오버레이 (즉각적 행동 변경 데이터)
- 맵 일부를 가리는 정적 인게임 오버레이

### RSO 연동

모든 VALORANT 앱은 사용자에게 개인 데이터 공유 opt-in을 요청해야 함. OAuth 플로우로 플레이어 검증 필요. RSO(Riot Sign On) 클라이언트를 통해 수행.

RSO는 Production Level API Key를 가진 개발자만 사용 가능.

#### Production Key 받기

RSO를 시작하려면 Production Key 필요. developer.riotgames.com에서 요청. 승인되면 Developer Portal 앱 메시징을 통해 RSO 연동 프로세스 시작.

#### RSO 구현

플레이어 로그인 URL:
```
https://auth.riotgames.com/authorize?client_id=&redirect_uri=&response_type=code&scope=openid+offline_access
```

로그인 후 지정 redirect_uri로 리다이렉트. `/riot/account/v1/accounts/me` 엔드포인트로 로그인 사용자 식별.

### 자산

- Public Content Catalog: 아이콘, 로고, 텍스트 등 무료 자산
- 패치 후 수동 업데이트라 즉시 반영되지 않을 수 있음
- URL: `https://valorant.dyn.riotcdn.net/x/content-catalog/PublicContentCatalog-release-12.06.zip`

### VALORANT 공식 API

| API | 메서드 | 설명 |
|-----|--------|------|
| VAL-CONTENT-V1 | `/val/content/v1/contents` | 콘텐츠 조회 (로케일 필터 가능) |
| VAL-MATCH-V1 | `/val/match/v1/matches/{matchId}` | 매치 ID로 매치 조회 |
| | `/val/match/v1/matchlists/by-puuid/{puuid}` | PUUID별 매치리스트 조회 |
| | `/val/match/v1/recent-matches/by-queue/{queue}` | 최근 매치 조회 |
| VAL-RANKED-V1 | `/val/ranked/v1/leaderboards/by-act/{actId}` | 경쟁전 리더보드 조회 |
| VAL-STATUS-V1 | `/val/status/v1/platform-data` | 플랫폼 상태 조회 |
