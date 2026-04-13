import React from 'react';
import Link from "next/link";
import styles from "./PostFeed.module.css";
import { BodyText, Headline } from "@/components/Typography/Typography";
import { getExcerpt } from "@/utils/getWordCount";
import type { Post } from "@/types";
import LinkOutIcon from '../enhancedSvg/svgs/LinkOutIcon';
import formatDate from '@/utils/formatDate';

const FeedCard: React.FC<Post> = ({ title, publishedAt, author, body, thumbnail, slug }) => {
  const excerpt = getExcerpt(body, 120);
  const postSlug = slug?.current || '';

  return (
    <Link href={`/post/${postSlug}`} style={{ textDecoration: 'none' }}>
    <article className={styles.cardWrapper}>
      {thumbnail?.url && (
        <div className={styles.cardImageWrapper}>
          <img className={styles.cardImage} src={thumbnail.url} alt={title} loading="lazy" />
          <div className={styles.cardImageOverlay}>
            <LinkOutIcon fill='var(--color-grey-800)' size='medium' />
          </div>
        </div>
      )}
      <div className={styles.cardBody}>
        <Headline as='h3' variant="7">{title}</Headline>

        {publishedAt || author ? (
          <div className={styles.cardMeta}>
            {publishedAt && <BodyText variant="5">{formatDate(publishedAt)}</BodyText>}
            {author && <BodyText variant="5">by {author}</BodyText>}
          </div>
        ) : null}

        {excerpt && (
          <div className={styles.cardExcerpt}>
            <BodyText variant="5">{excerpt}</BodyText>
          </div>
        )}
      </div>
      {!thumbnail?.url ? (
        <BodyText className={styles.readMore} variant="5">
          Read More
          <LinkOutIcon fill='var(--color-grey-800)' size='small' />
        </BodyText>
      ) : null}
    </article>
    </Link>
  );
};

export default FeedCard;
