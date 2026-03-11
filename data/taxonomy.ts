import { posts } from "./postData";

const videoPosts = posts.filter((post) => post.featuredVideo);

export const taxonomy = {
  categories: [...new Set(posts.flatMap((post) => post.categories || []))],
  tags: [...new Set(posts.flatMap((post) => post.tags || []))],
};

export const featuredVideosTaxonomy = {
  categories: [...new Set(videoPosts.flatMap((post) => post.categories || []))],
  tags: [...new Set(videoPosts.flatMap((post) => post.tags || []))],
};
