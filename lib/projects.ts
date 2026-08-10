export type ProjectStatus = "live" | "in-progress" | "archived";

export type Project = {
  slug: string;
  title: string;
  blurb: string;
  tags: string[];
  status: ProjectStatus;
  /**
   * Placeholder subdomain until the real domain is live — centralized here
   * so swapping in production URLs later is a one-file edit.
   */
  subdomainUrl: string;
};

export const projects: Project[] = [
  {
    slug: "docfield-extract",
    title: "docfield-extract",
    blurb:
      "Document field-extraction pipeline with rule-based validation, benchmarked on ICDAR 2019 SROIE.",
    tags: ["Python", "OCR", "Rule Engine", "ICDAR SROIE"],
    status: "live",
    subdomainUrl: "https://document.kenzychew.com",
  },
  {
    slug: "gofetch",
    title: "gofetch",
    blurb:
      "RAG pipeline built from scratch — hybrid search, cross-encoder re-ranking, a knowledge graph, and streaming answers with inline citations.",
    tags: ["Hybrid Search", "Cross-Encoder", "Knowledge Graph", "Streaming"],
    status: "live",
    subdomainUrl: "https://rag.kenzychew.com",
  },
  {
    slug: "rocketml",
    title: "RocketML",
    blurb:
      "NLP model launchpad — FastAPI serving, Docker, CI to GHCR, MLflow tracking, Prometheus/Grafana, Helm on Kubernetes.",
    tags: ["FastAPI", "Docker", "MLflow", "Prometheus", "Kubernetes", "Helm"],
    status: "live",
    subdomainUrl: "https://rocket.kenzychew.com",
  },
  {
    slug: "gotparking",
    title: "GotParking",
    blurb: "Singapore parking-availability lookup, updated in near real time.",
    tags: ["Next.js", "TypeScript", "Geospatial"],
    status: "live",
    subdomainUrl: "https://parking.kenzychew.com",
  },
];
