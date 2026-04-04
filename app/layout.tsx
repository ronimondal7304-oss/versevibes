import type { Metadata } from "next"
import "../styles/globals.css"

export const metadata: Metadata = {
  title: "VerseVibes — Where Words Come Alive",
  description: "A premium community platform for the VerseVibes family. Connect, chat, and vibe together.",
  openGraph: {
    title: "VerseVibes — Where Words Come Alive",
    description: "Connect, chat, and vibe with the VerseVibes community.",
    type: "website",
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-theme="dark">
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
        <div className="gradient-orb-1" />
        <div className="gradient-orb-2" />
        {children}
      </body>
    </html>
  )
}
