import { useEffect } from 'react'

const pages = {
  '/': { title: 'NSU — Colour Solutions & Pigments', description: 'NSU provides vibrant colour and pigment solutions for distinctive products and application-led colour requirements.' },
  '/products': { title: 'NSU — Sindoor Colour, Fluorescent Pigments & Colour Powders', description: 'Explore NSU sindhoor colours, fluorescent pigment powders, bright colour powders for water based paints, solvent based paints, aerosol spray paints, poster colours, paper coating, and custom colour solutions.' },
  '/applications': { title: 'NSU — Pigment Applications for Paints, Textiles, Plastics & Industry', description: 'Discover NSU colour pigment applications for sindhoor, rangoli, textile printing, master batch, flexo ink, gravure ink, PVC coating, paper coating, industrial markers, crack detection, and custom pigment preparation.' },
  '/about': { title: 'About NSU — Colour Solutions', description: 'Learn about NSU’s application-led approach to vibrant colour and pigment solutions.' },
  '/contact': { title: 'Contact NSU — Product Enquiries', description: 'Contact NSU to discuss colour pigments, product requirements and application-led colour solutions.' },
}

export default function Seo({ pathname }) {
  const page = pages[pathname] || { title: 'Page not found — NSU', description: 'The requested NSU page could not be found.' }
  useEffect(() => {
    document.title = page.title
    let description = document.querySelector('meta[name="description"]')
    if (!description) { description = document.createElement('meta'); description.name = 'description'; document.head.appendChild(description) }
    description.content = page.description
  }, [page.description, page.title])
  return null
}
