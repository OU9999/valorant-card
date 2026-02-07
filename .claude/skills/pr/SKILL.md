---
description: "PR 생성 - 변경사항 분석 후 자동 생성"
allowed-tools: ["Bash", "Read", "Grep", "AskUserQuestion"]
---

# PR 생성 Skill

현재 브랜치의 변경사항을 분석하여 PR을 생성합니다.

## 실행 순서

### 1. 변경 내용 분석

다음 명령어로 변경 내용을 분석하세요:

```bash
git log --oneline main..HEAD
git log --name-only --oneline main..HEAD
```

**주의:** `git diff main..HEAD`는 사용하지 마세요!

- `git diff main..HEAD`는 main에만 있는 변경사항도 "삭제"로 표시합니다.
- 반드시 `git log --name-only main..HEAD`를 사용하여 **이 브랜치 커밋에서 실제로 변경한 파일만** 확인하세요.

### 2. PR 제목 생성

변경 내용을 분석하여 다음 형식으로 제목을 생성하세요:

- `feat: 새로운 기능 설명` - 새 기능 추가
- `fix: 버그 수정 설명` - 버그 수정
- `refactor: 리팩토링 설명` - 코드 리팩토링
- `style: 스타일 변경 설명` - UI/스타일 변경
- `chore: 작업 설명` - 설정, 빌드 등
- `docs: 문서 변경 설명` - 문서 수정
- `agent: 에이전트, 클로드, ai 관련 설정` - 에이전트 설정

### 3. PR 본문 생성

다음 형식으로 PR 본문을 생성하세요:

```markdown
## 요약

- 주요 변경사항 1
- 주요 변경사항 2

### 변경사항 1 제목

- 세부 설명

### 변경사항 2 제목

- 세부 설명
```

**본문 작성 규칙:**

1. 요약 항목은 주요 변경사항 단위로 그룹화
2. 로직의 핵심 흐름만 간단히 설명
3. 함수명, 변수명 등 구체적인 코드 명칭은 포함하지 않음
4. 파일 경로나 파일 이름은 포함하지 않음
5. 각 설명은 1~2문장으로 간결하게 작성
6. "~함", "~추가", "~구현" 같은 간결한 문체 사용

### 4. 라벨 결정

제목의 prefix에 따라 라벨을 결정하세요:

| Prefix     | Label         | 설명            |
| ---------- | ------------- | --------------- |
| feat       | feat          | 새로운 기능     |
| fix        | fix           | 코드 수정       |
| fix (버그) | bug           | 버그 수정       |
| refactor   | refactoring   | 코드 리팩토링   |
| perf       | performance   | 성능 개선       |
| docs       | documentation | 문서 작업       |
| test       | test          | 테스트          |
| chore      | development   | 개발 환경 구성  |
| ci         | CI/CD         | 파이프라인      |
| deps       | dependencies  | 의존성 업데이트 |
| security   | security      | 보안 관련       |
| remove     | remove        | 기능 제거       |
| agent      | agent         | 에이전트 설정   |

### 5. PR 내용 확인 (필수)

PR을 생성하기 전에 **반드시** 사용자에게 다음 내용을 보여주고 확인을 받으세요:

```
PR 미리보기
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

제목: [생성한 제목]

본문:
[생성한 본문 내용]

라벨: [결정한 라벨들]
Base: main

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

AskUserQuestion 도구를 사용하여 확인을 받으세요.

**중요:** 사용자가 승인하기 전까지 절대로 PR을 생성하지 마세요.

### 6. PR 생성

사용자가 승인한 경우에만 gh CLI를 사용하여 PR을 생성하세요:

```bash
gh pr create \
  --title "feat: 기능 설명" \
  --body "$(cat <<'EOF'
## 요약

- 내용

EOF
)" \
  --assignee @me \
  --label "라벨" \
  --base main
```

**중요:** body는 반드시 HEREDOC을 사용하세요.

### 7. 결과 출력

PR 생성 후 URL을 사용자에게 알려주세요.
