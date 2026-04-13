"use client";
import React from 'react';
import { VideoPage } from "@/components/VideoPage/VideoPage";
import { fetchPostBySlug } from "@/lib/sanity";
import { useSanityQuery } from "@/hooks/useSanity";
import { useParams } from "next/navigation";

export default function WatchPageClient() {
  const params = useParams();
  const slug = params?.slug as string;

  const { data: post, loading } = useSanityQuery(
    () => fetchPostBySlug(slug),
    [slug]
  );

  if (loading) return null;
  if (!post) return <div>Video not found</div>;

  return <VideoPage post={post} />;
}
