'use client'
import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { motion } from 'framer-motion'

interface Profile {
  id: string
  username: string
  display_name: string | null
  bio: string | null
  is_online: boolean
  last_seen: string
}

export function MembersDirectory({ userId }: { userId: string }) {
  const [members, setMembers] = useState<Profile[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const supabase = createClient()

  useEffect(() => {
    const load = async () => {
      const { data } = await supabase
        .from('profiles')
        .select('id,username,display_name,bio,is_online,last_seen')
        .order('is_online', { ascending: false })
        .limit(50)
      if (data) setMembers(data)
      setLoading(false)
    }
    load()
  }, [])

  const getColor = (id: string) => {
    const cols = ['#7c3aed', '#a855f7', '#f59e0b', '#f43f5e', '#06b6d4', '#10b981']
    return cols[id.charCodeAt(0) % cols.length]
  }

  const filtered = members.filter(m =>
    m.username.toLowerCase().includes(search.toLowerCase()) ||
    (m.display_name || '').toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="flex flex-col h-[calc(100vh-56px)]">
      <div className="px-6 py-4 border-b border-white/5">
        <h2 className="font-display text-lg text-white mb-3">Verse Lovers</h2>
        <input
          type="search"
          placeholder="Search members..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="w-full bg-white/5 border border-white/8 rounded-full px-4 py-2.5 text-white placeholder-[#44445a] text-sm focus:outline-none focus:border-violet-500/40 transition-colors"
        />
      </div>
      <div className="flex-1 overflow-y-auto px-6 py-4">
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[...Array(6)].map((_, i) => <div key={i} className="skeleton rounded-xl h-20" />)}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {filtered.map((m, i) => (
              <motion.div key={m.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }} className="glass rounded-xl p-4 flex items-center gap-3">
                <div className="relative flex-shrink-0">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold text-white" style={{ background: getColor(m.id) }}>
                    {(m.display_name || m.username).charAt(0).toUpperCase()}
                  </div>
                  {m.id === userId && <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-green-400 border-2 border-[#0f0f1e]" />}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-white text-sm font-medium truncate">{m.display_name || m.username}</span>
                    {m.id === userId && <span className="text-xs text-violet-400 bg-violet-400/10 px-1.5 py-0.5 rounded-full">You</span>}
                  </div>
                  <div className="text-xs text-[#44445a]">@{m.username}</div>
                  {m.bio && <div className="text-xs text-[#8888a8] mt-0.5 truncate">{m.bio}</div>}
                </div>
              </motion.div>
            ))}
            {filtered.length === 0 && (
              <div className="col-span-2 text-center py-12 text-[#44445a]">
                <div className="text-3xl mb-2">✦</div>
                <p>No members found.</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
