import { motion } from "framer-motion";
import ColourParticles from "../components/ColourParticles";
import Container from "../components/Container";
import PageIntro from "../components/PageIntro";
import SectionTitle from "../components/SectionTitle";

/* ─── Static content data ─── */

const storyParagraphs = [
  "Our journey began in 1983, when three brothers came together with a shared vision, determination, and a simple belief to build something that would stand the test of time.",
  "With humble beginnings, NSU started its journey with Sindoor, a product deeply connected with Indian traditions, culture, and emotions. What began as a small business was never just about selling a product; it was about creating something people could trust.",
  "The early years were filled with challenges. Building a business from the ground up required patience, dedication, and countless hours of hard work. Step by step, with the support and trust of our customers, NSU continued to grow.",
  "Over the years, our commitment to quality and our passion for colours helped us expand beyond Sindoor. Today, NSU deals in Sindoor along with additional fluorescent pigments, bringing a wider spectrum of vibrant shades to our customers.",
  "But our journey is not defined only by the number of products or fluorescent pigments we offer. It is defined by the relationships, trust, and experience built over more than four decades.",
];

const whatWeDoSection = {
  label: "What we do",
  title: (
    <>
      Colour that brings
      <br />
      products to life.
    </>
  ),
  description:
    "Built for makers, brands and businesses that need colour they can rely on.",
  body: "NSU creates vibrant Sindoor, bright colour powders, fluorescent pigments and custom colour solutions for businesses that want their products to look distinctive and perform consistently. We solve the challenge of finding colour that is both expressive and dependable—helping every application carry the same visual confidence, batch after batch.",
  quote:
    "\u201CEvery shade is an opportunity to make an ordinary product feel unmistakably its own.\u201D",
};

const ourVisionSection = {
  label: "Our vision",
  title: (
    <>
      Made with care.
      <br />
      Chosen with confidence.
    </>
  ),
  description:
    "A more colourful future starts with quality people can trust.",
  body: "We see colour as more than a finish. It carries tradition, identity and emotion; it helps a product be recognised and a moment be remembered. By pairing decades of experience with a forward-looking approach to colour, NSU aims to remain the dependable partner behind brighter ideas.",
};

const coreBeliefSection = {
  label: "The core belief",
  hindiQuote:
    "\u201Cरंग सिर्फ दिखाई नहीं देते, वे भरोसे और पहचान की छाप छोड़ते हैं।\u201D",
  hindiTranslation:
    "(Colours do more than appear\u2014they leave an imprint of trust and identity.)",
  englishQuote:
    "\u201CThe right colour does not simply catch the eye; it earns a place in people\u2019s memory.\u201D",
};

/* ─── Animation variants ─── */

const reveal = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
};

/* ─── Fluid background orbs ─── */

