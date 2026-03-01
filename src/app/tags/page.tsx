"use client";
import React from 'react';
import { posts } from "../../../data/postData";
import { taxonomy } from "../../../data/taxonomy";
import slugify from "@/utils/slugify";
import Link from "next/link";
import styles from "./tags.module.css";
import { Headline, BodyText } from "@/components/Typography/Typography";
import type { Post, Taxonomy } from "@/types";

const getPostCount = (tag: string): number =>
  (posts as Post[]).filter((post) => post.tags?.includes(tag)).length;

const TagsPage: React.FC = () => {
  const sorted = [...(taxonomy as Taxonomy).tags].sort((a, b) => a.localeCompare(b));

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
