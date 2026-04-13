"use client";
import React from 'react';
import { fetchTaxonomy, fetchPostsByCategory } from "@/lib/sanity";
import { useSanityQuery } from "@/hooks/useSanity";
import { useParams } from "next/navigation";
import slugify from "@/utils/slugify";
import CategoryContent from "./CategoryContent";

export default function CategoryPageClient() {
  const params = useParams();
  const slug = params?.slug as string;

  // Resolve slug → category name, then fetch posts
  const { data, loading } = useSanityQuery(async () => {
    const taxonomy = await fetchTaxonomy();
    const category = taxonomy.categories.find((cat) => slugify(cat) === slug);
    if (!category) return { category: slug, posts: [] };
    const posts = await fetchPostsByCategory(category);
    return { category, posts };
  }, [slug]);

  if (loading) return null;

  return <CategoryContent category={data?.category} posts={data?.posts || []} />;
}
