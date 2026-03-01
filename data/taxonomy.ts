import { posts } from "./postData";

export const taxonomy = {
  categories: [...new Set(posts.flatMap((post) => post.categories || []))],
  tags: [...new Set(posts.flatMap((post) => post.tags || []))],
};
