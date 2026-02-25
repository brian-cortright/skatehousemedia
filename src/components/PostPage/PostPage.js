"use client";
import { TitleWrapper, BylineWrapper, ContentWrapper, TaxonomyWrapper, CategoriesWrapper, TagsWrapper } from "./PostPageStyled";
import { Headline, Subhead, BodyText } from "#/components/Typography/Typography";
import BackButtonBar from "../BackButtonBar";
import Script from "next/script";
import slugify from "#/utils/slugify";
import Link from "next/link";
import Markdown from "#/components/Markdown/Markdown";

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
      {(tags && tags.length) || (categories && categories.length) ? (
        <TaxonomyWrapper>
          {categories && categories.length ? (
            <CategoriesWrapper>
              <Link href="/categories">
                <BodyText variant="3">Categories:&nbsp;</BodyText>
              </Link>
              {categories.map((category, index) => (
                <Link href={`/categories/${slugify(category)}`} key={category}>
                  <BodyText variant="5">
                    {category}{index < categories.length - 1 ? ', ' : ''}
                  </BodyText>
                </Link>
              ))}
            </CategoriesWrapper>
          ) : null}
          {tags && tags.length ? (
            <TagsWrapper>
              <Link href="/tags">
                <BodyText variant="3">Tags:&nbsp;</BodyText>
              </Link>
              {tags.map((tag, index) => (
                <Link href={`/tags/${slugify(tag)}`} key={tag}>
                  <BodyText variant="5">
                    {tag}{index < tags.length - 1 ? ', ' : ''}
                  </BodyText>
                </Link>
              ))}
            </TagsWrapper>
          ) : null}
        </TaxonomyWrapper>
      ) : null}
      <ContentWrapper>
        <Markdown text={bodyText} />
      </ContentWrapper>
    </>
  );
};
