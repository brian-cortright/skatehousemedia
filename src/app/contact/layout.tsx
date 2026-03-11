import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Us — SkateHouseMedia',
  description: 'Get in touch with SkateHouseMedia — questions, content inquiries, collaboration ideas, or site issues.',
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
