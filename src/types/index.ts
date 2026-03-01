export interface Post {
  pageTitle: string;
  postDate?: string;
  author?: string;
  bodyText: string;
  thumbnail?: string | null;
  tags?: string[];
  categories?: string[];
  ranking?: number;
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
