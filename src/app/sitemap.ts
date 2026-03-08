import type { MetadataRoute } from 'next';
import { posts } from "../../data/postData";
import slugify from "@/utils/slugify";
import type { Post } from "@/types";

export const dynamic = "force-static";

const BASE_URL = "https://skatehousemedia.com";

const videoPosts = posts.filter((p: Post) => p.featuredVideo);

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
  ];

  const videoPages: MetadataRoute.Sitemap = videoPosts.map((post: Post) => ({
    url: `${BASE_URL}/watch/${slugify(post.pageTitle)}`,
    lastModified: new Date(),
    changeFrequency: "yearly" as const,
    priority: 0.6,
  }));

  return [...staticPages, ...videoPages];
}
