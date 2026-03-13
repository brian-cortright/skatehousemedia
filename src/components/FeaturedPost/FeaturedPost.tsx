import React from 'react';
import Link from 'next/link';
import type { Post } from '@/types';
import localStyles from './FeaturedPost.module.css';
import { Headline, Subhead, BodyText } from '../Typography/Typography';
import LinkOutIcon from '../enhancedSvg/svgs/LinkOutIcon';
import slugify from '@/utils/slugify';
import formatDate from '@/utils/formatDate';

interface FeaturedPostProps {
  posts: Post[];
}

const stripHtml = (html: string): string => html?.replace(/<[^>]*>/g, "").replace(/&[^;]+;/g, " ") || "";

const truncate = (text: string, maxLength: number = 250): string => {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trimEnd() + "…";
};

const FeaturedPost: React.FC<FeaturedPostProps> = ({ posts }) => {
  // Find featured posts
  // Support both explicit featuredPost = true and string 'true'
  const featuredPosts = posts.filter(p => p.featuredPost === true || p.featuredPost === 'true');
  
  if (featuredPosts.length === 0) {
    return null;
  }

  // Sort by most recent publish date (postDate)
  featuredPosts.sort((a, b) => {
    const dateA = new Date(a.postDate || 0).getTime();
    const dateB = new Date(b.postDate || 0).getTime();
    return dateB - dateA;
  });

  const featured = featuredPosts[0];
  const excerpt = truncate(stripHtml(featured.bodyText));
  const slug = slugify(featured.pageTitle);

  return (
    <div className={localStyles.featuredWrapper}>
      <div className={localStyles.headline}>
        <Headline as='h1' variant="5">Featured post</Headline>
      </div>
      <div className={localStyles.cardWrapper}>
        <Link href={`/post/${slug}`}>
          <div className={localStyles.card}>
            {featured.thumbnail && (
              <div className={localStyles.imageContainer}>
                <img src={featured.thumbnail} alt={featured.pageTitle} className={localStyles.thumbnail} />
                <div className={localStyles.imageOverlay}>
                  <LinkOutIcon fill='var(--color-grey-800)' size='medium' />
                </div>
              </div>
            )}
            <div className={localStyles.cardBody}>
              <Headline as='h3' variant="7">{featured.pageTitle}</Headline>
              <div className={localStyles.cardMeta}>
                {featured.postDate && <BodyText variant="5">{formatDate(featured.postDate)}</BodyText>}
                {featured.author && <BodyText variant="5">{featured.author}</BodyText>}
              </div>
              {excerpt && (
                <div className={localStyles.cardExcerpt}>
                  <BodyText variant="5">{excerpt}</BodyText>
                </div>
              )}
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default FeaturedPost;
