'use client'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

export function AboutSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  const stats = [
    { label: 'Community Members', value: 'Growing Daily', icon: '✶' },
    { label: 'YouTube Channel', value: '@vv_versevibes', icon: '▶' },
    { label: 'Content Library', value: 'Expanding', icon: '◈' },
    { label: 'Global Reach', value: 'Worldwide', icon: '◎' },
  ]

  return (
    <section ref={ref} id="about" className="py-32 px-6">
      <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="text-sm font-medium tracking-widest uppercase mb-4" style={{ color: '#a78bfa' }}>
            About VerseVibes
          </p>
          <h2
            className="text-4xl lg:text-5xl mb-6 leading-tight"
            style={{ fontFamily: 'Playfair Display, Georgia, serif', color: 'rgba(255,255,255,0.9)' }}
          >
            Poetry that{' '}
            <span className="italic" style={{ color: '#f59e0b' }}>moves</span>{' '}
            you
          </h2>
          <p className="leading-relaxed mb-6" style={{ color: '#8888a8' }}>
            VerseVibes is more than a YouTube channel — it’s a living, breathing community
            of creators, thinkers, and dreamers who believe that words have power. From
            motivational poetry to philosophical storytelling, every video is crafted to
            stir something deep within.
          </p>
          <p className="leading-relaxed" style={{ color: '#8888a8' }}>
            This platform is your home to connect with fellow verse lovers, share your
            thoughts in real-time, and build relationships that go beyond the comment section.
          </p>
          <a
            href="https://youtube.com/@vv_versevibes"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 mt-8 text-sm font-medium transition-colors"
            style={{ color: '#a78bfa' }}
          >
            Visit the Channel →
          </a>
        </motion.div>

        <div className="grid grid-cols-2 gap-4">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
              className="glass rounded-2xl p-5 hover:border-violet-500/20 transition-all duration-300"
            >
              <div className="text-2xl mb-2" style={{ color: '#a78bfa' }}>{stat.icon}</div>
              <div
                className="font-medium mb-1"
                style={{ fontFamily: 'Playfair Display, Georgia, serif', color: 'white' }}
              >
                {stat.value}
              </div>
              <div className="text-xs" style={{ color: '#44445a' }}>{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
