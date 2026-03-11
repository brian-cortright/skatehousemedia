import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Service — SkateHouseMedia',
  description: 'Terms of Service for SkateHouseMedia.com — the rules and guidelines governing your use of the site.',
};

export default function TermsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
