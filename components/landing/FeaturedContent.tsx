'use client'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { Play, ExternalLink } from 'lucide-react'

const FEATURED_VIDEOS = [
  {
    id: 'featured-1',
    title: 'The Art of Letting Go',
    description: 'A poetic journey through acceptance, loss, and the beauty of moving forward.',
    thumbnail: 'https://picsum.photos/seed/verse1/800/450',
    tag: 'Poetry',
    url: 'https://youtube.com/@vv_versevibes',
  },
  {
    id: 'featured-2',
    title: 'Midnight Thoughts',
    description: 'When the world sleeps and your mind speaks the loudest truths.',
    thumbnail: 'https://picsum.photos/seed/verse2/800/450',
    tag: 'Motivation',
    url: 'https://youtube.com/@vv_versevibes',
  },
  {
    id: 'featured-3',
    title: 'Rise Again',
    description: 'For every soul that has fallen and found the courage to rise once more.',
    thumbnail: 'https://picsum.photos/seed/verse3/800/450',
    tag: 'Storytelling',
    url: 'https://youtube.com/@vv_versevibes',
  },
]

export function FeaturedContent() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section ref={ref} id="content" className="py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <p className="text-sm font-medium tracking-widest uppercase mb-4" style={{ color: '#a78bfa' }}>
            Featured Content
          </p>
          <h2
            className="text-4xl lg:text-5xl"
            style={{ fontFamily: 'Playfair Display, Georgia, serif', color: 'rgba(255,255,255,0.9)' }}
          >
            Stories Worth Feeling
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {FEATURED_VIDEOS.map((video, i) => (
            <motion.a
              key={video.id}
              href={video.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className="glass rounded-2xl overflow-hidden group block hover:border-violet-500/20 transition-all duration-300"
              whileHover={{ y: -4 }}
            >
              <div className="relative aspect-video overflow-hidden">
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                  width={800}
                  height={450}
                />
                <div className="absolute inset-0 flex items-center justify-center" style={{ background: 'rgba(0,0,0,0.3)' }}>
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 scale-75 group-hover:scale-100"
                    style={{ background: 'rgba(124,58,237,0.9)' }}
                  >
                    <Play size={18} className="text-white ml-0.5" fill="white" />
                  </div>
                </div>
                <div className="absolute top-3 left-3">
                  <span
                    className="text-xs px-2 py-1 rounded-full font-medium"
                    style={{ background: 'rgba(124,58,237,0.8)', color: 'white' }}
                  >
                    {video.tag}
                  </span>
                </div>
              </div>
              <div className="p-5">
                <h3
                  className="text-lg mb-2 text-white"
                  style={{ fontFamily: 'Playfair Display, Georgia, serif' }}
                >
                  {video.title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: '#8888a8' }}>
                  {video.description}
                </p>
              </div>
            </motion.a>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.6 }}
          className="text-center mt-12"
        >
          <a
            href="https://youtube.com/@vv_versevibes"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-medium transition-colors"
            style={{ color: '#a78bfa' }}
          >
            <ExternalLink size={16} />
            View all videos on YouTube
          </a>
        </motion.div>
      </div>
    </section>
  )
}
