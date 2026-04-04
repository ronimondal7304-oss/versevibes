'use client'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { MessageCircle, Users, Zap, Heart, Lock, Globe } from 'lucide-react'

const REASONS = [
  {
    icon: MessageCircle,
    title: 'Real-Time Global Chat',
    description: 'Jump into the Global Vibe Room and connect with the entire VerseVibes community instantly. One room, infinite conversations.',
    color: '#a78bfa',
  },
  {
    icon: Heart,
    title: 'Poetic Letters',
    description: 'Send private letters to other members or discover someone new through random letter mode. Every connection starts with words.',
    color: '#f59e0b',
  },
  {
    icon: Users,
    title: 'A Family of Creators',
    description: 'Meet writers, poets, dreamers, and storytellers from across the world who share your love for meaningful content.',
    color: '#34d399',
  },
  {
    icon: Zap,
    title: 'Instant & Buttery Smooth',
    description: 'Powered by Supabase Realtime — every message appears instantly with silky animations that make chatting a delight.',
    color: '#f43f5e',
  },
  {
    icon: Lock,
    title: 'Safe & Private',
    description: 'Row-level security, private 1-on-1 chats, and full control over who you talk to. Your conversations stay yours.',
    color: '#60a5fa',
  },
  {
    icon: Globe,
    title: 'Always Free',
    description: 'No paywalls, no subscriptions. The VerseVibes community is open to every verse lover on the planet, forever.',
    color: '#c084fc',
  },
]

export function WhyJoin() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section ref={ref} id="community" className="py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mb-16"
        >
          <p className="text-sm font-medium tracking-widest uppercase mb-4" style={{ color: '#a78bfa' }}>
            Why Join
          </p>
          <h2
            className="text-4xl lg:text-5xl max-w-lg"
            style={{ fontFamily: 'Playfair Display, Georgia, serif', color: 'rgba(255,255,255,0.9)' }}
          >
            Your vibe deserves a{' '}
            <span className="italic gradient-text">home</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {REASONS.map((reason, i) => {
            const Icon = reason.icon
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="glass rounded-2xl p-6 hover:border-violet-500/20 transition-all duration-300 group"
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110"
                  style={{ background: `${reason.color}15`, border: `1px solid ${reason.color}30` }}
                >
                  <Icon size={20} style={{ color: reason.color }} />
                </div>
                <h3
                  className="text-lg text-white mb-2"
                  style={{ fontFamily: 'Playfair Display, Georgia, serif' }}
                >
                  {reason.title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: '#8888a8' }}>
                  {reason.description}
                </p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
