import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { ArrowDown } from 'lucide-react'
import { useCallback } from 'react'
import Button from '../components/Button'

const lines = ['COLOUR', 'WITHOUT', 'LIMITS.']
const particles = [
  ['left-[8%] top-[21%]', 'bg-pigment-yellow', 0.2], ['left-[19%] top-[68%]', 'bg-pigment-red', 0.55], ['right-[17%] top-[20%]', 'bg-pigment-pink', 0.35], ['right-[10%] top-[68%]', 'bg-pigment-orange', 0.7], ['right-[32%] top-[12%]', 'bg-pigment-magenta', 0.85], ['left-[42%] top-[19%]', 'bg-pigment-yellow', 0.45],
]

export default function Hero() {
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const smoothX = useSpring(x, { stiffness: 26, damping: 18 })
  const smoothY = useSpring(y, { stiffness: 26, damping: 18 })
  const visualX = useTransform(smoothX, [-0.5, 0.5], [-18, 18])
  const visualY = useTransform(smoothY, [-0.5, 0.5], [-14, 14])
  const onPointerMove = useCallback((event) => {
    if (window.innerWidth < 768) return
    const { left, top, width, height } = event.currentTarget.getBoundingClientRect()
    x.set((event.clientX - left) / width - 0.5)
    y.set((event.clientY - top) / height - 0.5)
  }, [x, y])

  return <section onPointerMove={onPointerMove} className="relative isolate flex min-h-[680px] overflow-hidden bg-black text-white sm:min-h-[720px] md:min-h-[860px]">
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.15, ease: 'easeOut' }} className="absolute inset-0" />
    <motion.div style={{ x: visualX, y: visualY }} className="pointer-events-none absolute inset-0">
      <motion.div animate={{ x: [0, 45, -20, 0], y: [0, -35, 24, 0], scale: [1, 1.12, 0.93, 1] }} transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }} className="absolute -right-[34%] top-[12%] h-[22rem] w-[22rem] rounded-full bg-pigment-magenta/75 blur-[80px] sm:-right-[17%] sm:h-[27rem] sm:w-[27rem] md:h-[36rem] md:w-[36rem]" />
      <motion.div animate={{ x: [0, -40, 20, 0], y: [0, 28, -20, 0], scale: [1, 0.88, 1.1, 1] }} transition={{ duration: 19, repeat: Infinity, ease: 'easeInOut' }} className="absolute right-[-16%] top-[42%] h-[14rem] w-[18rem] rounded-[48%] bg-pigment-orange/75 blur-[72px] sm:right-[4%] sm:h-[18rem] sm:w-[22rem] md:h-[27rem] md:w-[33rem]" />
      <motion.div animate={{ x: [0, 24, -30, 0], y: [0, -25, 18, 0], scale: [1, 1.18, 0.9, 1] }} transition={{ duration: 17, repeat: Infinity, ease: 'easeInOut' }} className="absolute -bottom-[16%] right-[26%] h-[13rem] w-[20rem] rounded-full bg-pigment-red/70 blur-[72px] sm:h-[17rem] sm:w-[24rem] md:h-[25rem] md:w-[36rem]" />
      <motion.div animate={{ x: [0, -20, 25, 0], y: [0, 18, -24, 0] }} transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }} className="absolute right-[34%] top-[16%] hidden h-36 w-36 rounded-full bg-pigment-yellow/80 blur-[52px] sm:block" />
    </motion.div>
    <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_70%_47%,transparent_0%,rgba(0,0,0,.25)_45%,#000_78%)]" />
    {particles.map(([position, colour, delay], index) => <motion.span key={index} animate={{ opacity: [0.2, 0.9, 0.25], y: [0, -26, 0], x: [0, index % 2 ? -10 : 10, 0], scale: [0.8, 1.15, 0.85] }} transition={{ duration: 4.8 + index, delay, repeat: Infinity, ease: 'easeInOut' }} className={`pointer-events-none absolute z-10 h-1.5 w-1.5 rounded-full ${index > 2 ? 'hidden sm:block' : ''} ${position} ${colour}`} />)}
    <div className="relative z-20 mx-auto flex w-full max-w-[1440px] flex-col justify-end px-6 pb-8 pt-32 sm:pt-40 md:px-10 md:pb-10 md:pt-48 lg:px-14">
      <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7, duration: 0.55 }} className="mb-8 text-[10px] font-bold uppercase tracking-[0.2em] text-pigment-yellow">NSU Colour Solutions</motion.p>
      <h1 className="max-w-4xl text-[clamp(3.65rem,10.2vw,10rem)] font-semibold leading-[0.8] tracking-[-0.09em] sm:leading-[0.78]">
        {lines.map((line, index) => <span key={line} className="block overflow-hidden"><motion.span initial={{ y: '110%' }} animate={{ y: 0 }} transition={{ delay: 0.85 + index * 0.15, duration: 0.8, ease: [0.16, 1, 0.3, 1] }} className="block">{line}</motion.span></span>)}
      </h1>
      <motion.div initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.45, duration: 0.65 }} className="mt-10 flex flex-col items-start gap-7 md:mt-12 md:flex-row md:items-end md:justify-between">
        <p className="max-w-md text-base leading-relaxed text-white/70 md:text-lg">High-performance colour pigments and vibrant colour solutions designed to make every application stand out.</p>
        <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row"><Button to="/products" className="w-full bg-white text-black hover:bg-pigment-yellow hover:border-pigment-yellow sm:w-auto">Explore Products</Button><Button to="/contact" variant="secondary" className="w-full border-white/60 bg-transparent text-white hover:border-pigment-pink hover:text-pigment-pink sm:w-auto">Get a Quote</Button></div>
      </motion.div>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.75, duration: 0.6 }} className="mt-12 flex items-center gap-2 text-[10px] font-bold uppercase tracking-[.18em] text-white/55"><span>Scroll to explore</span><motion.span animate={{ y: [0, 5, 0] }} transition={{ duration: 1.6, repeat: Infinity }}><ArrowDown size={14} /></motion.span></motion.div>
    </div>
  </section>
}
