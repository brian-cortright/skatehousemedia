"use client";
import React, { useState } from 'react';
import styles from "./home.module.css";
import PostFeed from "@/components/PostFeed/PostFeed";
import { posts } from "../../data/postData";
import SearchBar from '@/components/SearchBar';
import Button from '@/components/Button';
import FilterIcon from '@/components/enhancedSvg/svgs/FilterIcon';
import { BodyText } from '@/components/Typography';

export default function Home() {
  const [searchInput, setSearchInput] = useState("");
  const [filteredPosts, setFilteredPosts] = useState(posts);

  const filterPosts = (searchTerm: string) => {
    const filtered = posts.filter((post) => {
      return post.pageTitle.toLowerCase().includes(searchTerm.toLowerCase());
    });
    setFilteredPosts(filtered);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
    filterPosts(e.target.value);
  };

  return (
    <main className={styles.pageWrapper}>
      <div className={styles.searchWrapper}>
        <Button>
          <FilterIcon />
          <BodyText variant="5">Filter</BodyText>
        </Button>
        <SearchBar value={searchInput} onChange={handleSearch}/>
      </div>
      <PostFeed posts={filteredPosts} />
    </main>
  );
}
