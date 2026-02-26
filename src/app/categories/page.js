"use client";
import { posts } from "../../../data/postData";
import { taxonomy } from "../../../data/taxonomy";
import slugify from "#/utils/slugify";
import Link from "next/link";
import { PageWrapper, GridWrapper, PillItem } from "./categories-styled";
import { Headline, BodyText } from "#/components/Typography/Typography";
import { basePadding } from "#/theme";

const getPostCount = (category) =>
  posts.filter((post) => post.categories?.includes(category)).length;

const CategoriesPage = () => {
  const sorted = [...taxonomy.categories].sort((a, b) => a.localeCompare(b));

  return (
    <>
      <PageWrapper>
        <Headline
          as="h1"
          margin={`0 auto ${basePadding.xLarge} auto`}
          variant="5"
        >
          Categories
        </Headline>
        <GridWrapper>
          {sorted.map((category) => (
            <PillItem key={category}>
              <Link href={`/categories/${slugify(category)}`}>
                <BodyText variant="3">{category}</BodyText>
                <BodyText variant="5" color="#999">
                  {getPostCount(category)}
                </BodyText>
              </Link>
            </PillItem>
          ))}
        </GridWrapper>
      </PageWrapper>
    </>
  );
};

export default CategoriesPage;
