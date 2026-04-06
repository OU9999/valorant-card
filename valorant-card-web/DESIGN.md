# DESIGN.md — VALORANT FC CARD

> A collectible player card system that fuses **FIFA Ultimate Team** card structure with **Valorant Flashback V5** tactical aesthetics. Dark-mode only. Every surface is a battlefield.

---

## 1. Visual Theme & Atmosphere

### Identity

**"Dry elegance meets tactical FPS."** This is not a flashy gaming dashboard. It is a precision-crafted collectible card system where every pixel serves the fantasy of owning a Valorant player card — like FIFA Ultimate Team, but forged in Valorant's universe.

### Three Design Pillars

| Pillar | Description |
|--------|-------------|
| **Collectible Card Identity** | FIFA UT card structure — large OVR number, position label, player portrait, 6-stat grid. The card is the hero object. |
| **Tactical FPS Atmosphere** | Valorant Flashback V5 visual language — HUD corner lines, terminal-green diagnostics, red accent discipline, dark navy surfaces. |
| **Tier Progression** | 9 tiers from Iron to Radiant. Each tier has a unique metallic-textured background, color palette, and glow intensity. High tiers (Ascendant, Immortal, Radiant) get a notched SVG clip path. |

### Mood

- **Dark-mode only** — `<html class="dark">` is hardcoded
- Surfaces are deep navy, not pure black
- Red (`#FF4655`) is reserved for accents — never backgrounds (except the Roast pattern)
- Metallic card textures — generated as raster images, not CSS gradients
- Restrained animation — slow infinite scrolls, subtle hovers, no bounce or overshoot

### Design References

| Source | Influence |
|--------|-----------|
| FIFA Ultimate Team | Card layout, OVR placement, 6-stat grid, tier-based card frames |
| Valorant Flashback V5 | HUD corner L-lines, V logo watermark, diagonal split backgrounds, Boast/Roast stat bars, large counter numbers, `S2E` markers |

---

## 2. Color Palette & Roles

### Global Tokens (Dark Mode — Primary Surface)

All colors use OKLCH in CSS custom properties. Approximate hex values provided for reference.

| Token | OKLCH | Approx Hex | Role |
|-------|-------|------------|------|
| `--background` | `oklch(0.209 0.025 249)` | `#131B2E` | Page background — deep navy |
| `--foreground` | `oklch(0.932 0.010 82)` | `#EDEAE6` | Primary text |
| `--card` | `oklch(0.255 0.024 249)` | `#1A2338` | Card/panel surface |
| `--card-foreground` | `oklch(0.932 0.010 82)` | `#EDEAE6` | Text on card surfaces |
| `--primary` | `oklch(0.668 0.220 21)` | `#FF4655` | Valorant Red — accent, borders, CTAs |
| `--primary-foreground` | `oklch(1 0 0)` | `#FFFFFF` | Text on primary buttons |
| `--secondary` | `oklch(0.283 0.026 247)` | `#1E2A40` | Secondary surface |
| `--secondary-foreground` | `oklch(0.932 0.010 82)` | `#EDEAE6` | Text on secondary |
| `--muted` | `oklch(0.283 0.026 247)` | `#1E2A40` | Muted surface (same as secondary) |
| `--muted-foreground` | `oklch(0.714 0.009 254)` | `#A8A8B0` | De-emphasized text |
| `--accent` | `oklch(0.283 0.026 247)` | `#1E2A40` | Accent surface |
| `--destructive` | `oklch(0.714 0.180 18)` | `#E8604A` | Error/destructive actions |
| `--border` | `oklch(0.932 0.010 82 / 10%)` | `rgba(237,234,230,0.10)` | Semi-transparent borders |
| `--input` | `oklch(0.932 0.010 82 / 15%)` | `rgba(237,234,230,0.15)` | Input field borders |
| `--ring` | `oklch(0.668 0.220 21)` | `#FF4655` | Focus rings |
| `--radius` | `0.625rem` | `10px` | Base border radius |

### Flashback V5 Semantic Palette

These colors are used in specific contexts inspired by the Valorant Flashback V5 design.

