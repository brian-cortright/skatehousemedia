'use client'
import styled from "styled-components";
import { basePadding } from "#/theme";
import { BodyText } from "#/components/Typography/Typography";

export const PageWrapper = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: ${basePadding.xLarge};
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
  max-width: clamp(550px, 700px, 100%);
`;

export const SponsorLogo = styled.div`
  align-items: center;
  display: flex;
  justify-content: center;
  width: 100%;
`;