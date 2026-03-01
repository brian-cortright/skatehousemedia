"use client";
import { posts } from "../../../data/postData";
import { taxonomy } from "../../../data/taxonomy";
import slugify from "#/utils/slugify";
import Link from "next/link";
import styles from "./categories.module.css";
import { Headline, BodyText } from "#/components/Typography/Typography";

const getPostCount = (category) =>
  posts.filter((post) => post.categories?.includes(category)).length;

const CategoriesPage = () => {
  const sorted = [...taxonomy.categories].sort((a, b) => a.localeCompare(b));

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
