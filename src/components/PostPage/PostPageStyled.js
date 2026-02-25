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
  margin-block-end: ${basePadding.xxxxLarge};
  margin-inline: auto;
  max-width: 900px;
  padding: 0 ${basePadding.large};
  width: 100%;
`;

export const TaxonomyWrapper = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  margin-block: ${basePadding.large};
  padding: 0 ${basePadding.large};
`;

export const CategoriesWrapper = styled.div`
  align-items: center;
  display: flex;
  flex-direction: row;
  margin-block: ${basePadding.base};
  padding: 0 ${basePadding.large};

  a {
    padding-inline-end: 8px;

    &:hover {
      text-decoration: underline;
    }
  }
`;

export const TagsWrapper = styled.div`
  align-items: center;
  display: flex;
  flex-direction: row;
  margin-block: ${basePadding.base};
  padding: 0 ${basePadding.large};

  a {
    padding-inline-end: 8px;

    &:hover {
      text-decoration: underline;
    }
  }
`;