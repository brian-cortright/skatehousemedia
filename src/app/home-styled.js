'use client'
import styled from "styled-components";
import { basePadding } from "#/theme";
import { BodyText } from "#/components/Typography/Typography";

export const AltNavWrapper = styled.div`
  align-items: center;
  display: flex;
  flex-wrap: nowrap;
  margin-block-start: ${basePadding.medium};
  gap: ${basePadding.base};

  a {
    text-decoration: underline;
  }
`;

export const PageWrapper = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-inline: ${basePadding.xLarge};
  min-height: 100vh;
`;

export const IntroParagraph = styled(BodyText)`
  margin-block-end: ${basePadding.medium};
  margin-inline: auto;
  max-width: 650px;
  width: 100%;
`;

export const SponsorWrapper = styled.div`
  display: flex;
  gap: ${basePadding.mediumLarge};
  margin-block-end: ${basePadding.xxxLarge};
  max-width: clamp(550px, 700px, 100%);
`;

export const SponsorLogo = styled.div`
  align-items: center;
  display: flex;
  justify-content: center;
  width: 100%;
`;