function AboutPageBackground() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
    >
      <motion.div
        animate={{ x: [-80, 80, -80], y: [0, 120, 0], scale: [1, 1.2, 1] }}
        transition={{ duration: 24, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -left-52 top-[8%] h-[80vw] w-[80vw] rounded-full bg-pigment-magenta/[.16] blur-[80px] md:h-[42rem] md:w-[42rem] md:blur-[130px]"
      />
      <motion.div
        animate={{
          x: [70, -90, 70],
          y: [0, -110, 0],
          scale: [1.1, 0.92, 1.1],
        }}
        transition={{ duration: 28, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -right-56 top-[30%] h-[85vw] w-[85vw] rounded-full bg-pigment-yellow/[.18] blur-[80px] md:h-[46rem] md:w-[46rem] md:blur-[140px]"
      />
    </div>
  );
}

/* ─── Main component ─── */

export default function About() {
  return (
    <div className="relative isolate overflow-hidden">
      <AboutPageBackground />
      <ColourParticles particleCount={140} interactive={false} speed={0.32} />

      <PageIntro
        eyebrow="About NSU"
        title={
          <>
            BUILT AROUND COLOUR.
            <br />
            DRIVEN BY POSSIBILITY.
          </>
        }
        description="NSU is focused on delivering vibrant colour and pigment solutions for businesses looking to bring consistency, visual impact and distinctive colour to their products."
        titleClassName="hero-gradient-text drop-shadow-[0_2px_18px_rgba(15,23,42,.18)]"
        descriptionClassName="!mt-5"
        className="relative z-10 pb-8 md:pb-10"
      />

      <Container className="relative z-10 pb-10 md:pb-28">
        {/* ── Our story ── */}
        <section className="pt-[clamp(6rem,20vh,12rem)] md:pt-[clamp(8rem,28vh,14rem)]">
          <SectionTitle
            label="Our story"
            title={
              <>
                From one vision to a
                <br />
                spectrum of colours.
              </>
            }
            description="About Us — The Story of NSU"
          />

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.08 } },
            }}
            className="mt-14 md:ml-[33.33%]"
          >
            <div className="max-w-3xl space-y-5">
              {storyParagraphs.map((paragraph) => (
                <motion.p
                  key={paragraph}
                  variants={reveal}
                  className="text-base leading-relaxed text-secondary md:text-lg"
                >
                  {paragraph}
                </motion.p>
              ))}
            </div>

            <motion.div
              variants={reveal}
              className="mt-10 border-l-2 border-pigment-magenta pl-6"
            >
              <p className="text-[10px] font-bold uppercase tracking-[.17em] text-pigment-magenta">
                Our promise
              </p>
              <p className="mt-4 text-base leading-relaxed text-secondary md:text-lg">
                As we move forward, we remain committed to the values that
                started NSU — quality, consistency, trust, and innovation. We
                believe that every colour has the power to add life, expression,
                and meaning, and our goal is to make those colours better,
                brighter, and more accessible with every passing year.
              </p>
            </motion.div>

            <div className="mt-6 text-xl font-semibold tracking-[-.045em]">
              Four decades later, the vision remains the same: to deliver colour
              that endures.
            </div>
          </motion.div>
        </section>

        {/* ── What we do ── */}
        <section className="mt-24 border-t border-theme pt-16 md:mt-32 md:pt-24">
          <SectionTitle
            label={whatWeDoSection.label}
            title={whatWeDoSection.title}
            description={whatWeDoSection.description}
          />
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={reveal}
            className="mt-14 md:ml-[33.33%]"
          >
            <p className="max-w-3xl text-base leading-relaxed text-secondary md:text-lg">
              {whatWeDoSection.body}
            </p>
            <blockquote className="mt-12 max-w-3xl border-l-2 border-pigment-yellow pl-6 text-2xl font-medium leading-snug tracking-[-.04em] md:text-3xl">
              {whatWeDoSection.quote}
            </blockquote>
          </motion.div>
        </section>

        {/* ── Our vision ── */}
        <section className="mt-24 border-t border-theme pt-16 md:mt-32 md:pt-24">
          <SectionTitle
            label={ourVisionSection.label}
            title={ourVisionSection.title}
            description={ourVisionSection.description}
          />
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={reveal}
            className="mt-14 md:ml-[33.33%]"
          >
            <p className="max-w-3xl text-base leading-relaxed text-secondary md:text-lg">
              {ourVisionSection.body}
            </p>
          </motion.div>
        </section>

        {/* ── Core belief ── */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={reveal}
          className="mt-24 bg-foreground px-6 py-14 text-background md:mt-32 md:px-[12%] md:py-20"
        >
          <p className="text-[10px] font-bold uppercase tracking-[.17em] text-pigment-yellow">
            {coreBeliefSection.label}
          </p>
          <blockquote className="mt-6 max-w-4xl font-devanagari text-3xl font-semibold leading-tight tracking-[-.05em] md:text-5xl">
            {coreBeliefSection.hindiQuote}
          </blockquote>
          <p className="mt-5 max-w-2xl text-sm leading-relaxed text-background/70 md:text-base">
            {coreBeliefSection.hindiTranslation}
          </p>
          <p className="mt-10 max-w-3xl text-lg leading-relaxed text-background/80 md:text-xl">
            {coreBeliefSection.englishQuote}
          </p>
        </motion.section>
      </Container>
    </div>
  );
}
