"use client";
import React from "react";
import FeedCard from "./FeedCard";
import Button from "@/components/Button/Button";
import styles from "./PostFeed.module.css";
import type { Post } from "@/types";

interface PostFeedProps {
  posts: Post[];
}

const PostFeed: React.FC<PostFeedProps> = ({ posts }) => {
  if (!posts || posts.length === 0) {
    return null;
  }

  return (
    <div className={styles.feedWrapper}>
      <div className={styles.gridContainer}>
        {posts
          .filter((post) => !post.featuredPost)
          .map((post, indx) => (
            <FeedCard key={`feed-post-${indx}`} {...post} />
          ))}
      </div>
    </div>
  );
};

export default PostFeed;
