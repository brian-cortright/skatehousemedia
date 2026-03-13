"use client";

import React, { useEffect, useState } from 'react';
import styles from './AdBanner.module.css';

export default function AdBanner() {
  const [adExperience, setAdExperience] = useState<string | null>(null);

  useEffect(() => {
    let currentExp = localStorage.getItem('adExperience');

    if (!currentExp) {
      currentExp = 'venom';
    }

    // Update local storage with what has been shown on that page view
    localStorage.setItem('adExperience', currentExp);
    setAdExperience(currentExp);
  }, []);

  if (!adExperience) {
    // Render an empty placeholder with the same class to avoid layout shift 
    // before client-side hydration completes, or return null.
    return <a href="#" className={styles.banner} />;
  }

  return (
    <a href="#" className={styles.banner} data-ad-experience={adExperience}></a>
  );
}
