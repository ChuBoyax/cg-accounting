import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
export const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches

export const refresh = () => ScrollTrigger.refresh()

// Lenis instance, set by App once smooth scrolling starts.
export const smooth = { lenis: null }

export function scrollToTarget(target, immediate = false) {
  if (smooth.lenis) smooth.lenis.scrollTo(target, { offset: target === 0 ? 0 : -80, duration: 1.6, immediate })
  else if (target === 0) window.scrollTo({ top: 0 })
  else target.scrollIntoView()
}

// Loader plays once per session. Read at module load so StrictMode's double render can't flip it.
export const firstVisit = (() => {
  try {
    const seen = sessionStorage.getItem('cg_loader') === '1'
    sessionStorage.setItem('cg_loader', '1')
    return !seen
  } catch {
    return true
  }
})()

/* Intro for whichever page hero is mounted (home hero or an inner-page hero). */
export function heroIntro() {
  if (reduce || !document.querySelector('[data-hero]')) return
  gsap.timeline()
    .from('[data-hero] h1 .ln > span', { yPercent: 115, duration: 1.5, stagger: 0.09, ease: 'expo.out' })
    .from('[data-hero] [data-intro]', { opacity: 0, y: 28, duration: 1.2, stagger: 0.08, ease: 'expo.out' }, 0.3)
    .from('[data-hero] .field', { opacity: 0, duration: 2.4, ease: 'power2.out' }, 0)
}

export function headerIntro() {
  if (reduce) return
  gsap.from('.hdr .wrap', { yPercent: -160, duration: 1.3, ease: 'expo.out', delay: 0.2 })
}

export { gsap, ScrollTrigger }
