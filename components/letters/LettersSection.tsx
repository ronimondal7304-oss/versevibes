'use client'
import { useEffect, useState } from 'react'
import type { User } from '@supabase/supabase-js'
import { createClient } from '@/lib/supabase/client'
import { motion, AnimatePresence } from 'framer-motion'
import { Send, Check, X, MessageCircle, Shuffle } from 'lucide-react'

interface ChatRequest {
  id: string
  sender_id: string
  receiver_id: string
  message: string
  status: 'pending' | 'accepted' | 'rejected'
  created_at: string
  receiver_profile?: { username: string; display_name: string | null }
  sender_profile?: { username: string; display_name: string | null }
}

interface Profile {
  id: string
  username: string
  display_name: string | null
  avatar_url: string | null
}

export function LettersSection({ user }: { user: User }) {
  const [view, setView] = useState<'browse' | 'sent' | 'inbox'>('browse')
  const [profiles, setProfiles] = useState<Profile[]>([])
  const [sentRequests, setSentRequests] = useState<ChatRequest[]>([])
  const [inboxRequests, setInboxRequests] = useState<ChatRequest[]>([])
  const [selectedUser, setSelectedUser] = useState<Profile | null>(null)
  const [letterMsg, setLetterMsg] = useState('')
  const [sending, setSending] = useState(false)
  const [feedback, setFeedback] = useState<{ msg: string; ok: boolean } | null>(null)
  const supabase = createClient()

  useEffect(() => { loadProfiles(); loadRequests() }, [])

  const loadProfiles = async () => {
    const { data } = await supabase
      .from('profiles')
      .select('id,username,display_name,avatar_url')
      .neq('id', user.id)
      .limit(40)
    if (data) setProfiles(data)
  }

  const loadRequests = async () => {
    const { data: sent } = await supabase
      .from('chat_requests')
      .select('id, sender_id, receiver_id, message, status, created_at, receiver_profile:profiles!receiver_id(username, display_name)')
      .eq('sender_id', user.id)
      .order('created_at', { ascending: false })
    if (sent) setSentRequests(sent as unknown as ChatRequest[])

    const { data: inbox } = await supabase
      .from('chat_requests')
      .select('id, sender_id, receiver_id, message, status, created_at, sender_profile:profiles!sender_id(username, display_name)')
      .eq('receiver_id', user.id)
      .eq('status', 'pending')
      .order('created_at', { ascending: false })
    if (inbox) setInboxRequests(inbox as unknown as ChatRequest[])
  }

  const sendLetter = async (receiverId: string) => {
    if (!letterMsg.trim()) return
    setSending(true)
    const { error } = await supabase.from('chat_requests').insert({ sender_id: user.id, receiver_id: receiverId, message: letterMsg.trim() })
    if (error) setFeedback({ msg: error.message.includes('duplicate') ? 'You already sent a letter to this person.' : error.message, ok: false })
    else { setFeedback({ msg: 'Letter sent! ✦', ok: true }); setLetterMsg(''); setSelectedUser(null); loadRequests() }
    setSending(false)
    setTimeout(() => setFeedback(null), 4000)
  }

  const sendRandomLetter = async () => {
    if (!letterMsg.trim() || profiles.length === 0) return
    const alreadySent = sentRequests.map(r => r.receiver_id)
    const available = profiles.filter(p => !alreadySent.includes(p.id))
    if (available.length === 0) { setFeedback({ msg: 'You\'ve already written to everyone! 🎉', ok: false }); return }
    const random = available[Math.floor(Math.random() * available.length)]
    await sendLetter(random.id)
  }

  const respondToRequest = async (id: string, status: 'accepted' | 'rejected') => {
    await supabase.from('chat_requests').update({ status }).eq('id', id)
    loadRequests()
  }

  const getColor = (id: string) => {
    const cols = ['#7c3aed', '#a855f7', '#f59e0b', '#f43f5e', '#06b6d4', '#10b981']
    return cols[id.charCodeAt(0) % cols.length]
  }

  return (
    <div className="flex flex-col h-[calc(100vh-56px)]">
      <div className="px-6 py-4 border-b border-white/5">
        <h2 className="font-display text-lg text-white mb-4">Letters</h2>
        <div className="flex gap-2 flex-wrap">
          {([['browse', 'Browse'], ['sent', 'Sent'], ['inbox', 'Inbox']] as const).map(([v, label]) => (
            <button key={v} onClick={() => setView(v)} className={`px-4 py-1.5 rounded-full text-sm transition-all ${view === v ? 'bg-violet-600/30 text-violet-300 border border-violet-500/30' : 'text-[#8888a8] hover:text-white glass'}`}>
              {label}
              {v === 'inbox' && inboxRequests.length > 0 && <span className="ml-1.5 bg-violet-500 text-white text-xs px-1.5 py-0.5 rounded-full">{inboxRequests.length}</span>}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-6 py-4">
        {view === 'browse' && (
          <div className="space-y-6">
            <div className="glass rounded-2xl p-6">
              <h3 className="text-white font-medium mb-1 flex items-center gap-2"><Shuffle size={16} className="text-amber-400" /> Send a Random Letter</h3>
              <p className="text-xs text-[#8888a8] mb-4">Your letter goes to a surprise member — mystery connections only.</p>
              <textarea value={letterMsg} onChange={e => setLetterMsg(e.target.value)} placeholder="Write something meaningful... (your letter will reach a random soul)" maxLength={500} rows={3} className="w-full bg-white/5 border border-white/8 rounded-xl px-4 py-3 text-white placeholder-[#44445a] text-sm focus:outline-none focus:border-violet-500/40 resize-none mb-3" />
              <div className="flex justify-between items-center">
                <span className="text-xs text-[#44445a]">{letterMsg.length}/500</span>
                <button onClick={sendRandomLetter} disabled={!letterMsg.trim() || sending} className="btn-primary px-5 py-2 rounded-full text-white text-sm font-medium disabled:opacity-40 flex items-center gap-2">
                  <Shuffle size={14} /> Send to Random Soul
                </button>
              </div>
              {feedback && <p className={`text-xs mt-2 ${feedback.ok ? 'text-violet-400' : 'text-rose-400'}`}>{feedback.msg}</p>}
            </div>

            <div>
              <p className="text-sm text-[#8888a8] mb-3">Or write to a specific Viber:</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {profiles.map(p => (
                  <motion.div key={p.id} whileHover={{ scale: 1.01 }} onClick={() => setSelectedUser(selectedUser?.id === p.id ? null : p)} className={`glass rounded-xl p-4 flex items-center gap-3 cursor-pointer transition-all ${selectedUser?.id === p.id ? 'border-violet-500/30 bg-violet-600/10' : 'hover:border-violet-500/15'}`}>
                    <div className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold text-white flex-shrink-0" style={{ background: getColor(p.id) }}>
                      {(p.display_name || p.username).charAt(0).toUpperCase()}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-white text-sm font-medium truncate">{p.display_name || p.username}</div>
                      <div className="text-xs text-[#44445a]">@{p.username}</div>
                    </div>
                    <MessageCircle size={15} className="text-[#44445a] flex-shrink-0" />
                  </motion.div>
                ))}
              </div>

              <AnimatePresence>
                {selectedUser && (
                  <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="glass rounded-2xl p-5 mt-4 overflow-hidden">
                    <p className="text-sm text-white mb-3">Writing to <span className="text-violet-400">@{selectedUser.username}</span></p>
                    <textarea value={letterMsg} onChange={e => setLetterMsg(e.target.value)} placeholder="Write your letter..." maxLength={500} rows={3} className="w-full bg-white/5 border border-white/8 rounded-xl px-4 py-3 text-white placeholder-[#44445a] text-sm focus:outline-none focus:border-violet-500/40 resize-none mb-3" />
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-[#44445a]">{letterMsg.length}/500</span>
                      <button onClick={() => sendLetter(selectedUser.id)} disabled={!letterMsg.trim() || sending} className="btn-primary px-5 py-2 rounded-full text-white text-sm font-medium disabled:opacity-40 flex items-center gap-2">
                        <Send size={14} /> Send Letter
                      </button>
                    </div>
                    {feedback && <p className={`text-xs mt-2 ${feedback.ok ? 'text-violet-400' : 'text-rose-400'}`}>{feedback.msg}</p>}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        )}

        {view === 'sent' && (
          <div className="space-y-3">
            {sentRequests.length === 0 ? (
              <div className="text-center py-16"><div className="text-4xl mb-3">✉️</div><p className="text-[#44445a]">No letters sent yet.</p></div>
            ) : sentRequests.map(r => (
              <div key={r.id} className="glass rounded-xl p-4">
                <div className="flex justify-between items-start mb-2">
                  <span className="text-sm text-[#8888a8]">To @{r.receiver_profile?.username}</span>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${r.status === 'pending' ? 'bg-amber-400/10 text-amber-400' : r.status === 'accepted' ? 'bg-green-400/10 text-green-400' : 'bg-rose-400/10 text-rose-400'}`}>{r.status}</span>
                </div>
                <p className="text-sm text-[#e8e8f0]">{r.message}</p>
                <p className="text-xs text-[#44445a] mt-2">{new Date(r.created_at).toLocaleDateString()}</p>
              </div>
            ))}
          </div>
        )}

        {view === 'inbox' && (
          <div className="space-y-3">
            {inboxRequests.length === 0 ? (
              <div className="text-center py-16"><div className="text-4xl mb-3">📬</div><p className="text-[#44445a]">Your inbox is empty.</p></div>
            ) : inboxRequests.map(r => (
              <motion.div key={r.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="glass rounded-xl p-4">
                <div className="flex justify-between items-start mb-2">
                  <span className="text-sm text-violet-300 font-medium">From @{r.sender_profile?.username}</span>
                  <span className="text-xs text-[#44445a]">{new Date(r.created_at).toLocaleDateString()}</span>
                </div>
                <p className="text-sm text-[#e8e8f0] italic mb-4">&ldquo;{r.message}&rdquo;</p>
                <div className="flex gap-2">
                  <button onClick={() => respondToRequest(r.id, 'accepted')} className="flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-green-500/15 text-green-400 text-sm border border-green-500/20 hover:bg-green-500/25 transition-colors">
                    <Check size={13} /> Accept
                  </button>
                  <button onClick={() => respondToRequest(r.id, 'rejected')} className="flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-rose-500/15 text-rose-400 text-sm border border-rose-500/20 hover:bg-rose-500/25 transition-colors">
                    <X size={13} /> Decline
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
