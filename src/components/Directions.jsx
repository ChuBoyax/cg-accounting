import { DIRECTIONS, BUILDING, MAPS_URL, MAPS_EMBED } from '../data.jsx'
import { SecHead, Split, Arrow, pad } from './ui.jsx'

export default function Directions({ idx = '02' }) {
  return (
    <section className="inv" data-tone="light" aria-labelledby="dir-h">
      <div className="wrap">
        <SecHead idx={idx} label="Map and Directions" right="Emerald Lake Corporate Park" />
        <Split id="dir-h" className="h2" text="Driving *directions.*" />
        <div className="dir-grid">
          <div className="map" data-reveal>
            <iframe title="Map to CG Accounting, 3113 Stirling Rd. Suite 102, Fort Lauderdale" src={MAPS_EMBED} loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
          </div>
          <div>
            <ol className="rows" data-reveal>
              {DIRECTIONS.map((d, i) => (
                <li className="dir" key={d.from}>
                  <span className="mono dim">{pad(i + 1)}</span>
                  <div><h3>{d.from}</h3><p className="dim">{d.text}</p></div>
                </li>
              ))}
              <li className="dir">
                <span className="mono dim">{pad(DIRECTIONS.length + 1)}</span>
                <div><h3>One Emerald Place</h3><p className="dim">{BUILDING}</p></div>
              </li>
            </ol>
            <p style={{ marginTop: 28 }}>
              <a className="txt-link" href={MAPS_URL} target="_blank" rel="noopener">Open in Google Maps <Arrow /></a>
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
