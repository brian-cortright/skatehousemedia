"use client";
import React from 'react';
import styles from "./VideoPlayer.module.css";

interface VideoPlayerProps {
  ref?: React.Ref<HTMLVideoElement>;
  shouldAutoPlay?: boolean;
  src?: string;
  thumbnail?: string;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ ref, shouldAutoPlay, src, thumbnail }) => {
  return (
    <div className={styles.videoWrapper}>
      <video
        autoPlay={shouldAutoPlay}
        controls
        muted={shouldAutoPlay}
        preload="none"
        poster={thumbnail}
        ref={ref}
        src={src}
      />
    </div>
  );
};

export default VideoPlayer;
