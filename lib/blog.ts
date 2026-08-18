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
];

export function formatPostDate(date: string): string {
  return new Date(`${date}T00:00:00Z`).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  });
}
