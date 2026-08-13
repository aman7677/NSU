export default function Badge({ children, className = '' }) {
  return <span className={`inline-flex border border-current px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.16em] ${className}`}>{children}</span>
}
