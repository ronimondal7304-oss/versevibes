'use client'
import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Link from 'next/link'

export function CTASection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section ref={ref} className="py-32 px-6">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="relative glass-bright rounded-3xl p-12 md:p-20 text-center overflow-hidden"
        >
          {/* Background glow */}
          <div className="absolute inset-0 pointer-events-none">
            <div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full"
              style={{
                background: 'radial-gradient(circle, rgba(124,58,237,0.15) 0%, transparent 70%)',
              }}
            />
          </div>

          <div className="relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass mb-8"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
              <span className="text-xs text-green-300 font-medium tracking-widest uppercase">
                Community is Live
              </span>
            </motion.div>

            <h2 className="font-display text-4xl md:text-6xl text-white mb-6 leading-tight">
              Ready to find your{' '}
              <span className="italic gradient-text">vibe</span>?
            </h2>

            <p className="text-[#8888a8] max-w-lg mx-auto mb-10 leading-relaxed">
              Join hundreds of verse lovers in real-time. Send your first letter. Start a conversation
              that changes everything.
            </p>

            <div className="flex flex-wrap gap-4 justify-center">
              <Link
                href="/community"
                className="btn-primary px-10 py-4 rounded-full text-white font-medium tracking-wide"
              >
                Enter VerseVibes Free
              </Link>
              <a
                href="https://youtube.com/@vv_versevibes"
                target="_blank"
                rel="noopener noreferrer"
                className="px-10 py-4 rounded-full glass text-[#e8e8f0] font-medium hover:border-violet-500/30 transition-all"
              >
                Watch the Channel
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
