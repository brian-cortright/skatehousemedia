'use client'
import styled from "styled-components";
import { baseColors, basePadding, transition } from "#/theme";

export const Card = styled.div`
  background: ${baseColors.gray2};
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  transition: ${transition.default};

  &:hover {
    background: ${baseColors.gray3};
  }
`;

export const CardWrapper = styled.div`
  display: flex;
  height: 100%;

  & a {
    display: flex;
    height: 100%;
    text-decoration: none;
  }
`;

export const CardBody = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${basePadding.base};
  padding: ${basePadding.medium};
`;

export const CardMeta = styled.div`
  display: flex;
  flex-direction: row;
  gap: ${basePadding.base};
`;

export const CardExcerpt = styled.div`
  margin-block-start: ${basePadding.base};
`;
