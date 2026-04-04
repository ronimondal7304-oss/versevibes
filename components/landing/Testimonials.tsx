'use client'
import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const testimonials = [
  {
    quote: 'VerseVibes changed how I think about words. The community is warm, genuine, and endlessly inspiring.',
    name: 'Aryan S.',
    handle: '@aryan_creates',
    color: '#7c3aed',
  },
  {
    quote: 'I sent a random letter to a stranger and ended up with the most meaningful conversation of my week. Incredible.',
    name: 'Priya M.',
    handle: '@priya.vibes',
    color: '#f59e0b',
  },
  {
    quote: 'The Global Vibe Room is alive at all hours. You\'re never alone here. Exactly what I needed.',
    name: 'Dev K.',
    handle: '@devthinks',
    color: '#06b6d4',
  },
  {
    quote: 'The poetry hits different when you can discuss it live with people who actually feel it.',
    name: 'Sneha R.',
    handle: '@sneha.words',
    color: '#f43f5e',
  },
  {
    quote: 'I\'ve been part of many communities. None feel this intentional and beautiful.',
    name: 'Rohan T.',
    handle: '@rohantells',
    color: '#10b981',
  },
  {
    quote: 'The aesthetic alone made me stay. Then the conversations made me never want to leave.',
    name: 'Anjali V.',
    handle: '@anjali.verse',
    color: '#a855f7',
  },
]

export function Testimonials() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section ref={ref} className="py-32 px-6 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <p className="text-violet-400 text-sm font-medium tracking-widest uppercase mb-4">Voices</p>
          <h2 className="font-display text-4xl lg:text-5xl text-white/90">
            What the <span className="italic text-amber-400">community</span> says
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.07, ease: [0.16, 1, 0.3, 1] }}
              className="glass rounded-2xl p-6 flex flex-col gap-4"
            >
              {/* Stars */}
              <div className="flex gap-1">
                {[...Array(5)].map((_, s) => (
                  <span key={s} style={{ color: t.color }} className="text-sm">✦</span>
                ))}
              </div>
              <p className="text-[#e8e8f0] text-sm leading-relaxed italic">
                &ldquo;{t.quote}&rdquo;
              </p>
              <div className="flex items-center gap-3 mt-auto pt-2 border-t border-white/5">
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white flex-shrink-0"
                  style={{ background: `${t.color}40` }}
                >
                  {t.name.charAt(0)}
                </div>
                <div>
                  <div className="text-white text-sm font-medium">{t.name}</div>
                  <div className="text-[#44445a] text-xs">{t.handle}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
