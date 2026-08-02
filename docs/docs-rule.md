---
tags:
  - meta
  - writing-rule
status: published
category: meta
date: 2025-02-07
related: []
---

# 문서 작성 규칙

## 말투

- dry하고 간결한 문체
- 감탄·과장·불필요한 수식어 금지
- `~함`·`~가능`·`~필요` 형태의 종결 우선
- 이모지·느낌표·물결표 사용 금지
- 의견보다 사실 중심 서술

## 구조

- 문서 제목은 `#`, 섹션은 `##`, 하위 항목은 `###` 또는 목록 사용
- 한 항목에 한 문장
- 긴 항목은 줄바꿈으로 분리
- 불필요한 접속사·전환어 생략

## 금지 표현 예시

| 금지                    | 대체  |
| ----------------------- | ----- |
| ~할 수 있습니다         | ~가능 |
| ~해야 합니다            | ~필요 |
| 정말 좋은 / 매우 강력한 | 삭제  |
| 이것은 ~입니다          | ~임   |
| ~라는 점이 중요합니다   | ~중요 |

## 프론트매터

모든 `docs/` 문서는 최상단에 YAML 프론트매터 포함.

```yaml
---
tags:
  - category-tag
  - topic-tag
status: published
category: primary-category
date: 2025-03-18
related:
  - "docs/0318/tier-scoring-algorithm.md"
---
```

### 필드 정의

| 필드     | 타입     | 필수 | 설명                                                       |
| -------- | -------- | ---- | ---------------------------------------------------------- |
| tags     | string[] | O    | 문서 주제 태그. 계층 태그는 `/`로 구분                     |
| status   | enum     | O    | `draft`, `published`, `deprecated` 중 하나                 |
| category | string   | O    | 단일 주분류                                                |
| date     | date     | O    | 생성일. `YYYY-MM-DD` 형식                                  |
| related  | string[] | O    | 관련 문서의 저장소 기준 Markdown 파일 경로. 없으면 빈 배열 |

### 카테고리 목록

`algorithm`, `ui-ux`, `api`, `card-design`, `meta`

### 태그 규칙

- 소문자 kebab-case 사용
- 계층 태그는 `parent/child` 형식 사용 (예: `phase/1`)
- 기존 태그 우선 사용
- 새 태그는 `INDEX.md`에 분류 가능한 경우에만 추가

### 태그 목록

`algorithm`, `scoring`, `validation`, `improvement`, `refactoring`, `todo`, `card-stats`, `badge`, `ui-ux`, `screen-flow`, `specification`, `api`, `infrastructure`, `riot-games`, `card-design`, `asset`, `image-generation`, `meta`, `writing-rule`, `moc`, `phase/1`~`phase/4`

## 링크

- 본문의 관련 문서는 표준 Markdown 상대 링크 사용
- 이미지는 표준 Markdown 이미지 문법 사용
- `related` 값은 `docs/`로 시작하는 저장소 기준 `.md` 경로 사용
- 도구 전용 링크·embed 문법 사용 금지
- 링크 추가 전 대상 파일 존재 확인

```md
[관련 문서](./0318/tier-scoring-algorithm.md)
![이미지 설명](./0504/card-reveal/card-reveal-storyboard.png)
```
