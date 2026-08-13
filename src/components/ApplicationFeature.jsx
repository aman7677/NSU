import { motion } from 'framer-motion'
import ImageReveal from './ImageReveal'

const patterns = {
  radial: 'radial-gradient(circle at center, #111 0 5%, transparent 5.5%), repeating-radial-gradient(circle at center, transparent 0 12px, #111 13px 14px)',
  threads: 'repeating-linear-gradient(108deg, #111 0 1px, transparent 1px 10px), repeating-linear-gradient(72deg, #111 0 1px, transparent 1px 18px)',
  layers: 'repeating-linear-gradient(0deg, #111 0 2px, transparent 2px 18px)',
  dots: 'radial-gradient(#111 1.3px, transparent 1.8px)',
  grid: 'linear-gradient(#111 1px, transparent 1px), linear-gradient(90deg, #111 1px, transparent 1px)',
  spectrum: 'linear-gradient(135deg, transparent 0 46%, #111 46% 48%, transparent 48% 52%, #111 52% 54%, transparent 54%)',
}

export default function ApplicationFeature({ application, index }) {
  const reverse = index % 2 === 1
  return <motion.article initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true, amount: 0.18 }} className={`group grid border-t border-black pt-5 md:grid-cols-12 md:gap-8 ${reverse ? 'md:[&>*:first-child]:order-2' : ''}`}>
    <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.55 }} className="mb-7 flex items-start justify-between md:col-span-3"><span className="text-4xl font-semibold leading-none tracking-[-.08em] md:text-5xl" style={{ color: application.accent }}>{application.number}</span><span className="mt-1 h-2.5 w-2.5 rounded-full" style={{ backgroundColor: application.accent }} /></motion.div>
    <ImageReveal delay={0.1} className="mb-7 aspect-[16/10] bg-off-white md:col-span-4"><motion.div whileHover={{ scale: 1.06 }} transition={{ duration: 0.55 }} className="relative h-full overflow-hidden bg-[#e8e8e8]"><div className="absolute inset-[12%] opacity-85" style={{ backgroundImage: patterns[application.visual], backgroundSize: application.visual === 'dots' ? '12px 12px' : application.visual === 'grid' ? '20px 20px' : 'auto' }} /><motion.div className="absolute bottom-[15%] left-[12%] h-[26%] w-[62%]" whileHover={{ x: 12, scaleX: 1.08 }} transition={{ duration: 0.45 }} style={{ backgroundColor: application.accent }} /><div className="absolute inset-0 bg-[linear-gradient(130deg,rgba(255,255,255,.4),transparent_42%,rgba(0,0,0,.12))]" /></motion.div></ImageReveal>
    <motion.div initial={{ opacity: 0, x: reverse ? -26 : 26 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.08 }} className="pb-12 md:col-span-4 md:col-start-9 md:pt-1 lg:pb-20"><h2 className="max-w-md text-3xl font-semibold leading-[.96] tracking-[-.06em] md:text-4xl">{application.title}</h2><p className="mt-5 max-w-md text-sm leading-relaxed text-black/65 md:text-base">{application.description}</p><p className="mt-6 border-l-2 pl-3 text-xs leading-relaxed text-black/55" style={{ borderColor: application.accent }}>Suitable grades available depending on application requirements.</p></motion.div>
  </motion.article>
}
