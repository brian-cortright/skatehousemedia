import { posts } from "../../../../data/postData";
import { taxonomy } from "../../../../data/taxonomy";
import slugify from "#/utils/slugify";
import CategoryContent from "./CategoryContent";

export async function generateStaticParams() {
  return taxonomy.categories.map((category) => ({
    slug: slugify(category),
  }));
}

const CategoryPage = async ({ params }) => {
  const awaitedParams = await params;
  const { slug } = awaitedParams;

  const category = taxonomy.categories.find(
    (cat) => slugify(cat) === slug
  );

  const filteredPosts = posts.filter((post) =>
    post.categories?.includes(category)
  );

  return <CategoryContent category={category} posts={filteredPosts} />;
};

export default CategoryPage;
