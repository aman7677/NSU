import { motion, useReducedMotion } from 'framer-motion'
export default function ImageReveal({ children, className = '', delay = 0 }) {
  const reduceMotion = useReducedMotion()
  return <motion.div initial={reduceMotion ? { opacity: 0 } : { clipPath: 'inset(0 100% 0 0)' }} whileInView={reduceMotion ? { opacity: 1 } : { clipPath: 'inset(0 0% 0 0)' }} viewport={{ once: true, amount: 0.25 }} transition={{ duration: reduceMotion ? 0.2 : 0.75, delay, ease: [0.77, 0, 0.18, 1] }} className={`overflow-hidden ${className}`}>{children}</motion.div>
}
