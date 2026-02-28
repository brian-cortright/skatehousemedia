'use client'
import styles from './SearchBar.module.css';

export const SearchBar = ({ value, onChange }) => {
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
