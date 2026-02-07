### 프로젝트 환경

- 기술 스택: React, Next, TypeScript, TailwindCSS
- 패키지 매니저: pnpm
- Next.js 16 App Router (`src/app/`)
- Path alias: `@/*` → `./src/*`
- 명령어: `pnpm dev` / `pnpm build` / `pnpm lint`
- 한국어로 소통

### 코드 작성 규칙

- 가독성을 위해 early return 패턴 적극 사용
- HTML 요소 스타일링은 반드시 Tailwind 클래스 사용. inline style 사용 금지.
- 함수 선언 대신 `const` 화살표 함수 사용 (예: `const toggle = () =>`) 가능하면 타입도 정의.
- inline export 대신 파일 끝에서 named export 사용 (예: `export { foo, bar }`, `export type { FooType }`)
- `useMemo`, `useCallback` 훅 사용 금지. React 19.2+ with React Compiler 사용으로 메모이제이션 자동 처리.
- 상대 경로는 `../..`까지만 허용. `../../..` 이상이면 path alias 사용.
- 해키한 패턴 금지. 우회가 필요하면 구조 자체를 재설계.

### 커밋 & PR 규칙

- 커밋 메시지: `<type>: <한국어 설명>` 형식. 상세 type은 `/commit` 스킬 참조.
- PR 생성 시 반드시 `/pr` 스킬 사용. 직접 `gh pr create` 실행 금지.
