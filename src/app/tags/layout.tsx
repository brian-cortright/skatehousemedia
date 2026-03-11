import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Tags — SkateHouseMedia',
  description: 'Browse all post tags on SkateHouseMedia — find content by rider, event, location, and more.',
};

export default function TagsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
