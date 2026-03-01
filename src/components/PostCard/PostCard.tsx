import React from 'react';
import Link from "next/link";
import styles from "./PostCard.module.css";
import { Subhead, BodyText } from "../Typography/Typography";
import slugify from "@/utils/slugify";

interface PostCardProps {
  pageTitle: string;
  postDate?: string;
  author?: string;
  bodyText: string;
}

const stripHtml = (html: string): string => html?.replace(/<[^>]*>/g, "").replace(/&[^;]+;/g, " ") || "";

const truncate = (text: string, maxLength: number = 120): string => {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trimEnd() + "…";
};

const PostCard: React.FC<PostCardProps> = ({ pageTitle, postDate, author, bodyText }) => {
  const excerpt = truncate(stripHtml(bodyText));
  const slug = slugify(pageTitle);

  return (
    <div className={styles.cardWrapper}>
      <Link href={`/post/${slug}`}>
        <div className={styles.card}>
          <div className={styles.cardBody}>
            <Subhead variant="3">{pageTitle}</Subhead>
            <div className={styles.cardMeta}>
              {postDate && <BodyText variant="5" color="#999">{postDate}</BodyText>}
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
