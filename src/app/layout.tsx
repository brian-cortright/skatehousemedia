import React from 'react';
import Script from 'next/script'
import './globals.css'
import ClientLayout from '@/components/ClientLayout'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'SkateHouseMedia',
  description: 'Archival preservation of SkateHouseMedia',
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
