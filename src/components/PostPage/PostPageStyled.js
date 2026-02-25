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