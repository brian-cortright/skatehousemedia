import Link from "next/link";
import {
  CardWrapper,
  CardBody,
  CardImageWrapper,
  CardImage,
  CardMeta,
  CardExcerpt,
  ButtonWrapper
} from "./PostFeedStyled";
import { Subhead, BodyText } from "#/components/Typography/Typography";
import Button from "#/components/Button/Button";
import slugify from "#/utils/slugify";
import { extractFirstImageSrc, stripHtmlAndTruncate } from "#/utils/extractors";

const FeedCard = ({ pageTitle, postDate, author, bodyText }) => {
  const excerpt = stripHtmlAndTruncate(bodyText, 120);
  const imageSrc = extractFirstImageSrc(bodyText);
  const slug = slugify(pageTitle);

  return (
    <CardWrapper>
      {imageSrc && (
        <CardImageWrapper>
          <Link href={`/post/${slug}`}>
            <CardImage src={imageSrc} alt={pageTitle} loading="lazy" />
          </Link>
        </CardImageWrapper>
      )}
      <CardBody>
        <Link href={`/post/${slug}`} style={{ textDecoration: 'none' }}>
          <Subhead variant="3">{pageTitle}</Subhead>
        </Link>

        <CardMeta>
          {postDate && <BodyText variant="5" color="#999">{postDate}</BodyText>}
          {author && <BodyText variant="5" color="#999">by {author}</BodyText>}
        </CardMeta>

        {excerpt && (
          <CardExcerpt>
            <BodyText variant="5">{excerpt}</BodyText>
          </CardExcerpt>
        )}

        <ButtonWrapper>
          <Button href={`/post/${slug}`} mode="dark">Read More</Button>
        </ButtonWrapper>
      </CardBody>
    </CardWrapper>
  );
};

export default FeedCard;
