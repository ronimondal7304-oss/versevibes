'use client'
import { useState } from 'react'
import type { User } from '@supabase/supabase-js'
import { motion, AnimatePresence } from 'framer-motion'
import { GlobalChatRoom } from '@/components/chat/GlobalChatRoom'
import { LettersSection } from '@/components/letters/LettersSection'
import { MembersDirectory } from '@/components/community/MembersDirectory'
import { Hash, Mail, Users, LogOut } from 'lucide-react'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'

type Tab = 'global' | 'letters' | 'members'

export function CommunityHub({ user, profile }: { user: User; profile: any }) {
  const [activeTab, setActiveTab] = useState<Tab>('global')
  const supabase = createClient()
  const router = useRouter()

  const signOut = async () => {
    await supabase.auth.signOut()
    router.push('/')
  }

  const tabs = [
    { id: 'global' as Tab, label: 'Global Vibe', icon: Hash, badge: null },
    { id: 'letters' as Tab, label: 'Letters', icon: Mail, badge: null },
    { id: 'members' as Tab, label: 'Members', icon: Users, badge: null },
  ]

  const displayName = profile?.display_name || profile?.username || 'Vibe'

  return (
    <div className="min-h-screen flex flex-col">
      <header className="glass border-b border-white/5 px-4 py-3 flex items-center justify-between sticky top-0 z-40">
        <Link href="/" className="font-display text-lg text-white">VerseVibes</Link>
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-600 to-violet-800 flex items-center justify-center text-sm font-bold text-white">
            {displayName.charAt(0).toUpperCase()}
          </div>
          <span className="text-sm text-[#8888a8] hidden md:block">{displayName}</span>
          <button onClick={signOut} className="p-2 rounded-lg text-[#44445a] hover:text-white hover:bg-white/5 transition-all" aria-label="Sign out">
            <LogOut size={16} />
          </button>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden" style={{ height: 'calc(100vh - 56px)' }}>
        <aside className="w-16 md:w-56 border-r border-white/5 flex flex-col pt-4 gap-1 flex-shrink-0">
          {tabs.map(tab => {
            const Icon = tab.icon
            const active = activeTab === tab.id
            return (
              <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`flex items-center gap-3 px-3 py-3 mx-2 rounded-xl text-sm transition-all duration-200 ${active ? 'bg-violet-600/20 text-violet-300 border border-violet-500/20' : 'text-[#8888a8] hover:text-white hover:bg-white/5'}`}>
                <Icon size={18} className="flex-shrink-0" />
                <span className="hidden md:block font-medium">{tab.label}</span>
              </button>
            )
          })}
        </aside>

        <main className="flex-1 overflow-hidden relative">
          <AnimatePresence mode="wait">
            <motion.div key={activeTab} initial={{ opacity: 0, x: 8 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -8 }} transition={{ duration: 0.18 }} className="h-full">
              {activeTab === 'global' && <GlobalChatRoom user={user} />}
              {activeTab === 'letters' && <LettersSection user={user} />}
              {activeTab === 'members' && <MembersDirectory userId={user.id} />}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  )
}
