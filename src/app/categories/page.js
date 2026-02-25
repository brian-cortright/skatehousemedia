"use client";
import { posts } from "../../../data/postData";
import { taxonomy } from "../../../data/taxonomy";
import slugify from "#/utils/slugify";
import Link from "next/link";
import { PageWrapper, ListWrapper, ListItem } from "./categories-styled";
import { Headline, BodyText } from "#/components/Typography/Typography";
import BackButtonBar from "#/components/BackButtonBar";
import { basePadding } from "#/theme";

const getPostCount = (category) =>
  posts.filter((post) => post.categories?.includes(category)).length;

const CategoriesPage = () => {
  const sorted = [...taxonomy.categories].sort((a, b) => a.localeCompare(b));

  return (
    <>
      <BackButtonBar target={"/"} />
      <PageWrapper>
        <Headline
          as="h1"
          margin={`0 auto ${basePadding.xLarge} auto`}
          variant="3"
        >
          Categories
        </Headline>
        <ListWrapper>
          {sorted.map((category) => (
            <ListItem key={category}>
              <Link href={`/categories/${slugify(category)}`}>
                <BodyText variant="3">{category}</BodyText>
                <BodyText variant="5" color="#999">
                  {getPostCount(category)} {getPostCount(category) === 1 ? "post" : "posts"}
                </BodyText>
              </Link>
            </ListItem>
          ))}
        </ListWrapper>
      </PageWrapper>
    </>
  );
};

export default CategoriesPage;
