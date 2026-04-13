import React from 'react';
import Link from "next/link";
import styles from "./PostCard.module.css";
import { Subhead, BodyText } from "../Typography/Typography";
import formatDate from "@/utils/formatDate";
import { extractExcerpt } from "@/utils/extractors";

interface PostCardProps {
  title: string;
  slug: { current: string };
  publishedAt?: string;
  author?: string;
  body?: any[];
}

const PostCard: React.FC<PostCardProps> = ({ title, slug, publishedAt, author, body }) => {
  const excerpt = extractExcerpt(body, 120);

  return (
    <div className={styles.cardWrapper}>
      <Link href={`/post/${slug?.current || ''}`}>
        <div className={styles.card}>
          <div className={styles.cardBody}>
            <Subhead variant="3">{title}</Subhead>
            <div className={styles.cardMeta}>
              {publishedAt && <BodyText variant="5" color="#999">{formatDate(publishedAt)}</BodyText>}
              {author && <BodyText variant="5" color="#999">{author}</BodyText>}
            </div>
            {excerpt && (
              <div className={styles.cardExcerpt}>
                <BodyText variant="5">{excerpt}</BodyText>
              </div>
            )}
          </div>
        </div>
      </Link>
    </div>
  );
};

export default PostCard;
