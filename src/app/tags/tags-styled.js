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

export const ListWrapper = styled.ul`
  display: flex;
  flex-direction: column;
  gap: ${basePadding.small};
  list-style: none;
  margin: 0 auto;
  max-width: 800px;
  padding: 0;
  width: 100%;
`;

export const ListItem = styled.li`
  a {
    align-items: center;
    border-bottom: 1px solid ${baseColors.gray2};
    display: flex;
    justify-content: space-between;
    padding: ${basePadding.medium} ${basePadding.base};
    text-decoration: none;
    transition: ${transition.default};

    &:hover {
      background: ${baseColors.gray2};
      border-radius: 4px;
    }
  }
`;
