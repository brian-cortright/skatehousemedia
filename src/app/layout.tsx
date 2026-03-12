import React from 'react';
import Script from 'next/script'
import './globals.css'
import ClientLayout from '@/components/ClientLayout'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  metadataBase: new URL('https://skatehousemedia.com'),
  title: 'SkateHouseMedia',
  description: 'Downhill skateboarding videos, event coverage, rider profiles, and community content since 2009',
  openGraph: {
    title: 'SkateHouseMedia',
    description: 'Downhill skateboarding videos, event coverage, rider profiles, and community content since 2009',
    url: 'https://skatehousemedia.com',
    siteName: 'SkateHouseMedia',
    images: [
      {
        url: '/shm-logo.png',
        width: 1200,
        height: 1000,
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6675084090356256"
          crossOrigin="anonymous"
        />
        {/* Google tag (gtag.js) */}
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-CDE91JNNEE"
        />
      </head>
      <body>
        <Script
          id="gtag-init"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-CDE91JNNEE');
            `,
          }}
        />
        <ClientLayout>
          {children}
        </ClientLayout>
      </body>
    </html>
  )
}
