import Nav from "@/components/Nav";
import PostCard from "@/components/blog/PostCard";
import { posts } from "@/lib/blog";

export default function BlogIndexPage() {
  return (
    <>
      <Nav />
      <main className="flex-1 px-6 pb-24 pt-28 sm:px-10 sm:pt-32">
        <div className="mx-auto max-w-3xl">
          <div className="mb-10">
            <p className="mb-3 font-mono text-xs uppercase tracking-[0.25em] text-accent">
              Writing
            </p>
            <h1 className="font-display text-3xl font-semibold tracking-tight text-fg sm:text-4xl">
              Blog
            </h1>
          </div>
          <div className="flex flex-col gap-3">
            {posts.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>
        </div>
      </main>
    </>
  );
}
