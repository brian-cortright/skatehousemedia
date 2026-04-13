
import { fetchVideoPostSlugs } from "@/lib/sanity";
import WatchPageClient from "./WatchPageClient";

export async function generateStaticParams() {
  const slugs = await fetchVideoPostSlugs();
  return slugs.map((s) => ({ slug: s.slug }));
}

const WatchPageRoute = () => {
  return <WatchPageClient />;
};

export default WatchPageRoute;
