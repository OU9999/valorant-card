# PR 사전 검사 체크리스트

PR 제목과 본문을 만들기 전에 이 체크리스트를 작성한다.

## 검사 대상 확인

```bash
git diff --name-status --find-renames origin/main...HEAD -- CLAUDE.md AGENTS.md valorant-card-rules .claude .agents .codex
```

`origin/main`을 사용할 수 없는 경우:

```bash
git diff --name-status --find-renames main...HEAD -- CLAUDE.md AGENTS.md valorant-card-rules .claude .agents .codex
```

## 필수 체크리스트

- [ ] `CLAUDE.md`와 `AGENTS.md`의 내용이 완전히 동일한지 확인
- [ ] `AGENTS.md`의 작업 유형별 참조 경로가 모두 유효한지 확인
- [ ] 코드 변경이 `valorant-card-rules/code-rule/code-rule.md`를 준수하는지 확인
- [ ] 디자인·UI·스타일링 변경이 `valorant-card-web/DESIGN.md`를 준수하는지 확인
- [ ] `.claude/skills/<name>` 스킬을 추가, 삭제, 이름 변경했다면 대응되는 `.agents/skills/<name>` wrapper도 함께 반영했는지 확인
- [ ] `.agents/skills/<name>` wrapper를 추가, 삭제, 이름 변경했다면 대응되는 `.claude/skills/<name>` source skill이 있는지 확인
- [ ] `.claude` 또는 `.agents` 둘 중 한 곳에만 스킬 변경이 있는 경우, 의도된 예외인지 확인하고 PR 미리보기에 사유 작성

## 중단 조건

- `CLAUDE.md`와 `AGENTS.md`의 drift 또는 프로젝트 규칙 위반이 확인되면 PR 생성 전 수정
- 스킬이 한쪽에만 추가된 상태이고 명확한 예외 사유가 없으면 PR 생성 전 수정
