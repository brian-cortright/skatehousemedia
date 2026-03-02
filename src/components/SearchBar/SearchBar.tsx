'use client'
import React from 'react';
import styles from './SearchBar.module.css';
import { SearchIcon } from '@/components/enhancedSvg/svgs';

interface SearchBarProps {
  value: string;
  onChange: (_e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({ value, onChange }) => {
  return (
    <div className={styles.searchWrapper}>
      <SearchIcon customWidth={20} className={styles.searchIcon} fill="var(--color-grey-800)" />
      <input
        className={styles.searchInput}
        type="text"
        placeholder="Search by title"
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default SearchBar;
