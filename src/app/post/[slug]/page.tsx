import React from 'react';
import type { Metadata } from 'next';
import { PostPage } from "@/components/PostPage/PostPage";
import { posts } from "../../../../data/postData";
import slugify from "@/utils/slugify";
import type { Post } from "@/types";
import { getWordCount, getExcerpt } from '@/utils/getWordCount';

export async function generateStaticParams() {
  return posts.map((post: Post) => ({ slug: slugify(post.pageTitle) }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = posts.find((item: Post) => slugify(item.pageTitle) === slug);

  const wordCount = post?.bodyText ? getWordCount(post.bodyText) : 0;
  const shouldNoIndex = wordCount < 100;

  return {
    title: post?.pageTitle ?? 'Post',
    ...(!shouldNoIndex && post?.bodyText && { description: getExcerpt(post.bodyText) }),
    ...(shouldNoIndex && { robots: { index: false, follow: true } }),
    openGraph: {
      title: post?.pageTitle ?? 'Post',
      description: post?.bodyText ? getExcerpt(post.bodyText) : undefined,
      images: [
        {
          url: post?.thumbnail ? post.thumbnail : '/shm-logo.png',
        }
      ]
    }
  };
}

const PostPageRoute = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const awaitedParams = await params;
  const { slug } = awaitedParams;
  const post = posts.find((item: Post) => slugify(item.pageTitle) === slug);

  return <PostPage post={post} />;
};

export default PostPageRoute;
