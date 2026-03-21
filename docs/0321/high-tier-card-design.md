---
tags:
  - card-design
  - asset
  - image-generation
status: published
category: card-design
date: 2025-03-21
related: []
---

# 고티어 카드 배경 디자인 및 배경 제거

## 배경

기존 티어 카드(Iron~Radiant)는 동일한 메탈릭 질감에 색만 다른 상태.
초월자, 불멸, 레디언트 3개 티어를 FC25 FUT 카드 수준으로 업그레이드 필요.
NanoBanana2 CLI(Gemini 3.1 Flash 기반)로 고품질 카드 배경 PNG 생성.

## 작업 내용

### 카드 배경 생성

- FC25 레퍼런스 카드(TOTY, Icon, Hero, TOTW)를 참고하여 프롬프트 작성
- 각 티어별 복수 버전 생성 후 사용자 선택으로 스타일 확정
- STYLE_REF로 확정된 스타일을 4K로 최종 생성

### 티어별 최종 디자인

- 레디언트: 흰 마블 + 골드 기하학 (FC25 Icon 참고)
- 불멸: 딥 크림슨 + 떠있는 3D 다이아몬드 조각 (FC25 TOTW 참고)
- 초월자: 에메랄드 대각 메탈 + 크리스탈 (FC25 TOTY 참고)

### 배경 제거

AI 생성 카드는 배경색이 채워져 있어 기존 Iron~Diamond 카드(투명 배경)와 이질적.
3가지 방법을 시도함:

1. **Flood Fill**: 모서리에서 BFS로 배경 제거. 레디언트 흰 마블과 배경 구분 실패 + 경계 지글거림.
2. **AI 배경 제거** (`@imgly/background-removal-node`): 카드 내부 흰색/어두운 영역을 배경으로 오인. 카드 손상 발생.
3. **마젠타 크로마키** (최종 채택): 마젠타(#FF00FF) 배경으로 재생성 → 마젠타 색상만 투명 처리.

마젠타는 3개 카드 디자인 어디에도 없는 색이라 카드 내부 손상 없이 배경만 정확히 제거 가능.

### 크로마키 후처리

- 순수 마젠타 픽셀: 완전 투명 처리
- 경계 안티앨리어싱 픽셀: 마젠타 거리에 비례한 partial alpha 적용
- Despill: 보더 라인의 R,B 채널에서 마젠타 성분 제거 (R,B 를 G+5 이하로 제한)
- 핑크 프린지 제거를 위해 파라미터 재귀적 조정 (MAGENTA_THRESHOLD, EDGE_RANGE, despill 강도)

## 변경 사항

### 생성된 에셋

- `src/asset/example/tier-card/ascendant.png` — 에메랄드 크리스탈 카드 (4K, 투명 배경)
- `src/asset/example/tier-card/immortal.png` — 딥 크림슨 다이아몬드 카드 (4K, 투명 배경)
- `src/asset/example/tier-card/radiant.png` — 흰 마블+골드 카드 (4K, 투명 배경)

### 코드 변경

- `src/components/test/card-test.tsx` — 9개 티어 카드 전체 렌더링 컴포넌트로 변경

### NanoBanana2 프로젝트 (nano-banana-cli)

- `prompt/card/valorant-radiant-bg.md` — 레디언트 프롬프트
- `prompt/card/valorant-immortal-bg.md` — 불멸 프롬프트
- `prompt/card/valorant-ascendant-bg.md` — 초월자 프롬프트
- `script/remove-card-bg.ts` — 마젠타 크로마키 배경 제거 스크립트
- `asset/img/card-ref/` — FC25 레퍼런스 이미지 디렉토리

## 이슈

### 프롬프트 엔지니어링 삽질

- v1: 너무 화려하고 busy해서 캐릭터/스탯을 가림
- v2: 너무 차갑고 은색 — 레디언트의 흰+금 아이덴티티 없음
- v3~v4: FC25 Icon 색감(흰 마블+골드) 참고하여 확정
- 각 티어는 독자적 패턴 필요 — STYLE_REF로 레디언트 구도를 복사하면 같은 패턴에 색만 다른 결과 발생

### 배경 제거 삽질

- Flood Fill: 흰 배경과 흰 마블 구분 불가. 경계 지글거림.
- AI 배경 제거: 카드를 배경으로 오인. 카드 내부 손상.
- 마젠타 크로마키가 유일하게 작동한 방법.
- 크로마키 후 핑크 프린지 제거에 여러 번 파라미터 튜닝 필요했음.

## 다음 단계

- Iron~Diamond 하위 티어 카드 디자인 개선 검토
- 카드 컴포넌트 프로덕션 버전 개발 (tier-to-image 매핑 유틸리티)
- 디버그용 카드 슬라이드 컴포넌트 구현
