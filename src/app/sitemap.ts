import type { MetadataRoute } from 'next';
import { posts } from "../../data/postData";
import { taxonomy } from "../../data/taxonomy";
import slugify from "@/utils/slugify";
import { getWordCount } from "@/utils/getWordCount";
import type { Post } from "@/types";

export const dynamic = "force-static";

const BASE_URL = "https://skatehousemedia.com";

const videoPosts = posts.filter((p: Post) => p.featuredVideo);
const indexablePosts = posts.filter((p: Post) => p.bodyText && getWordCount(p.bodyText) >= 100);

export default function sitemap(): MetadataRoute.Sitemap {
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
  ];

  const postPages: MetadataRoute.Sitemap = indexablePosts.map((post: Post) => ({
    url: `${BASE_URL}/post/${slugify(post.pageTitle)}`,
    lastModified: new Date(),
    changeFrequency: "yearly" as const,
    priority: 0.7,
  }));

  const videoPages: MetadataRoute.Sitemap = videoPosts.map((post: Post) => ({
    url: `${BASE_URL}/watch/${slugify(post.pageTitle)}`,
    lastModified: new Date(),
    changeFrequency: "yearly" as const,
    priority: 0.6,
  }));

  const categoryPages: MetadataRoute.Sitemap = taxonomy.categories.map((cat: string) => ({
    url: `${BASE_URL}/categories/${slugify(cat)}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.5,
  }));

  const tagPages: MetadataRoute.Sitemap = taxonomy.tags.map((tag: string) => ({
    url: `${BASE_URL}/tags/${slugify(tag)}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.4,
  }));

  return [...staticPages, ...postPages, ...videoPages, ...categoryPages, ...tagPages];
}
