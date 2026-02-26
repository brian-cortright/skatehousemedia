"use client";
import { useEffect, useRef, useState, Fragment } from "react";
import videos from "../../../data/videoData";
import {
  Column,
  EntryThumbnail,
  MessageWrapper,
  PageWrapper,
  TitleWrapper,
  UpNextCard,
} from "./shuffle-styled";
import {
  BodyText,
  Headline,
  Subhead,
} from "#/components/Typography/Typography";
import { baseColors, basePadding } from "#/theme";
import VideoPlayer from "#/components/VideoPlayer";
import Button from "#/components/Button";
import Popup from "#/components/Popup/Popup";
import useTimer from "#/hooks/useTimer";
import Script from "next/script";

const Shuffle = () => {
  const videoRef = useRef(null);
  const unMutedVideo = useRef(false);
  const videoPlayCount = useRef(0);
  const [currentIndex, setCurentIndex] = useState(0);
  const [shuffledList, setShuffledList] = useState(videos);
  const [currentVideo, setCurrentVideo] = useState(shuffledList[currentIndex]);
  const [showContinueWatching, setShowContinueWatching] = useState(false);

  // Set an expiration time to pop the 'Continue watching' popup
  // Set to 25 minutes
  const expiryTimestamp = new Date();
  expiryTimestamp.setSeconds(expiryTimestamp.getSeconds() + 1500);

  const { restart } = useTimer({
    expiryTimestamp,
    onExpire: () => {
      videoRef?.current?.pause();
      setShowContinueWatching(true);
    },
  });

  const shuffleVideos = () => {
    const newShuffle = [].concat(shuffledList);
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

  const handleKeepWatchingClick = () => {
    // restart the timer
    restart(expiryTimestamp);
    setShowContinueWatching(false);
    videoRef?.current?.play();
  };

  useEffect(() => {
    shuffleVideos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setCurrentVideo(shuffledList[currentIndex]);
  }, [currentIndex, shuffledList]);

  useEffect(() => {
    if (videoRef.current) {
      // This is all to avoid autoplay blocking
      videoRef.current.onplaying = () => {
        if (!unMutedVideo.current) {
          videoRef.current.muted = false;
          unMutedVideo.current = true;
        }
      };
      videoRef.current.onended = () => {
        setVideoToNext();
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [videoRef.current]);

  return (
    <Fragment>
      <PageWrapper>
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
          margin={`0 auto ${basePadding.xLarge} auto`}
          variant="5"
        >
          Shuffle
        </Headline>
        <VideoPlayer
          ref={videoRef}
          shouldAutoPlay={true}
          src={currentVideo?.src}
          thumbnail={currentVideo?.thumbnail}
        />
        <TitleWrapper>
          <Subhead variant="2">{currentVideo?.title}</Subhead>
          <Fragment>
            <Button handleClick={() => setVideoToNext()}>
              <Subhead variant="4">Skip</Subhead>
            </Button>
            <Button handleClick={() => shuffleVideos()}>
              <Subhead variant="4">Shuffle</Subhead>
            </Button>
          </Fragment>
        </TitleWrapper>
        <Headline
          margin={`${basePadding.xxxLarge} 0 0 0`}
          textAlignment="left"
          variant="5"
        >
          Up Next:
        </Headline>
        <UpNextCard onClick={() => setVideoToNext()}>
          <EntryThumbnail
            $backgroundImage={shuffledList[currentIndex + 1]?.thumbnail}
          />
          <Column>
            <Subhead variant="2">
              {shuffledList[currentIndex + 1]?.title}
            </Subhead>
            <BodyText variant="4">{"Play Now >"}</BodyText>
          </Column>
        </UpNextCard>
      </PageWrapper>
      <Popup
        handleClose={() => handleKeepWatchingClick()}
        isOpen={showContinueWatching}
      >
        <MessageWrapper>
          <Subhead color={baseColors.black} variant="2">
            Still watching?
          </Subhead>
          <BodyText color={baseColors.black} variant="4">
            Sorry to interrupt, but we just want to make sure you are still
            there and not running up our tab for no reason.
          </BodyText>
          <Button handleClick={() => handleKeepWatchingClick()} mode="dark">
            Keep Watching
          </Button>
        </MessageWrapper>
      </Popup>
    </Fragment>
  );
};

export default Shuffle;
