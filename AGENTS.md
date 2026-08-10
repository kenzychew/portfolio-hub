<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# portfolio-hub

Single-page Next.js (App Router) + TypeScript portfolio site. Structure and
visual identity decisions are fixed by the v1 launch brief — see git history
on the `fm/portfolio-hub-scaffold` branch / its PR description for the full
rationale; the summary below is what changes rarely and isn't obvious from
the code alone.

- Sections are numbered 01–05 (How I build, Stack, Projects, Experience,
  Contact) via `components/Section.tsx`; Hero is the unnumbered masthead.
  Keep new top-level sections consistent with that numbering scheme.
- Fonts (Fraunces / Public Sans / JetBrains Mono) are wired in
  `app/layout.tsx` via `next/font/google` and exposed as CSS vars consumed
  in `app/globals.css`'s `@theme inline` block. Do not add Inter or another
  generic sans — that's an explicit constraint from the design brief.
- Palette tokens (bg / fg / accent / border) live in `app/globals.css`
  `:root`. `--color-accent` (#b8451f) is used sparingly by design; use
  `--color-accent-ink` instead of `--color-accent` for small/thin text on
  tinted backgrounds — the base accent fails WCAG contrast at small sizes
  (see the "Live" status pill in `components/ProjectCard.tsx`).
- Project data is centralized in `lib/projects.ts` (typed `Project[]`,
  including a `subdomainUrl` placeholder per project). Swapping in real
  domains later is a one-file edit there.
- The Hero background is a CSS/SVG placeholder (`.hero-bg` /
  `.hero-grain` / `.hero-blob-*` in `app/globals.css`, rendered by
  `components/Hero.tsx`) — no real video was sourced for v1. See
  `public/video/README.md` for the exact swap-in steps when real footage
  is ready.
- `prefers-reduced-motion` is handled globally in `app/globals.css` (freezes
  CSS animations, including the hero drift) rather than per-component.
- Deployed as a static export (`output: "export"` in `next.config.ts`) to
  GitHub Pages via `.github/workflows/deploy-pages.yml`, triggered on push
  to `main`. `public/CNAME` pins the custom domain — GitHub Pages copies it
  verbatim from `public/` into `out/`. No API routes or `next/image` usage,
  so nothing in this app is currently incompatible with static export.
- If `npm ci` fails in CI with `Missing: <pkg> from lock file` for optional
  platform packages (e.g. `@emnapi/*`, other napi-rs/wasm32-wasi shims
  pulled in transitively by Tailwind v4's `lightningcss`), don't hand-edit
  `package-lock.json` — a partial edit tends to leave other optional-dep
  entries mis-hoisted and CI fails again on the next package. Delete both
  `node_modules/` and `package-lock.json`, run a clean `npm install`, then
  verify with `npm ci` before committing the regenerated lockfile.

## Maintaining this file

Keep this file for knowledge useful to almost every future agent session in this project.
Do not repeat what the codebase already shows; point to the authoritative file or command instead.
Prefer rewriting or pruning existing entries over appending new ones.
When updating this file, preserve this bar for all agents and keep entries concise.
