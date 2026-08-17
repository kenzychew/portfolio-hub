import Link from "next/link";
import PostMeta from "./PostMeta";
import type { BlogPostMeta } from "@/lib/blog";

export default function PostCard({ post }: { post: BlogPostMeta }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group block rounded-lg border border-border bg-bg p-5 transition-colors hover:border-accent sm:p-6"
    >
      <div className="mb-2">
        <PostMeta post={post} />
      </div>
      <h3 className="mb-2 font-display text-xl font-semibold text-fg group-hover:text-accent sm:text-2xl">
        {post.title}
      </h3>
      <p className="max-w-[62ch] text-sm text-fg-muted sm:text-[14.5px]">
        {post.summary}
      </p>
      <ul className="mt-3 flex flex-wrap gap-1.5">
        {post.tags.map((tag) => (
          <li
            key={tag}
            className="rounded-full border border-border px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-wide text-fg-muted"
          >
            {tag}
          </li>
        ))}
      </ul>
    </Link>
  );
}
