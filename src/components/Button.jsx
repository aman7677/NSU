import { ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function Button({ children, to, href, variant = 'primary', icon = true, className = '', ...props }) {
  const styles = variant === 'primary'
    ? 'bg-black text-white border-black hover:bg-pigment-magenta hover:border-pigment-magenta'
    : 'border-black bg-white text-black hover:border-pigment-orange hover:text-pigment-orange'
  const content = <>{children}{icon && <span className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"><ArrowUpRight size={17} strokeWidth={2.2} /></span>}</>
  const classes = `group inline-flex items-center justify-center gap-3 border px-5 py-3 text-xs font-bold uppercase tracking-[0.14em] transition-all duration-300 hover:scale-[1.015] active:scale-[0.99] ${styles} ${className}`
  if (to) return <Link to={to} className={classes} {...props}>{content}</Link>
  if (href) return <a href={href} className={classes} {...props}>{content}</a>
  return <button type="button" className={classes} {...props}>{content}</button>
}
