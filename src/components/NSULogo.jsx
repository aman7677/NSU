/** The supplied NSU logo, shared by the navigation and footer. */
export default function NSULogo({ className = '', showTagline = false }) {
  return (
    <div className={`inline-flex flex-col ${className}`}>
      <img
        src="/NSU-logo.png"
        alt="Narayan Sindoor Udyog"
        className="h-auto w-[100px] object-contain"
      />
      {showTagline && <span className="mt-1 text-[7px] font-bold tracking-[0.16em]">COLOURS THAT MAKE AN IMPACT.</span>}
    </div>
  )
}
