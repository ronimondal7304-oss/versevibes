'use client'
import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import Link from 'next/link'

export default function AuthPage() {
  const [mode, setMode] = useState<'signin' | 'signup'>('signin')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [isError, setIsError] = useState(false)
  const supabase = createClient()
  const router = useRouter()

  const handleGitHub = async () => {
    setLoading(true)
    await supabase.auth.signInWithOAuth({
      provider: 'github',
      options: { redirectTo: `${window.location.origin}/auth/callback` },
    })
  }

  const handleEmail = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setMessage('')
    setIsError(false)
    if (mode === 'signup') {
      const { error } = await supabase.auth.signUp({ email, password })
      if (error) { setMessage(error.message); setIsError(true) }
      else setMessage('Check your email to confirm your account!')
    } else {
      const { error } = await supabase.auth.signInWithPassword({ email, password })
      if (error) { setMessage(error.message); setIsError(true) }
      else router.push('/community')
    }
    setLoading(false)
  }

  return (
    <main className="min-h-screen flex items-center justify-center px-6 relative z-10 py-24">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-md"
      >
        <div className="glass-bright rounded-3xl p-8">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 mb-8 group">
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-label="VerseVibes">
              <defs>
                <linearGradient id="vv-auth" x1="0" y1="0" x2="32" y2="32" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="#a855f7" />
                  <stop offset="100%" stopColor="#f59e0b" />
                </linearGradient>
              </defs>
              <path d="M4 8 L11 22 L16 12 L21 22 L28 8" stroke="url(#vv-auth)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
              <circle cx="16" cy="27" r="1.5" fill="url(#vv-auth)" />
            </svg>
            <span style={{ fontFamily: 'var(--font-display)' }} className="text-xl text-white font-medium">VerseVibes</span>
          </Link>

          <h1 style={{ fontFamily: 'var(--font-display)' }} className="text-3xl text-white mb-2">
            {mode === 'signin' ? 'Welcome back' : 'Join the vibe'}
          </h1>
          <p className="mb-8" style={{ color: 'var(--color-vv-text-muted)', fontSize: 'var(--text-sm)' }}>
            {mode === 'signin' ? 'Sign in to your account' : 'Create your free account and start vibing'}
          </p>

          {/* GitHub */}
          <button
            onClick={handleGitHub}
            disabled={loading}
            className="btn-ghost w-full py-3 rounded-xl text-white font-medium mb-6 gap-3"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
            </svg>
            Continue with GitHub
          </button>

          <div className="flex items-center gap-3 mb-6">
            <div className="flex-1 h-px" style={{ background: 'rgba(255,255,255,0.06)' }} />
            <span style={{ color: 'var(--color-vv-text-faint)', fontSize: 'var(--text-xs)' }}>or continue with email</span>
            <div className="flex-1 h-px" style={{ background: 'rgba(255,255,255,0.06)' }} />
          </div>

          <form onSubmit={handleEmail} className="space-y-4">
            <div>
              <label className="block font-medium mb-1.5" style={{ color: 'var(--color-vv-text-muted)', fontSize: 'var(--text-xs)' }}>Email</label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
                className="w-full rounded-xl px-4 py-3 text-white transition-colors"
                style={{
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  fontSize: 'var(--text-sm)',
                  outline: 'none',
                }}
                onFocus={e => e.target.style.borderColor = 'rgba(124,58,237,0.5)'}
                onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.08)'}
              />
            </div>
            <div>
              <label className="block font-medium mb-1.5" style={{ color: 'var(--color-vv-text-muted)', fontSize: 'var(--text-xs)' }}>Password</label>
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                minLength={8}
                className="w-full rounded-xl px-4 py-3 text-white transition-colors"
                style={{
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  fontSize: 'var(--text-sm)',
                  outline: 'none',
                }}
                onFocus={e => e.target.style.borderColor = 'rgba(124,58,237,0.5)'}
                onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.08)'}
              />
            </div>

            {message && (
              <p className="text-xs px-3 py-2 rounded-lg" style={{
                color: isError ? '#f87171' : '#4ade80',
                background: isError ? 'rgba(248,113,113,0.1)' : 'rgba(74,222,128,0.1)',
              }}>
                {message}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full py-3 rounded-xl text-white font-medium"
              style={{ fontSize: 'var(--text-sm)' }}
            >
              {loading ? 'Loading...' : mode === 'signin' ? 'Sign In' : 'Create Account'}
            </button>
          </form>

          <p className="text-center mt-6" style={{ color: 'var(--color-vv-text-muted)', fontSize: 'var(--text-sm)' }}>
            {mode === 'signin' ? "Don't have an account? " : 'Already have an account? '}
            <button
              onClick={() => { setMode(mode === 'signin' ? 'signup' : 'signin'); setMessage('') }}
              className="font-medium transition-colors"
              style={{ color: 'var(--color-vv-violet-bright)' }}
            >
              {mode === 'signin' ? 'Sign up free' : 'Sign in'}
            </button>
          </p>
        </div>
      </motion.div>
    </main>
  )
}
