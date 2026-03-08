import React from 'react';
import { VideoPage } from "@/components/VideoPage/VideoPage";
import { posts } from "../../../../data/postData";
import slugify from "@/utils/slugify";
import type { Post } from "@/types";

const videoPosts = posts.filter((p: Post) => p.featuredVideo);

export async function generateStaticParams() {
  return videoPosts.map((post: Post) => ({ slug: slugify(post.pageTitle) }));
}

const Watch = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const awaitedParams = await params;
  const { slug } = awaitedParams;
  const post = videoPosts.find((item: Post) => slugify(item.pageTitle) === slug);

  return <VideoPage post={post} />;
};

export default Watch;
