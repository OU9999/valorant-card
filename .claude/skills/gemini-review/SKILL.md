---
description: "Gemini PR 리뷰 파이프라인 - 미해결 리뷰 확인 → 타당성 판단 → 수정/커밋/푸시 → 답글 + 스레드 resolve"
allowed-tools: ["Bash", "Read", "Edit", "Write", "Grep", "Glob", "AskUserQuestion"]
---

# Gemini 리뷰 처리 Skill

Gemini Code Assist 가 남긴 PR 리뷰를 한 번에 처리한다. 사용자의 PR 링크 또는 번호를 받거나, 생략 시 현재 브랜치의 PR 을 자동 탐색한다.

## 실행 순서

### 1. PR 식별

사용자가 PR URL / 번호를 제공했는지 확인. 없으면 현재 브랜치에서 자동 탐색:

```bash
gh pr view --json number,url,headRefName -q '{number, url, head: .headRefName}'
```

PR 이 없으면 중단하고 사용자에게 상태를 알린다. owner/repo 는 origin 리모트에서 유추:

```bash
gh repo view --json nameWithOwner -q .nameWithOwner
```

### 2. 미해결 Gemini 리뷰 수집

모든 리뷰 스레드를 GraphQL 로 받고, `author.login == "gemini-code-assist"` 이면서 `isResolved == false` 인 항목만 추린다.

```bash
gh api graphql -f query='
query($owner: String!, $repo: String!, $pr: Int!) {
  repository(owner: $owner, name: $repo) {
    pullRequest(number: $pr) {
      id
      reviewThreads(first: 50) {
        nodes {
          id
          isResolved
          path
          line
          comments(first: 5) {
            nodes {
              databaseId
              author { login }
              body
            }
          }
        }
      }
    }
  }
}' -F owner=OWNER -F repo=REPO -F pr=PR_NUMBER
```

미해결 Gemini 리뷰가 0건이면 "처리할 리뷰 없음"으로 끝낸다.

### 3. 타당성 판단

각 미해결 리뷰마다:

1. `path` + `line` 으로 **현재 코드 상태를 직접 Read** (이미 해결되었을 수 있음)
2. 코멘트 본문의 요지를 1~2문장으로 정리
3. 다음 3가지로 분류:

| 분류 | 기준 |
|---|---|
| **반영 (apply)** | 타당한 지적, 버그/품질/접근성 개선 가능 |
| **기각 (dismiss)** | 현재 구조상 부적절, 의도적 선택, 이미 해결됨 |
| **보류 (defer)** | 범위가 커서 별도 티켓 필요 |

판단 근거(프로젝트 규칙, 이미 적용된 구조 등)를 함께 기록한다.

### 4. 사용자 확인

AskUserQuestion 으로 각 항목 처리 방향을 승인받는다. 표시 형식:

```
[n/N] <path>:<line>
Gemini 요지: <요지>
판단: <반영|기각|보류>
근거: <판단 근거>
수정안: <간단 요약 (반영인 경우)>
```

사용자가 승인/수정/기각을 고르면 그에 맞춰 진행. 승인 전엔 어떤 파일도 수정하지 않는다.

### 5. 반영 (승인된 항목만)

- Edit / Write 로 코드 수정
- 프로젝트 검증 명령 실행:

```bash
pnpm lint
pnpm build
```

둘 다 통과해야 다음 단계로 진행. 실패하면 원인 파악 후 재수정.

### 6. 커밋 & 푸시

`/commit` 스킬을 호출하거나 동일 규칙으로 직접 커밋한다. 메시지 포맷 예시:

```
refactor: <반영한 피드백 요약 1문장>
```

여러 항목을 한꺼번에 반영했더라도 논리적으로 한 단위면 하나의 커밋으로 묶는다. 이후 푸시:

```bash
git push
```

커밋 SHA 를 기억해 다음 단계 답글에 활용한다.

### 7. 스레드 답글 + Resolve

**반영한 스레드**에는 답글을 남기고 resolve. 답글 먼저 달고 resolve 하는 순서.

답글 (REST, 스레드 ID 불필요):

```bash
gh api -X POST /repos/OWNER/REPO/pulls/PR_NUMBER/comments/COMMENT_DATABASE_ID/replies \
  -f body="반영 완료. (<commit_sha_short>)"
```

`COMMENT_DATABASE_ID` 는 스레드의 첫 번째 코멘트 `databaseId` (2단계에서 수집됨).

Resolve (GraphQL):

```bash
gh api graphql -f query='
mutation($threadId: ID!) {
  resolveReviewThread(input: { threadId: $threadId }) {
    thread { id isResolved }
  }
}' -F threadId=THREAD_ID
```

**기각한 스레드**: 답글만 남기고 resolve 하지 않는다. 답글엔 기각 사유를 1~2문장으로 적는다 (사용자가 재검토 후 직접 resolve).

**보류한 스레드**: 답글도 resolve 도 하지 않는다 (별도 처리).

### 8. 결과 요약

마지막에 사용자에게 처리 결과를 요약 출력:

```
처리 결과
- 반영: N건 (커밋 <sha>)
- 기각: N건
- 보류: N건
```

각 항목의 `path:line` 과 한 줄 요지도 함께 나열.

## 주의 사항

- 사용자 승인 없이 코드 수정이나 resolve 를 실행하지 말 것
- Gemini 외 리뷰어(사람 리뷰 등) 스레드는 건드리지 말 것 — 이 스킬 범위 밖
- 이미 resolved 된 스레드는 건드리지 말 것
- 한 번의 실행에서 여러 리뷰를 함께 처리할 때, 가능하면 하나의 커밋으로 묶어 리뷰 피드백 단위의 히스토리를 유지
- 프로젝트 규칙(CLAUDE.md, 린트/빌드 통과) 을 반드시 준수
