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
      className="mx-auto flex max-w-5xl flex-col items-center gap-12 px-6 pb-16 pt-28 sm:px-10 sm:pb-24 sm:pt-36 lg:flex-row-reverse lg:items-center lg:justify-between lg:gap-16"
    >
      <img
        src="/photo/hero-portrait.jpg"
        alt="Portrait of Kenzy Chew"
        className="h-[220px] w-[220px] shrink-0 rounded-full border border-border object-cover shadow-md sm:h-[300px] sm:w-[300px] lg:h-[340px] lg:w-[340px]"
      />

      <div className="max-w-xl text-center lg:text-left">
        <p className="mb-5 font-mono text-xs uppercase tracking-[0.25em] text-accent">
          Applied ML / AI Engineer
        </p>
        <h1 className="font-display text-4xl font-medium leading-[1.05] tracking-tight text-fg sm:text-6xl">
          I build ML systems that ship, not just notebooks that demo.
        </h1>
        <p className="mt-6 font-body text-base text-fg-muted sm:text-lg">
          Training a model that works once isn&apos;t the hard part anymore.
          Keeping it working once real users hit it, when the data turns
          messy or the load spikes, is where I actually spend my time:
          serving it, watching what it does in production, catching problems
          before someone else has to point them out. I picked up that habit
          shipping a GenAI image-to-video project under AI Singapore&apos;s
          100E programme, and I&apos;ve kept it up building AI/ML systems on
          my own since.
        </p>
        <dl className="mt-10 flex flex-wrap justify-center gap-x-8 gap-y-4 lg:justify-start">
          {stats.map((stat) => (
            <div key={stat.label}>
              <dt className="font-mono text-xs uppercase tracking-[0.2em] text-fg-muted">
                {stat.label}
              </dt>
              <dd className="mt-1 font-display text-xl text-fg sm:text-2xl">
                {stat.value}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
