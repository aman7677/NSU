import { ArrowDownRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import Container from '../components/Container'
import SectionTitle from '../components/SectionTitle'
import Hero from '../sections/Hero'
import ProductShowcase from '../sections/ProductShowcase'

export default function Home() {
  return <><Hero /><ProductShowcase /><section className="bg-black py-16 text-white md:py-24"><Container><SectionTitle label="The NSU standard" number="03" title="Built for intensity. Engineered for consistency." description="From vivid sindoor to fluorescent and industrial pigments, every NSU solution is created to perform with confidence." className="border-white text-white [&_p]:text-white/65 [&_span]:text-white/50" /><Link to="/products" className="mt-12 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[.14em] text-pigment-yellow hover:text-pigment-pink">Discover the range <ArrowDownRight size={17} /></Link></Container></section></>
}
