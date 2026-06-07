"use client";
import React from "react";
import AppShell from "@/components/AppShell";
import { VideoPage } from "@/components/VideoPage/VideoPage";
import type { Post } from "@/types";

interface WatchIslandProps {
  pathname?: string;
  post: Post;
}

export default function WatchIsland({ pathname, post }: WatchIslandProps) {
  return (
    <AppShell pathname={pathname}>
      <VideoPage post={post} />
    </AppShell>
  );
}
