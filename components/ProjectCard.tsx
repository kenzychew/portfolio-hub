import type { Project } from "@/lib/projects";

const statusLabel: Record<Project["status"], string> = {
  live: "Live",
  "in-progress": "In progress",
  archived: "Archived",
};

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <a
      href={project.subdomainUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex flex-col justify-between gap-6 border border-border bg-bg p-6 transition-colors hover:border-accent sm:p-8"
    >
      <div>
        <div className="mb-3 flex items-start justify-between gap-4">
          <h3 className="font-display text-xl font-medium text-fg group-hover:text-accent sm:text-2xl">
            {project.title}
          </h3>
          <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-accent/40 bg-accent/10 px-2.5 py-1 font-mono text-[0.65rem] uppercase tracking-widest text-accent-ink">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            {statusLabel[project.status]}
          </span>
        </div>
        <p className="font-body text-sm leading-relaxed text-fg-muted sm:text-base">
          {project.blurb}
        </p>
      </div>
      <ul className="flex flex-wrap gap-2">
        {project.tags.map((tag) => (
          <li
            key={tag}
            className="rounded border border-border px-2 py-1 font-mono text-[0.65rem] uppercase tracking-wider text-fg-muted"
          >
            {tag}
          </li>
        ))}
      </ul>
    </a>
  );
}
