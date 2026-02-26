"use client";
import React, { useState } from "react";
import videos from "../../../data/videoData";
import { Grid, PageWrapper } from "./archive-styled";
import { Headline, BodyText } from "#/components/Typography/Typography";
import VideoCard from "#/components/VideoCard";
import LazyWrapper from "#/components/LazyWrapper/LazyWrapper";
import { basePadding } from "#/theme";
import SearchBar from "#/components/SearchBar/SearchBar";
import Script from "next/script";

const Archive = () => {
  const [searchInput, setSearchInput] = useState("");
  const [filteredVideos, setFilteredVideos] = useState(videos);

  const handleSearch = (e) => {
    const searchTerm = e.target.value;
    setSearchInput(searchTerm);
    filterVideos(searchTerm);
  };

  const filterVideos = (searchTerm) => {
    const filtered = videos.filter((video) =>
      video.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredVideos(filtered);
  };

  return (
    <>
      <PageWrapper>
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
          margin={`0 auto ${basePadding.xLarge} auto`}
          textAlignment="center"
          variant="5"
        >
          Just the videos
        </Headline>
        <BodyText margin={`0 auto ${basePadding.medium} auto`} textAlignment='center' variant="5">{`This is an incomplete collection of the SHM videos. These we're pulled from the hard drives of two housemates who were forward thinking enough to back up their content onto hard drives. Unfortunately, the original content was not linked to these videos and some assumptions had to be made about their titles based on file names. Try searching, and maybe you'll get lucky.`}</BodyText>
        <SearchBar value={searchInput} onChange={handleSearch} />
        {filteredVideos && filteredVideos.length > 0 && (
          <Grid>
            {filteredVideos.map((video, index) => {
              const { slug, thumbnail, title } = video;
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
          </Grid>
        )}
      </PageWrapper>
    </>
  );
};

export default Archive;
