"use client";
import React from 'react';
import styles from "./VideoPage.module.css";
import { Headline } from "@/components/Typography/Typography";
import VideoPlayer from "../VideoPlayer";
import Script from "next/script";
import type { Video } from "@/types";

interface VideoPageProps {
  video?: Video;
}

export const VideoPage: React.FC<VideoPageProps> = ({ video }) => {
  const { src, thumbnail, title } = video || {};

  return (
    <>
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
      <div className={styles.titleWrapper}>
        <Headline as="h1" variant="4">
          {title}
        </Headline>
      </div>
      <VideoPlayer thumbnail={thumbnail} src={src} />
    </>
  );
};
