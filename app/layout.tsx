import type { Metadata } from 'next'
import '../styles/globals.css'

export const metadata: Metadata = {
  title: 'VerseVibes — Where Words Come Alive',
  description: 'A cinematic community platform for the VerseVibes family. Connect, chat, and vibe together in real-time.',
  keywords: ['VerseVibes', 'poetry', 'community', 'chat', 'YouTube'],
  openGraph: {
    title: 'VerseVibes — Where Words Come Alive',
    description: 'A cinematic community platform for poetry and storytelling lovers.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://api.fontshare.com/v2/css?f[]=satoshi@300,400,500,700&display=swap"
          rel="stylesheet"
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,700;1,400;1,500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <div className="orb-1" aria-hidden="true" />
        <div className="orb-2" aria-hidden="true" />
        <div className="orb-3" aria-hidden="true" />
        {children}
      </body>
    </html>
  )
}
