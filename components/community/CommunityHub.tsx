'use client'
import { useState } from 'react'
import type { User } from '@supabase/supabase-js'
import { motion, AnimatePresence } from 'framer-motion'
import { GlobalChatRoom } from '@/components/chat/GlobalChatRoom'
import { LettersSection } from '@/components/letters/LettersSection'
import { Hash, Mail, Users, LogOut, Home } from 'lucide-react'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'

type Tab = 'global' | 'letters' | 'members'

interface Profile {
  id: string
  username: string
  display_name: string | null
  avatar_url: string | null
}

export function CommunityHub({
  user,
  profile,
}: {
  user: User
  profile: Profile | null
}) {
  const [activeTab, setActiveTab] = useState<Tab>('global')
  const supabase = createClient()
  const router = useRouter()

  const tabs = [
    { id: 'global' as Tab, label: 'Global Vibe', icon: Hash },
    { id: 'letters' as Tab, label: 'Letters', icon: Mail },
    { id: 'members' as Tab, label: 'Members', icon: Users },
  ]

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.push('/')
  }

  const displayName = profile?.display_name || profile?.username || user.email?.split('@')[0] || 'Vibe'
  const initial = displayName.charAt(0).toUpperCase()
  const getColor = (id: string) => {
    const colors = ['#7c3aed', '#a855f7', '#f59e0b', '#f43f5e', '#06b6d4', '#10b981']
    return colors[id.charCodeAt(0) % colors.length]
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#050509]">
      {/* Top bar */}
      <header
        className="glass border-b px-6 py-3 flex items-center justify-between sticky top-0 z-40"
        style={{ borderColor: 'rgba(255,255,255,0.05)' }}
      >
        <div className="flex items-center gap-4">
          <Link href="/" className="flex items-center gap-2 text-[#8888a8] hover:text-white transition-colors">
            <Home size={16} />
          </Link>
          <div className="w-px h-4 bg-white/10" />
          <span className="font-display text-lg text-white">VerseVibes</span>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden md:flex items-center gap-2">
            <div
              className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold text-white"
              style={{ background: getColor(user.id) }}
            >
              {initial}
            </div>
            <span className="text-sm text-[#8888a8]">{displayName}</span>
          </div>
          <button
            onClick={handleSignOut}
            className="flex items-center gap-1.5 text-xs text-[#44445a] hover:text-[#8888a8] transition-colors px-3 py-1.5 rounded-lg hover:bg-white/5"
          >
            <LogOut size={14} />
            <span className="hidden md:inline">Sign out</span>
          </button>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden" style={{ height: 'calc(100vh - 57px)' }}>
        {/* Sidebar */}
        <aside
          className="w-16 md:w-56 border-r flex flex-col py-4 flex-shrink-0"
          style={{ borderColor: 'rgba(255,255,255,0.05)' }}
        >
          <div className="px-3 mb-4 hidden md:block">
            <p className="text-xs text-[#44445a] font-medium tracking-widest uppercase px-1">Channels</p>
          </div>
          {tabs.map(tab => {
            const Icon = tab.icon
            const active = activeTab === tab.id
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-3 px-3 py-2.5 mx-2 rounded-xl text-sm transition-all duration-200 ${
                  active
                    ? 'bg-violet-600/20 text-violet-300 border border-violet-500/20'
                    : 'text-[#8888a8] hover:text-white hover:bg-white/5'
                }`}
              >
                <Icon size={18} className="flex-shrink-0" />
                <span className="hidden md:block font-medium">{tab.label}</span>
              </button>
            )
          })}
        </aside>

        {/* Main content */}
        <main className="flex-1 flex flex-col overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.2 }}
              className="flex-1 flex flex-col overflow-hidden h-full"
            >
              {activeTab === 'global' && <GlobalChatRoom user={user} />}
              {activeTab === 'letters' && <LettersSection user={user} />}
              {activeTab === 'members' && <MembersSection />}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  )
}

function MembersSection() {
  return (
    <div className="flex-1 flex items-center justify-center p-8">
      <div className="text-center">
        <div className="text-5xl mb-4">✦</div>
        <h3 className="font-display text-2xl text-white mb-2">Members Directory</h3>
        <p className="text-[#8888a8] text-sm max-w-xs">
          Browse community members and send them a letter from the Letters tab.
        </p>
      </div>
    </div>
  )
}
