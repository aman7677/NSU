import Button from './Button'
import { getProductApplications } from '../data/applicationSelector'

export default function ProductMatchCard({ product }) {
  const applications = getProductApplications(product)
  const grade = product.grade || product.code
  const displayGrade = /^\d+$/.test(String(grade || ""))
    ? `${grade} (ASDBN)`
    : grade
  const viewTarget = product.slug ? `/products/${product.slug}` : '/products'

  return (
    <article className="glass-card flex flex-col rounded-2xl border border-theme p-5 md:p-6">
      <p className="text-[10px] font-bold uppercase tracking-[.17em] text-pigment-magenta">{product.category}</p>
      <h3 className="mt-3 text-xl font-semibold tracking-[-.04em]">{product.name}</h3>
      <dl className="mt-5 grid grid-cols-2 gap-4 border-y border-theme py-4 text-sm">
        <div>
          <dt className="text-[10px] font-bold uppercase tracking-[.14em] text-secondary">Grade</dt>
          <dd className="mt-1 font-medium">{displayGrade || 'Available on request'}</dd>
        </div>
        <div>
          <dt className="text-[10px] font-bold uppercase tracking-[.14em] text-secondary">Shade</dt>
          <dd className="mt-1 font-medium">{product.shade || product.colour}</dd>
        </div>
      </dl>
      <p className="mt-4 text-sm leading-relaxed text-secondary">{product.description}</p>
      <p className="mt-4 text-xs leading-relaxed text-secondary">
        <span className="font-bold uppercase tracking-[.12em] text-primary">Applications: </span>
        {applications.slice(0, 4).join(', ')}
      </p>
      <div className="mt-6 flex flex-wrap gap-2">
        <Button to={viewTarget} icon={false} className="px-4 py-2.5">View product</Button>
        <Button to={`/contact?product=${encodeURIComponent(product.name)}&intent=quote`} variant="secondary" icon={false} className="px-4 py-2.5">Request quote</Button>
      </div>
    </article>
  )
}
