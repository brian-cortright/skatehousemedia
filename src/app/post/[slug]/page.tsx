
import { fetchAllPostSlugs } from "@/lib/sanity";
import PostPageClient from "./PostPageClient";


export async function generateStaticParams() {
  const slugs = await fetchAllPostSlugs();
  return slugs.map((s) => ({ slug: s.slug }));
}

const PostPageRoute = () => {
  return <PostPageClient />;
};

export default PostPageRoute;
