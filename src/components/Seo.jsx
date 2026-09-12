import { useEffect } from 'react'
import { products } from '../data/products.js'

const pages = {
  '/': { title: 'Fluorescent Pigment Manufacturer & Supplier | Narayan Sindur Udyog', description: 'Narayan Sindur Udyog manufactures fluorescent pigment solutions for plastics, masterbatch, printing inks, coatings, paper, wax and specialty industrial applications.' },
  '/products': { title: 'NSU - Sindoor Colour, Fluorescent Pigments & Colour Powders', description: 'Explore NSU sindhoor colours, fluorescent pigment powders, bright colour powders for water based paints, solvent based paints, aerosol spray paints, poster colours, paper coating, and custom colour solutions.' },
  '/applications': { title: 'NSU - Pigment Applications for Paints, Textiles, Plastics & Industry', description: 'Discover NSU colour pigment applications for sindhoor, rangoli, textile printing, master batch, flexo ink, gravure ink, PVC coating, paper coating, industrial markers, crack detection, and custom pigment preparation.' },
  '/about': { title: 'About NSU - Colour Solutions', description: 'Learn about NSU’s application-led approach to vibrant colour and pigment solutions.' },
  '/contact': { title: 'Contact NSU - Product Enquiries', description: 'Contact NSU to discuss colour pigments, product requirements and application-led colour solutions.' },
  '/global-markets': { title: 'NSU Global Business & Markets - Colour Pigment Partnerships', description: 'Discuss colour pigment requirements with Narayan Sindur Udyog for manufacturing, distribution, importing, ink, coating, masterbatch, and industrial buying needs.' },
  '/technical-resources': { title: 'NSU Technical Resources - TDS, SDS, COA & Application Guidance', description: 'Access NSU fluorescent pigment technical document status, safety data availability, application guidance, and frequently asked questions.' },
}

export default function Seo({ pathname }) {
  const product = pathname.startsWith('/products/')
    ? products.find((item) => item.slug === pathname.split('/').filter(Boolean).pop())
    : null
  const page = product
    ? { title: product.seoTitle, description: product.metaDescription }
    : pages[pathname] || { title: 'Page not found — NSU', description: 'The requested NSU page could not be found.' }

  const productDisplayName = product && product.grade && !product.name.includes(String(product.grade))
    ? `${product.name} ${product.grade}`
    : product?.name

  useEffect(() => {
    const origin = window.location.origin
    const canonicalUrl = `${origin}${pathname || '/'}`

    document.title = page.title
    let description = document.querySelector('meta[name="description"]')
    if (!description) {
      description = document.createElement('meta')
      description.name = 'description'
      document.head.appendChild(description)
    }
    description.content = page.description

    let canonical = document.querySelector('link[rel="canonical"]')
    if (!canonical) {
      canonical = document.createElement('link')
      canonical.rel = 'canonical'
      document.head.appendChild(canonical)
    }
    canonical.href = canonicalUrl

    const graph = [
      {
        '@type': 'Organization',
        '@id': `${origin}/#organization`,
        name: 'Narayan Sindur Udyog',
        url: origin,
        logo: `${origin}/favicon.webp`,
        email: 'enquiry@nsudyog.com',
      },
    ]

    if (product) {
      graph.push({
        '@type': 'Product',
        '@id': `${canonicalUrl}#product`,
        name: productDisplayName,
        description: product.description,
        url: canonicalUrl,
        sku: product.grade,
        category: product.category,
        brand: { '@type': 'Brand', name: 'NSU Fluorescent Pigments' },
        manufacturer: { '@id': `${origin}/#organization` },
      })
    }

    const breadcrumbItems = [{ name: 'Home', url: `${origin}/` }]
    if (product) {
      breadcrumbItems.push(
        { name: 'Products', url: `${origin}/products` },
        { name: productDisplayName, url: canonicalUrl },
      )
    } else if (pathname === '/products') {
      breadcrumbItems.push({ name: 'Products', url: `${origin}/products` })
    } else if (pathname !== '/') {
      breadcrumbItems.push({ name: page.title.split(' | ')[0], url: canonicalUrl })
    }

    graph.push({
      '@type': 'BreadcrumbList',
      itemListElement: breadcrumbItems.map((item, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: item.name,
        item: item.url,
      })),
    })

    let structuredData = document.getElementById('nsu-structured-data')
    if (!structuredData) {
      structuredData = document.createElement('script')
      structuredData.id = 'nsu-structured-data'
      structuredData.type = 'application/ld+json'
      document.head.appendChild(structuredData)
    }
    structuredData.textContent = JSON.stringify({
      '@context': 'https://schema.org',
      '@graph': graph,
    })
  }, [page.description, page.title, pathname, product])

  return null
}