| Name | Hex | Usage |
|------|-----|-------|
| Valorant Red | `#FF4655` | Primary accent — card borders, HUD lines, stat highlights |
| Dark Navy | `#0A1929` | Deep reference background (Flashback hero) |
| HUD Cyan | `#00C8FF` | Reserved for tactical grid/HUD decoration elements |
| Boast Bar Start | `rgba(255,70,85,0)` → `rgba(255,70,85,0.4)` | Boast stat bar vertical gradient |
| Roast Bar Start | `rgba(20,0,5,0)` → `rgba(20,0,5,0.5)` | Roast stat bar vertical gradient |
| Terminal Green | `emerald-400/80` (Tailwind) | AI feedback terminal text |
| Badge Emerald | `emerald-400` / `emerald-500/40` | Performance badge earned state / border |

### Tier Card Color System

Each tier has a unique palette applied through `TierDesign` interface. Key: light-background tiers (Silver, Gold, Radiant) use dark text; all others use light text.

| Tier | OVR Text | OVR Gradient | Bottom Gradient | Icon Glow | Notes |
|------|----------|--------------|-----------------|-----------|-------|
| **Iron** | `text-gray-100` | `from-gray-900/85` | `from-black/80` | `6px rgba(156,163,175,0.4)` | Muted, low contrast |
| **Bronze** | `text-amber-50` | `from-amber-950/85` | `from-black/80` | `6px rgba(217,119,6,0.4)` | Warm amber tones |
| **Silver** | `text-slate-800` | `from-slate-200/85` | `from-slate-900/70` | `6px rgba(148,163,184,0.5)` | Light bg, dark text |
| **Gold** | `text-amber-950` | `from-amber-100/85` | `from-amber-950/70` | `6px rgba(245,158,11,0.4)` | Light bg, dark text |
| **Platinum** | `text-cyan-50` | `from-cyan-950/85` | `from-black/80` | `6px rgba(6,182,212,0.4)` | Cool cyan glow |
| **Diamond** | `text-fuchsia-50` | `from-fuchsia-950/85` | `from-black/80` | `6px rgba(192,38,211,0.4)` | Vibrant fuchsia |
| **Ascendant** | `text-emerald-50` | `from-emerald-950/85` | `from-black/80` | `8px rgba(16,185,129,0.5)` | High tier, notch frame |
| **Immortal** | `text-rose-50` | `from-rose-950/85` | `from-black/80` | `8px rgba(225,29,72,0.5)` | High tier, notch frame |
| **Radiant** | `text-amber-900` | `from-amber-50/90` | `from-stone-900/70` | `8px rgba(212,175,55,0.5)` | Light bg, gold glow, notch frame |

**High-tier distinction**: Ascendant, Immortal, Radiant use SVG `clipPath` with a top-notch design instead of the standard CSS polygon. Icon glow increases from 6px to 8px. Bottom gradient height shrinks from 38% to 33%.

---

## 3. Typography Rules

### Font Stack

| Font | Source | Weights | CSS Variable | Role |
|------|--------|---------|-------------|------|
| **VALORANT** | CDN (`fonts.cdnfonts.com`) | — | `--font-heading` (primary) | Brand headings, hero titles |
| **Barlow Condensed** | Google Fonts | 400, 500, 600, 700, 800 | `--font-barlow-condensed` | Card UI, condensed labels |
| **Noto Sans KR** | Google Fonts | Variable | `--font-noto-sans-kr` | Korean body text |
| **Black Han Sans** | Google Fonts | 400 | `--font-black-han-sans` | Accent headings (Korean) |

```
--font-heading: "VALORANT", var(--font-barlow-condensed), var(--font-black-han-sans), sans-serif;
--font-sans:    var(--font-noto-sans-kr), var(--font-barlow-condensed), sans-serif;
```

### Card Typography Scale (Container Query)

All card-internal text uses `cqw` units via `clamp()` to scale with card size. Two modes: `default` and `sm`.

