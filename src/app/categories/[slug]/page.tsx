import React from 'react';
import type { Metadata } from 'next';
import { posts } from "../../../../data/postData";
import { taxonomy } from "../../../../data/taxonomy";
import slugify from "@/utils/slugify";
import CategoryContent from "./CategoryContent";
import type { Post, Taxonomy } from "@/types";

export async function generateStaticParams() {
  return (taxonomy as Taxonomy).categories.map((category) => ({
    slug: slugify(category),
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const category = (taxonomy as Taxonomy).categories.find((cat) => slugify(cat) === slug);
  const postCount = category
    ? (posts as Post[]).filter((p) => p.categories?.includes(category)).length
    : 0;

  return {
    title: category ? `${category} — SkateHouseMedia` : 'Category — SkateHouseMedia',
    description: category
      ? `Browse ${postCount} posts in the ${category} category on SkateHouseMedia.`
      : 'Browse posts by category on SkateHouseMedia.',
  };
}

const CategoryPage = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const awaitedParams = await params;
  const { slug } = awaitedParams;

  const category = (taxonomy as Taxonomy).categories.find(
    (cat) => slugify(cat) === slug
  );

  const filteredPosts = (posts as Post[]).filter((post) =>
    post.categories?.includes(category as string)
  );

  return <CategoryContent category={category} posts={filteredPosts} />;
};

export default CategoryPage;
