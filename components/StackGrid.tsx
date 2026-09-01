import Section from "./Section";

const stack = [
  { category: "Languages", items: ["Python", "TypeScript", "JavaScript"] },
  {
    category: "AI/ML",
    items: [
      "PyTorch",
      "Hugging Face",
      "ComfyUI",
      "LightGBM",
      "Docling",
      "YOLOv8",
      "MediaPipe",
      "SAM2",
      "OpenCV",
      "scikit-learn",
    ],
  },
  {
    category: "LLM & APIs",
    items: [
      "Replicate",
      "LiteLLM",
      "OpenAI",
      "Gemini",
      "Langfuse",
      "vLLM",
      "RAG",
      "BM25",
    ],
  },
  {
    category: "Frontend",
    items: [
      "React",
      "Next.js",
      "Tailwind",
      "Shadcn",
      "MaterialUI",
      "Vite",
      "Streamlit",
      "Gradio",
    ],
  },
  {
    category: "Backend",
    items: [
      "FastAPI",
      "Node.js",
      "Express",
      "REST APIs",
      "Pydantic",
      "SQLAlchemy",
    ],
  },
  {
    category: "Databases",
    items: ["PostgreSQL", "pgvector", "Supabase", "SQLite", "MongoDB"],
  },
  {
    category: "Infrastructure & Tools",
    items: [
      "Docker",
      "MLflow",
      "Hydra",
      "Optuna",
      "GitLab CI/CD",
      "GitHub Pages/Actions",
      "Kubernetes",
      "Helm",
      "Prometheus",
      "Grafana",
      "Railway",
      "Microsoft Azure",
      "Google Cloud Platform",
      "Cloudflare",
    ],
  },
];

export default function StackGrid() {
  return (
    <Section id="stack" number="02" title="Stack">
      <ul className="grid grid-cols-1 gap-px overflow-hidden rounded-md border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
        {stack.map((group) => (
          <li
            key={group.category}
            className="flex flex-col gap-2 bg-bg px-5 py-6 transition-colors hover:bg-bg-raised"
          >
            <span className="font-mono text-[0.7rem] uppercase tracking-widest text-fg-muted">
              {group.category}
            </span>
            <span className="font-body text-sm leading-relaxed text-fg sm:text-base">
              {group.items.join(" · ")}
            </span>
          </li>
        ))}
      </ul>
    </Section>
  );
}
