import { motion } from "framer-motion";
import { Quote, Star } from "lucide-react";
import Container from "../components/Container";
import CountUp from "../components/CountUp";

const testimonials = [
  {
    quote:
      "NSU's sindoor quality is unmatched — the vibrancy has remained consistent across every order for over a decade. Our customers trust the colour, and we trust NSU.",
    name: "Rajesh Gupta",
    role: "Wholesale Distributor, Delhi",
    rating: 5,
  },
  {
    quote:
      "We switched to NSU pigments three years ago and have never looked back. The consistency across batches has eliminated every quality complaint we used to receive.",
    name: "Meena Sharma",
    role: "Production Manager, Mumbai",
    rating: 5,
  },
  {
    quote:
      "What sets NSU apart is their deep understanding of colour science combined with decades of practical experience. A truly reliable partner for any colour application.",
    name: "Arjun Patel",
    role: "Colour Solutions Buyer, Ahmedabad",
    rating: 5,
  },
];

const stats = [
  { value: 40, suffix: "+", label: "Years of Excellence" },
  { value: 500, suffix: "+", label: "Trusted Partners" },
  { value: 99, suffix: "%", label: "Batch Consistency" },
  { value: 12, suffix: "+", label: "States Served" },
];

const cardVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.12,
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

export default function Testimonials() {
  return (
    <section className="border-y border-theme bg-primary py-20 text-primary md:py-28">
      <Container>
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.55 }}
        >
          <p className="mb-5 text-[10px] font-bold uppercase tracking-[.18em] text-pigment-yellow">
            Trusted by partners
          </p>
          <h2 className="max-w-3xl text-4xl font-extrabold leading-[.92] tracking-[-0.065em] md:text-6xl">
            Words from those who know colour
          </h2>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-secondary md:text-lg">
            Decades of trust built through consistent quality and reliable
            partnership across India.
          </p>
        </motion.div>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.55, delay: 0.15 }}
          className="mt-14 grid grid-cols-2 gap-5 sm:grid-cols-4"
        >
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-xl border border-theme bg-card px-5 py-6 text-center transition-colors duration-300 md:px-6 md:py-8"
            >
              <p className="text-3xl font-extrabold tracking-[-0.04em] text-pigment-magenta md:text-4xl">
                <CountUp value={stat.value} suffix={stat.suffix} />
              </p>
              <p className="mt-2 text-xs font-semibold uppercase tracking-[.12em] text-secondary">
                {stat.label}
              </p>
            </div>
          ))}
        </motion.div>

        {/* Testimonial cards */}
        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <motion.blockquote
              key={testimonial.name}
              custom={index}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.25 }}
              className="group relative flex flex-col overflow-hidden rounded-2xl border border-theme bg-card p-8 transition-colors duration-300 md:p-10"
            >
              {/* Decorative quote icon */}
              <Quote
                size={32}
                strokeWidth={1.4}
                className="mb-5 text-pigment-yellow opacity-40 transition-opacity duration-300 group-hover:opacity-70"
              />

              {/* Stars */}
              <div className="mb-4 flex gap-0.5">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star
                    key={i}
                    size={14}
                    className="fill-pigment-yellow text-pigment-yellow"
                  />
                ))}
              </div>

              <p className="flex-1 text-sm leading-relaxed text-secondary md:text-base">
                &ldquo;{testimonial.quote}&rdquo;
              </p>

              <footer className="mt-6 border-t border-theme pt-5">
                <cite className="not-italic">
                  <p className="text-sm font-bold tracking-[-0.01em]">
                    {testimonial.name}
                  </p>
                  <p className="mt-1 text-xs text-secondary">
                    {testimonial.role}
                  </p>
                </cite>
              </footer>
            </motion.blockquote>
          ))}
        </div>
      </Container>
    </section>
  );
}
