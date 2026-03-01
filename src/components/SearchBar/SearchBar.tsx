'use client'
import React from 'react';
import styles from './SearchBar.module.css';

interface SearchBarProps {
  value: string;
  onChange: (_e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({ value, onChange }) => {
  return (
    <input
      className={styles.searchInput}
      type="text"
      placeholder="Search by title"
      value={value}
      onChange={onChange}
    />
  );
};

export default SearchBar;
