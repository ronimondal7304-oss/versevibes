'use client'
import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const reasons = [
  {
    icon: '◈',
    title: 'Real-Time Global Chat',
    description: 'Jump into the Global Vibe Room and connect with the entire VerseVibes community instantly — live, unfiltered, and full of energy.',
    color: '#a855f7',
  },
  {
    icon: '✦',
    title: 'Send Anonymous Letters',
    description: 'Write a heartfelt letter to a random stranger in the community. Mystery connections, genuine conversations.',
    color: '#f59e0b',
  },
  {
    icon: '◎',
    title: 'Private 1-on-1 Chats',
    description: 'Accept a letter, start a private conversation. Deep, meaningful dialogue with your fellow verse lovers.',
    color: '#06b6d4',
  },
  {
    icon: '▶',
    title: 'Curated Verse Content',
    description: 'Discover the latest poetry videos, motivational stories, and philosophical drops from the @vv_versevibes channel.',
    color: '#f43f5e',
  },
  {
    icon: '⬡',
    title: 'A Safe Creative Space',
    description: 'No toxicity, no noise. Just a refined space for thinkers, dreamers, and storytellers to breathe freely.',
    color: '#10b981',
  },
  {
    icon: '◇',
    title: 'Growing Every Day',
    description: 'The community is alive and expanding. New members, new vibes, new connections — every single day.',
    color: '#a855f7',
  },
]

export function WhyJoin() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section ref={ref} id="community" className="py-32 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-20"
        >
          <p className="text-violet-400 text-sm font-medium tracking-widest uppercase mb-4">Why Join</p>
          <h2 className="font-display text-4xl lg:text-5xl text-white/90 mb-4">
            Built for the{' '}
            <span className="italic text-amber-400">soul</span>
          </h2>
          <p className="text-[#8888a8] max-w-xl mx-auto">
            VerseVibes isn't just a platform. It's a living experience — cinematic, warm, and made for people who feel deeply.
          </p>
        </motion.div>

        {/* Asymmetric grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {reasons.map((reason, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="glass rounded-2xl p-6 group hover:border-white/10 transition-all duration-300 cursor-default"
            >
              <div
                className="text-2xl mb-4 w-10 h-10 flex items-center justify-center rounded-xl"
                style={{ background: `${reason.color}15`, color: reason.color }}
              >
                {reason.icon}
              </div>
              <h3 className="text-white font-medium mb-2 text-base">{reason.title}</h3>
              <p className="text-[#8888a8] text-sm leading-relaxed">{reason.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
