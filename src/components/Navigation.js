import styled from "styled-components";
import Link from "next/link";
import { ShmLogo } from "./enhancedSvg/svgs";
import { Headline, Subhead } from "./Typography/Typography";
import { baseColors, basePadding } from "#/theme";

const LogoWrapper = styled.div`
  display: flex;
  justify-content: center;
  width: max-content;

  & a {
    align-items: center;
    display: flex;
    flex-direction: row;
    justify-content: center;
    gap: ${basePadding.small};
  }
`;

const NavigationContainer = styled.nav`
  align-items: center;
  background: ${baseColors.black};
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  max-width: 1800px;
  margin: 0 auto ${basePadding.xxxLarge} auto;
  padding: ${basePadding.mediumLarge};
  width: 100%;
`;

const NavLinksContainer = styled.ul`
  display: flex;
  flex-direction: row;
  gap: ${basePadding.small};
  justify-content: space-between;
  list-style: none;
  width: max-content;

  & a {
    border-bottom: 1px solid ${baseColors.white};
    display: block;
    transition: all 2500ms ease-in-out;

    &:hover {
      & * {
        color: ${baseColors.gray6};
      }
      border-bottom: 1px solid ${baseColors.gray6};
    }
  }
`;

const Navigation = () => {
  return (
    <NavigationContainer>
      <LogoWrapper>
        <Link href="/">
          <ShmLogo customWidth={60} />
          <Headline as='h2' variant="8">The Archive</Headline>
        </Link>
      </LogoWrapper>
      <NavLinksContainer>
        <li>
          <Link href="/archive">
           <Subhead as='h3' variant="4">Videos</Subhead>
          </Link>
        </li>
        <li>
          <Link href="/shuffle">
            <Subhead as='h3'variant="4">Shuffle</Subhead>
          </Link>
        </li>
      </NavLinksContainer>
    </NavigationContainer>
  )
}

export default Navigation