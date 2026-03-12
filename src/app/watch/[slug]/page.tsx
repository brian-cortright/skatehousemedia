import React from 'react';
import type { Metadata } from 'next';
import { VideoPage } from "@/components/VideoPage/VideoPage";
import { posts } from "../../../../data/postData";
import slugify from "@/utils/slugify";
import type { Post } from "@/types";
import { getWordCount, getExcerpt } from '@/utils/getWordCount';

const videoPosts = posts.filter((p: Post) => p.featuredVideo);

export async function generateStaticParams() {
  return videoPosts.map((post: Post) => ({ slug: slugify(post.pageTitle) }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = videoPosts.find((item: Post) => slugify(item.pageTitle) === slug);

  const wordCount = post?.bodyText ? getWordCount(post.bodyText) : 0;
  const shouldNoIndex = wordCount < 100;

  return {
    title: post?.pageTitle ?? 'Video',
    ...(!shouldNoIndex && post?.bodyText && { description: getExcerpt(post.bodyText) }),
    ...(shouldNoIndex && { robots: { index: false, follow: true } }),
    openGraph: {
      title: post?.pageTitle ?? 'Video',
      description: post?.bodyText ? getExcerpt(post.bodyText) : undefined,
      images: [
        {
          url: post?.thumbnail ? post.thumbnail : '/shm-logo.png',
        }
      ]
    }
  };
}

const Watch = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const awaitedParams = await params;
  const { slug } = awaitedParams;
  const post = videoPosts.find((item: Post) => slugify(item.pageTitle) === slug);

  return <VideoPage post={post} />;
};

export default Watch;
