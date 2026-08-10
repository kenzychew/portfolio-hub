import Section from "./Section";

type Role = {
  period: string;
  title: string;
  org: string;
  summary: string;
};

const roles: Role[] = [
  {
    period: "2024 — Present",
    title: "Applied ML / AI Engineer",
    org: "Placeholder — Company Name",
    summary:
      "Placeholder summary. Real role details, dates, and impact metrics go here.",
  },
  {
    period: "2022 — 2024",
    title: "Placeholder Role",
    org: "Placeholder — Company Name",
    summary:
      "Placeholder summary. Structure of this timeline is final; copy is not.",
  },
  {
    period: "2020 — 2022",
    title: "Placeholder Role",
    org: "Placeholder — Company Name",
    summary: "Placeholder summary for an earlier role or project.",
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
