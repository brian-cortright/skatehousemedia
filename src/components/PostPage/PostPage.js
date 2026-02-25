"use client";
import { TitleWrapper } from "./PostPageStyled";
import { Headline } from "#/components/Typography/Typography";
import BackButtonBar from "../BackButtonBar";
import Script from "next/script";

export const PostPage = ({ post }) => {
  const { pageTitle, postDate, author, bodyText, tags, categories } = post || {};

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
          {pageTitle}
        </Headline>
      </TitleWrapper>
      <div dangerouslySetInnerHTML={{ __html: bodyText }} />
    </>
  );
};
