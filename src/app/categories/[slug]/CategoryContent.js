"use client";
import { PageWrapper, Grid } from "./categories-sub-styled";
import { Headline } from "#/components/Typography/Typography";
import PostCard from "#/components/PostCard/PostCard";
import { basePadding } from "#/theme";

const CategoryContent = ({ category, posts }) => {
  return (
    <>
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
