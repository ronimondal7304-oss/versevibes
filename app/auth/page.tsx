'use client'
import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { Github, ArrowLeft } from 'lucide-react'

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
    <main className="min-h-screen flex items-center justify-center px-6 relative z-10">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-md"
      >
        <Link href="/" className="inline-flex items-center gap-2 text-sm text-[#8888a8] hover:text-white mb-8 transition-colors">
          <ArrowLeft size={16} />
          Back to home
        </Link>

        <div className="glass-bright rounded-3xl p-8">
          <div className="flex items-center gap-2.5 mb-8">
            <VerseVibesLogoSmall />
            <span style={{ fontFamily: 'var(--font-display, Georgia, serif)' }} className="text-xl text-white font-medium">VerseVibes</span>
          </div>

          <h1 style={{ fontFamily: 'var(--font-display, Georgia, serif)' }} className="text-3xl text-white mb-2">
            {mode === 'signin' ? 'Welcome back' : 'Join the vibe'}
          </h1>
          <p className="text-[#8888a8] text-sm mb-8">
            {mode === 'signin' ? 'Sign in to enter the community' : 'Create your free account today'}
          </p>

          <button
            onClick={handleGitHub}
            disabled={loading}
            className="w-full flex items-center justify-center gap-3 py-3 rounded-xl glass hover:border-violet-500/30 transition-all text-white font-medium mb-6 disabled:opacity-50"
          >
            <Github size={18} />
            Continue with GitHub
          </button>

          <div className="flex items-center gap-3 mb-6">
            <div className="flex-1 h-px" style={{ background: 'rgba(255,255,255,0.05)' }} />
            <span className="text-xs text-[#44445a]">or continue with email</span>
            <div className="flex-1 h-px" style={{ background: 'rgba(255,255,255,0.05)' }} />
          </div>

          <form onSubmit={handleEmail} className="space-y-4">
            <div>
              <label className="block text-xs text-[#8888a8] mb-1.5 font-medium">Email</label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
                className="w-full rounded-xl px-4 py-3 text-white text-sm focus:outline-none transition-colors"
                style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}
              />
            </div>
            <div>
              <label className="block text-xs text-[#8888a8] mb-1.5 font-medium">Password</label>
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                minLength={8}
                className="w-full rounded-xl px-4 py-3 text-white text-sm focus:outline-none transition-colors"
                style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}
              />
            </div>
            {message && (
              <p className={`text-xs px-3 py-2 rounded-lg ${
                isError ? 'text-rose-400 bg-rose-400/10' : 'text-green-400 bg-green-400/10'
              }`}>
                {message}
              </p>
            )}
            <button
              type="submit"
              disabled={loading}
              className="w-full btn-primary py-3 rounded-xl text-white font-medium disabled:opacity-50"
            >
              {loading ? 'Loading...' : mode === 'signin' ? 'Sign In' : 'Create Account'}
            </button>
          </form>

          <p className="text-center text-sm text-[#8888a8] mt-6">
            {mode === 'signin' ? "Don't have an account? " : 'Already have an account? '}
            <button
              onClick={() => { setMode(mode === 'signin' ? 'signup' : 'signin'); setMessage('') }}
              className="text-violet-400 hover:text-violet-300 transition-colors font-medium"
            >
              {mode === 'signin' ? 'Sign up free' : 'Sign in'}
            </button>
          </p>
        </div>
      </motion.div>
    </main>
  )
}

function VerseVibesLogoSmall() {
  return (
    <svg width="28" height="28" viewBox="0 0 32 32" fill="none" aria-label="VerseVibes">
      <defs>
        <linearGradient id="vv-auth-grad" x1="0" y1="0" x2="32" y2="32" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#a855f7" />
          <stop offset="100%" stopColor="#f59e0b" />
        </linearGradient>
      </defs>
      <path d="M4 8 L11 22 L16 12 L21 22 L28 8" stroke="url(#vv-auth-grad)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      <circle cx="16" cy="27" r="1.5" fill="url(#vv-auth-grad)" />
    </svg>
  )
}
