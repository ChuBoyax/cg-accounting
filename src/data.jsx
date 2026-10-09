export const PHONE = '(954) 964-9220'
export const TEL = 'tel:+19549649220'
export const EMAIL = 'david@cg-accounting.com'
export const FAX = '(954) 964-9224'

// Homepage copy, verbatim from the client.
export const HOME = {
  welcomeLead: 'Established in 1991, CG Accounting is dedicated to the highest quality professional service and guidance, with personal attention given to all clients.',
  welcomeRest: 'The firm combines technical knowledge, many years of experience, and understanding of current issues and regulatory matters to provide service in the areas of accounting, representation at audits at the Federal, State, County and City levels, all aspects of Federal, State and local taxes, business consulting, litigation support, real estate and construction accounting, QuickBooks, as well as Federal, State and local government accounting and consulting services.',
  philosophy: [
    'Our philosophy is to take advantage of the small firm mentality and approach, in order to provide each client with individualized service.',
    'Our goal is to achieve the perfect product at a fair price.',
    'We encourage our customers to do as much work as possible, to minimize their costs.',
    'CG Accounting, through its various partnerships, has the capabilities of the “Big Four”.',
  ],
  world: 'As a multicultural and multilingual firm, through our offices in Fort Lauderdale, Florida, we service clients throughout the United States, Israel, Europe, and Latin America.',
  commitment: 'We are committed to helping our clients with insightful advice, always available for quick responses to serve our clientele with the highest standard of excellence and professionalism.',
}

export const REGIONS = ['United States', 'Israel', 'Europe', 'Latin America']

export const HERO_WORDS = [
  { text: 'accountant', lang: 'en', name: 'English' },
  { text: 'contador', lang: 'es', name: 'Spanish' },
  { text: 'רואה חשבון', lang: 'he', name: 'Hebrew', rtl: true },
  { text: 'comptable', lang: 'fr', name: 'French' },
  { text: 'חשבון־פֿירער', lang: 'yi', name: 'Yiddish', rtl: true },
]

export const LANGS = [
  { word: 'Accountant', lang: 'en', name: 'English' },
  { word: 'רואה חשבון', lang: 'he', name: 'Hebrew', rtl: true },
  { word: 'Contador', lang: 'es', name: 'Spanish' },
  { word: 'Comptable', lang: 'fr', name: 'French' },
  { word: 'חשבון־פֿירער', lang: 'yi', name: 'Yiddish', rtl: true },
]

export const HIGHLIGHTS = [
  'Established 1991',
  'Audit representation at Federal, State, County and City levels',
  'Federal, State and local taxes',
  'QuickBooks setup and training',
  'Incorporations in any state',
  'Notary',
  'Serving the U.S., Israel, Europe and Latin America',
]

// About Us copy, verbatim from the client. Card bodies are the bio's own sentences, in order.
export const STORY = [
  { when: 'Philadelphia', title: 'Born third generation', body: 'Third generation, born in Philadelphia, PA, he and his family moved to Israel for his 1st year of elementary school.' },
  { when: 'Far Rockaway', title: 'Raised in New York', body: 'He was then brought up in Far Rockaway, NY, where he completed his schooling through high school.' },
  { when: 'Jerusalem', title: 'University abroad', body: 'His 1st year of University studies was done abroad on the campus of Yeshiva University in Jerusalem, Israel.' },
  { when: '1987', title: 'B.S. in Accounting', body: 'He then returned to NY where he earned his Bachelor of Science degree in Accounting from Yeshiva University in January 1987.' },
  { when: 'Wall Street', title: 'Spicer & Oppenheim', body: 'His professional life started in New York City, where he initially worked for Spicer & Oppenheim, a well known Wall Street accounting firm which specialized in Accounting for brokerage firms such as Bear Stearns.' },
  { when: 'Big Eight', title: 'Peat Marwick and Coopers & Lybrand', body: 'Afterwards he worked for two of the “Big Eight” firms, Peat Marwick (at the time the #1 Accounting firm in the world), and Coopers & Lybrand.' },
  { when: '1991', title: 'CG Accounting Corp.', body: 'In 1991, he opened his own firm CG Accounting Corp., now located in Fort Lauderdale, Florida.' },
]

