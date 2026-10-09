import { useTilt } from '../lib/hooks.js'
import { ABOUT } from '../data.jsx'
import { SecHead } from './ui.jsx'
import LitText from './LitText.jsx'

export default function Team({ idx = '01' }) {
  const tilt = useTilt(5)

  return (
    <section id="team" aria-labelledby="team-h">
      <div className="wrap">
        <SecHead idx={idx} label="Meet David" right="Public Accountant" />
        <div className="team-grid">
          <figure className="portrait inv" data-tone="light" ref={tilt} data-reveal>
            <div className="portrait-top mono dim"><span>DG</span><span>Since 1991</span></div>
            <div className="portrait-ph"><span className="mono dim">[ Photo of David Goldis ]</span></div>
            <figcaption className="portrait-foot">
              <div><b>David Goldis</b><span className="mono dim">Public Accountant · 30+ years</span></div>
              <span className="mono">EN · HE · YI</span>
            </figcaption>
          </figure>

          <div className="bio">
            <LitText as="h2" id="team-h" className="big-lit" text={ABOUT.lead} />
            <p className="lead" data-reveal>{ABOUT.experience}</p>
            <p className="body-lg dim" data-reveal>{ABOUT.industries}</p>
            <div className="bio-cols" data-reveal>
              <div>
                <h3 className="mono">Public service</h3>
                <p>{ABOUT.service}</p>
              </div>
              <div>
                <h3 className="mono">Languages</h3>
                <p>{ABOUT.languages}</p>
                <div className="tags">
                  <span lang="en">English</span>
                  <span lang="he" dir="rtl">עברית</span>
                  <span lang="yi" dir="rtl">ייִדיש</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
