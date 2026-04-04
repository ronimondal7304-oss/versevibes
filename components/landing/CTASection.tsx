'use client'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import Link from 'next/link'

export function CTASection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  return (
    <section ref={ref} className="py-24 px-6">
      <div className="max-w-3xl mx-auto text-center">
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={inView ? { opacity: 1, scale: 1 } : {}} transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }} className="glass rounded-3xl p-12 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-violet-900/20 via-transparent to-amber-900/10" />
          <div className="relative z-10">
            <div className="text-5xl mb-6">✦</div>
            <h2 className="font-display text-4xl lg:text-5xl text-white/90 mb-4">Ready to Vibe?</h2>
            <p className="text-[#8888a8] mb-8 max-w-lg mx-auto leading-relaxed">
              Join the community where every word matters. Sign up free, start chatting in the global room, and send your first letter.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link href="/auth" className="btn-primary px-8 py-3.5 rounded-full text-white font-medium tracking-wide">Join VerseVibes Free</Link>
              <a href="https://youtube.com/@vv_versevibes" target="_blank" rel="noopener noreferrer" className="glass px-8 py-3.5 rounded-full text-[#e8e8f0] font-medium hover:border-amber-500/30 transition-all">Watch First ↗</a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
