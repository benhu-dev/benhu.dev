# Build the OG image programmatically

The current OG image is `public/images/og-image.svg` — a hand-rolled
placeholder that:
- Is SVG (Twitter, LinkedIn, iMessage, Slack often don't render SVG OG images)
- Has stale text saying "Taipei" but the user's `personal.location` 
  is now LA-based

Replace it with a Next.js `opengraph-image.tsx` file convention that
renders to PNG at build time using `next/og`.

## Task

### Part 1: Create `app/opengraph-image.tsx`

Use the Next.js Metadata Files API. The file should:

- Export `size = { width: 1200, height: 630 }`
- Export `contentType = 'image/png'`
- Export `alt` describing the image (e.g., 
  `${personal.name} | ${personal.title}`)
- Default-export an async function returning `new ImageResponse(...)`
- Import data from `@/data/content` (use `personal` and `seo`) — do
  NOT hardcode strings

### Design spec

The image is a marketing card for the portfolio. It must feel
consistent with the site's IDE / Tokyo Night aesthetic:

- Background: `#1a1b26` (Tokyo Night base) with a subtle dot grid
  or vertical gradient. Don't over-decorate.
- Typography: monospace family. Use `JetBrains Mono` if the runtime
  allows custom fonts via fetch — Vercel's edge runtime supports
  loading fonts from Google Fonts at build time. If that's
  fragile, fall back to a system monospace stack — readability
  matters more than the exact font.
- Layout (rough — refine for visual balance):
  - Top-left: small subtitle in a muted color, e.g., 
    `~/portfolio` or `// benhu.dev`
  - Center-left, large: `personal.name` (e.g., "Ben Hu") in 
    Tokyo Night green `#9ece6a` or blue `#7aa2f7` — pick what 
    looks better at scale
  - Below name, smaller: `personal.title` ("Full-Stack Engineer")
    in muted foreground `#c0caf5`
  - Bottom-left: `personal.location` and a status pill matching
    `personal.status` (or omit pill if too busy)
  - Bottom-right: `seo.url` host in a muted color
- Colors must come from the actual Tokyo Night palette already used
  in the site CSS — check `app/globals.css` for the source of truth.

Aim for the same visual language as the live site, not a generic 
"developer portrait" template.

### Part 2: Update metadata to use the convention

In `app/layout.tsx`:
- Remove or replace the `openGraph.images` and `twitter.images` 
  entries that point at `/images/og-image.svg`. With the file 
  convention in place, Next.js auto-injects the correct OG image 
  meta tags. You can either:
  
  Option A: Remove the manual `images` arrays entirely and let the
  convention handle everything (cleanest).
  
  Option B: Keep the arrays but point them at `/opengraph-image` 
  (the route Next.js generates).
  
  Choose A.

In `data/content.ts`:
- Update `seo.ogImage` — either remove it from the type and exports
  (since it's no longer needed) or set it to a sensible default 
  that's still used somewhere. Check for any other consumers of 
  `seo.ogImage` first.

### Part 3: Optional — also create twitter-image.tsx

Twitter card spec is identical to OG (1200×630, PNG). Either:

Option A: Re-export the same component from 
  `app/twitter-image.tsx` — Next.js will use it for `twitter:image`.

Option B: Skip it — Next.js will fall back to the OG image for 
  Twitter cards automatically. This is fine.

Choose B unless creating the re-export is trivial.

### Part 4: Clean up old placeholder

- Delete `public/images/og-image.svg`
- If `public/images/` is now empty, delete the directory

## QA

- `npm run lint` — 0 errors / 0 warnings
- `npm run type-check` — clean
- `npm run build` — clean. Build output should show
  `/opengraph-image` as a generated route emitting a PNG.
- Open `http://localhost:3000/opengraph-image` in a browser — 
  should display the rendered 1200×630 PNG. Confirm it looks 
  professional, on-brand, and the text matches current data
  (no stale Taipei reference).

## Out of scope

- No actual posting/sharing test — that requires the site to be 
  deployed. The user will validate on opengraph.dev or similar 
  after deploy.