import { motion, useReducedMotion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import Button from './Button'

const fallbackPigments = ['#d91818', '#ef1678', '#ff761c', '#ffc21c', '#d91179']

/** Original product-visual treatment: a studio-lit packet, pigment pile, swatch and particulate texture. */
export function PigmentVisual({ product, className = '', mode = 'swatch' }) {
  const reduceMotion = useReducedMotion()
  const pigment = product.pigment || fallbackPigments[(Number.parseInt(product.code, 10) || 1) % fallbackPigments.length]
  const isPacket = mode === 'packet'
  return <div role="img" aria-label={`${product.name} pigment product visual`} className={`relative isolate overflow-hidden bg-[#090909] ${className}`}>
    <motion.div animate={reduceMotion ? undefined : { scale: [1, 1.06, 1], rotate: [0, 2, -1, 0] }} transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }} className="absolute inset-[-15%]" style={{ background: `radial-gradient(ellipse at 58% 69%, ${pigment} 0%, ${pigment} 20%, #351018 36%, #090909 68%)` }} />
    <div className="absolute inset-0 opacity-70 mix-blend-screen" style={{ backgroundImage: `radial-gradient(circle at 20% 29%, ${pigment} 0 1px, transparent 1.6px), radial-gradient(circle at 78% 72%, rgba(255,255,255,.85) 0 1px, transparent 1.6px), radial-gradient(circle at 64% 16%, ${pigment} 0 1.2px, transparent 1.8px)`, backgroundSize: '13px 13px, 19px 19px, 23px 23px' }} />
    <motion.div animate={reduceMotion ? undefined : { x: [0, 10, -4, 0], y: [0, -7, 3, 0], scale: [1, 1.04, 1] }} transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }} className="absolute -bottom-[23%] left-[10%] h-[76%] w-[82%] rounded-[50%_50%_44%_56%/60%_48%_52%_40%] blur-[1px]" style={{ background: `radial-gradient(ellipse at 46% 28%, #fff 0%, ${pigment} 3%, ${pigment} 33%, #410a21 75%)`, boxShadow: `0 0 85px ${pigment}` }} />
    {isPacket && <div className="absolute bottom-[8%] left-[11%] h-[64%] w-[29%] -rotate-[10deg] border border-white/45 bg-black/75 shadow-2xl"><div className="mx-auto mt-[16%] h-px w-[70%] bg-white/75" /><div className="mx-auto mt-3 h-[28%] w-[70%]" style={{ backgroundColor: pigment }} /><div className="mx-auto mt-3 h-px w-[70%] bg-white/35" /><span className="absolute bottom-3 left-3 text-[7px] font-bold tracking-[.18em] text-white/70">NSU / PIGMENT</span></div>}
    <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(255,255,255,.22),transparent_23%,transparent_70%,rgba(0,0,0,.6))]" />
  </div>
}

export default function ProductCatalogueCard({ product, onSelect }) {
  return <motion.article layout initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.96 }} transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }} className="group flex flex-col border border-black/15 bg-white p-5 transition-[border-color,box-shadow] duration-300 hover:border-black hover:shadow-[0_12px_30px_rgba(0,0,0,.08)] md:p-6"><button type="button" onClick={() => onSelect(product)} aria-label={`View details for ${product.name}`} className="relative aspect-[16/10] w-full overflow-hidden text-left focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-pigment-magenta"><motion.div whileHover={{ scale: 1.07 }} transition={{ duration: 0.65, ease: 'easeOut' }} className="h-full"><PigmentVisual product={product} className="h-full" /></motion.div><span className="absolute bottom-4 left-4 border-l-2 border-white pl-2 text-[10px] font-bold uppercase tracking-[.16em] text-white/85">{product.colour}</span></button><div className="flex flex-1 flex-col pt-7"><p className="text-[10px] font-bold uppercase tracking-[.17em] text-black/55">{product.category}</p><h2 className="mt-3 text-2xl font-semibold leading-none tracking-[-.065em]">{product.name}</h2><dl className="mt-7 space-y-3 border-y border-black/10 py-4 text-xs"><div className="flex justify-between gap-6"><dt className="uppercase tracking-[.12em] text-black/45">Colour</dt><dd className="text-right font-medium">{product.colour}</dd></div><div className="flex justify-between gap-6"><dt className="uppercase tracking-[.12em] text-black/45">Application</dt><dd className="max-w-[65%] text-right font-medium">{product.application}</dd></div></dl><p className="mt-5 text-sm leading-relaxed text-black/70">{product.description}</p><Button onClick={() => onSelect(product)} variant="secondary" className="mt-7 w-full justify-between text-[10px]" icon={false}>Request Quote <ArrowUpRight size={15} /></Button></div></motion.article>
}
