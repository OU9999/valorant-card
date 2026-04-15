# VAL CARD

**FC Ultimate Team** 스타일 카드 구조 × **Valorant** 전술 미학을 결합한 발로란트 플레이어 티어 카드 생성 웹앱.

## 모노레포 구성

pnpm workspace 기반.

| 패키지 | 설명 |
|--------|------|
| [`valorant-card-web`](./valorant-card-web) | Next.js 16 + React 19.2 + Tailwind v4 기반 웹 애플리케이션 |
| [`nano-banana-cli`](./nano-banana-cli) | Google GenAI(`@google/genai`) 기반 요원 포즈 이미지 생성 및 배경 제거 CLI |

## 기술 스택

**Web**
- Next.js 16.2 (App Router) / React 19.2 + React Compiler
- Tailwind CSS v4 / shadcn + Radix UI / base-ui
- next-intl (한국어/영어 i18n)
- iron-session / html-to-image / Vitest

**CLI**
- `@google/genai` · sharp · tsx

## 스크립트

루트에서 실행:

```bash
pnpm dev      # 웹 개발 서버
pnpm build    # 웹 프로덕션 빌드
pnpm start    # 프로덕션 서버
pnpm lint     # ESLint
```

## 디자인 시스템

다크모드 전용. 카드 티어별 고유 팔레트(Iron~Radiant) + Flashback V5의 Boast/Roast 패턴을 모든 텍스트 박스에 통일 적용. 상세 규격은 [`valorant-card-web/DESIGN.md`](./valorant-card-web/DESIGN.md) 참조.

## 배포

Vercel
