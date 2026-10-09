import { useEffect, useRef, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { ScrollTrigger, smooth } from '../lib/motion.js'
import { PHONE, TEL, EMAIL } from '../data.jsx'
import { Btn, Clock, Arrow, pad } from './ui.jsx'

export const NAV = [
  ['/', 'Home'],
  ['/about', 'About Us'],
  ['/services', 'Services'],
  ['/tax-info', 'Tax Info'],
  ['/contact', 'Contact Us'],
]

export default function Header() {
  const [open, setOpen] = useState(false)
  const hdr = useRef(null)
  const { pathname } = useLocation()

  // Hide on scroll down, show on scroll up.
  useEffect(() => {
    const hide = ScrollTrigger.create({
      start: 0, end: 'max',
      onUpdate: (s) => hdr.current.classList.toggle('hide', s.direction === 1 && s.scroll() > 240),
    })
    return () => hide.kill()
  }, [])

  useEffect(() => {
    hdr.current.classList.remove('hide')
    setOpen(false)
  }, [pathname])

  useEffect(() => {
    if (open) smooth.lenis?.stop()
    else smooth.lenis?.start()
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  return (
    <>
      <header className="hdr" ref={hdr}>
        <div className="wrap">
          <Link className="logo glass" to="/" aria-label="CG Accounting Corporation, home">
            <span className="logo-mark" aria-hidden="true">CG</span>
            <span className="logo-txt">CG Accounting<small>Corporation · Est. 1991</small></span>
          </Link>
          <nav className="nav glass" aria-label="Main">
            {NAV.map(([to, label]) => (
              <NavLink key={to} to={to} end className={({ isActive }) => (isActive ? 'on' : undefined)}>{label}</NavLink>
            ))}
          </nav>
          <div className="hdr-r">
            <Clock className="clock glass" />
            <Btn href={TEL}>Call us</Btn>
            <button className="menu-btn glass" aria-expanded={open} aria-controls="mnav" onClick={() => setOpen((o) => !o)}>
              <span>{open ? 'Close' : 'Menu'}</span><span className="bars" aria-hidden="true" />
            </button>
          </div>
        </div>
      </header>

      <div className={`mnav${open ? ' open' : ''}`} id="mnav" aria-hidden={!open}>
        <nav aria-label="Mobile">
          {NAV.map(([to, label], i) => (
            <Link key={to} className="big" to={to} tabIndex={open ? 0 : -1} onClick={() => setOpen(false)}>
              {label}<span className="mono dim">{pad(i + 1)}</span>
            </Link>
          ))}
        </nav>
        <div className="mnav-foot">
          <a className="txt-link" href={TEL} tabIndex={open ? 0 : -1}>{PHONE} <Arrow /></a>
          <a className="txt-link" href={`mailto:${EMAIL}`} tabIndex={open ? 0 : -1}>{EMAIL} <Arrow /></a>
          <Clock className="dim" />
        </div>
      </div>
    </>
  )
}
