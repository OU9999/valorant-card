---
tags:
  - api
  - infrastructure
  - riot-games
status: published
category: api
date: 2025-02-14
related: []
---

# Riot Games API Key 발급 가이드

## 발급 절차

1. [Riot Developer Portal](https://developer.riotgames.com) 접속
2. 라이엇 계정으로 로그인
3. 로그인 후 대시보드에서 **Development API Key** 자동 생성
4. 발급된 키를 `.env.local`의 `RIOT_API_KEY`에 설정

## API Key 종류

| 구분       | Development            | Personal             | Production                |
| ---------- | ---------------------- | -------------------- | ------------------------- |
| 용도       | 프로토타입 개발/테스트 | 개인/소규모 프로젝트 | 공개 서비스               |
| 만료       | 24시간마다 자동 만료   | 지속 유지            | 지속 유지                 |
| Rate Limit | 20req/s, 100req/2min   | 20req/s, 100req/2min | 500req/s, 30,000req/10min |
| 승인 필요  | X                      | X                    | O (프로토타입 심사)       |

> Development Key는 24시간마다 만료되므로 매일 재발급 필요

## Rate Limit 종류

- **Application Rate Limit** — API 키별, 리전별 제한
- **Method Rate Limit** — 엔드포인트별 제한
- **Service Rate Limit** — 서비스 전체 제한

429 응답 수신 시 `Retry-After` 헤더의 시간만큼 호출을 중단해야 하며, 위반 시 접근이 차단될 수 있다.

## .env.local 설정 예시

```env
RIOT_API_KEY=RGAPI-xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
RIOT_REGION=asia
VALORANT_SHARD=kr
```
