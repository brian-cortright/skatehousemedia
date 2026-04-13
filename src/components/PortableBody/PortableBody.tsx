"use client";
import React from "react";
import { PortableText, PortableTextComponents } from "@portabletext/react";
import { BodyText, Headline, Subhead } from "@/components/Typography/Typography";
import Link from "next/link";

interface PortableBodyProps {
  value?: any[];
}

const components: PortableTextComponents = {
  block: {
    normal: ({ children }) => (
      <BodyText margin="0 0 var(--spacing-medium_200) 0" variant="4">
        {children}
      </BodyText>
    ),
    h1: ({ children }) => (
      <Headline as="h1" margin="0 0 var(--spacing-large_100) 0" variant="1">
        {children}
      </Headline>
    ),
    h2: ({ children }) => (
      <Headline as="h2" margin="0 0 var(--spacing-large_50) 0" variant="2">
        {children}
      </Headline>
    ),
    h3: ({ children }) => (
      <Headline as="h3" margin="0 0 var(--spacing-medium_300) 0" variant="3">
        {children}
      </Headline>
    ),
    h4: ({ children }) => (
      <Headline as="h4" margin="0 0 var(--spacing-medium_200) 0" variant="4">
        {children}
      </Headline>
    ),
    h5: ({ children }) => (
      <Subhead as="h5" margin="0 0 var(--spacing-medium_100) 0" variant="1">
        {children}
      </Subhead>
    ),
    h6: ({ children }) => (
      <Subhead as="h6" margin="0 0 var(--spacing-small_300) 0" variant="3">
        {children}
      </Subhead>
    ),
  },
  list: {
    bullet: ({ children }) => <ul style={{ paddingLeft: "1.5rem" }}>{children}</ul>,
    number: ({ children }) => <ol style={{ paddingLeft: "1.5rem" }}>{children}</ol>,
  },
  listItem: {
    bullet: ({ children }) => (
      <BodyText as="li" margin="0 0 var(--spacing-small_300) 0" variant="4">
        {children}
      </BodyText>
    ),
    number: ({ children }) => (
      <BodyText as="li" margin="0 0 var(--spacing-small_300) 0" variant="4">
        {children}
      </BodyText>
    ),
  },
  marks: {
    link: ({ value, children }) => (
      <Link href={value?.href || "#"} target="_blank" rel="noopener noreferrer">
        {children}
      </Link>
    ),
  },
  types: {
    videoEmbed: ({ value }) => {
      if (!value?.url) return null;
      return (
        <div style={{ position: "relative", paddingBottom: "56.25%", height: 0, margin: "var(--spacing-medium_200) 0" }}>
          <iframe
            src={value.url}
            style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", border: 0 }}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      );
    },
    externalImage: ({ value }) => {
      if (!value?.url) return null;
      return (
        <div style={{ margin: "var(--spacing-medium_200) 0" }}>
          <img
            src={value.url}
            alt={value.alt || ""}
            style={{ maxWidth: "100%", height: "auto" }}
            loading="lazy"
          />
        </div>
      );
    },
  },
};

const PortableBody: React.FC<PortableBodyProps> = ({ value }) => {
  if (!value || value.length === 0) return null;

  return <PortableText value={value} components={components} />;
};

export default PortableBody;
