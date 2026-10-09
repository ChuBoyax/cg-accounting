import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import Lenis from 'lenis'
import { gsap, ScrollTrigger, reduce, firstVisit, heroIntro, headerIntro, smooth, scrollToTarget, refresh } from './lib/motion.js'
import Loader from './components/Loader.jsx'
import Cursor from './components/Cursor.jsx'
import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'
import Home from './pages/Home.jsx'
import AboutPage from './pages/AboutPage.jsx'
import ServicesPage from './pages/ServicesPage.jsx'
import TaxPage from './pages/TaxPage.jsx'
import ContactPage from './pages/ContactPage.jsx'

if ('scrollRestoration' in history) history.scrollRestoration = 'manual'

const TITLES = {
  '/': 'CG Accounting Corporation | Accountant in Fort Lauderdale, FL since 1991',
  '/about': 'About Us | CG Accounting Corporation',
  '/services': 'Services | CG Accounting Corporation',
  '/tax-info': 'Tax Info | CG Accounting Corporation',
  '/contact': 'Contact Us | CG Accounting Corporation',
}

let firstPage = true

/* Wraps each route: scroll reset, shared scroll reveals, and the wipe between pages. */
function Page({ children }) {
  const { pathname } = useLocation()
  const curtain = useRef(null)

  useLayoutEffect(() => {
    document.title = TITLES[pathname] || TITLES['/']
    scrollToTarget(0, true)
    window.scrollTo(0, 0)

    const isFirst = firstPage
    // Deferred so StrictMode's immediate re-run still counts as the first page.
    setTimeout(() => { firstPage = false })
    if (reduce) return

    const ctx = gsap.context(() => {
      gsap.utils.toArray('.split').forEach((el) => {
        if (el.closest('[data-hero]')) return
        gsap.from(el.querySelectorAll('.w > span'), {
          yPercent: 115, duration: 1.3, stagger: 0.045, ease: 'expo.out',
          scrollTrigger: { trigger: el, start: 'top 88%' },
        })
      })
      gsap.utils.toArray('[data-sh] .rule').forEach((el) => {
        gsap.from(el, { scaleX: 0, duration: 1.6, ease: 'expo.out', scrollTrigger: { trigger: el, start: 'top 92%' } })
      })
      gsap.utils.toArray('[data-reveal]').forEach((el) => {
        gsap.from(el, { y: 48, opacity: 0, duration: 1.3, ease: 'expo.out', scrollTrigger: { trigger: el, start: 'top 90%' } })
      })

      if (!isFirst) {
        // Arriving from another page: the curtain lifts, then the hero plays.
        gsap.fromTo(curtain.current, { clipPath: 'inset(0 0 0% 0)' }, { clipPath: 'inset(0 0 100% 0)', duration: 1.1, ease: 'expo.inOut' })
        heroIntro()
      } else if (!firstVisit) {
        heroIntro()
      }
    })
    requestAnimationFrame(refresh)
    return () => ctx.revert()
  }, [pathname])

  return (
    <>
      <div className="curtain" ref={curtain} aria-hidden="true" />
      {children}
    </>
  )
}

export default function App() {
  const [showLoader, setShowLoader] = useState(firstVisit)
  const location = useLocation()

  useLayoutEffect(() => {
    if (!firstVisit) {
      const ctx = gsap.context(headerIntro)
      return () => ctx.revert()
    }
  }, [])

  /* ---------- Smooth scroll ---------- */
  useEffect(() => {
    let tick
    if (!reduce) {
      const lenis = new Lenis({ duration: 1.2, smoothWheel: true })
      smooth.lenis = lenis
      lenis.on('scroll', ScrollTrigger.update)
      tick = (t) => lenis.raf(t * 1000)
      gsap.ticker.add(tick)
      gsap.ticker.lagSmoothing(0)
    }

    // In-page anchors still glide.
    const onClick = (e) => {
      const a = e.target.closest('a[href^="#"]')
      if (!a) return
      const id = a.getAttribute('href')
      if (id.length < 2) return
      const el = document.querySelector(id)
      if (!el) return
      e.preventDefault()
      scrollToTarget(el)
    }
    document.addEventListener('click', onClick)

    // Positions shift once web fonts land.
    document.fonts?.ready.then(refresh)

    return () => {
      document.removeEventListener('click', onClick)
      if (tick) gsap.ticker.remove(tick)
      smooth.lenis?.destroy()
      smooth.lenis = null
    }
  }, [])

  // Hold the page still while the loader plays.
  useEffect(() => {
    if (showLoader) smooth.lenis?.stop()
    else smooth.lenis?.start()
  }, [showLoader])

  return (
    <>
      {showLoader && <Loader onDone={() => setShowLoader(false)} />}
      <Cursor />
      <div className="grain" aria-hidden="true" />
      <div className="gridlines" aria-hidden="true"><div className="wrap"><i /><i /><i /><i /></div></div>
      <Header />
      <main id="top" key={location.pathname}>
        <Page>
          <Routes location={location}>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/tax-info" element={<TaxPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Page>
      </main>
      <Footer />
    </>
  )
}
