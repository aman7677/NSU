import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import Button from "../components/Button";
import ColourParticles from "../components/ColourParticles";

const lines = ["COLOUR", "WITHOUT", "LIMITS"];

export default function Hero() {
  return (
    <section
      className="relative isolate flex min-h-[680px] overflow-x-clip overflow-y-visible sm:min-h-[720px] md:min-h-[860px]"
      style={{ color: "var(--hero-text)" }}
    >
      <ColourParticles 
        particleCount={350} 
        interactive={true} 
        speed={1.2} 
        colors={['#ff168d', '#12d9ff', '#9b4dff', '#67ff5d', '#f8ff1c', '#ff2b26', '#ff7a18']}
      />
      <div
        className="pointer-events-none absolute inset-0"
        style={{ background: "var(--hero-vignette)" }}
      />
      <div className="relative z-20 mx-auto flex w-full max-w-[1440px] flex-col px-6 pb-8 pt-32 sm:pt-40 md:px-10 md:pb-10 md:pt-48 lg:px-14">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.55 }}
          className="mb-8 text-[10px] font-bold uppercase tracking-[0.2em]"
          style={{ color: "var(--hero-tagline)" }}
        >
          NSU Colour Solutions
        </motion.p>
        <h1 className="max-w-4xl text-[clamp(3.65rem,10.2vw,10rem)] font-semibold leading-[0.8] tracking-[-0.09em] sm:leading-[0.78]">
          {lines.map((line, index) => (
            <span key={line} className="block overflow-hidden">
              <motion.span
                initial={{ y: "110%" }}
                animate={{ y: 0 }}
                transition={{
                  delay: 0.85 + index * 0.15,
                  duration: 0.8,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="hero-gradient-text block"
              >
                {line}
              </motion.span>
            </span>
          ))}
        </h1>
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.45, duration: 0.65 }}
          className="mt-10 flex flex-col items-start gap-7 md:mt-12 md:flex-row md:items-end md:justify-between"
        >
          <p
            className="max-w-md text-base leading-relaxed md:text-lg"
            style={{ color: "var(--hero-body)" }}
          >
            Vibrant colour and pigment solutions designed to make every
            application stand out.
          </p>
          <div className="flex w-full sm:w-auto">
            <Button
              to="/products"
              className="hero-cta-btn w-full rounded-xl sm:w-auto"
            >
              Explore Products
            </Button>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.75, duration: 0.6 }}
          className="mt-12 flex items-center gap-2 text-[10px] font-bold uppercase tracking-[.18em]"
          style={{ color: "var(--hero-scroll)" }}
        >
          <span>Scroll to explore</span>
          <motion.span
            animate={{ y: [0, 5, 0] }}
            transition={{ duration: 1.6, repeat: Infinity }}
          >
            <ArrowDown size={14} />
          </motion.span>
        </motion.div>
      </div>
    </section>
  );
}
