import type { Metadata } from 'next'
import '../styles/globals.css'

export const metadata: Metadata = {
  title: 'VerseVibes — Where Words Come Alive',
  description: 'A cinematic premium community platform for the VerseVibes family. Connect, chat, and vibe together with poetry and stories.',
  openGraph: {
    title: 'VerseVibes',
    description: 'Where Words Come Alive',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-theme="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,700;1,400;1,500&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://api.fontshare.com/v2/css?f[]=satoshi@300,400,500,600,700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <div className="gradient-orb-1" aria-hidden="true" />
        <div className="gradient-orb-2" aria-hidden="true" />
        {children}
      </body>
    </html>
  )
}
