### 프로젝트 환경

- 패키지 매니저: pnpm 사용. npm, yarn 사용 금지.


### 코드 작성 규칙

- 가독성을 위해 early return 패턴 적극 사용
- HTML 요소 스타일링은 반드시 Tailwind 클래스 사용. inline style 사용 금지.
- 조건부/동적 className은 반드시 `@/lib/cn`의 `cn()` 사용. template literal(백틱) + 삼항 연산자로 클래스 조합 금지.
- 함수 선언 대신 `const` 화살표 함수 사용 (예: `const toggle = () =>`) 가능하면 타입도 정의.
- 단, App Router 라우트 컴포넌트(page, layout, loading, error 등)는 `export default function`으로 선언.
- inline export 대신 파일 끝에서 named export 사용 (예: `export { foo, bar }`, `export type { FooType }`)
- `useMemo`, `useCallback` 훅 사용 금지. React 19.2+ with React Compiler 사용으로 메모이제이션 자동 처리.
- 상대 경로는 `../..`까지만 허용. `../../..` 이상이면 path alias 사용.
- 객체 타입은 `type` 대신 `interface` 사용. 단, 리터럴 추론이 필요한 `as const` 파생 타입은 `type` 허용.
- 복잡한 혼합 컴포넌트는 props 대신 children 기반 composition 패턴 우선 사용.
- 해키한 패턴 금지. 우회가 필요하면 구조 자체를 재설계.
- 함수는 단일 책임 원칙 준수. 순수 함수 지향하고, 작은 함수로 분리 후 조합.
- `useEffect` 코드 추가시 항상 JSDoc으로 코드 설명.
- 애니메이션은 `motion/react` 사용 (`animate`, `useMotionValue`, `useAnimate`, `motion.*` 등). 직접 `requestAnimationFrame` / `setInterval` 루프 작성 금지. `useReducedMotion`으로 접근성 고려.
- `.then()` / `.catch()` 체이닝 금지. 반드시 `async/await` 사용.
- `fetch()` 직접 사용 금지. 반드시 `@/network/fetch-api`의 `fetchApi` 사용.


### 커밋 & PR 규칙

- 커밋 전 반드시 `/commit` 스킬 사용. 직접 `git commit` 실행 금지.
- PR 생성 시 반드시 `/pr` 스킬 사용. 직접 `gh pr create` 실행 금지.
