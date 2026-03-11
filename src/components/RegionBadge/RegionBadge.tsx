import React from 'react';
import styles from './RegionBadge.module.css';

interface RegionBadgeProps {
  region: string;
}

const RegionBadge: React.FC<RegionBadgeProps> = ({ region }) => {
  return (
    <span className={styles.regionBadge}>{region}</span>
  );
};

export default RegionBadge;
