'use client'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import Link from 'next/link'

export function CTASection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section ref={ref} className="py-32 px-6">
      <div className="max-w-3xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="glass-bright rounded-3xl p-16 relative overflow-hidden"
        >
          <div
            className="absolute inset-0 rounded-3xl pointer-events-none"
            style={{ background: 'radial-gradient(ellipse at center top, rgba(124,58,237,0.12) 0%, transparent 70%)' }}
          />

          <div className="relative z-10">
            <div className="text-5xl mb-6">✶</div>
            <h2
              className="text-4xl lg:text-5xl mb-6 leading-tight"
              style={{ fontFamily: 'Playfair Display, Georgia, serif', color: 'rgba(255,255,255,0.95)' }}
            >
              Ready to find your{' '}
              <span className="italic gradient-text">tribe</span>?
            </h2>
            <p className="text-lg mb-10 leading-relaxed" style={{ color: '#8888a8' }}>
              Join hundreds of verse lovers already connecting, chatting,
              and sharing their souls in real-time. It’s free, forever.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link
                href="/community"
                className="btn-primary px-10 py-4 rounded-full text-white font-medium tracking-wide"
              >
                Join Free Now
              </Link>
              <a
                href="https://youtube.com/@vv_versevibes"
                target="_blank"
                rel="noopener noreferrer"
                className="px-10 py-4 rounded-full glass font-medium tracking-wide transition-all"
                style={{ color: '#e8e8f0' }}
              >
                Explore Content
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
