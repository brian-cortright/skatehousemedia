"use client";
import { posts } from "../../../data/postData";
import { taxonomy } from "../../../data/taxonomy";
import slugify from "#/utils/slugify";
import Link from "next/link";
import { PageWrapper, GridWrapper, PillItem } from "./tags-styled";
import { Headline, BodyText } from "#/components/Typography/Typography";
import { basePadding } from "#/theme";

const getPostCount = (tag) =>
  posts.filter((post) => post.tags?.includes(tag)).length;

const TagsPage = () => {
  const sorted = [...taxonomy.tags].sort((a, b) => a.localeCompare(b));

  return (
    <>
      <PageWrapper>
        <Headline
          as="h1"
          margin={`0 auto ${basePadding.xLarge} auto`}
          variant="5"
        >
          Tags
        </Headline>
        <GridWrapper>
          {sorted.map((tag) => (
            <PillItem key={tag}>
              <Link href={`/tags/${slugify(tag)}`}>
                <BodyText variant="3">{tag}</BodyText>
                <BodyText variant="5" color="#999">
                  {getPostCount(tag)}
                </BodyText>
              </Link>
            </PillItem>
          ))}
        </GridWrapper>
      </PageWrapper>
    </>
  );
};

export default TagsPage;
