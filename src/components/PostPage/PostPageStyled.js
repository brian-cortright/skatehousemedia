'use client'
import styled from "styled-components";
import { basePadding } from "#/theme";

export const TitleWrapper = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  margin-block-end: ${basePadding.large};
  padding: 0 ${basePadding.large};
`;

export const BylineWrapper = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  margin-block: ${basePadding.large};
  padding: 0 ${basePadding.large};
`;

export const ContentWrapper = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-block-start: ${basePadding.large};
  margin-inline: auto;
  max-width: 900px;
  padding: 0 ${basePadding.large};
  width: 100%;
`;