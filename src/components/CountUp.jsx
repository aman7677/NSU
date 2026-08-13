import { useInView, useMotionValue, useMotionValueEvent, useReducedMotion, useSpring } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'

export default function CountUp({ value, suffix = '' }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.7 })
  const reduceMotion = useReducedMotion()
  const count = useMotionValue(0)
  const spring = useSpring(count, { stiffness: 70, damping: 20 })
  const [display, setDisplay] = useState(0)
  useMotionValueEvent(spring, 'change', (latest) => setDisplay(Math.round(latest)))
  useEffect(() => { if (inView) count.set(reduceMotion ? value : value) }, [count, inView, reduceMotion, value])
  return <span ref={ref}>{display}{suffix}</span>
}
