---
tags:
  - meta
  - moc
status: published
category: meta
date: 2025-03-21
related: []
---

# VALORANT CARD 문서 인덱스

## 알고리즘

- [tier-scoring-algorithm](0318/tier-scoring-algorithm.md) -- 티어 기반 1~99 스코어링 최종 알고리즘. 실전 스탯 6종, 뱃지 포함.
- [tracker-score-improvements](0318/tracker-score-improvements.md) -- 기존 알고리즘 문제점 분석 및 Phase 1~4 개선안.
- [tracker-score-validation](0318/tracker-score-validation.md) -- 실데이터 기반 v1/v2 검증 결과.

## UI/UX

- [screen-flow](0207/screen-flow.md) -- 전체 화면 기획서. 6개 화면, 라우트, API 매핑, 레이아웃 상세.

## API

- [riot-api-key-guide](0214/riot-api-key-guide.md) -- Riot Games API 키 발급 절차, 종류, Rate Limit 정리.
- [riot-production-key-review](0404/riot-production-key-review.md) -- Production Key 심사 기준, 승인/거절 요건, 본 프로젝트 통과 가능성 분석.
- [production-key-todo](0405/production-key-todo.md) -- Production Key 취득을 위한 4단계 TODO. RSO, 법적 준비, 신청, 전환. (0405 업데이트)
- [card-view-system](0405/card-view-system.md) -- RSO 인증, 카드 생성 API, 히어로 상태 머신, TierCard 리팩토링 상세.
- [card-page-routing](0405/card-page-routing.md) -- /card/[id] 라우팅 시스템. in-memory 저장소, 페이지 분리, 데모 미리보기.
- [production-key-readiness](0407/production-key-readiness.md) -- Production Key 신청 준비 상태 평가. 라이브 사이트 검증 결과, 미통과 항목, 조치 계획.
- [valorant-dev-policy-ko](0407/valorant-dev-policy-ko.md) -- VALORANT 개발자 API 정책 공식 번역본. 심사 기준, 승인/비승인 사례, RSO 요건.
- [production-key-application](0407/production-key-application.md) -- Production Key 신청 폼 작성 내용. 제품 설명, URL, 게임 포커스.

## 카드 디자인

- [high-tier-card-design](0321/high-tier-card-design.md) -- 초월자/불멸/레디언트 카드 배경 생성 및 크로마키 배경 제거.
- [card-design-review](0321/card-design-review.md) -- 9장 전체 카드 디자인 리뷰. TierCard 컴포넌트, SVG Path, 레이아웃 개선 내역.

## 메타

- [diff](0321/diff.md) -- 프로젝트 차별점. 핵심 컨셉, 기능, 바이럴 전략, 리스크 정리.
- [docs-rule](docs-rule.md) -- 문서 작성 규칙. 말투, 구조, 금지 표현, 프론트매터 스키마 정의.
- [long-running-agent-workflow-translation](0516/long-running-agent-workflow-translation.md) -- Jarrod Watts의 장기 실행 에이전트 워크플로우 게시글 번역 정리. 모호성 제거, 멀티 에이전트, 크로스 컨텍스트 메모리 포함.
