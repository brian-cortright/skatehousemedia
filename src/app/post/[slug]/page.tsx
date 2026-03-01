import React from 'react';
import { PostPage } from "@/components/PostPage/PostPage";
import { posts } from "../../../../data/postData";
import slugify from "@/utils/slugify";

export async function generateStaticParams() {
  return posts.map((post: { pageTitle: string }) => ({ slug: slugify(post.pageTitle) }));
}

const PostPageRoute = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const awaitedParams = await params;
  const { slug } = awaitedParams;
  const post = posts.find((item: { pageTitle: string }) => slugify(item.pageTitle) === slug);

  return <PostPage post={post} />;
};

export default PostPageRoute;
