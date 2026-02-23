"use client";
import { TitleWrapper } from "./VideoPageStyled";
import { Headline } from "#/components/Typography/Typography";
import BackButtonBar from "../BackButtonBar";
import VideoPlayer from "../VideoPlayer";
import Script from "next/script";

export const VideoPage = ({ video }) => {
  const { src, thumbnail, title } = video || {};

  return (
    <>
      <BackButtonBar target={"/archive"} />
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
      <TitleWrapper>
        <Headline as="h1" variant="4">
          {title}
        </Headline>
      </TitleWrapper>
      <VideoPlayer thumbnail={thumbnail} src={src} />
    </>
  );
};
