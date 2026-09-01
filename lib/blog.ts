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
  {
    slug: "docextract-arithmetic-self-correction",
    title: "What 35 documents got wrong about arithmetic self-correction",
    date: "2026-09-01",
    readTime: "8 min read",
    project: "docextract",
    dek: "I gave DocExtract's Anthropic backend a tool to check its own arithmetic during extraction instead of catching the error after, like the existing hard rule does. On a 35-document slice it looked like a clean win. Reran on the full 361-document split, the same N this project already treats as its honest sample size, and the single-call ranking flipped entirely, the tool's real edge shrank to about a third of what the small sample suggested, and it introduced a new failure mode of its own.",
    summary:
      "A 35-document eval said self-correction was a clear win over plain extraction. At the full 361-document SROIE split, gemini overtook anthropic as the stronger single-call backend, the self-correcting backend's real edge dropped to +2.5 points, and most of its misses turned out to be the tool reconciling an already-correct total into a wrong one.",
    tags: ["Evals", "Sample Size", "DocExtract"],
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
