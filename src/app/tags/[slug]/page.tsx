import React from 'react';
import { posts } from "../../../../data/postData";
import { taxonomy } from "../../../../data/taxonomy";
import slugify from "@/utils/slugify";
import TagContent from "./TagContent";
import type { Post, Taxonomy } from "@/types";

export async function generateStaticParams() {
  return (taxonomy as Taxonomy).tags.map((tag) => ({
    slug: slugify(tag),
  }));
}

const TagPage = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const awaitedParams = await params;
  const { slug } = awaitedParams;

  const tag = (taxonomy as Taxonomy).tags.find((t) => slugify(t) === slug);

  const filteredPosts = (posts as Post[]).filter((post) =>
    post.tags?.includes(tag as string)
  );

  return <TagContent tag={tag} posts={filteredPosts} />;
};

export default TagPage;
