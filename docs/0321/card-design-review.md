---
tags:
  - card-design
  - ui-ux
  - improvement
status: draft
category: card-design
date: 2025-03-21
related:
  - "[[high-tier-card-design]]"
---

# 카드 디자인 리뷰 및 개선점

## 배경

[[high-tier-card-design]]에서 생성한 상위 티어 카드와 기존 하위 티어 카드의 레이아웃을 전면 개선함.
Playwright로 9장 전체를 스크린샷 찍어 냉정하게 리뷰한 결과.

## 작업 내용

### 이미지 크기 통일

- 하위 티어 6장: 2109x3218 (원본 그대로)
- 상위 티어 3장: 3392x5056 → 2109x3218로 리사이즈 (v3: 트림 없이 height 기준 비율 유지 + 중앙 크롭)
- RGBA 알파 채널 보존

### 상위 티어 SVG Path 추출

- Radiant 카드 알파 채널에서 외곽선 컨투어 추출
- 노치 영역 step=1, 본체 step=8로 샘플링
- 3행 이동평균 스무딩 + 본체 직선화 적용
- 좌우 대칭 처리로 `CARD_SVG_PATH_HIGH_TIER` 생성

### TierCard 통합 컴포넌트

- `src/components/card/tier-card.tsx` 생성
- tierName으로 하위/상위 자동 판별 (`HIGH_TIER_NAMES` Set)
- 하위: CSS `.card-clip` polygon 클리핑
- 상위: SVG `<clipPath>` + `useId()`로 충돌 방지
- 3개 테스트 파일의 카드 레이어 하드코딩 제거

### 텍스트 레이아웃 개선 (FC25 레퍼런스 기반)

- OVR: 크게, 좌상단
- OVR 아래: 포지션 라벨(DLT) + 플레이스홀더 아이콘 2개
- 이름: 대문자, tracking-widest
- 스탯: 2열x3행 → 1행x6열로 변경 (라벨 위, 값 아래)
- 초상화 페이드: 40%→65% 구간으로 조정하여 하단 텍스트와 겹침 없앰

### 하위/상위 위치 분기

- 카드 형태가 다르므로 동일 좌표계 통일은 불가
- `isHighTier` 분기로 별도 위치값 적용이 올바른 설계
- `cn()` 유틸 도입하여 `${}` 템플릿 리터럴 분기 제거

## 변경 사항

### 신규 파일

- `src/components/card/tier-card.tsx` -- TierCard 통합 컴포넌트
- `src/lib/cn.ts` -- clsx + tailwind-merge 유틸

### 수정된 파일

- `src/constants/card.ts` -- `CARD_SVG_PATH_HIGH_TIER` 추가
- `src/styles/globals.css` -- `.card-portrait-fade-high` 추가
- `src/components/test/all-card-test.tsx` -- TierCard 사용으로 리팩토링
- `src/components/test/carousel-test.tsx` -- TierCard 사용으로 리팩토링
- `src/components/test/card-svg-test.tsx` -- TierCard 사용으로 리팩토링
- `src/asset/example/tier-card/*.png` -- 상위 3장 리사이즈

## Playwright 리뷰 결과

### 전체 공통

| 우선순위 | 이슈 |
|---------|------|
| 높음 | 스탯 라벨 크기 너무 작음. 거의 안 보임 |
| 높음 | Silver/Platinum 밝은 배경에서 흰색 텍스트 가독성 떨어짐 |
| 중간 | 플레이스홀더 아이콘 존재감 없음 |
| 중간 | 상위 티어 초상화 페이드가 너무 빠름 |
| 낮음 | Radiant 스탯 하단 여백 촉박 |

### 하위 티어 (Iron~Diamond)

- OVR 크기와 위치 적절
- 이름/스탯이 초상화와 겹치지 않음
- Silver 배경에서 텍스트가 묻힘. text-shadow 강화 또는 배경 처리 필요

### 상위 티어 (Ascendant~Radiant)

- Ascendant: 초상화 상체만 보임. 페이드 조정 필요
- Immortal: 어두운 배경에 white/60 라벨이 약함
- Radiant: 완성도 가장 높음. 하단 여백만 조정 필요

## 이슈

### 이미지 통일 시도 실패

- 상위 3장을 알파 bbox로 개별 크롭하자 3장의 스케일이 달라져 위치 불일치 발생
- 원인: 3장이 각각 다른 AI 생성물이라 동일 기준 크롭 불가
- v3 방식(트림 없이 리사이즈)으로 복구하여 해결

### SVG Path 재정규화 시도 실패

- y좌표를 0~100%로 재정규화하여 하위 티어와 동일 좌표계로 통일 시도
- 이미지 스케일 불일치로 인해 위치가 맞지 않음
- 카드 형태가 근본적으로 다르므로 `isHighTier` 위치 분기가 올바른 설계라는 결론

## 다음 단계

- 스탯 라벨 크기 증가
- 밝은 배경(Silver/Platinum) 텍스트 가독성 개선
- 플레이스홀더 아이콘을 실제 에이전트/국기 아이콘으로 교체
- 상위 티어 초상화 페이드 미세 조정
