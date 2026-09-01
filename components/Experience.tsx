import Section from "./Section";

type Role = {
  period: string;
  title: string;
  org: string;
  summary: string;
};

const roles: Role[] = [
  {
    period: "Mar 2026 — Present",
    title: "AI Engineer",
    org: "Independent Projects",
    summary:
      "Building and maintaining 5 AI/ML systems in production, covering document extraction, forecasting, retrieval, video generation, and model serving — the projects on this site.",
  },
  {
    period: "Sep 2025 — Mar 2026",
    title: "Associate AI Engineer",
    org: "AI Singapore (AIAP)",
    summary:
      "Delivered a GenAI video generation platform for a global FMCG company as part of AISG's 100E programme, placing in the top third of projects. Built a custom video generation workflow on Azure A100 GPUs — ComfyUI nodes for image decomposition, multi-provider video generation behind one interface, per-job workflow selection threaded through the database, API, and routing layers — then containerized 5 services across a 4-node GPU cluster with CI/CD. Established human ground truth for the evaluation suite by coordinating batch experiments and annotating 380 videos, benchmarked against VBench and VQA metrics.",
  },
  {
    period: "Jun 2011 — Apr 2024",
    title: "Private Tutor",
    org: "Self-Employed",
    summary:
      "Taught Mathematics one-on-one for 13 years. Every student needed a different way into the same idea, good practice for making complex things click.",
  },
];

export default function Experience() {
  return (
    <Section id="experience" number="04" title="Experience">
      <ol className="flex flex-col">
        {roles.map((role) => (
          <li
            key={`${role.period}-${role.title}`}
            className="grid grid-cols-1 gap-2 border-t border-border py-6 first:border-t-0 sm:grid-cols-[10rem_1fr] sm:gap-8 sm:py-8"
          >
            <span className="font-mono text-xs uppercase tracking-widest text-fg-muted">
              {role.period}
            </span>
            <div>
              <h3 className="font-display text-lg text-fg sm:text-xl">
                {role.title}{" "}
                <span className="text-fg-muted">— {role.org}</span>
              </h3>
              <p className="mt-2 max-w-2xl font-body text-sm text-fg-muted sm:text-base">
                {role.summary}
              </p>
            </div>
          </li>
        ))}
      </ol>
    </Section>
  );
}
