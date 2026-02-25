import Link from "next/link";
import { Card, CardWrapper, CardBody, CardMeta, CardExcerpt } from "./PostCardStyled";
import { Subhead, BodyText } from "../Typography/Typography";
import slugify from "#/utils/slugify";

const stripHtml = (html) => html?.replace(/<[^>]*>/g, "").replace(/&[^;]+;/g, " ") || "";

const truncate = (text, maxLength = 120) => {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trimEnd() + "…";
};

const PostCard = ({ pageTitle, postDate, author, bodyText }) => {
  const excerpt = truncate(stripHtml(bodyText));
  const slug = slugify(pageTitle);

  return (
    <CardWrapper>
      <Link href={`/post/${slug}`}>
        <Card>
          <CardBody>
            <Subhead variant="3">{pageTitle}</Subhead>
            <CardMeta>
              {postDate && <BodyText variant="5" color="#999">{postDate}</BodyText>}
              {author && <BodyText variant="5" color="#999">{author}</BodyText>}
            </CardMeta>
            {excerpt && (
              <CardExcerpt>
                <BodyText variant="5">{excerpt}</BodyText>
              </CardExcerpt>
            )}
          </CardBody>
        </Card>
      </Link>
    </CardWrapper>
  );
};

export default PostCard;
