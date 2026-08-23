import { motion } from "framer-motion";

export default function ApplicationFeature({ application, index }) {
  const reverse = index % 2 === 1;

  return (
    <motion.article
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.18 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      className="group grid grid-cols-[4.5rem_minmax(0,1fr)] gap-x-4 border-t border-theme px-1 py-12 transition-all duration-300 ease-in-out hover:-translate-y-1 hover:bg-card sm:grid-cols-[7.5rem_minmax(0,1fr)] sm:gap-x-7 sm:px-6 md:grid-cols-[10rem_minmax(0,1fr)] md:gap-x-10 md:py-16 lg:grid-cols-[12rem_minmax(0,1fr)] lg:px-10"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="pt-1"
      >
        <span
          className="block text-4xl font-bold leading-none tracking-[-.09em] sm:text-5xl md:text-6xl"
          style={{ color: application.accent }}
        >
          {application.number}
        </span>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: reverse ? -24 : 24 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.08 }}
        className="min-w-0"
      >
        <h2 className="max-w-5xl text-3xl font-bold leading-[.94] tracking-[-.065em] text-primary sm:text-4xl md:text-5xl lg:text-6xl">
          {application.title}
        </h2>
        <p className="mt-6 max-w-4xl text-base leading-relaxed text-secondary md:mt-7 md:text-lg">
          {application.description}
        </p>
        <p
          className="mt-8 max-w-4xl border-l-2 pl-4 text-sm font-medium leading-relaxed text-secondary md:mt-10 md:pl-5"
          style={{ borderColor: application.accent }}
        >
          Suitable grades available depending on application requirements.
        </p>
      </motion.div>
    </motion.article>
  );
}