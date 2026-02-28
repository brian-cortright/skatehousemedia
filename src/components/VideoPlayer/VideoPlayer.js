"use client";
import styles from "./VideoPlayer.module.css";

const VideoPlayer = ({ ref, shouldAutoPlay, src, thumbnail }) => {
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
        type="video/mp4"
      />
    </div>
  );
};

export default VideoPlayer;
