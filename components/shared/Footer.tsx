import Link from 'next/link'

export function Footer() {
  return (
    <footer
      className="px-6 py-12 border-t"
      style={{ borderColor: 'rgba(255,255,255,0.05)' }}
    >
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2.5">
            <svg width="28" height="28" viewBox="0 0 32 32" fill="none" aria-label="VerseVibes logo">
              <defs>
                <linearGradient id="vv-footer-grad" x1="0" y1="0" x2="32" y2="32" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="#a855f7" />
                  <stop offset="100%" stopColor="#f59e0b" />
                </linearGradient>
              </defs>
              <path d="M4 8 L11 22 L16 12 L21 22 L28 8" stroke="url(#vv-footer-grad)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
              <circle cx="16" cy="27" r="1.5" fill="url(#vv-footer-grad)" />
            </svg>
            <span style={{ fontFamily: 'Playfair Display, Georgia, serif', color: 'white' }} className="text-lg">
              VerseVibes
            </span>
          </div>

          <div className="flex items-center gap-8">
            <Link href="/community" className="text-sm transition-colors" style={{ color: '#8888a8' }}>Community</Link>
            <a
              href="https://youtube.com/@vv_versevibes"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm transition-colors"
              style={{ color: '#8888a8' }}
            >
              YouTube
            </a>
            <Link href="/auth" className="text-sm transition-colors" style={{ color: '#8888a8' }}>Sign In</Link>
          </div>

          <p className="text-xs" style={{ color: '#44445a' }}>
            &copy; {new Date().getFullYear()} VerseVibes. Made with ✶ and poetry.
          </p>
        </div>
      </div>
    </footer>
  )
}
