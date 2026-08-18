import { formatPostDate, type BlogPostMeta } from "@/lib/blog";

export default function PostMeta({
  post,
  showProject = false,
}: {
  post: BlogPostMeta;
  showProject?: boolean;
}) {
  const parts = [formatPostDate(post.date), post.readTime];
  if (showProject && post.project) {
    parts.push(`project: ${post.project}`);
  }
  return (
    <p className="font-mono text-[11px] uppercase tracking-wider text-accent-ink">
      {parts.join(" · ")}
    </p>
  );
}
