---
description: "옵시디언 문서 생성 - 대화 내용을 Obsidian 마크다운으로 정리"
allowed-tools: ["Bash", "Read", "Grep", "Glob", "Write", "Edit", "AskUserQuestion"]
---

# 옵시디언 문서 생성 Skill

현재 대화에서 수행한 작업을 Obsidian 호환 마크다운 문서로 정리합니다.

## 실행 순서

### 1. 대화 분석

현재 대화에서 다음 항목을 추출하세요:

- 작업 주제 (무엇을 했는지)
- 핵심 결정 사항
- 변경된 파일/코드 요약
- 발견한 문제점이나 삽질 내역
- 다음에 할 일 (있다면)

### 2. 기존 문서 스캔

`docs/` 폴더의 기존 문서를 스캔하여 관련 문서를 찾으세요:

```bash
find docs/ -name "*.md" -not -name "docs-rule.md" -not -name "INDEX.md" | head -30
```

각 문서의 프론트매터(tags, category)와 제목(첫 줄)을 읽어서 현재 작업과 관련된 문서를 파악하세요.

### 3. 문서 작성 규칙

`docs/docs-rule.md`의 규칙을 반드시 따르세요:

- dry하고 간결하게. 감탄, 과장, 수식어 금지.
- `~~함`, `~~가능`, `~~필요` 체로 끝맺음.
- 이모지, 느낌표, 물결표 사용 금지.
- 의견이 아닌 사실 위주로 서술.
- 한 항목에 한 문장. 길어지면 줄바꿈으로 분리.

### 4. 파일명 규칙

- 영문 kebab-case 사용 (예: `tracker-score-validation.md`)
- 주제를 명확히 드러내는 이름

### 5. 폴더 구조

오늘 날짜 기준 `docs/MMDD/` 폴더에 저장:

- 폴더가 없으면 생성
- 예: 3월 21일 → `docs/0321/`

### 6. 프론트매터 생성 (필수)

모든 문서는 최상단에 YAML 프론트매터를 포함해야 합니다.

```yaml
---
tags:
  - tag1
  - tag2
status: draft
category: primary-category
date: YYYY-MM-DD
related:
  - "[[related-doc]]"
---
```

**필드 규칙:**

| 필드 | 규칙 |
|------|------|
| tags | 기존 태그 우선 사용. 소문자 kebab-case. 계층: `parent/child` |
| status | 신규 문서는 `draft`. 완료 시 `published`. 폐기 시 `deprecated` |
| category | `algorithm`, `ui-ux`, `api`, `card-design`, `meta` 중 하나 |
| date | 오늘 날짜. YYYY-MM-DD 형식 |
| related | 본문에서 `[[링크]]`하는 문서 목록. 없으면 빈 배열 `[]` |

**기존 태그 목록 (우선 사용):**

`algorithm`, `scoring`, `validation`, `improvement`, `refactoring`, `todo`, `fifa-stats`, `badge`, `ui-ux`, `screen-flow`, `specification`, `api`, `infrastructure`, `riot-games`, `card-design`, `asset`, `image-generation`, `meta`, `writing-rule`, `moc`, `phase/1`~`phase/4`

새 태그가 필요하면 기존 태그와 유사한 네이밍 규칙을 따르세요.

### 7. Obsidian 링크 삽입

문서 본문에서 관련 문서를 참조할 때 `[[파일명]]` 형식으로 링크하세요:

- 확장자(.md) 제외
- 폴더 경로 제외, 파일명만 사용
- 자연스러운 문맥에서 삽입

**예시:**

```markdown
## 배경

[[tier-scoring-algorithm]]에서 정의한 가중치를 기반으로 검증 진행함.
결과는 [[tracker-score-validation]] 참고.
```

**링크 삽입 기준:**

- 직접적으로 내용이 이어지거나 참조하는 문서만 링크
- 억지로 링크를 만들지 않음
- 관련 문서가 없으면 링크 없이 작성
- 본문에 삽입한 `[[링크]]`는 프론트매터 `related`에도 반영

### 8. 문서 구조

```markdown
---
tags:
  - tag1
status: draft
category: category
date: YYYY-MM-DD
related:
  - "[[doc]]"
---

# 제목

## 배경

작업의 맥락과 이유. 관련 문서가 있으면 [[링크]] 포함.

## 작업 내용

수행한 작업을 항목별로 정리.

## 변경 사항

변경된 파일이나 코드 요약. (코드 작업인 경우에만)

## 결과

작업 결과와 확인된 사항.

## 이슈

발견된 문제점, 삽질, 미해결 사항. (있는 경우에만)

## 다음 단계

후속 작업이 필요한 경우. (있는 경우에만)
```

**주의:** 모든 섹션을 채울 필요 없음. 해당 내용이 있는 섹션만 포함.

### 9. 미리보기 확인 (필수)

문서를 저장하기 전에 **반드시** 사용자에게 미리보기를 보여주고 확인을 받으세요.

AskUserQuestion 도구를 사용하여 확인을 받으세요.

```
문서 미리보기
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
경로: docs/MMDD/파일명.md

[문서 전체 내용]

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

사용자가 승인한 경우에만 파일을 저장하세요.
사용자가 수정을 요청하면 반영 후 다시 미리보기를 보여주세요.

### 10. 파일 저장

승인 후 Write 도구로 파일을 저장하세요.

### 11. INDEX.md 업데이트 (필수)

새 문서를 저장한 후 `docs/INDEX.md`를 업데이트하세요:

1. `docs/INDEX.md`를 읽어 현재 내용을 확인
2. 새 문서의 `category`에 해당하는 섹션에 항목 추가
3. 형식: `- [[파일명]] -- 한 줄 설명.`
4. 해당 카테고리 섹션이 없으면 새 `##` 섹션 생성

**카테고리-섹션 매핑:**

| category | INDEX.md 섹션 |
|----------|--------------|
| algorithm | ## 알고리즘 |
| ui-ux | ## UI/UX |
| api | ## API |
| card-design | ## 카드 디자인 |
| meta | ## 메타 |

### 12. 결과 출력

저장 완료 후 다음을 출력하세요:

```
저장 완료: docs/MMDD/파일명.md
프론트매터: tags=[tag1, tag2], category=category, status=status
링크된 문서: [[문서1]], [[문서2]]  (있는 경우)
INDEX.md 업데이트 완료
```
