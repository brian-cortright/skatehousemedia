"use client";
import React from 'react';
import { fetchTaxonomy, fetchPosts } from "@/lib/sanity";
import { useSanityQuery } from "@/hooks/useSanity";
import slugify from "@/utils/slugify";
import Link from "next/link";
import styles from "./categories.module.css";
import { Headline, BodyText } from "@/components/Typography/Typography";

const CategoriesPage: React.FC = () => {
  const { data: taxonomy } = useSanityQuery(() => fetchTaxonomy(), []);
  const { data: allPosts } = useSanityQuery(() => fetchPosts(0, 10000), []);

  const sorted = taxonomy
    ? [...taxonomy.categories].filter(Boolean).sort((a, b) => a.localeCompare(b))
    : [];

  const getPostCount = (category: string): number =>
    (allPosts || []).filter((post) => post.categories?.includes(category)).length;

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
          Categories
        </Headline>
        <div className={styles.gridWrapper}>
          {sorted.map((category) => (
            <div className={styles.pillItem} key={category}>
              <Link href={`/categories/${slugify(category)}`}>
                <BodyText variant="3">{category}</BodyText>
                <BodyText variant="5" color="#999">
                  {getPostCount(category)}
                </BodyText>
              </Link>
            </div>
          ))}
        </div>
      </main>
    </>
  );
};

export default CategoriesPage;
