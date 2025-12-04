"use client";
import React, { useState } from "react";
import videos from "../../../data/videoData";
import { Grid, PageWrapper } from "./archive-styled";
import { Headline } from "#/components/Typography/Typography";
import BackButtonBar from "#/components/BackButtonBar";
import VideoCard from "#/components/VideoCard";
import LazyWrapper from "#/components/LazyWrapper/LazyWrapper";
import { basePadding } from "#/theme";
import SearchBar from "#/components/SearchBar/SearchBar";

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
      <BackButtonBar target={"/"} />
      <PageWrapper>
        <Headline
          as="h1"
          margin={`0 auto ${basePadding.xLarge} auto`}
          variant="3"
        >
          Archive
        </Headline>
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
