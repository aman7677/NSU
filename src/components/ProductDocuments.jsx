import { ExternalLink } from 'lucide-react'
import { documentTypes, getDocument } from '../data/productDocuments.js'

export function DocumentStatus({ label, href }) {
  if (!href) {
    return (
      <div className="flex items-center gap-2 border border-theme px-4 py-3 text-xs font-bold uppercase tracking-[.14em] text-secondary">
        Download {label} <span className="normal-case tracking-normal">Available on request</span>
      </div>
    )
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-2 border border-theme px-4 py-3 text-xs font-bold uppercase tracking-[.14em] transition-colors hover:border-pigment-magenta hover:text-pigment-magenta"
    >
      Download {label} <ExternalLink size={14} />
    </a>
  )
}

export function ProductDocumentActions({ product }) {
  return (
    <div className="flex flex-wrap gap-3">
      {documentTypes.slice(0, 2).map(([key, label]) => (
        <DocumentStatus key={key} label={label} href={getDocument(product, key)} />
      ))}
    </div>
  )
}

export default function ProductDocuments({ product }) {
  return (
    <section className="mt-20 border-t border-theme pt-14">
      <p className="text-[10px] font-bold uppercase tracking-[.17em] text-pigment-magenta">Product documents</p>
      <h2 className="mt-4 text-3xl font-semibold tracking-[-.06em] md:text-5xl">Technical documents</h2>
      <div className="mt-8 flex flex-wrap gap-3">
        {documentTypes.map(([key, label]) => (
          <DocumentStatus key={key} label={label} href={getDocument(product, key)} />
        ))}
      </div>
      <p className="mt-4 text-sm text-secondary">Documents are available on request where approved NSU documentation exists.</p>
    </section>
  )
}
