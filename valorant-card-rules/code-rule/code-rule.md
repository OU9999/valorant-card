# Code Rule

코드 작성·수정 시 적용하는 규칙. 항상 준수.

## 적용 범위

- 공통 TypeScript 규칙 → `valorant-card-web`, `nano-banana-cli`
- Web 전용 규칙 → `valorant-card-web`
- React·App Router·Tailwind·`cn`·`motion/react`·`fetchApi` 규칙 → Web 전용
- `@/*` path alias 규칙 → alias가 설정된 `valorant-card-web`에만 적용
- `nano-banana-cli`에 Web 전용 API·path alias 강제 금지

## 선언·문법

- 가독성을 위해 early return 패턴 적극 사용
- 함수 선언 대신 `const` 화살표 함수 사용, 가능하면 타입 정의 (예: `const toggle = () =>`)
- inline export 금지, 파일 끝에서 named export (예: `export { foo, bar }`, `export type { FooType }`)
- 객체 타입은 `type` 대신 `interface` 사용
- 리터럴 추론이 필요한 `as const` 파생 타입은 `type` 허용
- App Router 라우트 컴포넌트(page·layout·loading·error 등)는 `export default function` 선언 — 화살표 함수·named export 규칙의 예외

## React·훅

- `useMemo`·`useCallback` 사용 금지 (React 19.2+ React Compiler 자동 메모이제이션)
- `useEffect` 추가 시 코드 설명 JSDoc 필수

## 컴포넌트·JSX

- 복잡한 혼합 컴포넌트는 props 전달보다 children 기반 composition 패턴 우선

## 스타일링

- HTML 요소 스타일링은 Tailwind 클래스 필수, inline style 금지
- 조건부·동적 `className`은 `@/lib/cn`의 `cn()` 사용
- template literal과 삼항 연산자를 결합한 클래스 조합 금지
- 상세 디자인·UI 기준은 `valorant-card-web/DESIGN.md` 참조

## 애니메이션

- 애니메이션은 `motion/react` 사용 (`animate`·`useMotionValue`·`useAnimate`·`motion.*` 등)
- `useReducedMotion`으로 접근성 고려
- 직접 `requestAnimationFrame`·`setInterval` 애니메이션 루프 작성 금지

## 비동기·네트워크

- `.then()`·`.catch()` 체이닝 금지, `async/await` 사용
- Web에서 `fetch()` 직접 사용 금지, `@/network/fetch-api`의 `fetchApi` 사용

## import 경로

- Web의 상대 경로는 `../..`까지만 허용
- Web에서 `../../..` 이상 경로는 `@/*` path alias 사용

## 단순함·설계

- 해키한 패턴 금지, 우회가 필요하면 구조 자체를 재설계
- 함수는 단일 책임 원칙 준수
- 순수 함수 지향
- 작은 함수로 분리 후 조합
