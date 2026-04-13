"use client";
import React from 'react';
import styles from "./VideoPage.module.css";
import { Headline } from "@/components/Typography/Typography";
import VideoPlayer from "../VideoPlayer";
import type { Post } from "@/types";

interface VideoPageProps {
  post?: Post;
}

export const VideoPage: React.FC<VideoPageProps> = ({ post }) => {
  const src = post?.featuredVideo?.url ?? undefined;
  const thumbnail = post?.thumbnail?.url ?? undefined;
  const title = post?.title;

  return (
    <>
      <div className={styles.titleWrapper}>
        <Headline as="h1" variant="5">
          {title}
        </Headline>
      </div>
      <VideoPlayer thumbnail={thumbnail} src={src} />
    </>
  );
};
