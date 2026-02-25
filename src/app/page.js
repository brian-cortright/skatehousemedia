"use client";
import Link from "next/link";
import Script from "next/script";
import {
  IntroParagraph,
  LogoWrapper,
  NavigationItem,
  PageWrapper,
  SponsorLogo,
  SponsorWrapper,
  Notice,
} from "./home-styled";
import { MidsLogo, ShmLogo, VenomLogo } from "#/components/enhancedSvg/svgs";

export default function Home() {
  return (
    <PageWrapper>
      <Notice italic={true} textAlignment="center" variant="4">
        {`Hey there! We're working on something now.`}
        <br></br>
        {`In a spurt of motivation, we've decided to use the Wayback Machine APIs to scrape every single blog post from the original site. It's going to take some time to process all of it, and scrub any posts that make no sense with the missing assets. But check back as work through this large volume of content. `}
      </Notice>
      <LogoWrapper>
        <ShmLogo customWidth={500} />
      </LogoWrapper>
      <Link href="/shuffle">
        <NavigationItem variant="4">Shuffle</NavigationItem>
      </Link>
      <Link href="/archive">
        <NavigationItem variant="4">The Archive</NavigationItem>
      </Link>
      <IntroParagraph textAlignment="center" variant="6">
        {`This months site fees are paid for by:`}
      </IntroParagraph>
      <SponsorWrapper>
        <SponsorLogo as="a" href="http://venomskate.com/">
          <VenomLogo customWidth={300} />
        </SponsorLogo>
        <SponsorLogo as="a" href="https://www.mids4life.com/">
          <MidsLogo customWidth={175} />
        </SponsorLogo>
      </SponsorWrapper>
    </PageWrapper>
  );
}
