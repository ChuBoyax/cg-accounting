import PageHero from '../components/PageHero.jsx'
import TaxInfo from '../components/TaxInfo.jsx'
import CtaBand from '../components/CtaBand.jsx'

export default function TaxPage() {
  return (
    <>
      <PageHero code="04" label="Tax Info" title="Tax" accent="Info" note="Most used links and forms" />
      <TaxInfo idx="01" />
      <CtaBand />
    </>
  )
}
