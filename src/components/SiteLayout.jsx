import { motion, AnimatePresence } from 'framer-motion'
import { ArrowUpRight, Menu, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import NSULogo from './NSULogo'
import { companyDetails } from '../data/company'

const links = [['Home', '/'], ['Products', '/products'], ['Applications', '/applications'], ['About', '/about'], ['Contact', '/contact']]
const itemVariants = { hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0, transition: { duration: 0.42, ease: [0.22, 1, 0.36, 1] } } }

function QuoteLink({ className = '', onClick }) {
  return <Link to="/contact" onClick={onClick} className={`inline-flex min-h-11 items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] transition-colors hover:text-pigment-magenta ${className}`}>Get a quote <ArrowUpRight size={17} strokeWidth={2.25} /></Link>
}

export default function SiteLayout({ children }) {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const location = useLocation()
  const isOverHero = location.pathname === '/' && !isScrolled && !isOpen

  useEffect(() => {
    const updateScrolled = () => setIsScrolled(window.scrollY > 12)
    updateScrolled()
    window.addEventListener('scroll', updateScrolled, { passive: true })
    return () => window.removeEventListener('scroll', updateScrolled)
  }, [])

  useEffect(() => {
    const onKeyDown = (event) => { if (event.key === 'Escape') setIsOpen(false) }
    window.addEventListener('keydown', onKeyDown)
    document.body.style.overflow = isOpen ? 'hidden' : ''
    return () => { window.removeEventListener('keydown', onKeyDown); document.body.style.overflow = '' }
  }, [isOpen])

  return <div className="flex min-h-screen flex-col">
    <a href="#main-content" className="sr-only z-[100] bg-white px-4 py-3 text-sm font-bold text-black focus:not-sr-only focus:fixed focus:left-4 focus:top-4">Skip to content</a>
    <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${isScrolled || isOpen ? 'border-b border-black/10 bg-white/88 backdrop-blur-md' : 'border-b border-transparent bg-transparent'} ${isOverHero ? 'text-white' : 'text-black'}`}>
      <div className="mx-auto flex h-20 max-w-[1440px] items-center justify-between px-6 md:px-10 lg:px-14">
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55, delay: 0.08 }} className="relative z-60 shrink-0"><Link to="/" aria-label="NSU home"><NSULogo variant="accent" /></Link></motion.div>
        <nav aria-label="Primary navigation" className="hidden h-full items-center gap-7 lg:flex">
          {links.map(([label, path]) => <NavLink end={path === '/'} key={path} to={path} className={({ isActive }) => `relative flex h-full items-center text-[11px] font-bold uppercase tracking-[0.14em] transition-colors hover:text-pigment-magenta ${isActive ? '' : isOverHero ? 'text-white/65' : 'text-black/65'}`}>{({ isActive }) => <>{label}{isActive && <motion.span layoutId="active-nav" className="absolute inset-x-0 bottom-0 h-0.5 bg-pigment-magenta" transition={{ type: 'spring', stiffness: 420, damping: 34 }} />}</>}</NavLink>)}
        </nav>
        <QuoteLink className="hidden lg:inline-flex" />
        <button type="button" className={`relative z-60 inline-flex min-h-11 min-w-11 items-center justify-center border lg:hidden ${isOverHero ? 'border-white/40' : 'border-black/15'}`} aria-label={isOpen ? 'Close navigation menu' : 'Open navigation menu'} aria-expanded={isOpen} aria-controls="mobile-navigation" onClick={() => setIsOpen((open) => !open)}>{isOpen ? <X size={22} /> : <Menu size={22} />}</button>
      </div>
    </header>
    <AnimatePresence>
      {isOpen && <motion.div id="mobile-navigation" role="dialog" aria-modal="true" aria-label="Mobile navigation" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }} className="fixed inset-0 z-40 flex min-h-dvh flex-col overflow-y-auto bg-white pt-20">
        <motion.nav aria-label="Mobile primary navigation" variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.09, delayChildren: 0.12 } } }} initial="hidden" animate="visible" exit="hidden" className="flex flex-1 flex-col px-6 py-8 sm:px-10">
          <div className="border-t border-black pt-5">{links.map(([label, path], index) => <motion.div variants={itemVariants} key={path} className="border-b border-black/15"><NavLink end={path === '/'} to={path} onClick={() => setIsOpen(false)} className={({ isActive }) => `flex min-h-15 items-center justify-between py-3 text-3xl font-semibold tracking-[-0.06em] ${isActive ? 'text-pigment-magenta' : 'text-black'}`}><span>{label}</span><span className="text-xs font-medium tracking-normal text-black/40">0{index + 1}</span></NavLink></motion.div>)}</div>
          <motion.div variants={itemVariants} className="mt-auto pt-10"><QuoteLink onClick={() => setIsOpen(false)} className="w-full justify-between border border-black px-5 py-4" /></motion.div>
        </motion.nav>
      </motion.div>}
    </AnimatePresence>
    <main id="main-content" className={`flex-1 ${location.pathname === '/' ? '' : 'pt-20'}`}>{children}</main>
    <footer className="relative overflow-hidden bg-black px-6 pb-6 pt-14 text-white md:px-10 md:pt-20 lg:px-14"><div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-white/25" /><motion.div animate={{ x: ['-15%', '112%'] }} transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', repeatDelay: 1.5 }} className="pointer-events-none absolute top-0 h-px w-[24%] bg-[linear-gradient(90deg,#ff3417,#ef1678,#ffc21c)]" /><div className="pointer-events-none absolute right-[12%] top-12 hidden h-36 w-36 rounded-full bg-pigment-magenta/20 blur-[65px] md:block" /><div className="pointer-events-none absolute left-[35%] top-20 hidden h-1.5 w-1.5 rounded-full bg-pigment-yellow md:block" /><motion.div animate={{ y: [0, -16, 0], opacity: [0.25, 0.9, 0.25] }} transition={{ duration: 3.4, repeat: Infinity, ease: 'easeInOut' }} className="pointer-events-none absolute right-[31%] top-24 hidden h-1.5 w-1.5 rounded-full bg-pigment-pink md:block" /><div className="relative mx-auto max-w-[1440px]"><div className="grid gap-12 border-b border-white/15 pb-14 md:grid-cols-12 md:gap-8"><div className="md:col-span-6"><NSULogo variant="accent" className="text-white [&_svg]:w-[176px]" showTagline /><p className="mt-7 max-w-sm text-sm leading-relaxed text-white/65">Vibrant colour and pigment solutions for businesses looking to make every application stand out.</p></div><div className="md:col-span-3 md:col-start-8"><p className="text-[10px] font-bold uppercase tracking-[.17em] text-white/55">Navigate</p><nav aria-label="Footer navigation" className="mt-5 flex flex-col items-start gap-3">{links.map(([label, path]) => <Link key={path} to={path} className="text-sm font-medium transition-colors hover:text-pigment-yellow">{label}</Link>)}</nav></div><div className="md:col-span-2"><p className="text-[10px] font-bold uppercase tracking-[.17em] text-white/55">Talk to NSU</p><a href={companyDetails.phoneHref} className="mt-5 inline-flex border-b border-pigment-yellow pb-2 text-sm font-medium text-pigment-yellow transition-colors hover:border-pigment-pink hover:text-pigment-pink">{companyDetails.phone}</a><Link to="/contact" className="mt-5 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[.14em] text-white transition-colors hover:text-pigment-yellow">Get a quote <ArrowUpRight size={16} /></Link></div></div><div className="flex flex-col justify-between gap-3 pt-6 text-[10px] font-bold uppercase tracking-[.14em] text-white/55 sm:flex-row"><span>© 2026 NSU. All Rights Reserved.</span><span>COLOURS THAT MAKE AN IMPACT.</span></div></div></footer>
  </div>
}
