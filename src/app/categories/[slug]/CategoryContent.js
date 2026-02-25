"use client";
import { PageWrapper, Grid } from "./categories-sub-styled";
import { Headline } from "#/components/Typography/Typography";
import BackButtonBar from "#/components/BackButtonBar";
import PostCard from "#/components/PostCard/PostCard";
import { basePadding } from "#/theme";

const CategoryContent = ({ category, posts }) => {
  return (
    <>
      <BackButtonBar target={"/categories"} />
      <PageWrapper>
        <Headline
          as="h1"
          margin={`0 auto ${basePadding.xLarge} auto`}
          variant="3"
        >
          {category}
        </Headline>
        <Grid>
          {posts.map((post, index) => (
            <PostCard
              key={`${post.pageTitle}-${index}`}
              pageTitle={post.pageTitle}
              postDate={post.postDate}
              author={post.author}
              bodyText={post.bodyText}
            />
          ))}
        </Grid>
      </PageWrapper>
    </>
  );
};

export default CategoryContent;
