'use client'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

const TESTIMONIALS = [
  {
    quote: "VerseVibes changed how I see poetry. Every video feels like it was made just for me. The community here truly understands the power of words.",
    author: 'Arjun M.',
    location: 'Mumbai, India',
    color: '#a78bfa',
  },
  {
    quote: "I found my people here. The global chat is alive with beautiful souls sharing their thoughts at 2am. This is what the internet should feel like.",
    author: 'Priya S.',
    location: 'Kolkata, India',
    color: '#f59e0b',
  },
  {
    quote: "The 'Random Letters' feature is genius. I’ve made three genuine friends through it. Real connections through the art of words.",
    author: 'Rahul K.',
    location: 'Delhi, India',
    color: '#34d399',
  },
]

export function Testimonials() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section ref={ref} className="py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <p className="text-sm font-medium tracking-widest uppercase mb-4" style={{ color: '#a78bfa' }}>
            Community Love
          </p>
          <h2
            className="text-4xl lg:text-5xl"
            style={{ fontFamily: 'Playfair Display, Georgia, serif', color: 'rgba(255,255,255,0.9)' }}
          >
            Voices from the Vibe
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className="glass rounded-2xl p-7 relative overflow-hidden"
            >
              <div
                className="absolute top-0 left-0 w-full h-0.5"
                style={{ background: `linear-gradient(to right, ${t.color}, transparent)` }}
              />
              <div
                className="text-4xl mb-4 font-serif leading-none"
                style={{ color: t.color, fontFamily: 'Georgia, serif' }}
              >
                &ldquo;
              </div>
              <p className="text-sm leading-relaxed mb-6" style={{ color: '#c8c8d8' }}>
                {t.quote}
              </p>
              <div className="flex items-center gap-3">
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold text-white"
                  style={{ background: `${t.color}40`, border: `1px solid ${t.color}50` }}
                >
                  {t.author.charAt(0)}
                </div>
                <div>
                  <div className="text-sm font-medium" style={{ color: 'white' }}>{t.author}</div>
                  <div className="text-xs" style={{ color: '#44445a' }}>{t.location}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
