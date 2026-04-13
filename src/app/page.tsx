"use client";
import React, { useState, useCallback, useRef } from 'react';
import styles from "./home.module.css";
import PostFeed from "@/components/PostFeed/PostFeed";
import FeaturedPost from "@/components/FeaturedPost/FeaturedPost";
import { fetchPosts, fetchPostCount, fetchTaxonomy } from "@/lib/sanity";
import { useSanityQuery } from "@/hooks/useSanity";
import SearchBar from '@/components/SearchBar';
import Button from '@/components/Button';
import FilterIcon from '@/components/enhancedSvg/svgs/FilterIcon';
import CloseIcon from '@/components/enhancedSvg/svgs/CloseIcon';
import { Headline, BodyText } from '@/components/Typography';
import { usePopup } from '@/components/Popup/PopupContext';
import FilterPopupContent from '@/components/FilterPopupContent/FilterPopupContent';
import type { Post } from '@/types';

const PAGE_SIZE = 20;

export default function Home() {
  const [searchInput, setSearchInput] = useState("");
  const [selectedTags, setSelectedTags] = useState<Set<string>>(new Set());
  const [selectedCategories, setSelectedCategories] = useState<Set<string>>(new Set());
  const [page, setPage] = useState(0);
  const [allPosts, setAllPosts] = useState<Post[]>([]);
  const { openPopup } = usePopup();

  const selectedTagsRef = useRef(selectedTags);
  selectedTagsRef.current = selectedTags;
  const selectedCategoriesRef = useRef(selectedCategories);
  selectedCategoriesRef.current = selectedCategories;

  // Fetch initial posts
  const { loading: postsLoading } = useSanityQuery(async () => {
    const posts = await fetchPosts(0, PAGE_SIZE);
    setAllPosts(posts);
    return posts;
  }, []);

  // Fetch total count for "load more"
  const { data: totalCount } = useSanityQuery(() => fetchPostCount(), []);

  // Fetch taxonomy for filters
  const { data: taxonomy } = useSanityQuery(() => fetchTaxonomy(), []);

  const sortedCategories = taxonomy
    ? [...taxonomy.categories].filter(Boolean).sort((a, b) => a.localeCompare(b))
    : [];
  const sortedTags = taxonomy
    ? [...taxonomy.tags].filter(Boolean).sort((a, b) => a.localeCompare(b))
    : [];

  const loadMorePosts = async () => {
    const nextPage = page + 1;
    const morePosts = await fetchPosts(nextPage, PAGE_SIZE);
    setAllPosts((prev) => [...prev, ...morePosts]);
    setPage(nextPage);
  };

  const filterPosts = useCallback(() => {
    return allPosts.filter((post) => {
      const matchesSearch = searchInput === "" ||
        post.title.toLowerCase().includes(searchInput.toLowerCase());

      const matchesTags = selectedTags.size === 0 ||
        post.tags?.some((tag) => selectedTags.has(tag));

      const matchesCategories = selectedCategories.size === 0 ||
        post.categories?.some((cat) => selectedCategories.has(cat));

      return matchesSearch && matchesTags && matchesCategories;
    });
  }, [searchInput, selectedTags, selectedCategories, allPosts]);

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
  const hasMore = totalCount ? allPosts.length < totalCount : false;

  if (postsLoading) {
    return <main className={styles.pageWrapper}></main>;
  }

  return (
    <main className={styles.pageWrapper}>
      <FeaturedPost posts={allPosts} />
      <Headline className={styles.postFeedTitle} as='h2' variant='6'>Posts</Headline>
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
      {hasMore && !hasActiveFilters && (
        <div style={{ display: 'flex', justifyContent: 'center', margin: 'var(--spacing-medium_300) 0' }}>
          <Button handleClick={loadMorePosts} mode="dark">
            Load More Posts
          </Button>
        </div>
      )}
    </main>
  );
}
