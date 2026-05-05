# benhu.dev — Ben Hu's personal portfolio

[![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-strict-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-v4-38BDF8?logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![License](https://img.shields.io/badge/license-All%20Rights%20Reserved-lightgrey)](#license)

A one-page portfolio for **Ben Hu**, a Full-Stack Engineer based in Taipei. The visual language is "IDE-inspired" — Tokyo Night palette, JetBrains Mono everywhere, syntax-color accents, and a few intentional pixel-art touches. Built to be fast, accessible, and easy to keep up to date.

---

## Tech stack

| Layer | Choice | Why |
| --- | --- | --- |
| Framework | **Next.js 16** (App Router) | Server components, route handlers, image optimization, sitemap/robots conventions |
| Language | **TypeScript** (strict + `noUncheckedIndexedAccess`) | Catch the dumb mistakes at compile time |
| Styles | **Tailwind CSS v4** | Tokens defined once in `globals.css` via `@theme`, used everywhere via utility classes |
| Animation | **Framer Motion** | Entrance animations that respect `prefers-reduced-motion` |
| Icons | **lucide-react** | Tree-shakable, consistent stroke icons |
| Forms | **react-hook-form** + **zod** | Typed forms with great DX and shared client/server validation |
| Email | **Resend** | Simple SDK, transactional email from `noreply@benhu.dev` |
| Analytics | **@vercel/analytics** + **@vercel/speed-insights** | Real-user metrics on Vercel |
| Tests | **Vitest** + **Testing Library** | Fast unit tests with jsdom |
| Quality gates | **ESLint** (flat config) + **Prettier** + **Husky** + **lint-staged** + **commitlint** | Conventional Commits enforced, pre-commit autoformatting |
| CI | **GitHub Actions** | Lint, type-check, test, build on every PR |

---

## Local development

### Prerequisites

- **Node.js 20+** (some tooling now warns on `<20.19`; the CI uses Node 20)
- **npm 10+**

### Setup

```bash
git clone https://github.com/benhu-dev/benhu.dev.git
cd benhu.dev
npm install
cp .env.example .env.local
# fill in RESEND_API_KEY (or leave the placeholder for local UI work)
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

> The contact form will submit successfully but the email send will fail without a real `RESEND_API_KEY`. UI states still work — the API just returns a 500.

---

## Available scripts

| Script | What it does |
| --- | --- |
| `npm run dev` | Next.js dev server with Turbopack |
| `npm run build` | Production build |
| `npm start` | Serve the production build |
| `npm run lint` | Run ESLint |
| `npm run lint:fix` | Run ESLint and auto-fix |
| `npm run type-check` | Run `tsc --noEmit` |
| `npm run format` | Format the repo with Prettier |
| `npm run format:check` | Check formatting without writing |
| `npm test` | Run Vitest once |
| `npm run test:watch` | Vitest in watch mode |
| `npm run prepare` | Set up Husky hooks (runs automatically on install) |

---

## Customization guide

### Update text content

Everything user-facing lives in **`lib/data.ts`** — personal details, about copy, skills, projects, experience, contact info, SEO. Replace the `[REPLACE: ...]` placeholders.

### Update images

Drop replacements into **`public/images/`**:

- `public/images/projects/project-1.svg` … `project-5.svg` — project mockups (PNG/JPG also fine, just update the path in `lib/data.ts`)
- `public/images/og-image.svg` — 1200×630 social card (PNG strongly recommended for production)
- `public/favicon.svg` — favicon (also `app/favicon.ico` for legacy clients)

### Add a new project

Append to the `projects` array in `lib/data.ts`:

```ts
{
  id: 'project-6',
  title: 'Your project',
  tagline: 'One sentence on what it does and why it matters',
  stack: ['Next.js', 'TypeScript', 'PostgreSQL'],
  stats: [
    { icon: '📊', text: '10k MAU' },
    { icon: '⚡', text: '<100ms p95' },
  ],
  image: '/images/projects/project-6.svg',
  liveUrl: 'https://...',
  codeUrl: 'https://github.com/...',
}
```

### Add a new section / change colors

- Tokens: `app/globals.css` (`:root` for raw hex, `@theme` to expose to Tailwind)
- New section: add a component under `components/sections/`, mount it in `app/page.tsx`, and add an entry to `NAV_ITEMS` in `components/layout/nav.tsx`

---

## Code quality

- **ESLint** flat config at `eslint.config.mjs`. Extends `next/core-web-vitals`, `next/typescript`, `jsx-a11y/recommended`, plus `import/order` and `prettier`.
- **Prettier** with `prettier-plugin-tailwindcss` to auto-sort utility classes.
- **Husky** runs `lint-staged` on every commit (eslint + prettier on changed files only) and `commitlint` on every commit message.
- **Conventional Commits** required: `feat:`, `fix:`, `docs:`, `style:`, `refactor:`, `perf:`, `test:`, `build:`, `ci:`, `chore:`, `revert:`.
- **Vitest** for unit tests, configured for jsdom + Testing Library.
- **CI** (`.github/workflows/ci.yml`) gates `main` on lint + type-check + test + build.

---

## Deployment (Vercel)

1. Push to GitHub (`origin` should already be `benhu-dev/benhu.dev`).
2. Go to [vercel.com/new](https://vercel.com/new), import the repo.
3. Set environment variables in **Project Settings → Environment Variables**:
   - `RESEND_API_KEY`
   - `NEXT_PUBLIC_SITE_URL` = `https://benhu.dev`
4. Deploy — Vercel auto-detects Next.js.

### Custom domain (benhu.dev)

In Vercel, **Settings → Domains → Add `benhu.dev`**. Add the DNS records Vercel shows you at your registrar:

- `A` record on `@` pointing to `76.76.21.21`
- `CNAME` record on `www` pointing to `cname.vercel-dns.com`

Vercel will issue a TLS certificate automatically.

---

## Resend setup (required for the contact form)

1. Create an account at [resend.com](https://resend.com).
2. **Domains → Add `benhu.dev`**, then add the DNS records (SPF, DKIM, DMARC) Resend shows you at your registrar. Wait for verification — usually a few minutes.
3. **API Keys → Create API Key** with `sending_access` scope.
4. Save it as `RESEND_API_KEY` in `.env.local` (locally) and in Vercel's environment variables (production).

The "from" address is `Ben Hu Portfolio <noreply@benhu.dev>` — replace in `lib/email.ts` if you're not using `benhu.dev`.

---

## Folder structure

```
benhu.dev/
├── app/
│   ├── api/contact/route.ts        # Contact form endpoint (zod + Resend + rate limit + honeypot)
│   ├── error.tsx                   # Global error boundary
│   ├── globals.css                 # Tokyo Night tokens (Tailwind v4 @theme)
│   ├── layout.tsx                  # Root layout: fonts, metadata, analytics
│   ├── not-found.tsx               # Themed 404 page
│   ├── page.tsx                    # Main one-pager
│   ├── robots.ts                   # SEO
│   └── sitemap.ts                  # SEO
├── components/
│   ├── effects/                    # GridSphere (canvas), PixelAvatar, Typewriter
│   ├── layout/                     # Nav, Footer, StatusBar, FileTab
│   ├── sections/                   # Hero, About, Skills, Projects, Experience, Contact
│   └── ui/                         # Button, Input, Textarea, TagPill
├── hooks/
│   ├── use-active-section.ts       # IntersectionObserver-driven nav highlight
│   └── use-scroll-progress.ts      # 0..1 scroll progress for the status bar line counter
├── lib/
│   ├── data.ts                     # ⭐ All site content lives here
│   ├── email.ts                    # Resend wrapper
│   ├── types.ts                    # Shared types
│   ├── utils.ts                    # cn() helper
│   └── validations.ts              # Zod schemas (also used on the client)
├── public/
│   ├── favicon.svg
│   └── images/                     # Project mockups + OG image
├── tests/                          # Vitest setup + sample test
├── .github/workflows/ci.yml
├── .husky/                         # pre-commit + commit-msg hooks
├── eslint.config.mjs
├── next.config.ts
├── package.json
├── postcss.config.mjs
├── tsconfig.json
└── vitest.config.ts
```

---

## License

All rights reserved. Code and visual design © Ben Hu. Feel free to take ideas — please don't ship a copy.

---

Built with ❤️ by Ben Hu.
