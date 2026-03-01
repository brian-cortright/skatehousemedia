"use client";
import React from 'react';
import styles from "./home.module.css";
import PostFeed from "@/components/PostFeed/PostFeed";
import { posts } from "../../data/postData";
import { BodyText, Subhead } from "@/components/Typography/Typography";
import Link from "next/link";

export default function Home() {
  return (
    <main className={styles.pageWrapper}>
      <div className={styles.altNavWrapper}>
        <BodyText variant="6">{`Or browse by:`}</BodyText>
        <Link href="/categories"><Subhead variant="5">Categories</Subhead></Link>
        <Link href="/tags"><Subhead variant="5">Tags</Subhead></Link>
      </div>
      <PostFeed posts={posts} />
    </main>
  );
}
