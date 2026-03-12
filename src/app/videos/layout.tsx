import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Videos — SkateHouseMedia',
  description: 'Watch the SkateHouseMedia video library — downhill skateboarding raw runs, event recaps, rider profiles, and session edits.',
};

export default function VideosLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
