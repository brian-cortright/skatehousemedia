'use client'
import styled from "styled-components";
import { basePadding } from "#/theme";

export const VideoWrapper = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  padding: 0 ${basePadding.large};
  width: 100%;

  & > video {
    aspect-ratio: 16 / 9;
    max-width: 700px;
    width: 100%;
  }
`;

export const TitleWrapper = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  margin-block-end: ${basePadding.large};
  padding: 0 ${basePadding.large};
`;