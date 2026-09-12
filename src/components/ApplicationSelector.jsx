import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import Button from './Button'
import Container from './Container'
import ProductMatchCard from './ProductMatchCard'
import { applicationSelectorOptions, productsForApplication } from '../data/applicationSelector'

export default function ApplicationSelector() {
  const [selectedId, setSelectedId] = useState('')
  const selectedApplication = applicationSelectorOptions.find((item) => item.id === selectedId)
  const matches = selectedId ? productsForApplication(selectedId) : []

  useEffect(() => {
    if (!selectedId) return

    requestAnimationFrame(() => {
      document.getElementById('application-results')?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      })
    })
  }, [selectedId])

  return (
    <section className="border-y border-theme bg-secondary py-20 md:py-28">
      <Container>
        <div className="max-w-3xl">
          <p className="text-[10px] font-bold uppercase tracking-[.18em] text-pigment-magenta">Application selector</p>
          <h2 className="mt-5 text-4xl font-semibold leading-[.94] tracking-[-.07em] md:text-6xl">Find colour options for your application.</h2>
          <p className="mt-6 text-base leading-relaxed text-secondary md:text-lg">Choose an application to see only products supported by the application data currently available in the NSU catalogue.</p>
        </div>
        <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {applicationSelectorOptions.map((application) => (
            <button
              key={application.id}
              type="button"
              aria-pressed={selectedId === application.id}
              onClick={() => setSelectedId(application.id)}
              className={`min-h-16 cursor-pointer rounded-xl border px-5 py-4 text-left text-sm font-semibold transition-colors ${selectedId === application.id ? 'border-pigment-magenta bg-card text-pigment-magenta' : 'border-theme bg-card/60 text-primary hover:border-pigment-orange'}`}
            >
              {application.label}
            </button>
          ))}
        </div>
        {selectedApplication && (
          <motion.div
            id="application-results"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="mt-10 scroll-mt-24 border-t border-theme pt-8"
          >
            <p className="max-w-3xl text-sm leading-relaxed text-secondary">{selectedApplication.note}</p>
            {matches.length > 0 ? (
              <>
                <p className="mt-6 text-sm text-secondary"><span className="font-semibold text-primary">{matches.length}</span> matching product{matches.length === 1 ? '' : 's'}</p>
                <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                  {matches.map((product) => <ProductMatchCard key={product.id} product={product} />)}
                </div>
              </>
            ) : (
              <div className="mt-6 rounded-xl border border-pigment-orange/50 bg-card p-6">
                <h3 className="text-xl font-semibold tracking-[-.04em]">No catalogue match yet.</h3>
                <p className="mt-3 max-w-2xl text-sm leading-relaxed text-secondary">The current data does not support a reliable product recommendation for this application. Our technical team can review your substrate, process, and target shade.</p>
                <Button to="/contact?intent=technical" className="mt-6">Contact technical team</Button>
              </div>
            )}
          </motion.div>
        )}
      </Container>
    </section>
  )
}
