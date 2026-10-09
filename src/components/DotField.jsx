import { useEffect, useRef } from 'react'
import { reduce } from '../lib/motion.js'

const GAP = 28
const RADIUS = 210
const BONE = '236,234,227'
const SIGNAL = '212,255,63'

/* Canvas dot matrix: a slow interference wave, with dots near the pointer lifting toward signal. */
export default function DotField() {
  const ref = useRef(null)

  useEffect(() => {
    const c = ref.current
    const ctx = c.getContext('2d')
    let w = 0, h = 0, dots = [], raf = 0, visible = true
    const mouse = { x: -1e4, y: -1e4 }
    const m = { x: -1e4, y: -1e4 }

    const build = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      const r = c.getBoundingClientRect()
      w = r.width; h = r.height
      c.width = w * dpr; c.height = h * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      dots = []
      const ox = (w % GAP) / 2, oy = (h % GAP) / 2
      for (let y = oy; y < h; y += GAP) for (let x = ox; x < w; x += GAP) dots.push(x, y)
    }

    const draw = (t) => {
      m.x += (mouse.x - m.x) * 0.12
      m.y += (mouse.y - m.y) * 0.12
      ctx.clearRect(0, 0, w, h)
      for (let i = 0; i < dots.length; i += 2) {
        const x = dots[i], y = dots[i + 1]
        const wave = Math.sin(x * 0.011 + t * 0.0007) * Math.cos(y * 0.013 - t * 0.0005)
        const a = 0.12 + wave * 0.08
        const dx = x - m.x, dy = y - m.y
        const d = Math.hypot(dx, dy)
        const f = d < RADIUS ? 1 - d / RADIUS : 0
        if (f > 0) {
          const e = f * f
          const k = (e * 16) / (d || 1)
          ctx.fillStyle = `rgba(${SIGNAL},${a + e * 0.85})`
          ctx.beginPath()
          ctx.arc(x + dx * k, y + dy * k, 0.9 + e * 2.4, 0, 6.2832)
          ctx.fill()
        } else {
          ctx.fillStyle = `rgba(${BONE},${a})`
          ctx.fillRect(x - 0.8, y - 0.8, 1.6, 1.6)
        }
      }
      if (visible && !reduce) raf = requestAnimationFrame(draw)
    }

    const onMove = (e) => {
      const r = c.getBoundingClientRect()
      mouse.x = e.clientX - r.left
      mouse.y = e.clientY - r.top
    }
    const onLeave = () => { mouse.x = -1e4; mouse.y = -1e4 }

    build()
    draw(0)
    const ro = new ResizeObserver(() => { build(); if (reduce) draw(0) })
    ro.observe(c)
    const io = new IntersectionObserver(([en]) => {
      visible = en.isIntersecting
      cancelAnimationFrame(raf)
      if (visible && !reduce) raf = requestAnimationFrame(draw)
    })
    io.observe(c)
    window.addEventListener('pointermove', onMove)
    document.documentElement.addEventListener('pointerleave', onLeave)

    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect(); io.disconnect()
      window.removeEventListener('pointermove', onMove)
      document.documentElement.removeEventListener('pointerleave', onLeave)
    }
  }, [])

  return <canvas className="field" ref={ref} aria-hidden="true" />
}
