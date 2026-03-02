"use client";
import React, { useState } from 'react';
import styles from "./home.module.css";
import PostFeed from "@/components/PostFeed/PostFeed";
import { posts } from "../../data/postData";
import SearchBar from '@/components/SearchBar';
import { BodyText, Subhead } from "@/components/Typography/Typography";
import Link from "next/link";

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
      <SearchBar value={searchInput} onChange={handleSearch}/>
      {/* facets go here */}
      <PostFeed posts={filteredPosts} />
    </main>
  );
}
