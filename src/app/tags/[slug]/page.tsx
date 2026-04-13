
import { fetchTaxonomy } from "@/lib/sanity";
import slugify from "@/utils/slugify";
import TagPageClient from "./TagPageClient";

export async function generateStaticParams() {
  const taxonomy = await fetchTaxonomy();
  return taxonomy.tags.filter(Boolean).map((tag) => ({
    slug: slugify(tag),
  }));
}

const TagPage = () => {
  return <TagPageClient />;
};

export default TagPage;
