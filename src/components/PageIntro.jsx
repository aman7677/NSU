import { motion } from "framer-motion";
import { maskReveal, revealUp } from "../utils/motion";

export default function PageIntro({
  eyebrow,
  title,
  description,
  titleClassName = "",
  descriptionClassName = "",
  className = "",
  gradientBackdrop = false,
}) {
  return (
    <motion.section
      initial="hidden"
      animate="visible"
      exit={{ opacity: 0 }}
      className={`relative isolate mx-auto max-w-[1440px] overflow-hidden px-6 py-24 md:px-10 md:py-32 lg:px-14 ${className}`}
    >
      {gradientBackdrop && (
        <>
          <motion.div
            aria-hidden="true"
            animate={{
              x: [0, 34, -12, 0],
              y: [0, -16, 10, 0],
              scale: [1, 1.12, 0.96, 1],
            }}
            transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
            className="pointer-events-none absolute -left-24 top-4 h-72 w-72 rounded-full bg-pigment-magenta/20 blur-[78px] md:h-96 md:w-96"
          />
          <motion.div
            aria-hidden="true"
            animate={{ x: [0, -28, 14, 0], y: [0, 14, -10, 0] }}
            transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
            className="pointer-events-none absolute left-[26%] top-14 h-52 w-80 rounded-full bg-pigment-orange/20 blur-[72px] md:h-72 md:w-[32rem]"
          />
          <motion.div
            aria-hidden="true"
            animate={{ x: [0, 18, -18, 0], y: [0, -12, 8, 0] }}
            transition={{ duration: 13, repeat: Infinity, ease: "easeInOut" }}
            className="pointer-events-none absolute right-0 top-0 h-56 w-56 rounded-full bg-pigment-yellow/25 blur-[72px] md:h-80 md:w-80"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-[linear-gradient(105deg,rgba(239,22,120,.06),transparent_44%,rgba(255,194,28,.1))]"
          />
        </>
      )}
      <div className="relative z-10">
        <motion.p
          variants={revealUp}
          className="mb-6 text-[10px] font-bold uppercase tracking-[0.22em] text-eyebrow"
        >
          {eyebrow}
        </motion.p>
        <div className="overflow-hidden">
          <motion.h1
            variants={maskReveal}
            className={`max-w-5xl text-5xl font-semibold leading-[.9] tracking-[-0.075em] md:text-7xl lg:text-8xl ${titleClassName}`}
          >
            {title}
          </motion.h1>
        </div>
        {description && (
          <motion.p
            variants={revealUp}
            transition={{ delay: 0.16 }}
            className={`mt-8 max-w-2xl text-base leading-relaxed text-secondary md:text-lg ${descriptionClassName}`}
          >
            {description}
          </motion.p>
        )}
      </div>
    </motion.section>
  );
}
