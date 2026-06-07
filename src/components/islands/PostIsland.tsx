"use client";
import React from "react";
import AppShell from "@/components/AppShell";
import { PostPage } from "@/components/PostPage/PostPage";
import type { Post } from "@/types";

interface PostIslandProps {
  pathname?: string;
  post: Post;
}

export default function PostIsland({ pathname, post }: PostIslandProps) {
  return (
    <AppShell pathname={pathname}>
      <PostPage post={post} />
    </AppShell>
  );
}
