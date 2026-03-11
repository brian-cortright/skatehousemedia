"use client";
import React, { useState, useCallback, useRef } from "react";
import { posts } from "../../../data/postData";
import { featuredVideosTaxonomy } from "../../../data/taxonomy";
import styles from "./videos.module.css";
import { Headline, BodyText } from "@/components/Typography/Typography";
import VideoCard from "@/components/VideoCard/VideoCard";
import LazyWrapper from "@/components/LazyWrapper/LazyWrapper";
import SearchBar from "@/components/SearchBar/SearchBar";
import Button from "@/components/Button";
import FilterIcon from "@/components/enhancedSvg/svgs/FilterIcon";
import CloseIcon from "@/components/enhancedSvg/svgs/CloseIcon";
import { usePopup } from "@/components/Popup/PopupContext";
import FilterPopupContent from "@/components/FilterPopupContent/FilterPopupContent";
import Script from "next/script";
import slugify from "@/utils/slugify";
import type { Post, Taxonomy } from "@/types";

const videoPosts = posts.filter((p: Post) => p.featuredVideo);

const Archive: React.FC = () => {
  const [searchInput, setSearchInput] = useState("");
  const [selectedTags, setSelectedTags] = useState<Set<string>>(new Set());
  const [selectedCategories, setSelectedCategories] = useState<Set<string>>(new Set());
  const { openPopup } = usePopup();

  const selectedTagsRef = useRef(selectedTags);
  selectedTagsRef.current = selectedTags;
  const selectedCategoriesRef = useRef(selectedCategories);
  selectedCategoriesRef.current = selectedCategories;

  const sortedCategories = [...(featuredVideosTaxonomy as Taxonomy).categories].sort((a, b) => a.localeCompare(b));
  const sortedTags = [...(featuredVideosTaxonomy as Taxonomy).tags].sort((a, b) => a.localeCompare(b));

  const filterVideos = useCallback(() => {
    return videoPosts.filter((post) => {
      const matchesSearch = searchInput === "" ||
        post.pageTitle.toLowerCase().includes(searchInput.toLowerCase());

      const matchesTags = selectedTags.size === 0 ||
        (post as Post).tags?.some((tag) => selectedTags.has(tag));

      const matchesCategories = selectedCategories.size === 0 ||
        (post as Post).categories?.some((cat) => selectedCategories.has(cat));

      return matchesSearch && matchesTags && matchesCategories;
    });
  }, [searchInput, selectedTags, selectedCategories]);

  const filteredVideos = filterVideos();

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
  };

  const removeTag = (tag: string) => {
    const next = new Set(selectedTags);
    next.delete(tag);
    setSelectedTags(next);
  };

  const removeCategory = (category: string) => {
    const next = new Set(selectedCategories);
    next.delete(category);
    setSelectedCategories(next);
  };

  const showFilterPopup = useCallback((tags: Set<string>, categories: Set<string>) => {
    const onToggleTag = (tag: string) => {
      const next = new Set(selectedTagsRef.current);
      if (next.has(tag)) next.delete(tag);
      else next.add(tag);
      setSelectedTags(next);
      showFilterPopup(next, selectedCategoriesRef.current);
    };

    const onToggleCategory = (category: string) => {
      const next = new Set(selectedCategoriesRef.current);
      if (next.has(category)) next.delete(category);
      else next.add(category);
      setSelectedCategories(next);
      showFilterPopup(selectedTagsRef.current, next);
    };

    openPopup({
      maxWidth: "900px",
      padding: "var(--spacing-medium_300)",
      children: (
        <FilterPopupContent
          sortedTags={sortedTags}
          sortedCategories={sortedCategories}
          selectedTags={tags}
          selectedCategories={categories}
          onToggleTag={onToggleTag}
          onToggleCategory={onToggleCategory}
        />
      ),
    });
  }, [openPopup, sortedTags, sortedCategories]);

  const handleFilterClick = () => {
    showFilterPopup(selectedTags, selectedCategories);
  };

  const hasActiveFilters = selectedTags.size > 0 || selectedCategories.size > 0;

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
        <BodyText className={styles.introText} margin="0 auto var(--spacing-medium_100) auto" textAlignment='center' variant="5">{`We've pulled all of the videos from the blog posts to make things easier to watch and search through. Use the search bar to find your favorites, or filter by tags and categories.`}</BodyText>
        <div className={styles.searchWrapper}>
          <Button handleClick={handleFilterClick}>
            <FilterIcon />
            <BodyText color="var(--color-grey-50)" variant="5">Filter</BodyText>
          </Button>
          <SearchBar value={searchInput} onChange={handleSearch} />
        </div>
        {hasActiveFilters && (
          <div className={styles.activeFilters}>
            {[...selectedTags].map((tag) => (
              <button
                key={`tag-${tag}`}
                className={styles.filterPill}
                onClick={() => removeTag(tag)}
              >
                <BodyText variant="5">{tag}</BodyText>
                <CloseIcon fill="var(--color-grey-800)" size="small" />
              </button>
            ))}
            {[...selectedCategories].map((category) => (
              <button
                key={`cat-${category}`}
                className={styles.filterPill}
                onClick={() => removeCategory(category)}
              >
                <BodyText variant="5">{category}</BodyText>
                <CloseIcon fill="var(--color-grey-800)" size="small" />
              </button>
            ))}
          </div>
        )}
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
