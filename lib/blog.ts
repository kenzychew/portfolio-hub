export type BlogPostMeta = {
  slug: string;
  title: string;
  /** ISO date (YYYY-MM-DD); formatted for display with formatPostDate. */
  date: string;
  readTime: string;
  /** Optional related project slug, shown as context in the post meta line. */
  project?: string;
  dek: string;
  summary: string;
  tags: string[];
};

export const posts: BlogPostMeta[] = [
  {
    slug: "gofetch-rag-pipeline",
    title: "What a RAG pipeline actually looks like when you measure it",
    date: "2026-08-17",
    readTime: "9 min read",
    project: "gofetch",
    dek: "I built GoFetch to fuse dense search and BM25 with reciprocal rank fusion, then re-rank with a cross-encoder. There's a knowledge graph wired in as a third signal too, though it's never actually fired in anything I've deployed. Every choice that did ship came from a 24-question benchmark, not a hunch, including one number that sat quietly wrong for months before I caught it.",
    summary:
      "Hybrid search and cross-encoder re-ranking, built without LangChain's retrieval abstractions, plus a knowledge graph that's wired in but has never once fired. The numbers behind every retrieval decision, including one I got wrong for months without noticing.",
    tags: ["RAG", "Retrieval", "GoFetch"],
  },
  {
    slug: "rocketml-serving-pipeline",
    title: "What it takes to make a small model production-shaped",
    date: "2026-08-22",
    readTime: "7 min read",
    project: "rocketml",
    dek: "RocketML wraps a TF-IDF and LogisticRegression sentiment classifier, deliberately small and deliberately unremarkable, in CI, a hand-written Helm chart, and real Prometheus and Grafana monitoring. The model isn't the point: getting any small model from a training script to a monitored, Kubernetes-deployed API is. That includes a README number that sat wrong until someone actually checked it against the live API.",
    summary:
      "A TF-IDF and LogisticRegression classifier wrapped in CI, a hand-written Helm chart, and real Prometheus and Grafana monitoring, built to prove the platform works, not the model. The image dropped from 1.23 GB to 561 MB by cutting MLflow out of the serving runtime, and a stale confidence score in the README sat wrong until a direct check against the live API caught it.",
    tags: ["Kubernetes", "CI/CD", "RocketML"],
  },
];

export function formatPostDate(date: string): string {
  return new Date(`${date}T00:00:00Z`).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  });
}
