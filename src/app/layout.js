import Script from 'next/script'
import './globals.css'
import StyledComponentsRegistry from './registry'

export const metadata = {
  title: 'SkateHouseMedia',
  description: 'Archival preservation of SkateHouseMedia',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6675084090356256"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
      </head>
      <body>
        <StyledComponentsRegistry>
          {children}
        </StyledComponentsRegistry>
      </body>
    </html>
  )
}
