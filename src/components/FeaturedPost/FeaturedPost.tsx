import React from 'react';
import Link from 'next/link';
import type { Post } from '@/types';
import localStyles from './FeaturedPost.module.css';
import { Headline, BodyText } from '../Typography/Typography';
import LinkOutIcon from '../enhancedSvg/svgs/LinkOutIcon';
import formatDate from '@/utils/formatDate';
import { extractExcerpt } from '@/utils/extractors';

interface FeaturedPostProps {
  posts: Post[];
}

const FeaturedPost: React.FC<FeaturedPostProps> = ({ posts }) => {
  // Find featured posts
  // Support both explicit featuredPost = true and string 'true'
  const featuredPosts = posts.filter(p => p.featuredPost === true || p.featuredPost === 'true');
  
  if (featuredPosts.length === 0) {
    return null;
  }

  // Sort by most recent publish date (publishedAt)
  featuredPosts.sort((a, b) => {
    const dateA = new Date(a.publishedAt || 0).getTime();
    const dateB = new Date(b.publishedAt || 0).getTime();
    return dateB - dateA;
  });

  const featured = featuredPosts[0];
  const excerpt = extractExcerpt(featured.body, 250);
  const slug = featured.slug?.current || '';

  return (
    <div className={localStyles.featuredWrapper}>
      <div className={localStyles.headline}>
        <Headline as='h1' variant="5">Featured post</Headline>
      </div>
      <div className={localStyles.cardWrapper}>
        <Link href={`/post/${slug}`}>
          <div className={localStyles.card}>
            {featured.thumbnail?.url && (
              <div className={localStyles.imageContainer}>
                <img src={featured.thumbnail.url} alt={featured.title} className={localStyles.thumbnail} />
                <div className={localStyles.imageOverlay}>
                  <LinkOutIcon fill='var(--color-grey-800)' size='medium' />
                </div>
              </div>
            )}
            <div className={localStyles.cardBody}>
              <Headline as='h3' variant="7">{featured.title}</Headline>
              <div className={localStyles.cardMeta}>
                {featured.publishedAt && <BodyText variant="5">{formatDate(featured.publishedAt)}</BodyText>}
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
