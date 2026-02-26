"use client";
import {
  AltNavWrapper,
  IntroParagraph,
  PageWrapper,
  SponsorLogo,
  SponsorWrapper,
} from "./home-styled";
import { MidsLogo, VenomLogo } from "#/components/enhancedSvg/svgs";
import PostFeed from "#/components/PostFeed/PostFeed";
import { posts } from "../../data/postData";
import { BodyText, Subhead } from "#/components/Typography/Typography";
import Link from "next/link";

export default function Home() {
  return (
    <PageWrapper>
      <IntroParagraph textAlignment="center" variant="6">
        {`This months site fees are paid for by:`}
      </IntroParagraph>
      <SponsorWrapper>
        <SponsorLogo as="a" href="http://venomskate.com/">
          <VenomLogo customWidth={150} />
        </SponsorLogo>
        <SponsorLogo as="a" href="https://www.mids4life.com/">
          <MidsLogo customWidth={85} />
        </SponsorLogo>
      </SponsorWrapper>
      <IntroParagraph textAlignment="center" variant="6">
        {`After a non-trivial amount of work scraping snapshots of the old site, we've managed to piece together the most comprehensive collection of the original content. There are still some gaps in content, like old video links that are no longer available from the original brans (many of which no longer exist). You can always get straight to the videos with either our shuffle feature, or the video archive in our main navigation. But please go explore all the words and images the original housemates worked so hard to produce for our then-exploding community!`}
      </IntroParagraph>
      <AltNavWrapper>
        <BodyText variant="6">{`Or browse by:`}</BodyText>
        <Link href="/categories"><Subhead variant="5">Categories</Subhead></Link>
        <Link href="/tags"><Subhead variant="5">Tags</Subhead></Link>
      </AltNavWrapper>
      <PostFeed posts={posts} />
    </PageWrapper>
  );
}
