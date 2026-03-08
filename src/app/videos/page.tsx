"use client";
import React, { useState } from "react";
import { posts } from "../../../data/postData";
import styles from "./videos.module.css";
import { Headline, BodyText } from "@/components/Typography/Typography";
import VideoCard from "@/components/VideoCard/VideoCard";
import LazyWrapper from "@/components/LazyWrapper/LazyWrapper";
import SearchBar from "@/components/SearchBar/SearchBar";
import Script from "next/script";
import slugify from "@/utils/slugify";
import type { Post } from "@/types";

const videoPosts = posts.filter((p: Post) => p.featuredVideo);

const Archive: React.FC = () => {
  const [searchInput, setSearchInput] = useState("");
  const [filteredVideos, setFilteredVideos] = useState<Post[]>(videoPosts);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchTerm = e.target.value;
    setSearchInput(searchTerm);
    filterVideos(searchTerm);
  };

  const filterVideos = (searchTerm: string) => {
    const filtered = videoPosts.filter((post) =>
      post.pageTitle.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredVideos(filtered);
  };

  return (
    <>
      <main className={styles.pageWrapper}>
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6675084090356256"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
        <ins
          className="adsbygoogle banner"
          data-ad-client="ca-pub-6675084090356256"
          data-ad-slot="4725789316"
          data-ad-format="auto"
          data-full-width-responsive="true"
        />
        <Script id="adsense-init" strategy="afterInteractive">
          {`(adsbygoogle = window.adsbygoogle || []).push({});`}
        </Script>
        <Headline
          as="h1"
          margin="0 auto var(--spacing-medium_300) auto"
          textAlignment="center"
          variant="5"
        >
          Just the videos
        </Headline>
        <BodyText margin="0 auto var(--spacing-medium_100) auto" textAlignment='center' variant="5">{`This is an incomplete collection of the SHM videos. These we're pulled from the hard drives of two housemates who were forward thinking enough to back up their content onto hard drives. Unfortunately, the original content was not linked to these videos and some assumptions had to be made about their titles based on file names. Try searching, and maybe you'll get lucky.`}</BodyText>
        <SearchBar value={searchInput} onChange={handleSearch} />
        {filteredVideos && filteredVideos.length > 0 && (
          <div className={styles.grid}>
            {filteredVideos.map((post, index) => {
              const slug = slugify(post.pageTitle);
              const thumbnail = post.thumbnail || '';
              const title = post.pageTitle;
              return (
                <LazyWrapper
                  enable={index > 9}
                  offset={0}
                  height={0}
                  key={`${title}-${index}`}
                >
                  <VideoCard slug={slug} thumbnail={thumbnail} title={title} />
                </LazyWrapper>
              );
            })}
          </div>
        )}
      </main>
    </>
  );
};

export default Archive;
