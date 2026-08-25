import { motion } from "framer-motion";
import { Shield, Palette, Target } from "lucide-react";
import Container from "../components/Container";

const features = [
  {
    icon: Shield,
    title: "Durability",
    description:
      "Engineered to withstand heat, moisture, and time — our pigments maintain their intensity through demanding conditions and extended use.",
    accent: "var(--color-pigment-magenta)",
  },
  {
    icon: Palette,
    title: "Vibrancy",
    description:
      "Rich, saturated colour that captures attention. From traditional sindoor to fluorescent solutions, every shade is crafted for visual impact.",
    accent: "var(--color-pigment-orange)",
  },
  {
    icon: Target,
    title: "Consistency",
    description:
      "Batch after batch, year after year. Our structured manufacturing process ensures uniform colour output trusted by partners globally.",
    accent: "var(--color-pigment-yellow)",
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function Features() {
  return (
    <section className="border-y border-theme bg-primary py-20 text-primary md:py-28">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.55 }}
          className="mb-14 md:mb-18"
        >
          <p className="mb-5 text-[10px] font-bold uppercase tracking-[.18em] text-pigment-magenta">
            Why NSU
          </p>
          <h2 className="max-w-3xl text-4xl font-extrabold leading-[.92] tracking-[-0.065em] md:text-6xl">
            Built different. Proven better.
          </h2>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-secondary md:text-lg">
            Three pillars that define every NSU product — from formulation to
            final delivery.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <motion.article
                key={feature.title}
                variants={cardVariants}
                className="group relative overflow-hidden rounded-2xl border border-theme bg-card p-8 transition-colors duration-300 md:p-10"
              >
                {/* Accent glow on hover */}
                <div
                  className="pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full opacity-0 blur-[64px] transition-opacity duration-500 group-hover:opacity-100"
                  style={{ backgroundColor: feature.accent }}
                />

                <span
                  className="relative z-10 mb-6 inline-flex h-12 w-12 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-110"
                  style={{
                    backgroundColor: `color-mix(in srgb, ${feature.accent} 14%, transparent)`,
                    color: feature.accent,
                  }}
                >
                  <Icon size={24} strokeWidth={1.8} />
                </span>

                <h3 className="relative z-10 mb-3 text-xl font-bold tracking-[-0.03em]">
                  {feature.title}
                </h3>
                <p className="relative z-10 text-sm leading-relaxed text-secondary md:text-base">
                  {feature.description}
                </p>
              </motion.article>
            );
          })}
        </motion.div>
      </Container>
    </section>
  );
}
