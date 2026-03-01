"use client";
import React, { useState } from "react";
import FeedCard from "./FeedCard";
import Button from "@/components/Button/Button";
import styles from "./PostFeed.module.css";
import type { Post } from "@/types";

interface PostFeedProps {
  posts: Post[];
}

const PostFeed: React.FC<PostFeedProps> = ({ posts }) => {
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
    <div className={styles.feedWrapper}>
      <div className={styles.gridContainer}>
        {[...posts]
          .sort((a, b) => (b.ranking || 0) - (a.ranking || 0))
          .slice(0, visiblePosts)
          .map((post, indx) => (
            <FeedCard key={`feed-post-${indx}`} {...post} />
          ))}
      </div>

      {hasMore && (
        <div className={styles.loadMoreContainer}>
          <Button handleClick={handleLoadMore} mode="dark">
            Load More Posts
          </Button>
        </div>
      )}
    </div>
  );
};

export default PostFeed;
