"use client";
import React, { useState, useCallback, useRef } from 'react';
import styles from "./home.module.css";
import PostFeed from "@/components/PostFeed/PostFeed";
import { posts } from "../../data/postData";
import { taxonomy } from "../../data/taxonomy";
import SearchBar from '@/components/SearchBar';
import Button from '@/components/Button';
import FilterIcon from '@/components/enhancedSvg/svgs/FilterIcon';
import CloseIcon from '@/components/enhancedSvg/svgs/CloseIcon';
import { BodyText } from '@/components/Typography';
import { usePopup } from '@/components/Popup/PopupContext';
import FilterPopupContent from '@/components/FilterPopupContent/FilterPopupContent';
import type { Post, Taxonomy } from '@/types';


export default function Home() {
  const [searchInput, setSearchInput] = useState("");
  const [selectedTags, setSelectedTags] = useState<Set<string>>(new Set());
  const [selectedCategories, setSelectedCategories] = useState<Set<string>>(new Set());
  const { openPopup } = usePopup();

  const selectedTagsRef = useRef(selectedTags);
  selectedTagsRef.current = selectedTags;
  const selectedCategoriesRef = useRef(selectedCategories);
  selectedCategoriesRef.current = selectedCategories;

  const sortedCategories = [...(taxonomy as Taxonomy).categories].sort((a, b) => a.localeCompare(b));
  const sortedTags = [...(taxonomy as Taxonomy).tags].sort((a, b) => a.localeCompare(b));

  const filterPosts = useCallback(() => {
    return posts.filter((post) => {
      const matchesSearch = searchInput === "" ||
        post.pageTitle.toLowerCase().includes(searchInput.toLowerCase());

      const matchesTags = selectedTags.size === 0 ||
        (post as Post).tags?.some((tag) => selectedTags.has(tag));

      const matchesCategories = selectedCategories.size === 0 ||
        (post as Post).categories?.some((cat) => selectedCategories.has(cat));

      return matchesSearch && matchesTags && matchesCategories;
    });
  }, [searchInput, selectedTags, selectedCategories]);

  const filteredPosts = filterPosts();

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
    <main className={styles.pageWrapper}>
      <div className={styles.searchWrapper}>
        <Button handleClick={handleFilterClick}>
          <FilterIcon />
          <BodyText color="var(--color-grey-50)" variant="5">Filter</BodyText>
        </Button>
        <SearchBar value={searchInput} onChange={handleSearch}/>
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
      <PostFeed posts={filteredPosts} />
    </main>
  );
}