| Element | Default | SM | Weight | Extra |
|---------|---------|-----|--------|-------|
| OVR Number | `clamp(1rem, 21.2cqw, 5rem)` | `clamp(0.75rem, 18cqw, 4rem)` | `font-extrabold` | `leading-none` |
| Tier Icon | `clamp(0.5rem, 12.7cqw, 3rem)` | `clamp(0.375rem, 10cqw, 2.25rem)` | — | Square aspect |
| Region | `clamp(0.4375rem, 7.5cqw, 1.75rem)` | Same | `font-bold` | `tracking-wider` |
| Player Name | `clamp(0.5rem, 9.5cqw, 2.25rem)` | `clamp(0.375rem, 7cqw, 1.75rem)` | `font-bold` | `tracking-widest` |
| Stat Label | `clamp(0.25rem, 3.7cqw, 0.875rem)` | `clamp(0.125rem, 2.8cqw, 0.625rem)` | `font-medium` | `tracking-wide` |
| Stat Value | `clamp(0.375rem, 7.4cqw, 1.75rem)` | `clamp(0.25rem, 5.5cqw, 1.25rem)` | `font-bold` | `leading-tight` |

### Page Typography

| Element | Classes | Example |
|---------|---------|---------|
| Hero Title (Brand) | `text-5xl md:text-7xl font-extrabold uppercase tracking-wide text-primary` | VALORANT |
| Hero Subtitle | `text-3xl md:text-5xl font-bold uppercase tracking-wide text-foreground` | FC CARD |
| Section Heading | `text-lg sm:text-xl font-bold uppercase tracking-widest text-foreground` | COMBAT STATS |
| Section Subheading | `text-sm font-bold uppercase tracking-widest text-foreground` | PERFORMANCE BADGES |
| Body Text | `text-sm text-muted-foreground` | Description text |
| Badge Label | `text-[10px] font-bold uppercase tracking-widest text-foreground` | ACE HUNTER |
| Terminal Text | `font-mono text-sm leading-relaxed text-emerald-400/80` | `> INITIATING...` |
| Stat Value (Detail) | `text-3xl sm:text-4xl font-black tracking-tight text-foreground` | 312 |
| Stat Label (Detail) | `text-xs uppercase tracking-tight text-muted-foreground` | Combat Score |

### Typography Conventions

- **ALL-CAPS**: Section headings, stat labels, badge names, terminal commands — structural text is always uppercase
- **`tracking-widest`**: Player names, section headings — signature spacing
- **`tracking-tight`**: Large stat numbers — keeps digits compact
- **Card internals**: Always use `cqw` units, never fixed `px` or viewport units
- **Korean text**: Falls through to `Noto Sans KR` via font stack — no special treatment needed

---

## 4. Component Stylings

### TierCard (Main Card)

The card is a layered composite rendered inside a `@container` with `aspect-2109/3218`.

**Layer Stack** (bottom to top):
1. **BackgroundLayer** — Tier-specific metallic texture image (`object-contain`)
2. **PortraitLayer** — Agent portrait (`object-cover object-top`) with `.card-portrait-fade` mask
3. **BottomGradientLayer** — Tier gradient (`bg-linear-to-t`), height 38% (standard) or 33% (high tier)
4. **Content** — Absolute-positioned OVR, player name, stats

**Clipping**:
- Standard tiers: CSS polygon (`.card-clip`) — 21-point clip-path
- High tiers (Ascendant/Immortal/Radiant): SVG `clipPath` via `<defs>` — top-notch angular geometry

**Portrait Fade Mask**:
```css
.card-portrait-fade {
  mask-image: linear-gradient(to bottom, black 40%, transparent 65%);
}
```

**OVR Gradient Backdrop**: Linear gradient with mask fade at top/bottom edges:
```
[mask-image:linear-gradient(to_bottom,transparent,black_30%,black_70%,transparent)]
```

**Positioning** (percentage-based):

| Element | Default | High Tier | SM |
|---------|---------|-----------|-----|
| OVR Section | `left-[6%] top-[10%]` | `left-[10%] top-[14%]` | `left-[7%] top-[12%]` |
| Player Name | `top-[68%]` | `top-[65%]` | `top-[73%]` |
| Stats | `inset-x-[6%] top-[76%]` | `inset-x-[10%] top-[74%]` | `inset-x-[8%] top-[82%]` |

### CombatStats (Detail Panel)

