"use client";
import React, { useEffect, useRef, useState } from "react";
import { posts } from "../../../data/postData";
import styles from "./shuffle.module.css";
import {
  BodyText,
  Headline,
  Subhead,
} from "@/components/Typography/Typography";
import Button from "@/components/Button";
import { usePopup } from "@/components/Popup/PopupContext";
import useTimer from "@/hooks/useTimer";
import Script from "next/script";
import type { Post } from "@/types";
import { getVimeoId } from "@/utils/videoUtils";
import { getYouTubeId } from "@/utils/videoUtils";

const videoPosts = posts.filter((p: Post) => p.featuredVideo);

const Shuffle: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const unMutedVideo = useRef(false);
  const videoPlayCount = useRef(0);
  const [currentIndex, setCurentIndex] = useState(0);
  const [shuffledList, setShuffledList] = useState<Post[]>(videoPosts);
  const [currentPost, setCurrentPost] = useState<Post | undefined>(shuffledList[currentIndex]);
  const { openPopup, closePopup } = usePopup();

  // Set an expiration time to pop the 'Continue watching' popup
  // Set to 25 minutes
  const expiryTimestamp = new Date();
  expiryTimestamp.setSeconds(expiryTimestamp.getSeconds() + 1500);

  const handleKeepWatchingClick = () => {
    // restart the timer
    restart(expiryTimestamp);
    closePopup();
    videoRef?.current?.play();
  };

  const { restart } = useTimer({
    expiryTimestamp,
    onExpire: () => {
      videoRef?.current?.pause();
      openPopup({
        children: (
          <div className={styles.messageWrapper}>
            <Subhead variant="2">
              Still watching?
            </Subhead>
            <BodyText variant="4">
              Sorry to interrupt, but we just want to make sure you are still
              there and not running up our tab for no reason.
            </BodyText>
            <Button handleClick={() => handleKeepWatchingClick()}>
              Keep Watching
            </Button>
          </div>
        ),
      });
    },
  });

  const shuffleVideos = () => {
    const newShuffle = [].concat(shuffledList as never[]);
    for (let i = newShuffle.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = newShuffle[i];
      newShuffle[i] = newShuffle[j];
      newShuffle[j] = temp;
    }
    setShuffledList(newShuffle);
    setCurentIndex(0);
  };

  const setVideoToNext = () => {
    setCurentIndex(currentIndex + 1);
    unMutedVideo.current = false;
    videoPlayCount.current = videoPlayCount.current + 1;
  };

  const playAtIndex = (index: number) => {
    setCurentIndex(index);
    unMutedVideo.current = false;
    videoPlayCount.current = videoPlayCount.current + 1;
  };

  useEffect(() => {
    shuffleVideos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setCurrentPost(shuffledList[currentIndex]);
  }, [currentIndex, shuffledList]);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.onplaying = () => {
        if (!unMutedVideo.current) {
          videoRef.current!.muted = false;
          unMutedVideo.current = true;
        }
      };
      videoRef.current.onended = () => {
        setVideoToNext();
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [videoRef.current]);

  const currentSrc = currentPost?.featuredVideo ?? "";
  const youtubeId = currentSrc ? getYouTubeId(currentSrc) : null;
  const vimeoId = currentSrc ? getVimeoId(currentSrc) : null;

  const upNext = shuffledList.slice(currentIndex + 1, currentIndex + 4);

  return (
    <main className={styles.pageWrapper}>
      <Script
        async
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6675084090356256"
        crossOrigin="anonymous"
        strategy="afterInteractive"
      />
      <ins
        className="adsbygoogle banner"
        data-ad-client="ca-pub-6675084090356256"
        data-ad-slot="4725789316"
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
      <Script id="adsense-init" strategy="afterInteractive">
        {`(adsbygoogle = window.adsbygoogle || []).push({});`}
      </Script>
      <Headline
        as="h1"
        margin="0 auto var(--spacing-small_300) auto"
        variant="5"
      >
        Shuffle
      </Headline>
      <BodyText margin="0 auto var(--spacing-medium_100) auto" textAlignment="center" variant="5">
        Endless video content injected straight into your veins. Sit back and enjoy the session.
      </BodyText>

      <div className={styles.columns}>
        {/* Player Card */}
        <div className={styles.playerCard}>
          {youtubeId ? (
            <iframe
              src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1&mute=0`}
              title="Video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          ) : vimeoId ? (
            <iframe
              src={`https://player.vimeo.com/video/${vimeoId}?autoplay=1`}
              title="Video player"
              allow="autoplay; fullscreen; picture-in-picture"
              allowFullScreen
            />
          ) : (
            <video
              autoPlay
              controls
              muted
              preload="none"
              poster={currentPost?.thumbnail ?? undefined}
              ref={videoRef}
              src={currentSrc || undefined}
            />
          )}
          <div className={styles.playerCardBody}>
            <div className={styles.playerCardText}>
              <Subhead variant="2">{currentPost?.pageTitle}</Subhead>
              <BodyText variant="5" color="var(--color-grey-600)">
                {currentIndex + 1} / {shuffledList.length}
              </BodyText>
            </div>
            <div className={styles.playerButtons}>
              <Button handleClick={() => setVideoToNext()}>
                <Subhead variant="4">Next Video</Subhead>
              </Button>
              <Button handleClick={() => shuffleVideos()}>
                <Subhead variant="4">Reshuffle</Subhead>
              </Button>
            </div>
          </div>
        </div>

        {/* Up Next Card */}
        <div className={styles.upNextCard}>
          <div className={styles.upNextHeader}>
            <Subhead variant="2">Up Next</Subhead>
          </div>
          {upNext.map((post, i) => (
            <button
              key={`queue-${currentIndex + 1 + i}`}
              className={styles.queueItem}
              onClick={() => playAtIndex(currentIndex + 1 + i)}
            >
              <div
                className={styles.queueThumbnail}
                style={{ backgroundImage: `url(${post.thumbnail})` }}
              />
              <div className={styles.queueInfo}>
                <Subhead variant="4">{post.pageTitle}</Subhead>
              </div>
            </button>
          ))}
        </div>
      </div>
    </main>
  );
};

export default Shuffle;
