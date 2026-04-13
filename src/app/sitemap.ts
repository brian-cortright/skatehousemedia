import type { MetadataRoute } from 'next';
import { fetchSitemapData } from "@/lib/sanity";
import slugify from "@/utils/slugify";

export const dynamic = "force-static";

const BASE_URL = "https://skatehousemedia.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const { posts, videoPosts, taxonomy } = await fetchSitemapData();

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/videos`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/shuffle`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/categories`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${BASE_URL}/tags`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${BASE_URL}/privacy-policy`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${BASE_URL}/terms`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${BASE_URL}/contact`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.5,
    },
  ];

  const postPages: MetadataRoute.Sitemap = posts
    .filter((p) => p.bodyWordCount >= 100)
    .map((post) => ({
      url: `${BASE_URL}/post/${post.slug}`,
      lastModified: post.publishedAt ? new Date(post.publishedAt) : new Date(),
      changeFrequency: "yearly" as const,
      priority: 0.7,
    }));

  const videoPages: MetadataRoute.Sitemap = videoPosts.map((post) => ({
    url: `${BASE_URL}/watch/${post.slug}`,
    lastModified: new Date(),
    changeFrequency: "yearly" as const,
    priority: 0.6,
  }));

  const categoryPages: MetadataRoute.Sitemap = taxonomy.categories.filter(Boolean).map((cat: string) => ({
    url: `${BASE_URL}/categories/${slugify(cat)}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.5,
  }));

  const tagPages: MetadataRoute.Sitemap = taxonomy.tags.filter(Boolean).map((tag: string) => ({
    url: `${BASE_URL}/tags/${slugify(tag)}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.4,
  }));

  return [...staticPages, ...postPages, ...videoPages, ...categoryPages, ...tagPages];
}
