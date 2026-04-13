"use client";
import React from 'react';
import { PostPage } from "@/components/PostPage/PostPage";
import { fetchPostBySlug } from "@/lib/sanity";
import { useSanityQuery } from "@/hooks/useSanity";
import { useParams } from "next/navigation";

export default function PostPageRoute() {
  const params = useParams();
  const slug = params?.slug as string;

  const { data: post, loading } = useSanityQuery(
    () => fetchPostBySlug(slug),
    [slug]
  );

  if (loading) return null;
  if (!post) return <div>Post not found</div>;

  return <PostPage post={post} />;
}
