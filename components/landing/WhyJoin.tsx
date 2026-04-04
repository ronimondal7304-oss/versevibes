'use client'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { Zap, MessageCircle, Users, Star, Lock, Globe } from 'lucide-react'

const FEATURES = [
  { icon: MessageCircle, title: 'Global Chat Room', desc: 'One massive real-time room where the entire VerseVibes family talks, vibes, and connects.', color: '#7c3aed' },
  { icon: Lock, title: 'Private Letters', desc: 'Send meaningful letters to specific members or a random soul — your mystery connection awaits.', color: '#f59e0b' },
  { icon: Zap, title: 'Live Presence', desc: 'See who\'s online, typing indicators, and read receipts — feel the energy of the room.', color: '#f43f5e' },
  { icon: Users, title: 'Member Directory', desc: 'Discover fellow verse lovers from across the world and build real friendships.', color: '#06b6d4' },
  { icon: Star, title: 'Premium Experience', desc: 'Cinematic design, buttery animations, and a UI that feels as poetic as the content.', color: '#a855f7' },
  { icon: Globe, title: 'Always Free', desc: 'No paywalls, no subscriptions. Just a beautiful home for the VerseVibes community.', color: '#10b981' },
]

export function WhyJoin() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  return (
    <section id="community" ref={ref} className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7 }} className="text-center mb-16">
          <p className="text-violet-400 text-sm font-medium tracking-widest uppercase mb-3">Why Join</p>
          <h2 className="font-display text-4xl lg:text-5xl text-white/90 mb-4">Built for Verse Lovers</h2>
          <p className="text-[#8888a8] max-w-xl mx-auto">Everything you need to connect with a community that values depth, creativity, and genuine human connection.</p>
        </motion.div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {FEATURES.map((feat, i) => {
            const Icon = feat.icon
            return (
              <motion.div key={i} initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: i * 0.1 }} className="glass rounded-2xl p-6 hover:border-violet-500/15 transition-all duration-300 group">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4" style={{ background: `${feat.color}18`, border: `1px solid ${feat.color}28` }}>
                  <Icon size={20} style={{ color: feat.color }} />
                </div>
                <h3 className="text-white font-medium mb-2">{feat.title}</h3>
                <p className="text-sm text-[#8888a8] leading-relaxed">{feat.desc}</p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
