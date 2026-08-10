import Section from "./Section";

const stack = [
  { name: "Python", category: "Language" },
  { name: "RAG / Hybrid Search", category: "ML Tooling" },
  { name: "FastAPI", category: "Serving" },
  { name: "Next.js / TypeScript", category: "Frontend" },
  { name: "Docker", category: "Packaging" },
  { name: "Railway", category: "Deployment" },
  { name: "Kubernetes / Helm", category: "Orchestration" },
  { name: "MLflow", category: "Experiment Tracking" },
  { name: "Prometheus / Grafana", category: "Observability" },
];

export default function StackGrid() {
  return (
    <Section id="stack" number="02" title="Stack">
      <ul className="grid grid-cols-1 gap-px overflow-hidden rounded-md border border-border bg-border sm:grid-cols-3">
        {stack.map((item) => (
          <li
            key={item.name}
            className="flex flex-col gap-1 bg-bg px-5 py-6 transition-colors hover:bg-bg-raised"
          >
            <span className="font-mono text-[0.7rem] uppercase tracking-widest text-fg-muted">
              {item.category}
            </span>
            <span className="font-display text-lg text-fg">{item.name}</span>
          </li>
        ))}
      </ul>
    </Section>
  );
}
