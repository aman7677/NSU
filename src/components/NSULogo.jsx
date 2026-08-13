/** The supplied animated NSU logo, shared by navigation and footer. */
export default function NSULogo({ className = '', showTagline = false }) {
  return (
    <div className={`inline-flex flex-col ${className}`}>
      <video autoPlay loop muted playsInline preload="metadata" aria-label="NSU animated logo" className="h-auto w-[112px] object-contain">
        <source src="/nsu-logo.mp4" type="video/mp4" />
      </video>
      {showTagline && <span className="mt-1 text-[7px] font-bold tracking-[0.16em]">COLOURS THAT MAKE AN IMPACT.</span>}
    </div>
  )
}
