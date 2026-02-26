'use client'
import styled from "styled-components";
import { baseColors, basePadding, transition } from "#/theme";

export const FeedWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${basePadding.xxLarge};
  width: 100%;
  max-width: 900px;
  margin: ${basePadding.xxLarge} auto;
`;

export const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: ${basePadding.xLarge};
  width: 100%;
`;

export const CardWrapper = styled.article`
  background: ${baseColors.gray2};
  border-radius: 8px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  transition: ${transition.default};
  height: 100%;

  &:hover {
    background: ${baseColors.gray3};
    transform: translateY(-2px);
  }
`;

export const CardImageWrapper = styled.div`
  width: 100%;
  aspect-ratio: 16 / 9;
  background: ${baseColors.gray1};
  overflow: hidden;
`;

export const CardImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export const CardBody = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${basePadding.medium};
  padding: ${basePadding.large};
  flex-grow: 1;
`;

export const CardMeta = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${basePadding.base};
  margin-bottom: ${basePadding.half};
`;

export const CardExcerpt = styled.div`
  margin-bottom: ${basePadding.medium};
  flex-grow: 1;
`;

export const ButtonWrapper = styled.div`
  margin-top: auto;
  align-self: flex-start;
`;

export const LoadMoreContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  margin-top: ${basePadding.large};
`;
