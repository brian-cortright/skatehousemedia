import Link from "next/link";
import {
  CardWrapper,
  CardBody,
  CardImageWrapper,
  CardImage,
  CardMeta,
  CardExcerpt,
} from "./PostFeedStyled";
import { Subhead, BodyText } from "#/components/Typography/Typography";
import slugify from "#/utils/slugify";
import { stripHtmlAndTruncate } from "#/utils/extractors";

const FeedCard = ({ pageTitle, postDate, author, bodyText, thumbnail }) => {
  const excerpt = stripHtmlAndTruncate(bodyText, 120);
  const slug = slugify(pageTitle);

  return (
    <Link href={`/post/${slug}`} style={{ textDecoration: 'none' }}>
    <CardWrapper>
        {thumbnail && (
          <CardImageWrapper>
            <CardImage src={thumbnail} alt={pageTitle} loading="lazy" />
          </CardImageWrapper>
        )}
        <CardBody>
            <Subhead variant="3">{pageTitle}</Subhead>
          <CardMeta>
            {postDate && <BodyText variant="5" color="#999">{postDate}</BodyText>}
            {author && <BodyText variant="5" color="#999">by {author}</BodyText>}
          </CardMeta>

          {excerpt && (
            <CardExcerpt>
              <BodyText variant="5">{excerpt}</BodyText>
            </CardExcerpt>
          )}
          <BodyText variant="5">Read More {'>'}</BodyText>
        </CardBody>
      </CardWrapper>
    </Link>
  );
};

export default FeedCard;
