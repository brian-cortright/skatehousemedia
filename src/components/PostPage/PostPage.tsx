"use client";
import React from 'react';
import styles from "./PostPage.module.css";
import { Headline, Subhead, BodyText } from "@/components/Typography/Typography";
import slugify from "@/utils/slugify";
import Link from "next/link";
import PortableBody from "@/components/PortableBody/PortableBody";
import VideoPlayer from "@/components/VideoPlayer";
import type { Post } from "@/types";
import formatDate from "@/utils/formatDate";

interface PostPageProps {
  post?: Post;
}

export const PostPage: React.FC<PostPageProps> = ({ post }) => {
  const { title, publishedAt, author, body, tags, categories, featuredVideo, thumbnail } = post || {};

  return (
    <>
      <div className={styles.titleWrapper}>
        <Headline as="h1" variant="6">
          {title}
        </Headline>
      </div>
      {publishedAt || author ? (
        <div className={styles.bylineWrapper}>
          {publishedAt ? <Subhead variant="3">Published on: {formatDate(publishedAt)}</Subhead> : null}
          {author ? <Subhead variant="3">By: {author}</Subhead> : null}
        </div>
      ) : null}
      {(tags && tags.length) || (categories && categories.length) ? (
        <div className={styles.taxonomyWrapper}>
          {categories && categories.length ? (
            <div className={styles.categoriesWrapper}>
              <Link href="/categories">
                <BodyText variant="3">Categories:&nbsp;</BodyText>
              </Link>
              {categories.map((category, index) => (
                <Link href={`/categories/${slugify(category)}`} key={category}>
                  <BodyText variant="5">
                    {category}{index < categories.length - 1 ? ', ' : ''}
                  </BodyText>
                </Link>
              ))}
            </div>
          ) : null}
          {tags && tags.length ? (
            <div className={styles.tagsWrapper}>
              <Link href="/tags">
                <BodyText variant="3">Tags:&nbsp;</BodyText>
              </Link>
              {tags.map((tag, index) => (
                <Link href={`/tags/${slugify(tag)}`} key={tag}>
                  <BodyText variant="5">
                    {tag}{index < tags.length - 1 ? ', ' : ''}
                  </BodyText>
                </Link>
              ))}
            </div>
          ) : null}
        </div>
      ) : null}
      {featuredVideo?.url ? (
        <VideoPlayer src={featuredVideo.url} thumbnail={thumbnail?.url ?? undefined} />
      ) : null}
      <div className={styles.contentWrapper}>
        <PortableBody value={body} />
      </div>
    </>
  );
};
