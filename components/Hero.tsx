export default function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-[92vh] items-end overflow-hidden"
    >
      {/*
        v1 placeholder background: no real hero footage sourced yet (see PR
        description for the swap-in plan). Once public/video/hero-loop.mp4 +
        hero-poster.jpg exist, replace this div with:
          <video autoPlay muted loop playsInline poster="/video/hero-poster.jpg"
                 className="absolute inset-0 h-full w-full object-cover">
            <source src="/video/hero-loop.mp4" type="video/mp4" />
          </video>
        gated behind a prefers-reduced-motion check that renders the poster
        image alone when motion is reduced.
      */}
      <div className="hero-bg absolute inset-0" aria-hidden="true">
        <div className="hero-blob-a absolute -left-1/4 top-0 h-[70vh] w-[70vh] rounded-full bg-accent/30 blur-[120px]" />
        <div className="hero-blob-b absolute -right-1/4 bottom-0 h-[60vh] w-[60vh] rounded-full bg-[#8a6a4a]/30 blur-[120px]" />
        <div className="hero-grain absolute inset-0 opacity-[0.06] mix-blend-overlay" />
      </div>

      {/* Scrim: keeps the headline legible over the animated backdrop. */}
      <div
        className="absolute inset-0 bg-gradient-to-t from-[#161210] via-[#161210]/55 to-[#161210]/10"
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto w-full max-w-5xl px-6 pb-16 pt-40 sm:px-10 sm:pb-24">
        <p className="mb-5 font-mono text-xs uppercase tracking-[0.25em] text-accent">
          Applied ML / AI Engineer
        </p>
        <h1 className="max-w-3xl font-display text-4xl font-medium leading-[1.05] tracking-tight text-bg sm:text-6xl">
          I build ML systems that ship, not just notebooks that demo.
        </h1>
        <p className="mt-6 max-w-xl font-body text-base text-bg/70 sm:text-lg">
          Document extraction, retrieval-augmented generation, and the
          serving infrastructure that keeps applied AI running in production.
        </p>
      </div>
    </section>
  );
}
