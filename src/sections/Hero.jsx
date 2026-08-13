import { motion } from 'framer-motion'
import { ArrowDown } from 'lucide-react'
import Button from '../components/Button'
import ColourParticles from '../components/ColourParticles'

const lines = ['COLOUR', 'WITHOUT', 'LIMITS.']

export default function Hero() {
  return <section className="relative isolate flex min-h-[680px] overflow-hidden bg-black text-white sm:min-h-[720px] md:min-h-[860px]">
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.15, ease: 'easeOut' }} className="absolute inset-0" />
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.25, duration: 1.4 }} className="pointer-events-none absolute inset-0">
      <motion.div animate={{ x: [0, 30, -14, 0], y: [0, -22, 18, 0], scale: [1, 1.1, 0.95, 1] }} transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }} className="absolute -right-[34%] top-[12%] h-[22rem] w-[22rem] rounded-full bg-pigment-magenta/30 blur-[100px] sm:-right-[17%] sm:h-[27rem] sm:w-[27rem] md:h-[36rem] md:w-[36rem]" />
      <motion.div animate={{ x: [0, -30, 18, 0], y: [0, 22, -15, 0] }} transition={{ duration: 21, repeat: Infinity, ease: 'easeInOut' }} className="absolute right-[-16%] top-[42%] h-[14rem] w-[18rem] rounded-[48%] bg-pigment-orange/30 blur-[88px] sm:right-[4%] sm:h-[18rem] sm:w-[22rem] md:h-[27rem] md:w-[33rem]" />
      <motion.div animate={{ x: [0, 18, -20, 0], y: [0, -18, 12, 0] }} transition={{ duration: 19, repeat: Infinity, ease: 'easeInOut' }} className="absolute -bottom-[16%] right-[26%] h-[13rem] w-[20rem] rounded-full bg-pigment-red/28 blur-[88px] sm:h-[17rem] sm:w-[24rem] md:h-[25rem] md:w-[36rem]" />
      <motion.div animate={{ x: [0, -15, 17, 0], y: [0, 14, -17, 0] }} transition={{ duration: 17, repeat: Infinity, ease: 'easeInOut' }} className="absolute right-[34%] top-[16%] hidden h-36 w-36 rounded-full bg-pigment-yellow/30 blur-[64px] sm:block" />
    </motion.div>
    <ColourParticles />
    <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(0,0,0,.88)_0%,rgba(0,0,0,.67)_43%,rgba(0,0,0,.21)_76%),radial-gradient(circle_at_70%_47%,transparent_0%,rgba(0,0,0,.28)_53%,#000_100%)]" />
    <div className="relative z-20 mx-auto flex w-full max-w-[1440px] flex-col justify-end px-6 pb-8 pt-32 sm:pt-40 md:px-10 md:pb-10 md:pt-48 lg:px-14">
      <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7, duration: 0.55 }} className="mb-8 text-[10px] font-bold uppercase tracking-[0.2em] text-pigment-yellow">NSU Colour Solutions</motion.p>
      <h1 className="max-w-4xl text-[clamp(3.65rem,10.2vw,10rem)] font-semibold leading-[0.8] tracking-[-0.09em] sm:leading-[0.78]">
        {lines.map((line, index) => <span key={line} className="block overflow-hidden"><motion.span initial={{ y: '110%' }} animate={{ y: 0 }} transition={{ delay: 0.85 + index * 0.15, duration: 0.8, ease: [0.16, 1, 0.3, 1] }} className="block">{line}</motion.span></span>)}
      </h1>
      <motion.div initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.45, duration: 0.65 }} className="mt-10 flex flex-col items-start gap-7 md:mt-12 md:flex-row md:items-end md:justify-between">
        <p className="max-w-md text-base leading-relaxed text-white/70 md:text-lg">Vibrant colour and pigment solutions designed to make every application stand out.</p>
        <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row"><Button to="/products" className="w-full bg-white text-black hover:bg-pigment-yellow hover:border-pigment-yellow sm:w-auto">Explore Products</Button><Button to="/contact" variant="secondary" className="w-full border-white/60 bg-transparent text-white hover:border-pigment-pink hover:text-pigment-pink sm:w-auto">Get a Quote</Button></div>
      </motion.div>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.75, duration: 0.6 }} className="mt-12 flex items-center gap-2 text-[10px] font-bold uppercase tracking-[.18em] text-white/55"><span>Scroll to explore</span><motion.span animate={{ y: [0, 5, 0] }} transition={{ duration: 1.6, repeat: Infinity }}><ArrowDown size={14} /></motion.span></motion.div>
    </div>
  </section>
}
