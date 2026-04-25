## 배경화면

현재 배경화면과 다른 더 입체적인 디자인으로 할 예정

### 진행 상황 (2026-04-25)

발로란트 flashback 사이트 (https://flashback.playvalorant.com/ko-KR) 의 배경 기법과 자산을 이식해 베이스 구현.

#### 1. 자산

| 파일 | 크기 | 역할 |
|---|---|---|
| `public/images/radtech.webp` | 630x570, 33KB | 삼각 그리드 + 도트 패턴 비트맵 (사이트 원본) |
| `public/images/svg/radtech-mask.svg` | 548B | 51.79° 대각선 그라디언트 stripe 마스크 (사이트 원본) |

#### 2. 컨테이너 베이스

```
SiteBackground (layout.tsx에서 z축 가장 아래에 마운트)
└── pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-[#101923]
```

`#101923` 은 사이트 body bg 픽셀 샘플링으로 확인한 값.

#### 3. 코너 ornament

`globals.css` 에 유틸리티 추가:
```css
.site-bg-radtech {
  background: url("/images/radtech.webp") no-repeat center / contain;
  -webkit-mask: url("/images/svg/radtech-mask.svg") no-repeat center / contain;
  mask: url("/images/svg/radtech-mask.svg") no-repeat center / contain;
}
```

4개 코너 × 2 레이어 = 8 div. 미러 transform 으로 패턴이 코너 안쪽으로 향하게:

| 코너 | Tailwind transform | 위치 |
|---|---|---|
| TR | (natural) | `-top-8 -right-8` |
| TL | `-scale-x-100` | `-top-8 -left-8` |
| BR | `-scale-y-100` | `-right-8 -bottom-8` |
| BL | `-scale-x-100 -scale-y-100` | `-bottom-8 -left-8` |

#### 4. 애니메이션 (motion/react)

라이브 사이트의 mask-position을 rAF로 실측 채집해 곡선 분석:
- 주기 4초 ease-in-out
- 범위 `-200px → +300px`
- 사이클 끝에서 즉시 시작점으로 wrap (loop)

`motion/react`의 `animate(motionValue, ...)` + `useMotionValueEvent` 로 재현. 단순 사이트 매칭에서 한 단계 더 가서, 같은 코너 안 두 레이어를 0.5 위상차로 cross-fade 해 패턴이 사라지는 시각 공백 제거.

`useReducedMotion` 으로 OS 의 "동작 줄이기" 설정 시 애니 비활성.

#### 5. 규칙 추가

`CLAUDE.md` 코드 작성 규칙에 추가:
> 애니메이션은 `motion/react` 사용 (`animate`, `useMotionValue`, `useAnimate`, `motion.*` 등). 직접 `requestAnimationFrame` / `setInterval` 루프 작성 금지. `useReducedMotion` 으로 접근성 고려.

### 다음 단계 — 입체화 방향

현재는 평면적 mask shimmer. 입체감을 더할 후보:
- 코너별 phase 시프트 또는 의사 random offset 으로 wave 흐름
- 빨간 HUD 다이아곤 폴리곤 (사이트의 `bg-c_brandRed cp-path_polygon(...)`) 추가
- parallax/mouse-follow 로 코너에 깊이감
- depth blur 또는 perspective transform 적용
