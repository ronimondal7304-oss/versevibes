'use client'
import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { ExternalLink } from 'lucide-react'

const videos = [
  {
    title: 'The Weight of Words',
    description: 'A cinematic poetry piece about the power language holds over our lives.',
    tag: 'Poetry',
    color: '#7c3aed',
    url: 'https://youtube.com/@vv_versevibes',
  },
  {
    title: 'Silence Speaks',
    description: 'What happens when we stop talking and start listening to the universe.',
    tag: 'Philosophy',
    color: '#f59e0b',
    url: 'https://youtube.com/@vv_versevibes',
  },
  {
    title: 'Rise Again',
    description: 'Motivational storytelling for those who feel like giving up.',
    tag: 'Motivation',
    color: '#f43f5e',
    url: 'https://youtube.com/@vv_versevibes',
  },
]

export function FeaturedContent() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section ref={ref} className="py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="flex flex-col md:flex-row md:items-end md:justify-between mb-14 gap-6"
        >
          <div>
            <p className="text-violet-400 text-sm font-medium tracking-widest uppercase mb-4">Featured</p>
            <h2 className="font-display text-4xl lg:text-5xl text-white/90">
              Fresh from the{' '}
              <span className="italic text-amber-400">channel</span>
            </h2>
          </div>
          <a
            href="https://youtube.com/@vv_versevibes"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm text-violet-400 hover:text-violet-300 transition-colors"
          >
            View all videos <ExternalLink size={14} />
          </a>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {videos.map((video, i) => (
            <motion.a
              key={i}
              href={video.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="group glass rounded-2xl overflow-hidden hover:border-white/12 transition-all duration-300 block"
            >
              {/* Thumbnail placeholder — cinematic gradient */}
              <div
                className="aspect-video flex items-center justify-center relative overflow-hidden"
                style={{
                  background: `linear-gradient(135deg, ${video.color}20 0%, #050509 100%)`,
                }}
              >
                <div
                  className="text-5xl opacity-20 group-hover:opacity-30 transition-opacity"
                  style={{ color: video.color }}
                >
                  ▶
                </div>
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ background: `radial-gradient(circle at center, ${video.color}15 0%, transparent 70%)` }}
                />
              </div>

              <div className="p-5">
                <span
                  className="text-xs font-medium px-2.5 py-1 rounded-full mb-3 inline-block"
                  style={{ background: `${video.color}15`, color: video.color }}
                >
                  {video.tag}
                </span>
                <h3 className="text-white font-display text-lg mb-2">{video.title}</h3>
                <p className="text-[#8888a8] text-sm leading-relaxed">{video.description}</p>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  )
}
