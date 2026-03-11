import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Categories — SkateHouseMedia',
  description: 'Browse all post categories on SkateHouseMedia — downhill skateboarding event coverage, rider profiles, road trips, and more.',
};

export default function CategoriesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
