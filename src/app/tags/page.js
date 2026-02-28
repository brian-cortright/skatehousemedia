"use client";
import { posts } from "../../../data/postData";
import { taxonomy } from "../../../data/taxonomy";
import slugify from "#/utils/slugify";
import Link from "next/link";
import styles from "./tags.module.css";
import { Headline, BodyText } from "#/components/Typography/Typography";

const getPostCount = (tag) =>
  posts.filter((post) => post.tags?.includes(tag)).length;

const TagsPage = () => {
  const sorted = [...taxonomy.tags].sort((a, b) => a.localeCompare(b));

  return (
    <>
      <main className={styles.pageWrapper}>
        <Headline
          as="h1"
          margin="0 auto var(--space-xl) auto"
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
