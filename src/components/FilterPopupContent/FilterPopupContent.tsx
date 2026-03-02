import React from 'react';
import styles from './FilterPopupContent.module.css';
import { BodyText, Headline } from '@/components/Typography';
import CheckIcon from '@/components/enhancedSvg/svgs/CheckIcon';

interface FilterPopupContentProps {
  sortedTags: string[];
  sortedCategories: string[];
  selectedTags: Set<string>;
  selectedCategories: Set<string>;
  onToggleTag: (tag: string) => void;
  onToggleCategory: (category: string) => void;
}

const FilterPopupContent: React.FC<FilterPopupContentProps> = ({
  sortedTags,
  sortedCategories,
  selectedTags,
  selectedCategories,
  onToggleTag,
  onToggleCategory,
}) => {
  const orderedTags = [...sortedTags].sort((a, b) => {
    const aSelected = selectedTags.has(a) ? 0 : 1;
    const bSelected = selectedTags.has(b) ? 0 : 1;
    return aSelected - bSelected || a.localeCompare(b);
  });

  const orderedCategories = [...sortedCategories].sort((a, b) => {
    const aSelected = selectedCategories.has(a) ? 0 : 1;
    const bSelected = selectedCategories.has(b) ? 0 : 1;
    return aSelected - bSelected || a.localeCompare(b);
  });

  return (
    <div className={styles.filterPopup}>
      <div className={styles.filterColumns}>
        <div className={styles.filterColumn}>
          <Headline as="h2" variant="7">Tags</Headline>
          <div className={styles.checkboxList}>
            {orderedTags.map((tag) => (
            <div
              className={styles.checkboxItem}
              key={tag}
              onClick={() => onToggleTag(tag)}
            >
              <div className={`${styles.checkboxIcon} ${selectedTags.has(tag) ? styles.checkboxIconChecked : ''}`}>
                {selectedTags.has(tag) && <CheckIcon size="small" fill="#fff" />}
              </div>
              <BodyText variant="5">{tag}</BodyText>
            </div>
            ))}
          </div>
        </div>
        <div className={styles.filterColumn}>
          <Headline as="h2" variant="7">Categories</Headline>
          <div className={styles.checkboxList}>
            {orderedCategories.map((category) => (
            <div
              className={styles.checkboxItem}
              key={category}
              onClick={() => onToggleCategory(category)}
            >
              <div className={`${styles.checkboxIcon} ${selectedCategories.has(category) ? styles.checkboxIconChecked : ''}`}>
                {selectedCategories.has(category) && <CheckIcon size="small" fill="#fff" />}
              </div>
              <BodyText variant="5">{category}</BodyText>
            </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterPopupContent;
