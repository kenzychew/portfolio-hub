# Hero footage — swap-in point

No real hero footage is shipped in this v1 (see PR description). The hero
currently renders a CSS/SVG animated placeholder (`.hero-bg` in
`app/globals.css`, used by `components/Hero.tsx`).

To swap in real footage later:

1. Add `hero-loop.mp4` (keep it small — a few seconds, compressed, no audio)
   and `hero-poster.jpg` to this directory.
2. In `components/Hero.tsx`, replace the `.hero-bg` placeholder div with a
   `<video autoPlay muted loop playsInline poster="/video/hero-poster.jpg">`
   element sourcing `/video/hero-loop.mp4`, gated behind a
   `prefers-reduced-motion` client check that renders the poster image alone
   (no mounted `<video>`) when motion is reduced. The scrim and text overlay
   can stay as-is.
