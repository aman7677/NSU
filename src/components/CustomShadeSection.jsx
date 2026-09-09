import Button from './Button'
import Container from './Container'

const evaluationPoints = [
  'Target Colour',
  'Application',
  'Polymer / Resin System',
  'Processing Temperature',
  'Required Performance',
  'Required Quantity',
]

export default function CustomShadeSection() {
  return (
    <section className="border-y border-theme bg-secondary py-20 md:py-28">
      <Container>
        <div className="grid gap-10 lg:grid-cols-[1.1fr_.9fr] lg:items-end lg:gap-16">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[.18em] text-pigment-magenta">Custom fluorescent shades</p>
            <h2 className="mt-5 max-w-3xl text-4xl font-semibold leading-[.94] tracking-[-.07em] md:text-6xl">Need a Colour That Isn’t in Our Standard Range?</h2>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-secondary md:text-lg">Tell us about your target shade and process. Our team can review the brief before confirming whether a custom shade evaluation is appropriate.</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button to="/contact?intent=custom">Request custom shade development</Button>
              <Button to="/contact?intent=technical" variant="secondary">Contact our technical team</Button>
            </div>
          </div>
          <div className="border-l-2 border-pigment-yellow pl-5">
            <p className="text-[10px] font-bold uppercase tracking-[.17em] text-secondary">Helpful evaluation details</p>
            <ul className="mt-5 grid gap-3 text-sm text-secondary sm:grid-cols-2">
              {evaluationPoints.map((point) => <li key={point}>— {point}</li>)}
            </ul>
          </div>
        </div>
      </Container>
    </section>
  )
}
