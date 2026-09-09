const specificationFields = [
  ['physicalForm', 'Physical Form'],
  ['particleSize', 'Particle Size'],
  ['heatStability', 'Heat Stability'],
  ['lightFastness', 'Light Fastness'],
  ['moisture', 'Moisture'],
  ['recommendedDosage', 'Recommended Dosage'],
  ['packaging', 'Packaging'],
  ['storage', 'Storage'],
]

export default function TechnicalSpecifications({ product }) {
  const specifications = product.technicalSpecifications || {}

  return (
    <div>
      <p className="text-[10px] font-bold uppercase tracking-[.17em] text-pigment-magenta">Technical information</p>
      <dl className="mt-5 divide-y divide-[color:var(--border)] border-y border-theme">
        {specificationFields.map(([key, label]) => (
          <div key={key} className="flex items-center justify-between gap-5 py-4 text-sm">
            <dt className="text-secondary">{label}</dt>
            <dd className="text-right font-medium">{specifications[key] || 'To be confirmed'}</dd>
          </div>
        ))}
      </dl>
    </div>
  )
}
