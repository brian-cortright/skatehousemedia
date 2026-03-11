import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy — SkateHouseMedia',
  description: 'Privacy Policy for SkateHouseMedia.com — how we collect, use, and protect your information.',
};

export default function PrivacyPolicyLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
