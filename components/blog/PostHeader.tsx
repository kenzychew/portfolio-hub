import PostMeta from "./PostMeta";
import type { BlogPostMeta } from "@/lib/blog";

export default function PostHeader({ post }: { post: BlogPostMeta }) {
  return (
    <div className="mb-8">
      <div className="mb-3.5">
        <PostMeta post={post} showProject />
      </div>
      <h1 className="mb-3.5 text-balance font-display text-3xl font-semibold leading-[1.08] tracking-tight text-fg sm:text-[42px]">
        {post.title}
      </h1>
      <p className="max-w-[66ch] text-[17px] leading-relaxed text-fg-muted">
        {post.dek}
      </p>
    </div>
  );
}
