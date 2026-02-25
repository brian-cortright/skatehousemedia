'use client'
import styled from "styled-components";
import { baseColors, basePadding, transition } from "#/theme";
import { Headline, BodyText } from "#/components/Typography/Typography";

export const PageWrapper = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: ${basePadding.xLarge};
  min-height: 100vh;
`;

export const LogoWrapper = styled.div`
  max-width: calc(100% - 60px);
`;

export const NavigationItem = styled(Headline)`
  color: ${baseColors.white};
  border-bottom: 5px solid ${baseColors.white};
  margin: ${basePadding.large} 0 0 0;
  transition: ${transition.default};

  &:hover {
    color: ${baseColors.gray4};
    border-bottom: 5px solid ${baseColors.gray4};
  }
`;

export const IntroParagraph = styled(BodyText)`
  margin-block-start: ${basePadding.max};
  margin-block-end: ${basePadding.medium};
  margin-inline: auto;
  max-width: 650px;
  width: 100%;
`;

export const Notice = styled(BodyText)`
  margin-block: ${basePadding.xxxxLarge};
  margin-inline: auto;
  max-width: 700px;
  width: 100%;
`;

export const SponsorWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(275px, 1fr) );
  grid-gap: ${basePadding.mediumLarge};
  max-width: clamp(550px, 700px, 100%);
`;

export const SponsorLogo = styled.div`
  align-items: center;
  display: flex;
  justify-content: center;
  width: 100%;
`;