```
Container: rounded-lg bg-card p-6 sm:p-8
Header:    h-8 w-1 bg-primary  +  text-lg font-bold uppercase tracking-widest
Grid:      grid-cols-2 sm:grid-cols-3, gap-x-6 gap-y-8
Stat:      label (text-xs uppercase tracking-tight text-muted-foreground)
           value (text-3xl sm:text-4xl font-black tracking-tight text-foreground)
Corner:    absolute right-0 top-0 h-16 w-16 border-r-2 border-t-2 border-primary/20
```

The **tactical corner L-line** (top-right) is a signature HUD decoration element from Flashback V5.

### PerformanceBadges (Detail Panel)

```
Container: rounded-lg border-l-2 border-emerald-500/40 bg-card p-6
Header:    Trophy icon (text-emerald-400) + text-sm font-bold uppercase tracking-widest
Layout:    flex flex-wrap gap-3
Badge:     rounded border bg-background px-3 py-2
  Earned:  border-border, icon text-emerald-400, full opacity
  Unearned: border-border/50 opacity-40, icon text-muted-foreground
Icon:      size-3.5
Label:     text-[10px] font-bold uppercase tracking-widest
```

### AIFeedback (Detail Panel)

```
Container: rounded-lg border border-primary/20 bg-background p-6
Header:    Terminal icon (text-primary) + text-sm font-bold uppercase tracking-widest text-primary
Body:      font-mono text-sm leading-relaxed text-emerald-400/80
Lines:     Prefixed with "> " — terminal command aesthetic
Values:    Inline <span> with font-bold text-foreground
Divider:   h-px w-full bg-primary/10
Footer:    text-[10px] text-muted-foreground/40
```

**Trend Status Badges**:
| Trend | Label | Style |
|-------|-------|-------|
| Up | `OPTIMIZED FOR CLIMBING` | `bg-emerald-400/20 text-emerald-400` |
| Stable | `HOLDING STEADY` | `bg-muted text-muted-foreground` |
| Down | `PERFORMANCE DECLINING` | `bg-primary/20 text-primary` |

### StatBar (Flashback V5 Pattern)

Two variants mirroring Flashback V5's "Boast" (positive stats) and "Roast" (negative stats):

```
Shared:    border-l-2 border-[#FF4655] px-5 pb-4 pt-3
Label:     text-xs
Value:     text-2xl font-bold tracking-wide
```

| Variant | Background Gradient | Label Color | Value Color |
|---------|-------------------|-------------|-------------|
| Boast | `linear-gradient(180deg, rgba(255,70,85,0) 0%, rgba(255,70,85,0.4) 100%)` | `text-white/70` | `text-white` |
| Roast | `linear-gradient(180deg, rgba(20,0,5,0) 0%, rgba(20,0,5,0.5) 100%)` | `text-[#6B1525]` | `text-[#1A0008]` |

### Radial Gradient Overlay (Page-Level)

A soft red glow emanating from the top of the page, used on hero and detail layouts:
```
bg-[radial-gradient(ellipse_at_top,_oklch(0.668_0.220_21_/_0.12)_0%,_transparent_60%)]
pointer-events-none absolute inset-0
```

---

## 5. Layout Principles

### Page Layouts

| Page | Structure | Details |
|------|-----------|---------|
| **Hero** | 55/45 horizontal split | Left: title + CTA, Right: 3-column card carousel. `min-h-screen`. Mobile: stacked vertical |
| **Card Detail** | Responsive split | Card on one side, detail panels (CombatStats, PerformanceBadges, AIFeedback) on the other. `max-w-7xl mx-auto` |

### Card Showcase Carousel

Three columns with infinite vertical scrolling at staggered speeds:

| Column | Direction | Speed | Entry Delay |
|--------|-----------|-------|-------------|
| 1 | Up | 60s | 0.1s |
| 2 | Down | 44s | 0.3s |
| 3 | Up | 52s | 0.5s |

Fade masks at top and bottom: `h-32` gradient from `background` to transparent.

**Column entry animation**: `opacity 0→1, translateY(40px→0)`, 0.8s, `cubic-bezier(0.16, 1, 0.3, 1)`.

### Card Internal Layout

Cards use **percentage-based absolute positioning** inside a `@container` with fixed `aspect-2109/3218`.

- OVR section: top-left column (OVR number → tier icon → region → weapon icon)
- Player name: horizontally centered, positioned at ~65-73% from top
- Stats: 6-item flex row, positioned at ~74-82% from top
- All gaps use `clamp()` with `cqw` units

