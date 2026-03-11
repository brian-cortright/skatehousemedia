import React from 'react';
import type { Metadata } from 'next';
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

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const tag = (taxonomy as Taxonomy).tags.find((t) => slugify(t) === slug);
  const postCount = tag
    ? (posts as Post[]).filter((p) => p.tags?.includes(tag)).length
    : 0;

  return {
    title: tag ? `${tag} — SkateHouseMedia` : 'Tag — SkateHouseMedia',
    description: tag
      ? `Browse ${postCount} posts tagged with ${tag} on SkateHouseMedia.`
      : 'Browse posts by tag on SkateHouseMedia.',
  };
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
