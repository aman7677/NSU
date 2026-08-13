import { useEffect } from 'react'

const pages = {
  '/': { title: 'NSU — Colour Solutions & Pigments', description: 'NSU provides vibrant colour and pigment solutions for distinctive products and application-led colour requirements.' },
  '/products': { title: 'NSU — Sindoor Colour & Fluorescent Pigments', description: 'Explore NSU sindoor colours, fluorescent pigments, bright colour powders and custom colour solutions.' },
  '/applications': { title: 'NSU — Colour Pigment Applications', description: 'Explore colour pigment discussions for traditional colour products, textiles, polymers, printing, industrial uses and custom development.' },
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
