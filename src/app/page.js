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
  TipMe,
} from "./home-styled";
import { MidsLogo, ShmLogo, VenomLogo } from "#/components/enhancedSvg/svgs";

export default function Home() {
  return (
    <PageWrapper>
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
      <TipMe italic={true} textAlignment="center" variant="6">
        {`Welcome to the archive! We'll be slowly adding some features to the site so be patient.`}
        <br></br>
        {`(want to buy us a coffee for doing this? my venmo is @chubbaluv)`}
      </TipMe>
    </PageWrapper>
  );
}