export const ABOUT = {
  lead: 'David Goldis is a Public Accountant for 30 plus years.',
  experience: 'Mr. Goldis has many years of extensive experience in tax services and consulting, audit representation and financial consulting, including business planning, business evaluation, divorce litigation support and management services.',
  industries: 'His work experience includes a broad range of industries with an emphasis on small business owners, real estate sales and development, mortgage lenders and brokers, professional/medical practices, retailers, consultants, personal services providers, sports, and non-profit organizations.',
  service: 'Mr. Goldis combines his professional practice with public service, as well as charity work. He is heavily involved in many non-profit, religious and sports organizations in his community.',
  languages: 'Mr. Goldis is multilingual and fluent in English, Hebrew and Yiddish.',
}

// Services copy, verbatim from the client. Grouped as on their Services page.
export const SERVICE_GROUPS = [
  {
    key: 'ind', label: 'For Individuals',
    items: [
      { title: 'Federal and all States tax preparation' },
      { title: 'Tax planning' },
      { title: 'Projections' },
    ],
  },
  {
    key: 'biz', label: 'For Business',
    items: [
      { title: 'Federal and all States tax preparation' },
      { title: 'Audits, Reviews, Compilations', note: 'Some work referred to partner firms' },
      { title: 'Small Business Accounting' },
      { title: 'Strategic Business Planning' },
      { title: 'New Business Formation' },
      { title: 'Incorporations in any State' },
      { title: 'Non Profit Organization' },
      { title: 'Notary' },
    ],
  },
  {
    key: 'qb', label: 'QuickBooks',
    items: [
      { title: 'Setup' },
      { title: 'Training' },
    ],
  },
]

export const REFERRAL = 'Through our vast referral network we partner with attorneys, CFP’s, insurance brokers, bankers, credit card processors, payroll service providers, etc.'

// Tax Info: the client's list, in their order. Dead links from the old site were
// replaced with the current official page for the same thing.
export const RESOURCES = [
  { title: 'Federal Refunds', href: 'https://www.irs.gov/wheres-my-refund', src: 'IRS' },
  { title: 'State Websites', href: 'https://taxadmin.org/fta-members/', src: 'FTA' },
  { title: 'Tax Rates', href: 'https://www.irs.gov/filing/federal-income-tax-rates-and-brackets', src: 'IRS' },
  { title: 'Florida Sales Tax Registration', href: 'https://floridarevenue.com/Forms_library/current/dr1.pdf', src: 'Florida DOR', pdf: true },
  { title: 'IRS Main Page', href: 'https://www.irs.gov/', src: 'IRS' },
  { title: 'Form 1040', href: 'https://www.irs.gov/pub/irs-pdf/f1040.pdf', src: 'IRS', pdf: true },
  { title: 'Form W-4', href: 'https://www.irs.gov/pub/irs-pdf/fw4.pdf', src: 'IRS', pdf: true },
  { title: 'Form I-9', href: 'https://www.uscis.gov/sites/default/files/document/forms/i-9.pdf', src: 'USCIS', pdf: true },
  { title: 'Social Security Administration', href: 'https://www.ssa.gov/', src: 'SSA' },
]

// Contact copy, verbatim from the client.
export const DIRECTIONS = [
  { from: 'Coming from I-95', text: 'Head West on Stirling Road for 1.4 miles, turn right into Emerald Lake Corporate Park.' },
  { from: 'Coming from State Road 7 (441)', text: 'Head East on Stirling Road for 2.2 miles, turn left into Emerald Lake Corporate Park.' },
]
export const BUILDING = 'The office is located in a two story white office building with black awnings called “One Emerald Place”, just East of the Broward County Library.'
export const MAPS_URL = 'https://www.google.com/maps/search/?api=1&query=3113+Stirling+Rd+Suite+102+Fort+Lauderdale+FL+33312'
export const MAPS_EMBED = 'https://www.google.com/maps?q=3113+Stirling+Rd+Suite+102,+Fort+Lauderdale,+FL+33312&output=embed'
