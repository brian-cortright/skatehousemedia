'use client'
import styled from "styled-components";
import { basePadding } from "#/theme";

export const PageWrapper = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  padding: ${basePadding.xLarge};
  min-height: 100vh;
`;

export const Grid = styled.div`
  display: grid;
  grid-gap: ${basePadding.large};
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  margin: 0 auto;
  max-width: 1200px;
  width: 100%;
`;
