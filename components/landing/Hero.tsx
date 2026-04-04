'use client'
import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'

function StarField() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    let animId: number
    const stars: { x: number; y: number; r: number; speed: number; opacity: number }[] = []
    function resize() {
      canvas!.width = window.innerWidth
      canvas!.height = window.innerHeight
    }
    function init() {
      resize()
      for (let i = 0; i < 200; i++) {
        stars.push({ x: Math.random() * canvas!.width, y: Math.random() * canvas!.height, r: Math.random() * 1.5, speed: 0.08 + Math.random() * 0.25, opacity: 0.1 + Math.random() * 0.7 })
      }
    }
    function draw() {
      ctx!.clearRect(0, 0, canvas!.width, canvas!.height)
      stars.forEach(star => {
        ctx!.beginPath()
        ctx!.arc(star.x, star.y, star.r, 0, Math.PI * 2)
        ctx!.fillStyle = `rgba(168,85,247,${star.opacity})`
        ctx!.fill()
        star.y -= star.speed
        if (star.y < 0) { star.y = canvas!.height; star.x = Math.random() * canvas!.width }
      })
      animId = requestAnimationFrame(draw)
    }
    init(); draw()
    window.addEventListener('resize', resize)
    return () => { cancelAnimationFrame(animId); window.removeEventListener('resize', resize) }
  }, [])
  return <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" style={{ opacity: 0.5 }} />
}

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-6">
      <StarField />
      <div className="absolute inset-0 bg-gradient-radial from-violet-900/10 via-transparent to-transparent" />
      <div className="relative z-10 text-center max-w-5xl mx-auto pt-20">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass mb-8">
          <span className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-pulse" />
          <span className="text-xs font-medium text-violet-300 tracking-widest uppercase">The VerseVibes Community</span>
        </motion.div>
        <motion.h1 initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }} className="font-display leading-none mb-6" style={{ fontSize: 'clamp(3rem, 8vw, 7rem)' }}>
          <span className="gradient-text-cool">Where Words</span>
          <br />
          <span className="text-white/90 italic">Come Alive</span>
        </motion.h1>
        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.6 }} className="text-lg text-[#8888a8] max-w-2xl mx-auto mb-12 leading-relaxed">
          Join the VerseVibes family — a cinematic space where poetry meets conversation, stories spark connections, and every message carries soul.
        </motion.p>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.8 }} className="flex flex-wrap gap-4 justify-center">
          <Link href="/community" className="btn-primary px-8 py-3.5 rounded-full text-white font-medium text-sm tracking-wide">Enter the Community</Link>
          <a href="https://youtube.com/@vv_versevibes" target="_blank" rel="noopener noreferrer" className="px-8 py-3.5 rounded-full glass-bright text-[#e8e8f0] font-medium text-sm tracking-wide hover:border-amber-500/30 transition-all">Watch on YouTube ↗</a>
        </motion.div>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }} className="mt-20 flex flex-col items-center gap-2">
          <span className="text-xs text-[#44445a] tracking-widest uppercase">Scroll</span>
          <div className="w-px h-12 bg-gradient-to-b from-violet-500/50 to-transparent animate-pulse" />
        </motion.div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#050509] to-transparent" />
    </section>
  )
}
