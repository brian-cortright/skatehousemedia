"use client";
import styles from "./home.module.css";
import { MidsLogo, VenomLogo } from "#/components/enhancedSvg/svgs";
import PostFeed from "#/components/PostFeed/PostFeed";
import { posts } from "../../data/postData";
import { BodyText, Subhead } from "#/components/Typography/Typography";
import Link from "next/link";

export default function Home() {
  return (
    <main className={styles.pageWrapper}>
      <BodyText className={styles.introParagraph} textAlignment="center" variant="6">
        {`This months site fees are paid for by:`}
      </BodyText>
      <div className={styles.sponsorWrapper}>
        <a className={styles.sponsorLogo} href="http://venomskate.com/">
          <VenomLogo customWidth={150} />
        </a>
        <a className={styles.sponsorLogo} href="https://www.mids4life.com/">
          <MidsLogo customWidth={85} />
        </a>
      </div>
      <BodyText className={styles.introParagraph} textAlignment="center" variant="6">
        {`After a non-trivial amount of work scraping snapshots of the old site, we've managed to piece together the most comprehensive collection of the original content. There are still some gaps in content, like old video links that are no longer available from the original brans (many of which no longer exist). You can always get straight to the videos with either our shuffle feature, or the video archive in our main navigation. But please go explore all the words and images the original housemates worked so hard to produce for our then-exploding community!`}
      </BodyText>
      <div className={styles.altNavWrapper}>
        <BodyText variant="6">{`Or browse by:`}</BodyText>
        <Link href="/categories"><Subhead variant="5">Categories</Subhead></Link>
        <Link href="/tags"><Subhead variant="5">Tags</Subhead></Link>
      </div>
      <PostFeed posts={posts} />
    </main>
  );
}
