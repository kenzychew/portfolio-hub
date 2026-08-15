import { projects } from "@/lib/projects";

type Stat = {
  value: string;
  label: string;
};

const liveProjectCount = projects.filter(
  (project) => project.status === "live",
).length;

const stats: Stat[] = [
  { value: String(liveProjectCount), label: "Live Projects" },
  { value: "AIAP", label: "Certified" },
];

export default function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-[92vh] items-end overflow-hidden"
    >
      {/*
        v1 placeholder photo: no real portrait sourced yet (see
        public/photo/README.md for the swap-in plan). Once
        public/photo/hero-portrait.jpg exists, replace this div with:
          <img src="/photo/hero-portrait.jpg" alt=""
               className="hero-photo absolute inset-0 h-full w-full object-cover" />
        The hero-photo class carries the slow scale drift and already
        respects prefers-reduced-motion.
      */}
      <div
        className="hero-photo hero-photo-placeholder absolute inset-0"
        aria-hidden="true"
      />

      {/* Scrim: keeps the headline legible over the photo. */}
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
          Training a model that works once isn&apos;t the hard part anymore.
          Keeping it working once real users hit it, when the data turns
          messy or the load spikes, is where I actually spend my time:
          serving it, watching what it does in production, catching problems
          before someone else has to point them out. I picked up that habit
          shipping a GenAI image-to-video project under AI Singapore&apos;s
          100E programme, and I&apos;ve kept it up building AI/ML systems on
          my own since.
        </p>
        <dl className="mt-10 flex flex-wrap gap-x-8 gap-y-4">
          {stats.map((stat) => (
            <div key={stat.label}>
              <dt className="font-mono text-xs uppercase tracking-[0.2em] text-bg/60">
                {stat.label}
              </dt>
              <dd className="mt-1 font-display text-xl text-bg sm:text-2xl">
                {stat.value}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
