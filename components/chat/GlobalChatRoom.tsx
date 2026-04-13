'use client'
import { useEffect, useRef, useState, useCallback } from 'react'
import { createClient } from '@/lib/supabase/client'
import type { User } from '@supabase/supabase-js'
import { motion, AnimatePresence } from 'framer-motion'
import { Send } from 'lucide-react'
import type { RealtimeChannel } from '@supabase/supabase-js'

type ProfileShape = { username: string; display_name: string | null; avatar_url: string | null }

interface Message {
  id: string
  content: string
  created_at: string
  user_id: string
  profiles: ProfileShape | ProfileShape[] | null
}

function getProfile(profiles: Message['profiles']): ProfileShape | null {
  if (!profiles) return null
  if (Array.isArray(profiles)) return profiles[0] ?? null
  return profiles
}

export function GlobalChatRoom({ user }: { user: User }) {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(true)
  const [onlineCount, setOnlineCount] = useState(1)
  const [typingUsers, setTypingUsers] = useState<string[]>([])
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const typingTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const presenceChannelRef = useRef<RealtimeChannel | null>(null)
  const userProfileRef = useRef<string | null>(null)
  const supabase = createClient()
  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [])
  useEffect(() => {
    const loadMessages = async () => {
      const { data } = await supabase
        .from('global_messages')
        .select('id, content, created_at, user_id, profiles(username, display_name, avatar_url)')
        .eq('is_deleted', false)
        .order('created_at', { ascending: true })
        .limit(100)
      if (data) setMessages(data as unknown as Message[])
      setLoading(false)
      setTimeout(scrollToBottom, 100)
    }
    loadMessages()
  }, [scrollToBottom])
  useEffect(() => {
    const channel = supabase
      .channel('global-messages-rt')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'global_messages' }, async (payload) => {
        const { data } = await supabase
          .from('global_messages')
          .select('id, content, created_at, user_id, profiles(username, display_name, avatar_url)')
          .eq('id', payload.new.id)
          .single()
        if (data) {
          setMessages(prev => [...prev, data as unknown as Message])
          setTimeout(scrollToBottom, 50)
        }
      })
      .subscribe()
    const presenceChannel = supabase.channel('vv-presence', {
      config: { presence: { key: user.id }, broadcast: { self: false } }
    })
    presenceChannelRef.current = presenceChannel
    presenceChannel
      .on('presence', { event: 'sync' }, () => {
        const state = presenceChannel.presenceState()
        setOnlineCount(Object.keys(state).length)
      })
      .on('broadcast', { event: 'typing' }, ({ payload }) => {
        if (payload.user_id !== user.id) {
          setTypingUsers(prev => prev.includes(payload.username) ? prev : [...prev, payload.username])
          setTimeout(() => setTypingUsers(prev => prev.filter(u => u !== payload.username)), 2500)
        }
      })
      .subscribe(async (status) => {
        if (status === 'SUBSCRIBED') {
          const { data: profile } = await supabase.from('profiles').select('username').eq('id', user.id).single()
          userProfileRef.current = profile?.username ?? 'Vibe'
          await presenceChannel.track({ user_id: user.id, username: userProfileRef.current })
        }
      })
    return () => {
      presenceChannelRef.current = null
      supabase.removeChannel(channel)
      supabase.removeChannel(presenceChannel)
    }
  }, [user.id, scrollToBottom])
  const handleTyping = useCallback(() => {
    if (!isTyping) {
      setIsTyping(true)
      if (presenceChannelRef.current) {
        presenceChannelRef.current.send({
          type: 'broadcast',
          event: 'typing',
          payload: { user_id: user.id, username: userProfileRef.current ?? 'Vibe' }
        })
      }
    }
    if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current)
    typingTimeoutRef.current = setTimeout(() => setIsTyping(false), 2000)
  }, [isTyping, user.id])
  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault()
    const content = input.trim()
    if (!content) return
    setInput('')
    setIsTyping(false)
    await supabase.from('global_messages').insert({ content, user_id: user.id })
  }
  const getColor = (uid: string) => {
    const colors = ['#7c3aed', '#a855f7', '#f59e0b', '#f43f5e', '#06b6d4', '#10b981', '#ec4899']
    return colors[uid.charCodeAt(0) % colors.length]
  }
  const getInitial = (name: string) => name.charAt(0).toUpperCase()
  const formatTime = (ts: string) => new Date(ts).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  return (
    <div className="flex flex-col h-[calc(100vh-56px)]">
      <div className="flex items-center justify-between px-6 py-4 border-b border-white/5">
        <div>
          <h2 className="font-display text-lg text-white">Global Vibe Room</h2>
          <p className="text-xs text-[#44445a]">{onlineCount} {onlineCount === 1 ? 'person' : 'people'} vibing now</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
          <span className="text-xs text-green-400">Live</span>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
        {loading ? (
          <div className="space-y-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="flex gap-3">
                <div className="skeleton w-8 h-8 rounded-full flex-shrink-0" />
                <div className="space-y-1.5 flex-1">
                  <div className="skeleton h-3 w-24 rounded" />
                  <div className="skeleton h-4 w-48 rounded" />
                </div>
              </div>
            ))}
          </div>
        ) : messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center py-16">
            <div className="text-4xl mb-4">✦</div>
            <h3 className="font-display text-xl text-white mb-2">Be the first to vibe!</h3>
            <p className="text-sm text-[#8888a8]">Send the first message and start the energy.</p>
          </div>
        ) : (
          <>
            <AnimatePresence initial={false}>
              {messages.map((msg) => {
                const isOwn = msg.user_id === user.id
                const profile = getProfile(msg.profiles)
                const name = profile?.display_name || profile?.username || 'Anon'
                return (
                  <motion.div key={msg.id} initial={{ opacity: 0, y: 10, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }} className={`flex gap-3 ${isOwn ? 'flex-row-reverse' : ''}`}>
                    <div className="w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center text-xs font-bold text-white" style={{ background: getColor(msg.user_id) }}>
                      {getInitial(name)}
                    </div>
                    <div className={`max-w-xs lg:max-w-md flex flex-col gap-1 ${isOwn ? 'items-end' : 'items-start'}`}>
                      {!isOwn && <span className="text-xs text-[#8888a8] px-1">{name}</span>}
                      <div className={`px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${isOwn ? 'bg-violet-600/80 text-white rounded-br-sm' : 'glass text-[#e8e8f0] rounded-bl-sm'}`}>
                        {msg.content}
                      </div>
                      <span className="text-[10px] text-[#44445a] px-1">{formatTime(msg.created_at)}</span>
                    </div>
                  </motion.div>
                )
              })}
            </AnimatePresence>
            <AnimatePresence>
              {typingUsers.length > 0 && (
                <motion.div initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 5 }} className="flex items-center gap-2">
                  <div className="glass px-3 py-2 rounded-full flex gap-1 items-center">
                    <div className="typing-dot w-1.5 h-1.5 rounded-full bg-violet-400" />
                    <div className="typing-dot w-1.5 h-1.5 rounded-full bg-violet-400" />
                    <div className="typing-dot w-1.5 h-1.5 rounded-full bg-violet-400" />
                  </div>
                  <span className="text-xs text-[#8888a8]">{typingUsers.join(', ')} {typingUsers.length === 1 ? 'is' : 'are'} typing...</span>
                </motion.div>
              )}
            </AnimatePresence>
          </>
        )}
        <div ref={messagesEndRef} />
      </div>
      <div className="px-4 py-4 border-t border-white/5">
        <form onSubmit={sendMessage} className="flex gap-3 items-center">
          <input value={input} onChange={e => { setInput(e.target.value); handleTyping() }} placeholder="Share your vibe..." maxLength={2000} className="flex-1 bg-white/5 border border-white/8 rounded-full px-5 py-3 text-white placeholder-[#44445a] text-sm focus:outline-none focus:border-violet-500/40 transition-colors" />
          <button type="submit" disabled={!input.trim()} className="w-11 h-11 rounded-full btn-primary flex items-center justify-center flex-shrink-0 disabled:opacity-40 disabled:pointer-events-none transition-all">
            <Send size={16} className="text-white" />
          </button>
        </form>
      </div>
    </div>
  )
}
