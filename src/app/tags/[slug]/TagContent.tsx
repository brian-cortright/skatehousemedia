"use client";
import React from 'react';
import styles from "./tags-sub.module.css";
import { Headline } from "@/components/Typography/Typography";
import PostCard from "@/components/PostCard/PostCard";
import type { Post } from "@/types";

interface TagContentProps {
  tag?: string;
  posts: Post[];
}

const TagContent: React.FC<TagContentProps> = ({ tag, posts }) => {
  return (
    <>
      <main className={styles.pageWrapper}>
        <Headline
          as="h1"
          margin="0 auto var(--spacing-medium_300) auto"
          variant="3"
        >
          {tag}
        </Headline>
        <div className={styles.grid}>
          {posts.map((post, index) => (
            <PostCard
              key={`${post.pageTitle}-${index}`}
              pageTitle={post.pageTitle}
              postDate={post.postDate}
              author={post.author}
              bodyText={post.bodyText}
            />
          ))}
        </div>
      </main>
    </>
  );
};

export default TagContent;
