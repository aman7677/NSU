import { useId } from 'react'

const gradients = {
  accent: ['#ff3417', '#ef1678', '#ffbc16'],
  mono: ['currentColor', 'currentColor', 'currentColor'],
}

/** Compact NSU wordmark; three pigment particles add a small, adaptable signature. */
export default function NSULogo({ variant = 'mono', className = '', showTagline = false }) {
  const colours = gradients[variant === 'accent' ? 'accent' : 'mono']
  const pigmentId = useId().replace(/:/g, '')

  return (
    <div className={`inline-flex flex-col ${className}`}>
      <svg viewBox="0 0 180 46" role="img" aria-label="NSU" className="h-auto w-[112px] overflow-visible" xmlns="http://www.w3.org/2000/svg">
        <defs><linearGradient id={pigmentId} x1="0" y1="0" x2="1" y2="0"><stop offset="0" stopColor={colours[0]} /><stop offset="0.52" stopColor={colours[1]} /><stop offset="1" stopColor={colours[2]} /></linearGradient></defs>
        <text x="0" y="38" fill="currentColor" fontFamily="Arial Black, Arial, sans-serif" fontSize="43" fontWeight="900" letterSpacing="-4">NSU</text>
        <path d="M54 5h42" stroke={`url(#${pigmentId})`} strokeWidth="5" strokeLinecap="round" />
        <circle cx="61" cy="5" r="2.5" fill={colours[0]} /><circle cx="76" cy="5" r="2.5" fill={colours[1]} /><circle cx="91" cy="5" r="2.5" fill={colours[2]} />
      </svg>
      {showTagline && <span className="mt-1 text-[7px] font-bold tracking-[0.16em]">COLOURS THAT MAKE AN IMPACT.</span>}
    </div>
  )
}
