"use client";
import { TitleWrapper, BylineWrapper, ContentWrapper } from "./PostPageStyled";
import { Headline, Subhead } from "#/components/Typography/Typography";
import BackButtonBar from "../BackButtonBar";
import Script from "next/script";
import { fontSizing } from "#/theme";

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
        <Headline as="h1" variant="5">
          {pageTitle}
        </Headline>
      </TitleWrapper>
      {postDate || author ? (
        <BylineWrapper>
          {postDate ? <Subhead variant="3">Published on: {postDate}</Subhead> : null}
          {author ? <Subhead variant="3">By: {author}</Subhead> : null}
        </BylineWrapper>
      ) : null}
      <ContentWrapper>
        <div dangerouslySetInnerHTML={{ __html: bodyText }} />
      </ContentWrapper>
    </>
  );
};
