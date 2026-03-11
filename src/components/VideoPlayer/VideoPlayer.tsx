"use client";
import React from 'react';
import styles from "./VideoPlayer.module.css";

interface VideoPlayerProps {
  ref?: React.Ref<HTMLVideoElement>;
  shouldAutoPlay?: boolean;
  src?: string;
  thumbnail?: string;
}

function getYouTubeId(url: string): string | null {
  const match = url.match(
    /(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/
  );
  return match ? match[1] : null;
}

function getVimeoId(url: string): string | null {
  const match = url.match(/(?:vimeo\.com\/|player\.vimeo\.com\/video\/)(\d+)/);
  return match ? match[1] : null;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ ref, shouldAutoPlay, src, thumbnail }) => {
  if (!src) return null;

  const youtubeId = getYouTubeId(src);
  const vimeoId = getVimeoId(src);

  return (
    <div className={styles.videoWrapper}>
      {youtubeId ? (
        <iframe
          src={`https://www.youtube.com/embed/${youtubeId}${shouldAutoPlay ? '?autoplay=1&mute=1' : ''}`}
          title="Video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      ) : vimeoId ? (
        <iframe
          src={`https://player.vimeo.com/video/${vimeoId}${shouldAutoPlay ? '?autoplay=1&muted=1' : ''}`}
          title="Video player"
          allow="autoplay; fullscreen; picture-in-picture"
          allowFullScreen
        />
      ) : (
        <video
          autoPlay={shouldAutoPlay}
          controls
          muted={shouldAutoPlay}
          preload="none"
          poster={thumbnail}
          ref={ref}
          src={src}
        />
      )}
    </div>
  );
};

export default VideoPlayer;
