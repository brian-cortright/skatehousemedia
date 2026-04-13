"use client";
import React from 'react';
import { fetchTaxonomy, fetchPosts } from "@/lib/sanity";
import { useSanityQuery } from "@/hooks/useSanity";
import slugify from "@/utils/slugify";
import Link from "next/link";
import styles from "./tags.module.css";
import { Headline, BodyText } from "@/components/Typography/Typography";

const TagsPage: React.FC = () => {
  const { data: taxonomy } = useSanityQuery(() => fetchTaxonomy(), []);
  const { data: allPosts } = useSanityQuery(() => fetchPosts(0, 10000), []);

  const sorted = taxonomy
    ? [...taxonomy.tags].filter(Boolean).sort((a, b) => a.localeCompare(b))
    : [];

  const getPostCount = (tag: string): number =>
    (allPosts || []).filter((post) => post.tags?.includes(tag)).length;

  if (!taxonomy) {
    return <main className={styles.pageWrapper}></main>;
  }

  return (
    <>
      <main className={styles.pageWrapper}>
        <Headline
          as="h1"
          margin="0 auto var(--spacing-medium_300) auto"
          variant="5"
        >
          Tags
        </Headline>
        <div className={styles.gridWrapper}>
          {sorted.map((tag) => (
            <div className={styles.pillItem} key={tag}>
              <Link href={`/tags/${slugify(tag)}`}>
                <BodyText variant="3">{tag}</BodyText>
                <BodyText variant="5" color="#999">
                  {getPostCount(tag)}
                </BodyText>
              </Link>
            </div>
          ))}
        </div>
      </main>
    </>
  );
};

export default TagsPage;
