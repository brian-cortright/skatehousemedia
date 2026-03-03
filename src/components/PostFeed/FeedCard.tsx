import React from 'react';
import Link from "next/link";
import styles from "./PostFeed.module.css";
import { BodyText, Headline } from "@/components/Typography/Typography";
import slugify from "@/utils/slugify";
import { stripHtmlAndTruncate } from "@/utils/extractors";
import type { Post } from "@/types";
import LinkOutIcon from '../enhancedSvg/svgs/LinkOutIcon';
import formatDate from '@/utils/formatDate';

const FeedCard: React.FC<Post> = ({ pageTitle, postDate, author, bodyText, thumbnail }) => {
  const excerpt = stripHtmlAndTruncate(bodyText, 120);
  const slug = slugify(pageTitle);

  return (
    <Link href={`/post/${slug}`} style={{ textDecoration: 'none' }}>
    <article className={styles.cardWrapper}>
      {thumbnail && (
        <div className={styles.cardImageWrapper}>
          <img className={styles.cardImage} src={thumbnail} alt={pageTitle} loading="lazy" />
          <div className={styles.cardImageOverlay}>
            <LinkOutIcon fill='var(--color-grey-800)' size='medium' />
          </div>
        </div>
      )}
      <div className={styles.cardBody}>
        <Headline as='h3' variant="7">{pageTitle}</Headline>

        {postDate || author ? (
          <div className={styles.cardMeta}>
            {postDate && <BodyText variant="5">{formatDate(postDate)}</BodyText>}
            {author && <BodyText variant="5">by {author}</BodyText>}
          </div>
        ) : null}

        {excerpt && (
          <div className={styles.cardExcerpt}>
            <BodyText variant="5">{excerpt}</BodyText>
          </div>
        )}
      </div>
      {!thumbnail ? (
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
