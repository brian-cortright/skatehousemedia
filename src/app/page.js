"use client";
import {
  IntroParagraph,
  PageWrapper,
  SponsorLogo,
  SponsorWrapper,
} from "./home-styled";
import { MidsLogo, VenomLogo } from "#/components/enhancedSvg/svgs";
import PostFeed from "#/components/PostFeed/PostFeed";
import { posts } from "../../data/postData";

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
      <PostFeed posts={posts} />
    </PageWrapper>
  );
}
