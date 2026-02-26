'use client'
import styled from "styled-components";
import { baseColors, basePadding, transition } from "#/theme";

export const PageWrapper = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  padding: ${basePadding.xLarge};
  min-height: 100vh;
`;

export const GridWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${basePadding.small};
  max-width: 900px;
  width: 100%;
  justify-content: center;
`;

export const PillItem = styled.div`
  a {
    display: inline-flex;
    align-items: center;
    gap: ${basePadding.base};
    background: ${baseColors.gray1};
    border: 1px solid ${baseColors.gray2};
    border-radius: 999px;
    padding: ${basePadding.base} ${basePadding.mediumLarge};
    text-decoration: none;
    transition: ${transition.default};
    white-space: nowrap;

    &:hover {
      background: ${baseColors.gray2};
      border-color: ${baseColors.gray3};
      transform: translateY(-1px);
    }
  }
`;
