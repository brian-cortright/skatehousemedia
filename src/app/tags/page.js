"use client";
import { posts } from "../../../data/postData";
import { taxonomy } from "../../../data/taxonomy";
import slugify from "#/utils/slugify";
import Link from "next/link";
import { PageWrapper, ListWrapper, ListItem } from "./tags-styled";
import { Headline, BodyText } from "#/components/Typography/Typography";
import BackButtonBar from "#/components/BackButtonBar";
import { basePadding } from "#/theme";

const getPostCount = (tag) =>
  posts.filter((post) => post.tags?.includes(tag)).length;

const TagsPage = () => {
  const sorted = [...taxonomy.tags].sort((a, b) => a.localeCompare(b));

  return (
    <>
      <BackButtonBar target={"/"} />
      <PageWrapper>
        <Headline
          as="h1"
          margin={`0 auto ${basePadding.xLarge} auto`}
          variant="3"
        >
          Tags
        </Headline>
        <ListWrapper>
          {sorted.map((tag) => (
            <ListItem key={tag}>
              <Link href={`/tags/${slugify(tag)}`}>
                <BodyText variant="3">{tag}</BodyText>
                <BodyText variant="5" color="#999">
                  {getPostCount(tag)} {getPostCount(tag) === 1 ? "post" : "posts"}
                </BodyText>
              </Link>
            </ListItem>
          ))}
        </ListWrapper>
      </PageWrapper>
    </>
  );
};

export default TagsPage;
