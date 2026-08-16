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
    slug: "docextract",
    title: "DocExtract",
    blurb:
      "Document field-extraction with rule-based validation, benchmarked against the public ICDAR 2019 SROIE dataset.",
    tags: ["Python", "OCR", "Rule Engine", "ICDAR SROIE"],
    status: "live",
    subdomainUrl: "https://document.kenzychew.com",
  },
  {
    slug: "gofetch",
    title: "GoFetch",
    blurb:
      "RAG built from scratch: hybrid search, cross-encoder re-ranking, a knowledge graph, and streaming answers with inline citations.",
    tags: ["Hybrid Search", "Cross-Encoder", "Knowledge Graph", "Streaming"],
    status: "live",
    subdomainUrl: "https://fetch.kenzychew.com",
  },
  {
    slug: "rocketml",
    title: "RocketML",
    blurb:
      "An NLP model-serving platform with real monitoring: FastAPI, Docker, CI to GHCR, MLflow tracking, Prometheus/Grafana, Helm on Kubernetes.",
    tags: ["FastAPI", "Docker", "MLflow", "Prometheus", "Kubernetes", "Helm"],
    status: "live",
    subdomainUrl: "https://rocket.kenzychew.com",
  },
  {
    slug: "gotparking",
    title: "GotParking",
    blurb:
      "A parking-forecast model for Singapore that has to beat a real baseline before it's allowed to ship.",
    tags: ["Next.js", "TypeScript", "Geospatial"],
    status: "live",
    subdomainUrl: "https://parking.kenzychew.com",
  },
  {
    slug: "cineloops",
    title: "Cineloops",
    blurb:
      "Image-to-video pipeline with SAM2 segmentation and Gemini prompt refinement, gated by a bring-your-own-key Replicate flow so visitors cover their own generation cost.",
    tags: ["Next.js", "FastAPI", "SAM2", "Replicate", "BYOK"],
    status: "live",
    subdomainUrl: "https://cineloops.vercel.app",
  },
];
