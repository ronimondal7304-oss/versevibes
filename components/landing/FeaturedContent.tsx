'use client'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { Play, ExternalLink } from 'lucide-react'

const VIDEOS = [
  { title: 'Words That Heal', desc: 'A poetic journey through pain and resilience', views: 'Motivational', thumb: 'https://img.youtube.com/vi/dQw4w9WgXcQ/mqdefault.jpg', url: 'https://youtube.com/@vv_versevibes' },
  { title: 'The Verse Within', desc: 'Discovering the philosopher inside every soul', views: 'Philosophy', thumb: 'https://img.youtube.com/vi/dQw4w9WgXcQ/mqdefault.jpg', url: 'https://youtube.com/@vv_versevibes' },
  { title: 'Silent Thunder', desc: 'When silence speaks louder than words', views: 'Poetry', thumb: 'https://img.youtube.com/vi/dQw4w9WgXcQ/mqdefault.jpg', url: 'https://youtube.com/@vv_versevibes' },
]

export function FeaturedContent() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  return (
    <section id="featured" ref={ref} className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7 }} className="text-center mb-16">
          <p className="text-amber-400 text-sm font-medium tracking-widest uppercase mb-3">Featured Vibes</p>
          <h2 className="font-display text-4xl lg:text-5xl text-white/90">Stories Worth Feeling</h2>
        </motion.div>
        <div className="grid md:grid-cols-3 gap-6">
          {VIDEOS.map((v, i) => (
            <motion.a key={i} href={v.url} target="_blank" rel="noopener noreferrer" initial={{ opacity: 0, y: 40 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: i * 0.15 }} className="group glass rounded-2xl overflow-hidden hover:border-violet-500/20 transition-all duration-300 hover:-translate-y-1">
              <div className="relative aspect-video bg-gradient-to-br from-violet-900/40 to-[#0a0a14] overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-violet-600/80 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                    <Play size={18} className="text-white ml-0.5" fill="white" />
                  </div>
                </div>
                <div className="absolute top-3 right-3">
                  <span className="text-xs px-2.5 py-1 rounded-full bg-amber-400/10 text-amber-400 border border-amber-400/20">{v.views}</span>
                </div>
              </div>
              <div className="p-5">
                <h3 className="font-display text-lg text-white mb-1 group-hover:text-violet-300 transition-colors">{v.title}</h3>
                <p className="text-sm text-[#8888a8] leading-relaxed">{v.desc}</p>
                <div className="flex items-center gap-1.5 mt-4 text-xs text-violet-400 group-hover:text-violet-300 transition-colors">
                  <ExternalLink size={12} />
                  <span>Watch on YouTube</span>
                </div>
              </div>
            </motion.a>
          ))}
        </div>
        <motion.div initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 0.6 }} className="text-center mt-10">
          <a href="https://youtube.com/@vv_versevibes" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 glass px-6 py-3 rounded-full text-sm text-[#8888a8] hover:text-white hover:border-violet-500/30 transition-all">
            <span>View full channel</span>
            <ExternalLink size={14} />
          </a>
        </motion.div>
      </div>
    </section>
  )
}
