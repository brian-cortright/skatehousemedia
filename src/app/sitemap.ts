import type { MetadataRoute } from 'next';
import videos from "../../data/videoData";

export const dynamic = "force-static";

const BASE_URL = "https://skatehousemedia.com";

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

  const videoPages: MetadataRoute.Sitemap = videos.map((video: { slug: string }) => ({
    url: `${BASE_URL}/watch/${video.slug}`,
    lastModified: new Date(),
    changeFrequency: "yearly" as const,
    priority: 0.6,
  }));

  return [...staticPages, ...videoPages];
}