### Spacing System

- **Base**: Tailwind default spacing scale (4px increments)
- **Panel padding**: `p-6` (mobile), `sm:p-8` (desktop)
- **Grid gaps**: `gap-x-6 gap-y-8` for stat grids, `gap-3` for badge wraps
- **Section spacing**: `mb-8` between header and content in detail panels
- **Card internals**: `clamp()` with `cqw` — never fixed values

### Border Radius Scale

Base radius `0.625rem` (10px), derived variants:

| Token | Formula | Value |
|-------|---------|-------|
| `--radius-sm` | `base * 0.6` | `6px` |
| `--radius-md` | `base * 0.8` | `8px` |
| `--radius-lg` | `base` | `10px` |
| `--radius-xl` | `base * 1.4` | `14px` |
| `--radius-2xl` | `base * 1.8` | `18px` |

---

## 6. Depth & Elevation

### Philosophy

**No box-shadow elevation.** Depth is created through:
- Background color stepping (lighter surfaces float)
- Semi-transparent borders (`oklch(.../ 10%)`)
- Glow effects (tier-specific `drop-shadow`)
- Layered compositing (card layer stack)

### Card Internal Depth (bottom to top)

| Layer | Z | Description |
|-------|---|-------------|
| Background | 0 | Metallic texture image |
| Portrait | 1 | Agent portrait with fade mask |
| Bottom Gradient | 2 | Tier-colored gradient overlay |
| Content | 3 | OVR, name, stats (absolute positioned) |

### Glow System

| Context | Size | Opacity | Example |
|---------|------|---------|---------|
| Standard tier icon | `6px` | `0.4` | `drop-shadow-[0_0_6px_rgba(156,163,175,0.4)]` |
| High tier icon | `8px` | `0.5` | `drop-shadow-[0_0_8px_rgba(16,185,129,0.5)]` |
| OVR text | `drop-shadow-lg` | — | Built-in Tailwind large shadow |
| Light-bg tier text | `drop-shadow-[0_1px_2px_rgba(255,255,255,0.2-0.3)]` | — | White shadow for legibility |
| Hover glow | `brightness(1.08)` + `var(--tier-glow)` | — | Per-card CSS custom property |

### Surface Hierarchy

| Surface | Token | Usage |
|---------|-------|-------|
| Page | `--background` | Deepest layer |
| Panel | `--card` | Detail panels, card surfaces |
| Inset | `--secondary` | Nested elements within panels |
| Overlay | `radial-gradient(primary/12%)` | Subtle red glow from top |

---

## 7. Do's and Don'ts

### Do

- **Tailwind only** for all styling — no inline `style` attributes (exception: dynamic values like `maskImage` URLs and CSS custom properties)
- **`const` arrow functions** for all components and utilities
- **`interface`** for object types, not `type` (exception: `as const` derived types)
- **`cn()` utility** (`tailwind-merge` + `clsx`) for all conditional class composition
- **`@container` queries** with `cqw` units inside card components
- **`clamp(min, preferred, max)`** for all card-internal typography
- **Named exports at file end** — `export { Foo }; export type { FooType }`
- **Children-based composition** over slot props for complex layouts
- **Early return pattern** for readability
- **`useEffect` JSDoc** — always add JSDoc comment explaining the effect
- **Percentage positioning** inside cards — never pixel values
- **`prefers-reduced-motion`** — disable all animations when user prefers reduced motion

### Don't

- **No `useMemo` or `useCallback`** — React 19.2+ with React Compiler handles memoization
- **No deep relative imports** — `../../..` or deeper must use path alias (`@/`)
- **No inline styles** for visual styling — Tailwind classes only
- **No light mode** — dark mode is the only supported theme
- **No fixed pixels** inside card components — always `cqw`/`clamp()`/percentage
- **No CSS/SVG card backgrounds** — metallic textures require raster images (PNG)
- **No hacky workarounds** — redesign the structure instead
- **No `function` declarations** for components — use `const` arrow functions (exception: App Router route components use `export default function`)
- **No generic agent poses** — each Valorant agent has a unique character pose (no crossed-arms/hands-on-hips templates)
- **No guessing colors** — always reference tier-design.ts or globals.css tokens

