'use client'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

const TESTIMONIALS = [
  { name: 'Aryan K.', handle: '@aryan_writes', quote: 'VerseVibes changed how I see words. The community here actually gets it — no surface-level stuff, just pure depth.', stars: 5 },
  { name: 'Priya S.', handle: '@priya_soul', quote: 'The Letters feature is so unique. I sent a random letter and ended up making a friend from another country.', stars: 5 },
  { name: 'Dev R.', handle: '@dev_vibes', quote: 'The design alone is worth it — feels like nothing else on the internet. So cinematic.', stars: 5 },
  { name: 'Nisha M.', handle: '@nisha_poet', quote: 'Finally a community that matches the energy of the channel. The global chat is alive every single day.', stars: 5 },
  { name: 'Rahul T.', handle: '@rahul_thinks', quote: 'I lurked for weeks and then sent my first letter. Three days later I had my first real conversation. Magic.', stars: 5 },
  { name: 'Sia J.', handle: '@sia_dreams', quote: 'VerseVibes is proof that the internet can still be beautiful and meaningful.', stars: 5 },
]

export function Testimonials() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  return (
    <section ref={ref} className="py-24 px-6 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7 }} className="text-center mb-16">
          <p className="text-amber-400 text-sm font-medium tracking-widest uppercase mb-3">Community Love</p>
          <h2 className="font-display text-4xl lg:text-5xl text-white/90">What Vibers Say</h2>
        </motion.div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {TESTIMONIALS.map((t, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 40 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: i * 0.08 }} className="glass rounded-2xl p-6 hover:border-amber-500/15 transition-all duration-300">
              <div className="flex gap-0.5 mb-4">
                {[...Array(t.stars)].map((_, s) => (
                  <span key={s} className="text-amber-400 text-sm">★</span>
                ))}
              </div>
              <p className="text-sm text-[#e8e8f0] leading-relaxed mb-5 italic">&ldquo;{t.quote}&rdquo;</p>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-violet-600/60 flex items-center justify-center text-xs font-bold text-white flex-shrink-0">
                  {t.name.charAt(0)}
                </div>
                <div>
                  <div className="text-sm text-white font-medium">{t.name}</div>
                  <div className="text-xs text-[#44445a]">{t.handle}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
