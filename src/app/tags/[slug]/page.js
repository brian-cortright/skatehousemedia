import { posts } from "../../../../data/postData";
import { taxonomy } from "../../../../data/taxonomy";
import slugify from "#/utils/slugify";
import TagContent from "./TagContent";

export async function generateStaticParams() {
  return taxonomy.tags.map((tag) => ({
    slug: slugify(tag),
  }));
}

const TagPage = async ({ params }) => {
  const awaitedParams = await params;
  const { slug } = awaitedParams;

  const tag = taxonomy.tags.find((t) => slugify(t) === slug);

  const filteredPosts = posts.filter((post) =>
    post.tags?.includes(tag)
  );

  return <TagContent tag={tag} posts={filteredPosts} />;
};

export default TagPage;