---

## 8. Responsive Behavior

### Breakpoints

Standard Tailwind v4 breakpoints, mobile-first:

| Breakpoint | Min Width | Usage |
|------------|-----------|-------|
| Default | `0px` | Mobile — single column, stacked layout |
| `sm` | `640px` | Stat grid expands to 3 columns, padding increases |
| `md` | `768px` | Hero splits to 55/45, side-by-side layouts |
| `lg` | `1024px` | Full desktop layout |

### Container Query System

Cards use `@container` (not viewport) for responsive sizing. Two size modes:

| Mode | Trigger | Usage |
|------|---------|-------|
| `default` | Card rendered at full size (carousel, detail) | Larger clamp ranges |
| `sm` | Card rendered in compact context (hero 3-column) | Tighter clamp ranges, adjusted positioning |

### Accessibility

- **`prefers-reduced-motion: reduce`**: All scroll animations (`card-scroll-up/down`), column entry animations, and hover transitions are disabled
- **Hover pause**: Infinite scroll pauses on hover (`animation-play-state: paused`)
- **Alt text**: All images have descriptive alt attributes (`"agent portrait"`, `"Iron tier icon"`)
- **Semantic HTML**: Section headings use `<h2>`, `<h3>` hierarchy
- **Touch targets**: Badge and button elements maintain minimum touch area via padding

---

## 9. Agent Prompt Guide

### Quick Rules

When generating UI for this project, always:

1. **Dark mode only** — use `bg-background`, `text-foreground`, never assume light surfaces
2. **Red is accent only** — `text-primary` / `bg-primary` for borders, highlights, CTAs. Never as a background fill (except Roast variant)
3. **Uppercase structural text** — section headings, stat labels, badge names are ALL-CAPS with `tracking-widest`
4. **Large stat numbers** — stat values should be visually dominant (`text-3xl+`, `font-black`)
5. **Left bar accent** — section headers use a red vertical bar (`h-8 w-1 bg-primary`) as visual anchor
6. **Emerald for success/badges** — earned badges and AI terminal text use `emerald-400`, not green-500
7. **Semi-transparent borders** — borders use `border-border` (10% white), not solid gray

### Pattern: Detail Panel

```tsx
<div className="rounded-lg bg-card p-6 sm:p-8">
  <div className="mb-8 flex items-center gap-3">
    <div className="h-8 w-1 bg-primary" />
    <h2 className="text-lg font-bold uppercase tracking-widest text-foreground">
      Section Title
    </h2>
  </div>
  {/* Content */}
</div>
```

### Pattern: Stat Display

```tsx
<div className="flex flex-col">
  <span className="mb-1 text-xs uppercase tracking-tight text-muted-foreground">
    STAT LABEL
  </span>
  <span className="text-3xl font-black tracking-tight text-foreground">
    {value}
  </span>
</div>
```

### Pattern: Tactical Corner Decoration

```tsx
<div className="absolute right-0 top-0 h-16 w-16 border-r-2 border-t-2 border-primary/20" />
```

### Pattern: Terminal Line

```tsx
<p className="font-mono text-sm leading-relaxed text-emerald-400/80">
  &gt; COMMAND OUTPUT TEXT
</p>
```

### Tech Stack

| Technology | Version | Notes |
|------------|---------|-------|
| Next.js | 16.2+ | App Router, `export default function` for routes |
| React | 19.2+ | React Compiler — no manual memoization |
| Tailwind CSS | 4.1+ | PostCSS plugin, `@theme inline` for custom tokens |
| shadcn/ui | Latest | Base component library (`src/components/ui/`) |
| Class utility | `cn()` | `tailwind-merge(clsx(...))` from `src/lib/cn.ts` |
| Package manager | pnpm | Required — no npm or yarn |

### File Organization

```
src/
  app/              Route components (export default function)
  components/
    card/           Card system (TierCard, detail panels)
    home/           Landing page components
    ui/             shadcn base components
    test/           Test page components
  constants/        Design tokens, tier mappings
  lib/              Utilities, Valorant data helpers
  styles/           globals.css (theme, animations, custom classes)
  asset/            Static assets (tier card backgrounds)
```
