import PageHero from '../components/PageHero.jsx'
import Services from '../components/Services.jsx'
import Languages from '../components/Languages.jsx'
import CtaBand from '../components/CtaBand.jsx'

export default function ServicesPage() {
  return (
    <>
      <PageHero code="03" label="Services" title="Our" accent="Services" note="For Individuals · For Business · QuickBooks" />
      <Services idx="01" />
      <Languages idx="02" />
      <CtaBand />
    </>
  )
}
