"use client";
import React from 'react';
import { fetchTaxonomy, fetchPostsByTag } from "@/lib/sanity";
import { useSanityQuery } from "@/hooks/useSanity";
import { useParams } from "next/navigation";
import slugify from "@/utils/slugify";
import TagContent from "./TagContent";

export default function TagPageClient() {
  const params = useParams();
  const slug = params?.slug as string;

  // Resolve slug → tag name, then fetch posts
  const { data, loading } = useSanityQuery(async () => {
    const taxonomy = await fetchTaxonomy();
    const tag = taxonomy.tags.find((t) => slugify(t) === slug);
    if (!tag) return { tag: slug, posts: [] };
    const posts = await fetchPostsByTag(tag);
    return { tag, posts };
  }, [slug]);

  if (loading) return null;

  return <TagContent tag={data?.tag} posts={data?.posts || []} />;
}
