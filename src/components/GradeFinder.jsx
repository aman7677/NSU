import { useMemo, useState } from 'react'
import Button from './Button'
import Container from './Container'
import ProductMatchCard from './ProductMatchCard'
import { applicationSelectorOptions, productsForApplication } from '../data/applicationSelector'
import { products } from '../data/products'

const initialValues = {
  targetColour: '',
  application: '',
  polymer: '',
  temperature: '',
  performance: '',
  quantity: '',
}

const selectClass = 'mt-2 min-h-11 w-full rounded border border-theme bg-card px-3 text-sm text-primary outline-none focus:border-pigment-magenta'

export default function GradeFinder() {
  const [values, setValues] = useState(initialValues)
  const update = (event) => setValues((current) => ({ ...current, [event.target.name]: event.target.value }))
  const colourOptions = useMemo(
    () => [...new Set(products.map((product) => product.shade || product.colour).filter(Boolean))].sort(),
    [],
  )
  const recommendations = useMemo(() => {
    if (!values.application) return []
    let matches = productsForApplication(values.application)
    if (values.targetColour) {
      const target = values.targetColour.toLowerCase()
      matches = matches.filter((product) => `${product.name} ${product.shade || product.colour}`.toLowerCase().includes(target))
    }
    return matches
  }, [values.application, values.targetColour])
  const hasUnresolvedCriteria = Boolean(values.polymer || values.temperature || values.performance || values.quantity)
  const hasStarted = Object.values(values).some(Boolean)
  const showResults = Boolean(values.application)

  return (
    <section className="py-20 md:py-28">
      <Container>
        <div className="max-w-3xl">
          <p className="text-[10px] font-bold uppercase tracking-[.18em] text-pigment-magenta">Find the right grade</p>
          <h2 className="mt-5 text-4xl font-semibold leading-[.94] tracking-[-.07em] md:text-6xl">Start with the details of your brief.</h2>
          <p className="mt-6 text-base leading-relaxed text-secondary md:text-lg">Use the information you have. We will show catalogue matches only where the available data supports them.</p>
        </div>
        <div className="mt-10 rounded-2xl border border-theme bg-card/60 p-6 md:p-8">
          <div className="grid gap-x-6 gap-y-6 md:grid-cols-2">
            <label className="text-[10px] font-bold uppercase tracking-[.15em] text-secondary">
              Target colour
              <select name="targetColour" value={values.targetColour} onChange={update} className={selectClass}>
                <option value="">Any / not decided</option>
                {colourOptions.map((colour) => <option key={colour} value={colour}>{colour}</option>)}
              </select>
            </label>
            <label className="text-[10px] font-bold uppercase tracking-[.15em] text-secondary">
              Application
              <select name="application" value={values.application} onChange={update} className={selectClass}>
                <option value="">Choose an application</option>
                {applicationSelectorOptions.map((application) => <option key={application.id} value={application.id}>{application.label}</option>)}
              </select>
            </label>
            <label className="text-[10px] font-bold uppercase tracking-[.15em] text-secondary">
              Polymer / resin system
              <input name="polymer" value={values.polymer} onChange={update} className={selectClass} placeholder="e.g. PVC, EVA, PP" />
            </label>
            <label className="text-[10px] font-bold uppercase tracking-[.15em] text-secondary">
              Processing temperature
              <input name="temperature" value={values.temperature} onChange={update} className={selectClass} placeholder="e.g. 180°C" />
            </label>
            <label className="text-[10px] font-bold uppercase tracking-[.15em] text-secondary">
              Required performance
              <select name="performance" value={values.performance} onChange={update} className={selectClass}>
                <option value="">Choose if known</option>
                <option value="heat">Heat stability</option>
                <option value="light">Light fastness</option>
                <option value="moisture">Moisture resistance</option>
                <option value="visibility">High visibility</option>
              </select>
            </label>
            <label className="text-[10px] font-bold uppercase tracking-[.15em] text-secondary">
              Required quantity
              <select name="quantity" value={values.quantity} onChange={update} className={selectClass}>
                <option value="">Choose if known</option>
                <option value="sample">Sample quantity</option>
                <option value="small-batch">Small batch</option>
                <option value="bulk">Bulk supply</option>
              </select>
            </label>
          </div>
        </div>

        {showResults && (
          <div className="mt-10 border-t border-theme pt-8">
            {hasUnresolvedCriteria ? (
              <div className="rounded-xl border border-pigment-orange/50 bg-card p-6 md:p-8">
                <h3 className="text-2xl font-semibold tracking-[-.04em]">Technical review required.</h3>
                <p className="mt-3 max-w-2xl text-sm leading-relaxed text-secondary">The current catalogue does not contain enough verified data to match polymer system, processing temperature, performance, or quantity requirements safely. Your selections are preserved—please send them to the technical team.</p>
                <Button to={`/contact?intent=technical&application=${encodeURIComponent(values.application)}`} className="mt-6">Contact technical team</Button>
              </div>
            ) : recommendations.length > 0 ? (
              <>
                <p className="text-sm text-secondary"><span className="font-semibold text-primary">{recommendations.length}</span> suitable catalogue match{recommendations.length === 1 ? '' : 'es'} based on the available data.</p>
                <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                  {recommendations.map((product) => <ProductMatchCard key={product.id} product={product} />)}
                </div>
              </>
            ) : (
              <div className="rounded-xl border border-pigment-orange/50 bg-card p-6">
                <h3 className="text-xl font-semibold tracking-[-.04em]">No verified catalogue match.</h3>
                <p className="mt-3 text-sm leading-relaxed text-secondary">The selected colour and application combination is not represented by the current product data. Please contact the technical team rather than relying on an assumed grade.</p>
                <Button to="/contact?intent=technical" className="mt-6">Contact technical team</Button>
              </div>
            )}
          </div>
        )}
        {hasStarted && !showResults && (
          <p className="mt-6 text-sm text-secondary">Choose an application to generate a data-backed result.</p>
        )}
      </Container>
    </section>
  )
}
