# Task: Align Hero + About + Skills Sections with Reference Implementation

The current implementation works but has many small UI/UX gaps compared to the reference. This task is to align Hero, About, and Skills (Skills is part of About) with the reference implementation in `reference.md`.

The reference is the visual source of truth. Match its exact spacing, typography, colors, animations, hover states, cursor behaviors, and responsive breakpoints.

---

## Scope

Modify only:
- `components/sections/hero.tsx`
- `components/sections/about.tsx` (includes Skills subsection)
- `components/effects/grid-sphere.tsx` (rewrite based on reference)
- `components/effects/pixel-avatar.tsx` (if exists, otherwise create matching reference's pixel avatar generation)
- Hero/About-specific styles in `app/globals.css`
- Tailwind config additions (only if needed)

**Do NOT touch**: Nav, Projects, Experience, Contact, Footer, or unrelated files.

---

## Part 1: Rewrite GridSphere Effect

The current GridSphere looks like floating particles. The reference produces a true 3D grid bulge under the cursor. Completely rewrite `components/effects/grid-sphere.tsx`.

### Architecture conversion
- React 19 + TypeScript, no `any`
- `'use client'` directive
- Tailwind classes for static styling; inline style only for dynamic Canvas sizing
- `export function GridSphere()`
- Project lint rules apply

### Algorithm preservation (copy exactly, do not estimate)
- `SPACING = 28`, `RADIUS = 110`, `LIFT_MAX = 90`, `FOCAL = 700`, `FAR_FADE = 150`, `sigma = 50`
- Perspective: `persp = FOCAL / (FOCAL - lift)`
- Bidirectional connections: each point links to right and bottom neighbors
- `act` smoothing: `state.act += ((cursorActive ? 1 : 0.22) - state.act) * 0.06`
- Cursor active threshold: `< 700`ms since last move
- Cursor lerp damping: 0.12
- Purple rule: `(k % 11 === 0) && intensity > 0.65`, color `187,154,247`
- Blue color: `122,162,247`
- Line color blend: `65,72,104` → `122,162,247`
- Line alpha: `0.12 + intensity * 0.32 * act`
- Point peakAlpha: blue 0.66, purple 0.5
- Breathing: `sin(t * fr + ph) * 0.9`, `fr` random 0.5-1.1, `ph` random 0-2π
- DPR cap 2
- ResizeObserver on wrap; IntersectionObserver to pause RAF offscreen

### Standards to add
- `aria-hidden="true"` on wrap
- Skip canvas init when `prefers-reduced-motion: reduce` or `pointer: coarse`
- Static grid background layer always visible:
  - Lines: `rgba(86,95,137,0.4)`, spacing 28px, container opacity 0.18
- Cleanup all listeners, RAF, observers in useEffect return

---

## Part 2: Align Hero Layout & Typography

### Layout & spacing
- Section: `minHeight: 100vh`, flex centered, padding `160px 64px 120px` desktop, `120px 24px 80px` mobile (<1024px)
- Inner: `maxWidth: 1400`, `margin: 0 auto`
- Content block: `maxWidth: 880`

### Typography (use exact reference values)
- `// $ whoami`: mono 13px, `--comment`, marginBottom 24
- H1: `clamp(56px, 9vw, 128px)`, lineHeight 1.02, letterSpacing -0.02em, marginBottom 18
  - `const ` → `--comment` | `name` → `--fg` | ` = ` → `--comment` | `"Ben Hu"` → `--green`
- Role line: `clamp(20px, 2.5vw, 30px)`, marginBottom 28
  - `Full-Stack Engineer` → `--blue` | `→` → `--comment` | typewriter → `--fg-2`
- Description: sans 19px, lineHeight 1.65, maxWidth 640, marginBottom 44
- CTA row: gap 14, marginBottom 56

### Typewriter & cursor
- Cursor inline-block, width 0.55em, height 1em, background `--blue`, verticalAlign -0.12em, marginLeft 2
- Animation: `blink-cursor 1s step-end infinite`
- Typing speed: 55-95ms per character (random), starts after 800ms delay

### Status badge
- inline-flex, gap 12, padding `10px 20px 10px 16px`, border-radius 999
- border `1px solid --border`, background `--bg-2`
- Pulsing dot: 10px, `--green`, animation `pulse-dot 1.6s ease-in-out infinite`
- Text: `Open to work` (green, 600 weight) + `—` (comment) + `Senior Full-Stack Engineer roles` (fg)

### Scroll indicator
- absolute bottom 32, centered via translateX -50%
- mono 11px, `--comment`, flex column, gap 6
- Arrow `↓` with `fade-bob 2.4s ease-in-out infinite`
- Text: `scroll`

### Layering
- Hero: `relative`
- GridSphere: `absolute inset-0`, behind content, `pointer-events: none`
- Content layer: `relative z-10`, wrapper `pointer-events: none`
- CTAs and scroll indicator: `pointer-events: auto` to override

---

## Part 3: Align About Layout

### Grid layout
- `display: grid`, `gridTemplateColumns: '280px 1fr'`, gap 64
- Mobile (<1024px): single column, gap 40

### Section title
- `// about` using existing section-title style

### Left column: pixel avatar window
- Container: `var(--bg-2)`, `1px solid var(--border)`, border-radius 12, padding 16, position relative, overflow hidden

- Faux window header (top): flex with gap 6, marginBottom 10
  - Three 10px circles: `--red`, `--orange`, `--green` from left
  - Right-aligned label `avatar.png`: mono 11px, `--comment`

- Avatar canvas:
  - `aspectRatio: 1/1`, border-radius 8
  - Background: `repeating-conic-gradient(#1a1b26 0% 25%, #20212e 0% 50%) 50% / 24px 24px` (checkerboard)
  - Pixel avatar image inside: 92% × 92%, `image-rendering: pixelated`
  - Use generated pixel avatar (port reference's `generatePixelAvatar` to a utility OR generate placeholder programmatically)

- Below avatar: status row, marginTop 14
  - 8px pulsing green dot
  - Text: `online — ` + `open to work` (green segment)
  - Mono 12px, `--fg-2`

- Below status: location row, marginTop 8
  - Mono 11px, `--comment`
  - Text: `📍 Taipei · UTC+8 · remote-friendly`

### Right column: heading + paragraphs + skills
- Heading H2: mono 700, `clamp(32px, 4vw, 48px)`, lineHeight 1.1, marginBottom 24, letterSpacing -0.01em
  - Text: `engineer who actually ships.` with `ships` in `--green`

- 3 paragraphs:
  - All sans 17px, lineHeight 1.7, maxWidth 640
  - First paragraph: color `--fg`, marginBottom 14
  - Second paragraph: color `--fg-2`, marginBottom 14
  - Third paragraph: color `--fg-2`, marginBottom 40
  - Use reference's exact placeholder copy

---

## Part 4: Align Skills Subsection

### Subtitle
- `// stack`: mono 16px, `--comment`, marginBottom 18, letterSpacing 0.01em

### Three-column grid
- `display: grid`, `gridTemplateColumns: 'repeat(3, 1fr)'`, gap 16
- Tablet (1024-1199px): single column
- Mobile (<1024px): single column

### Each skill card
- Background `--bg-2`, border `1px solid --border`, border-radius 10, padding `20px 20px 22px`
- Flex column, gap 14
- Card title (e.g. `// frontend`): mono 12px, `--comment`, letterSpacing 0.02em
- Tag pills: flex-wrap with gap 8

### Tag pill style
- Mono 13px
- Color matches category: frontend `--blue`, backend `--purple`, infra-tools `--orange`
- Border `1px solid {category color}`
- Background `rgba(255,255,255,0.02)`
- Border-radius 999, padding `5px 12px`, lineHeight 1.4, whiteSpace nowrap

### Skill items (use reference's lists exactly)
- Frontend: React, TypeScript, Next.js, Tailwind, React Native
- Backend: Node.js, PostgreSQL, GraphQL, Redis, Prisma
- Infra & Tools: AWS, Docker, Terraform, GitHub Actions, Vercel

---

## Part 5: Required keyframes & utility classes

Add to `app/globals.css` if missing:

```css
@keyframes blink-cursor {
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
}

@keyframes pulse-dot {
  0%, 100% { transform: scale(1); opacity: 1; }
  50% { transform: scale(1.4); opacity: 0.6; }
}

@keyframes fade-bob {
  0%, 100% { transform: translateY(0); opacity: 0.5; }
  50% { transform: translateY(6px); opacity: 1; }
}

.pixelated {
  image-rendering: pixelated;
  image-rendering: crisp-edges;
}
```

---

## Verification checklist

After changes, run `npm run dev` and verify in browser:

### Hero
- [ ] Static faint grid visible without mouse
- [ ] Mouse anywhere in hero triggers 3D grid bulge (not particles)
- [ ] Sphere has hard edge (~150px), no bleed
- [ ] After 1s stillness, sphere fades down
- [ ] H1 scales smoothly, max 128px
- [ ] Status badge has pulsing dot, plain English text
- [ ] Scroll indicator bobs at bottom center
- [ ] Typewriter has random per-character timing
- [ ] CTAs hover and click correctly
- [ ] Mobile / reduced motion: canvas off, only static grid

### About
- [ ] Two-column grid: 280px avatar + flexible content
- [ ] Pixel avatar shown inside Mac-style window with checkerboard backdrop
- [ ] Pulsing green dot, location line below
- [ ] Heading has `ships.` in green
- [ ] Three paragraphs with correct color hierarchy and spacing
- [ ] Mobile collapses to single column

### Skills
- [ ] `// stack` subtitle above three cards
- [ ] Three cards in row at desktop, single column at <1200px
- [ ] Tag pills colored by category (blue/purple/orange)
- [ ] All skill items present and matching reference

### Animations
- [ ] Typewriter cursor uses `step-end` (sharp blink)
- [ ] Pulse dots smooth scale animation
- [ ] Scroll arrow bobs gently

---

## Reference implementation

See `reference.md` for the complete working implementation. Read both `HeroGrid`, `Hero`, and `About` components fully — they are the source of truth.

The reference uses vanilla React + inline styles + CSS variables + window globals. Your job is to port every visual detail and timing constant to our Next.js + TypeScript + Tailwind stack while preserving exact values.