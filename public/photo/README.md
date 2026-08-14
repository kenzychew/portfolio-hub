# Hero photo — swap-in point

No real portrait is shipped in this v1 (see PR description). The hero
currently renders a CSS gradient placeholder (`.hero-photo-placeholder` in
`app/globals.css`, used by `components/Hero.tsx`), color-graded to the
existing palette tokens (`--color-accent`, `--color-bg-raised`).

To swap in the real photo later:

1. Add `hero-portrait.jpg` (large-format, professionally shot, optimized
   for web — a few hundred KB, not multiple MB) to this directory.
2. In `components/Hero.tsx`, replace the `.hero-photo-placeholder` div with:
     <img src="/photo/hero-portrait.jpg" alt=""
          className="hero-photo absolute inset-0 h-full w-full object-cover" />
   Keep the `hero-photo` class on the new element — it carries the slow
   scale drift and already respects `prefers-reduced-motion` (see the
   `@media (prefers-reduced-motion: reduce)` block in `app/globals.css`).
   The scrim and text overlay can stay as-is.
