import Section from "./Section";

type Role = {
  period: string;
  title: string;
  org: string;
  summary: string;
};

const roles: Role[] = [
  {
    period: "Sep 2025 — Mar 2026",
    title: "Associate AI Engineer",
    org: "AI Singapore (AIAP)",
    summary:
      "Delivered a GenAI video generation platform for a global FMCG company as part of a cohort, placing top 6 of 17 projects. Built a custom pipeline on Azure A100 infrastructure, with ComfyUI nodes for image decomposition, multi-provider video generation, and per-job workflow selection, then containerized 5 services across a 4-node GPU cluster with CI/CD. Established human ground truth for the evaluation suite by coordinating batch experiments and annotating 380 videos, benchmarked against VBench and VQA metrics.",
  },
  {
    period: "Jun 2011 — Apr 2024",
    title: "Private Tutor",
    org: "Self-Employed",
    summary:
      "Delivered personalized one-on-one Mathematics instruction, continuously adapting teaching strategy to individual student needs, and developed the ability to break complex concepts into clear explanations for diverse audiences.",
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
