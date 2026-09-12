const specificationFields = [
  ['bulkDensity', 'Bulk Density'],
  ['specificGravity', 'Specific Gravity'],
  ['softeningPoint', 'Softening Point'],
  ['particleSize', 'Particle Size'],
  ['thermalStability', 'Thermal Stability'],
  ['oilAbsorptionValue', 'Oil Absorption Value'],
  ['ph', 'pH (10% aq. Solution)'],
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
      <p className="mt-5 text-xs leading-relaxed text-secondary">
        * Typical reference values. Actual values may vary by product, shade, batch, and application. Certificate of Analysis (COA) is available on request. Confirm approved technical data with NSU before use.
      </p>
    </div>
  )
}
