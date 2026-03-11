import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Shuffle — SkateHouseMedia',
  description: 'Shuffle through random SkateHouseMedia videos — sit back, relax, and let the clips play.',
};

export default function ShuffleLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
