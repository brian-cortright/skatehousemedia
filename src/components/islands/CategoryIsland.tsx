"use client";
import React from "react";
import AppShell from "@/components/AppShell";
import styles from "./CategoryIsland.module.css";
import { Headline } from "@/components/Typography/Typography";
import PostCard from "@/components/PostCard/PostCard";
import type { Post } from "@/types";

interface CategoryIslandProps {
  pathname?: string;
  category: string;
  posts: Post[];
}

export default function CategoryIsland({
  pathname,
  category,
  posts,
}: CategoryIslandProps) {
  return (
    <AppShell pathname={pathname}>
      <main className={styles.pageWrapper}>
        <Headline
          as="h1"
          margin="0 auto var(--spacing-medium_300) auto"
          variant="3"
        >
          {category}
        </Headline>
        <div className={styles.grid}>
          {posts.map((post, index) => (
            <PostCard
              key={`${post.title}-${index}`}
              title={post.title}
              slug={post.slug}
              publishedAt={post.publishedAt}
              author={post.author}
              body={post.body}
            />
          ))}
        </div>
      </main>
    </AppShell>
  );
}
