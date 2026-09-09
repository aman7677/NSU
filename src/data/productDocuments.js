export const documentTypes = [
  ['tds', 'TDS'],
  ['sds', 'SDS'],
  ['coa', 'COA'],
]

export function getDocument(product, key) {
  return product.documents?.[key] || product[key] || null
}
