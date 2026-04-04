'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'
import type { User } from '@supabase/supabase-js'
import { motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'

function VerseVibesLogo() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-label="VerseVibes logo">
      <defs>
        <linearGradient id="vv-grad" x1="0" y1="0" x2="32" y2="32" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#a855f7" />
          <stop offset="100%" stopColor="#f59e0b" />
        </linearGradient>
      </defs>
      <path d="M4 8 L11 22 L16 12 L21 22 L28 8" stroke="url(#vv-grad)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      <circle cx="16" cy="27" r="1.5" fill="url(#vv-grad)" />
    </svg>
  )
}

export function Navbar() {
  const [user, setUser] = useState<User | null>(null)
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const supabase = createClient()

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setUser(data.user))
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_e, session) => {
      setUser(session?.user ?? null)
    })
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => { subscription.unsubscribe(); window.removeEventListener('scroll', onScroll) }
  }, [])

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'glass py-3 shadow-lg' : 'py-5'}`}
    >
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5">
          <VerseVibesLogo />
          <span className="font-display text-lg text-white font-medium">VerseVibes</span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {[['#about', 'About'], ['#featured', 'Content'], ['#community', 'Community']].map(([href, label]) => (
            <a key={href} href={href} className="text-sm text-[#8888a8] hover:text-white transition-colors duration-200">{label}</a>
          ))}
          <a href="https://youtube.com/@vv_versevibes" target="_blank" rel="noopener noreferrer" className="text-sm text-[#8888a8] hover:text-amber-400 transition-colors duration-200">YouTube ↗</a>
        </div>

        <div className="hidden md:flex items-center gap-3">
          {user ? (
            <Link href="/community" className="btn-primary px-5 py-2 rounded-full text-white text-sm font-medium">Enter Community</Link>
          ) : (
            <>
              <Link href="/auth" className="text-sm text-[#8888a8] hover:text-white transition-colors">Sign in</Link>
              <Link href="/auth" className="btn-primary px-5 py-2 rounded-full text-white text-sm font-medium">Join Free</Link>
            </>
          )}
        </div>

        <button onClick={() => setMobileOpen(!mobileOpen)} className="md:hidden text-white" aria-label="Toggle menu">
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {mobileOpen && (
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="md:hidden glass border-t border-white/5 px-6 py-4 space-y-4">
          {[['#about', 'About'], ['#featured', 'Content'], ['#community', 'Community']].map(([href, label]) => (
            <a key={href} href={href} onClick={() => setMobileOpen(false)} className="block text-sm text-[#8888a8] hover:text-white py-1">{label}</a>
          ))}
          <Link href="/auth" className="block btn-primary px-5 py-2.5 rounded-full text-white text-sm font-medium text-center">{user ? 'Enter Community' : 'Join Free'}</Link>
        </motion.div>
      )}
    </motion.nav>
  )
}
