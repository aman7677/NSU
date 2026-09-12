import { products } from './products.js'

export const applicationSelectorOptions = [
  'Fluorescent Pigment Powder',
  'Water Based Paints',
  'Solvent Based Paints',
  'Aerosol Spray Paints',
  'Poster Colours',
  'Paper Coating',
  'PVC Coating',
  'Gravure Coating',
  'Clay Coating',
  'Seed Coating',
  'Industrial Markers',
  'Highlighter Ink',
  'Paint Balls',
  'Wax Crayons',
  'Rangoli',
  'Candles',
  'Clay Dough',
  'Sindur',
].map((label) => ({
  id: label.toLowerCase().replaceAll(/[^a-z0-9]+/g, '-'),
  label,
  matchTerms: [label],
  note: `Products currently tagged for ${label.toLowerCase()} applications are shown below.`,
}))

export function getProductApplications(product) {
  return product.applications || product.tags || []
}

export function productsForApplication(applicationId) {
  const application = applicationSelectorOptions.find((item) => item.id === applicationId)
  if (!application || application.matchTerms.length === 0) return []

  if (applicationId === 'fluorescent-pigment-powder') {
    return products.filter((product) => product.category === 'Fluorescent Pigments')
  }

  return products.filter((product) => {
    const productApplications = getProductApplications(product)
    return application.matchTerms.some((term) => productApplications.includes(term))
  })
}
