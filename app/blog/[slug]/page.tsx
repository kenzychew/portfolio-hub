import { notFound } from "next/navigation";
import type { ComponentType } from "react";
import Nav from "@/components/Nav";
import PostHeader from "@/components/blog/PostHeader";
import { posts } from "@/lib/blog";
import GoFetchPost from "@/app/blog/posts/gofetch";
import RocketMLPost from "@/app/blog/posts/rocketml";

const postBodies: Record<string, ComponentType> = {
  "gofetch-rag-pipeline": GoFetchPost,
  "rocketml-serving-pipeline": RocketMLPost,
};

export function generateStaticParams() {
  return posts.map((post) => ({ slug: post.slug }));
}

export default async function BlogPostPage({
  params,
}: PageProps<"/blog/[slug]">) {
  const { slug } = await params;
  const post = posts.find((p) => p.slug === slug);
  const PostBody = postBodies[slug];

  if (!post || !PostBody) {
    notFound();
  }

  return (
    <>
      <Nav />
      <main className="flex-1 px-6 pb-24 pt-28 sm:px-10 sm:pt-32">
        <article className="mx-auto max-w-3xl">
          <PostHeader post={post} />
          <PostBody />
        </article>
      </main>
    </>
  );
}
