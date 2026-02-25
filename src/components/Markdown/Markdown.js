"use client";
import React from "react";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import { basePadding } from "#/theme";
import { BodyText, Headline, Subhead } from "#/components/Typography/Typography";
import Link from "next/link";

const StyledBody = ({ children }) => (
  <BodyText margin={`0 0 ${basePadding.large} 0`} variant="4">
    {children}
  </BodyText>
);

const StyledHeadline1 = ({ children }) => (
  <Headline as="h1" margin={`0 0 ${basePadding.xxxLarge} 0`} variant="1">
    {children}
  </Headline>
);

const StyledHeadline2 = ({ children }) => (
  <Headline as="h2" margin={`0 0 ${basePadding.xxLarge} 0`} variant="2">
    {children}
  </Headline>
);

const StyledHeadline3 = ({ children }) => (
  <Headline as="h3" margin={`0 0 ${basePadding.xLarge} 0`} variant="3">
    {children}
  </Headline>
);

const StyledHeadline4 = ({ children }) => (
  <Headline as="h4" margin={`0 0 ${basePadding.large} 0`} variant="4">
    {children}
  </Headline>
);

const StyledSubhead1 = ({ children }) => (
  <Subhead as="h5" margin={`0 0 ${basePadding.medium} 0`} variant="1">
    {children}
  </Subhead>
);

const StyledSubhead3 = ({ children }) => (
  <Subhead as="h6" margin={`0 0 ${basePadding.small} 0`} variant="3">
    {children}
  </Subhead>
);

const StyledListItem = ({ children }) => (
  <BodyText as="li" margin={`0 0 ${basePadding.small} 0`} variant="4">
    {children}
  </BodyText>
);

const StyledLink = ({ href, children }) => (
  <Link href={href || "#"} target="_blank" rel="noopener noreferrer">
    {children}
  </Link>
);

const defaultRenderers = {
  p: StyledBody,
  h1: StyledHeadline1,
  h2: StyledHeadline2,
  h3: StyledHeadline3,
  h4: StyledHeadline4,
  h5: StyledSubhead1,
  h6: StyledSubhead3,
  a: StyledLink,
  li: StyledListItem,
};

const Markdown = ({ text, renderers = {} }) => {
  if (!text) return null;

  const mergedRenderers = {
    ...defaultRenderers,
    ...renderers,
  };

  return (
    <ReactMarkdown
      rehypePlugins={[rehypeRaw, rehypeSlug]}
      remarkPlugins={[remarkGfm]}
      components={mergedRenderers}
    >
      {text}
    </ReactMarkdown>
  );
};

export default Markdown;
