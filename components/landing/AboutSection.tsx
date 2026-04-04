'use client'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

export function AboutSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })
  return (
    <section id="about" ref={ref} className="py-32 px-6">
      <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
        <motion.div initial={{ opacity: 0, x: -40 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}>
          <p className="text-violet-400 text-sm font-medium tracking-widest uppercase mb-4">About VerseVibes</p>
          <h2 className="font-display text-4xl lg:text-5xl text-white/90 mb-6 leading-tight">
            Poetry that{' '}<span className="italic text-amber-400">moves</span>{' '}you
          </h2>
          <p className="text-[#8888a8] leading-relaxed mb-6">
            VerseVibes is more than a YouTube channel — it&apos;s a living, breathing community of creators, thinkers, and dreamers who believe that words have power. From motivational poetry to philosophical storytelling, every video is crafted to stir something deep within.
          </p>
          <p className="text-[#8888a8] leading-relaxed">
            This platform is your home to connect with fellow verse lovers, share your thoughts in real-time, and build relationships that go beyond the comment section.
          </p>
          <div className="mt-8 flex gap-4">
            <a href="https://youtube.com/@vv_versevibes" target="_blank" rel="noopener noreferrer" className="btn-primary px-6 py-2.5 rounded-full text-white text-sm font-medium">Watch Channel</a>
            <a href="#community" className="px-6 py-2.5 rounded-full glass text-[#e8e8f0] text-sm font-medium hover:border-violet-500/30 transition-all">Join Community</a>
          </div>
        </motion.div>
        <motion.div initial={{ opacity: 0, x: 40 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }} className="grid grid-cols-2 gap-4">
          {[{ label: 'Community Members', value: 'Growing Daily', icon: '✦' }, { label: 'YouTube Channel', value: '@vv_versevibes', icon: '▶' }, { label: 'Content Library', value: 'Expanding Fast', icon: '◈' }, { label: 'Global Vibers', value: 'Worldwide', icon: '◎' }].map((stat, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }} className="glass rounded-2xl p-5 hover:border-violet-500/20 transition-all duration-300 cursor-default">
              <div className="text-2xl text-violet-400 mb-2">{stat.icon}</div>
              <div className="font-display text-white font-medium mb-1">{stat.value}</div>
              <div className="text-xs text-[#44445a]">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
