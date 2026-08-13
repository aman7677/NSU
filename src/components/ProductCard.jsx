import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import Badge from './Badge'
import { PigmentVisual } from './ProductCatalogueCard'

const pigments = ['#d91818', '#ef1678', '#ff761c', '#ffc21c']

export default function ProductCard({ product, index = 0 }) {
  const visualProduct = { ...product, name: product.title, pigment: pigments[index % pigments.length] }
  return <motion.article initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} whileHover={{ y: -8 }} viewport={{ once: true, amount: 0.18 }} transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }} className="group flex flex-col border border-black/15 bg-white transition-colors duration-300 hover:border-black"><div className="relative aspect-[4/3] overflow-hidden bg-[#f7f3ee]"><div className="h-full transition-transform duration-700 ease-out group-hover:scale-105">{product.image ? <img src={product.image} alt={`${product.title} pigment powder`} className="block h-full w-full object-cover object-center" /> : <PigmentVisual product={visualProduct} mode="packet" className="h-full" />}</div><span className={`absolute bottom-4 left-5 text-[10px] font-bold uppercase tracking-[.18em] ${product.image ? 'text-black/65' : 'text-white/75'}`}>NSU / {product.code}</span></div><div className="flex flex-1 flex-col p-6 md:p-7"><Badge className="w-fit border-black/35 text-black/70">{product.category || 'Pigment range'}</Badge><h3 className="mt-8 text-2xl font-semibold tracking-[-.055em]">{product.title}</h3><p className="mt-3 max-w-sm text-sm leading-relaxed text-black/65">{product.description}</p><Link to="/products" className="mt-7 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[.14em] hover:text-pigment-magenta"><span>Explore Product</span><ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" /></Link></div></motion.article>
}
