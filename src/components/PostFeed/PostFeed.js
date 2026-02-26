"use client";
import { useState } from "react";
import FeedCard from "./FeedCard";
import Button from "#/components/Button/Button";
import { FeedWrapper, GridContainer, LoadMoreContainer } from "./PostFeedStyled";

const PostFeed = ({ posts }) => {
  const [visiblePosts, setVisiblePosts] = useState(20);

  const handleLoadMore = () => {
    setVisiblePosts((prev) => prev + 20);
  };

  if (!posts || posts.length === 0) {
    return null;
  }

  // Determine if there are more posts to load
  const hasMore = visiblePosts < posts.length;

  return (
    <FeedWrapper>
      <GridContainer>
        {[...posts]
          .sort((a, b) => (b.ranking || 0) - (a.ranking || 0))
          .slice(0, visiblePosts)
          .map((post, indx) => (
            <FeedCard key={`feed-post-${indx}`} {...post} />
          ))}
      </GridContainer>

      {hasMore && (
        <LoadMoreContainer>
          <Button handleClick={handleLoadMore} mode="dark">
            Load More Posts
          </Button>
        </LoadMoreContainer>
      )}
    </FeedWrapper>
  );
};

export default PostFeed;
