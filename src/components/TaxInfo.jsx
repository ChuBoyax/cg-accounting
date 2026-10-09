import { RESOURCES } from '../data.jsx'
import { SecHead, Split, Arrow, Crop, pad } from './ui.jsx'
import art from '../../images/tax/imgTaxes.png'

const ART = [312, 372]

export default function TaxInfo({ idx = '01' }) {
  return (
    <section id="tax-info" aria-labelledby="tax-h">
      <div className="wrap">
        <SecHead idx={idx} label="Tax info" right={`${RESOURCES.length} links & forms`} />
        <div className="split-grid">
          <div className="sticky">
            <Split id="tax-h" className="h2" text="Most used links *and forms.*" />
            <div className="tax-art" data-reveal>
              <Crop src={art} nat={ART} box={[46, 4, 220, 150]} alt="Wooden letter blocks spelling TAX on a tax form" />
              <Crop src={art} nat={ART} box={[46, 210, 220, 145]} alt="Form 1040 with a calculator and pen" />
            </div>
          </div>
          <ol className="rows ledger" data-reveal>
            {RESOURCES.map((r, i) => (
              <li key={r.title}>
                <a className="row" href={r.href} target="_blank" rel="noopener">
                  <span className="mono dim">{pad(i + 1)}</span>
                  <h3>{r.title}</h3>
                  <span className="mono dim">{r.pdf ? `PDF · ${r.src}` : r.src}</span>
                  <Arrow className="arr" size={18} />
                  <span className="sr">{r.pdf ? '(PDF, opens in a new tab)' : '(opens in a new tab)'}</span>
                </a>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
