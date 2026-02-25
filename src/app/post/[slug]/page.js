import { PostPage } from "#/components/PostPage/PostPage";
import { posts } from "../../../../data/postData";
import slugify from "#/utils/slugify";

export async function generateStaticParams() {
  return posts.map((post) => ({ slug: slugify(post.pageTitle) }));
}

const Watch = async ({ params }) => {
  const awaitedParams = await params;
  const { slug } = awaitedParams;
  const post = posts.find((item) => slugify(item.pageTitle) === slug);

  return <PostPage post={post} />;
};

export default Watch;
