export interface Post {
  _id?: string;
  title: string;
  slug: { current: string };
  publishedAt?: string;
  author?: string;
  body?: any[];
  thumbnail?: { url?: string } | null;
  featuredVideo?: { url?: string } | null;
  tags?: string[];
  categories?: string[];
  featuredPost?: boolean | string;
}

export interface Video {
  slug: string;
  src: string;
  thumbnail: string;
  title: string;
}

export interface Taxonomy {
  categories: string[];
  tags: string[];
}
