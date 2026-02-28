import Link from "next/link";
import styles from "./PostFeed.module.css";
import { Subhead, BodyText } from "#/components/Typography/Typography";
import slugify from "#/utils/slugify";
import { stripHtmlAndTruncate } from "#/utils/extractors";

const FeedCard = ({ pageTitle, postDate, author, bodyText, thumbnail }) => {
  const excerpt = stripHtmlAndTruncate(bodyText, 120);
  const slug = slugify(pageTitle);

  return (
    <Link href={`/post/${slug}`} style={{ textDecoration: 'none' }}>
    <article className={styles.cardWrapper}>
        {thumbnail && (
          <div className={styles.cardImageWrapper}>
            <img className={styles.cardImage} src={thumbnail} alt={pageTitle} loading="lazy" />
          </div>
        )}
        <div className={styles.cardBody}>
            <Subhead variant="3">{pageTitle}</Subhead>
          <div className={styles.cardMeta}>
            {postDate && <BodyText variant="5" color="#999">{postDate}</BodyText>}
            {author && <BodyText variant="5" color="#999">by {author}</BodyText>}
          </div>

          {excerpt && (
            <div className={styles.cardExcerpt}>
              <BodyText variant="5">{excerpt}</BodyText>
            </div>
          )}
          <BodyText variant="5">Read More {'>'}</BodyText>
        </div>
      </article>
    </Link>
  );
};

export default FeedCard;
