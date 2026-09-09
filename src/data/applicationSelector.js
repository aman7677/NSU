import { products } from './products.js'

export const applicationSelectorOptions = [
  {
    id: 'plastics-masterbatch',
    label: 'Plastics & Masterbatch',
    matchTerms: ['PVC Coating'],
    note: 'Technical compatibility awaiting official NSU confirmation. Results are based on existing PVC Coating application data.',
  },
  {
    id: 'printing-inks',
    label: 'Printing Inks',
    matchTerms: ['Gravure Coating', 'Highlighter Ink'],
    note: 'Results reflect the existing gravure coating and highlighter ink application data.',
  },
  {
    id: 'paper-coatings',
    label: 'Paper & Coatings',
    matchTerms: ['Paper Coating', 'Gravure Coating'],
    note: 'Results reflect the existing paper coating and gravure coating application data.',
  },
  {
    id: 'wax-candle',
    label: 'Wax & Candle',
    matchTerms: ['Candles'],
    note: 'Technical compatibility awaiting official NSU confirmation. Results reflect existing candle application tags.',
  },
  {
    id: 'leather',
    label: 'Leather',
    matchTerms: [],
    note: 'Technical compatibility awaiting official NSU confirmation. Leather compatibility is not represented in the current product data.',
  },
  {
    id: 'specialty-industrial',
    label: 'Specialty Industrial Applications',
    matchTerms: ['Industrial Markers', 'Crack Detection', 'Leak Detection', 'Security Pigments', 'Paint Balls'],
    note: 'Results reflect the existing industrial application data for these products.',
  },
]

export function getProductApplications(product) {
  return product.applications || product.tags || []
}

export function productsForApplication(applicationId) {
  const application = applicationSelectorOptions.find((item) => item.id === applicationId)
  if (!application || application.matchTerms.length === 0) return []

  return products.filter((product) => {
    const productApplications = getProductApplications(product)
    return application.matchTerms.some((term) => productApplications.includes(term))
  })
}
