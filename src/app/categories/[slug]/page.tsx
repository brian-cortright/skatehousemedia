
import { fetchTaxonomy } from "@/lib/sanity";
import slugify from "@/utils/slugify";
import CategoryPageClient from "./CategoryPageClient";

export async function generateStaticParams() {
  const taxonomy = await fetchTaxonomy();
  return taxonomy.categories.filter(Boolean).map((category) => ({
    slug: slugify(category),
  }));
}

const CategoryPage = () => {
  return <CategoryPageClient />;
};

export default CategoryPage;
