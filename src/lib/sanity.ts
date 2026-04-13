import { createClient } from "@sanity/client";

export const sanityClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: "2024-01-01",
  useCdn: true,
});

// ── Paginated posts (newest first) ──────────────────────────────────
export async function fetchPosts(page = 0, pageSize = 20) {
  const start = page * pageSize;
  const end = start + pageSize;
  return sanityClient.fetch<any[]>(
    `*[_type == "post"] | order(publishedAt desc) [$start...$end] {
      _id, title, slug, publishedAt, author, tags, categories,
      thumbnail, featuredVideo, featuredPost
    }`,
    { start, end }
  );
}

// ── Total post count (for pagination) ───────────────────────────────
export async function fetchPostCount() {
  return sanityClient.fetch<number>(`count(*[_type == "post"])`);
}

// ── Single post by slug ─────────────────────────────────────────────
export async function fetchPostBySlug(slug: string) {
  return sanityClient.fetch<any>(
    `*[_type == "post" && slug.current == $slug][0]`,
    { slug }
  );
}

// ── All post slugs (for generateStaticParams) ───────────────────────
export async function fetchAllPostSlugs() {
  return sanityClient.fetch<{ slug: string }[]>(
    `*[_type == "post"]{ "slug": slug.current }`
  );
}

// ── Video posts ─────────────────────────────────────────────────────
export async function fetchVideoPosts() {
  return sanityClient.fetch<any[]>(
    `*[_type == "post" && defined(featuredVideo)] | order(publishedAt desc) {
      _id, title, slug, publishedAt, author, tags, categories,
      thumbnail, featuredVideo, featuredPost
    }`
  );
}

// ── Video post slugs (for generateStaticParams) ─────────────────────
export async function fetchVideoPostSlugs() {
  return sanityClient.fetch<{ slug: string }[]>(
    `*[_type == "post" && defined(featuredVideo)]{ "slug": slug.current }`
  );
}

// ── Taxonomy (all posts) ────────────────────────────────────────────
export async function fetchTaxonomy() {
  return sanityClient.fetch<{ categories: string[]; tags: string[] }>(
    `{
      "categories": array::unique(*[_type == "post"].categories[]),
      "tags": array::unique(*[_type == "post"].tags[])
    }`
  );
}

// ── Taxonomy (video posts only) ─────────────────────────────────────
export async function fetchVideoTaxonomy() {
  return sanityClient.fetch<{ categories: string[]; tags: string[] }>(
    `{
      "categories": array::unique(*[_type == "post" && defined(featuredVideo)].categories[]),
      "tags": array::unique(*[_type == "post" && defined(featuredVideo)].tags[])
    }`
  );
}

// ── Posts by category ───────────────────────────────────────────────
export async function fetchPostsByCategory(category: string) {
  return sanityClient.fetch<any[]>(
    `*[_type == "post" && $category in categories] | order(publishedAt desc) {
      _id, title, slug, publishedAt, author, tags, categories,
      thumbnail, featuredVideo, featuredPost
    }`,
    { category }
  );
}

// ── Posts by tag ────────────────────────────────────────────────────
export async function fetchPostsByTag(tag: string) {
  return sanityClient.fetch<any[]>(
    `*[_type == "post" && $postTag in tags] | order(publishedAt desc) {
      _id, title, slug, publishedAt, author, tags, categories,
      thumbnail, featuredVideo, featuredPost
    }`,
    { postTag: tag }
  );
}

// ── Sitemap helpers ─────────────────────────────────────────────────
export async function fetchSitemapData() {
  const [posts, videoPosts, taxonomy] = await Promise.all([
    sanityClient.fetch<{ slug: string; publishedAt: string; bodyWordCount: number }[]>(
      `*[_type == "post"]{
        "slug": slug.current,
        publishedAt,
        "bodyWordCount": length(pt::text(body))
      }`
    ),
    sanityClient.fetch<{ slug: string }[]>(
      `*[_type == "post" && defined(featuredVideo)]{ "slug": slug.current }`
    ),
    fetchTaxonomy(),
  ]);
  return { posts, videoPosts, taxonomy };
}

// ── Events ──────────────────────────────────────────────────────────
export async function fetchEvents() {
  return sanityClient.fetch<any[]>(
    `*[_type == "event"] | order(date asc) {
      _id, title, date, endDate, region, country, featuredImage, registrationLink, websiteLink
    }`
  );
}
