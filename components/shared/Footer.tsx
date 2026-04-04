import Link from 'next/link'

export function Footer() {
  return (
    <footer className="border-t border-white/5 py-12 px-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-2.5">
          <svg width="28" height="28" viewBox="0 0 32 32" fill="none" aria-label="VerseVibes logo">
            <defs>
              <linearGradient id="footer-grad" x1="0" y1="0" x2="32" y2="32" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#a855f7" />
                <stop offset="100%" stopColor="#f59e0b" />
              </linearGradient>
            </defs>
            <path d="M4 8 L11 22 L16 12 L21 22 L28 8" stroke="url(#footer-grad)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
            <circle cx="16" cy="27" r="1.5" fill="url(#footer-grad)" />
          </svg>
          <span className="font-display text-white font-medium">VerseVibes</span>
        </div>

        <div className="flex items-center gap-8 text-sm text-[#44445a]">
          <Link href="/community" className="hover:text-white transition-colors">Community</Link>
          <Link href="/auth" className="hover:text-white transition-colors">Sign In</Link>
          <a
            href="https://youtube.com/@vv_versevibes"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors"
          >
            YouTube
          </a>
        </div>

        <p className="text-xs text-[#44445a]">
          © {new Date().getFullYear()} VerseVibes. Made with soul.
        </p>
      </div>
    </footer>
  )
}
