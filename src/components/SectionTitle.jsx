import Badge from "./Badge";
export default function SectionTitle({
  label,
  title,
  description,
  className = "",
}) {
  return (
    <div
      className={`grid gap-9 border-t border-theme pt-8 md:grid-cols-12 md:gap-10 ${className}`}
    >
      <div className="flex items-start justify-between md:col-span-3">
        {label && <Badge>{label}</Badge>}
      </div>
      <div className="md:col-span-8 md:col-start-5">
        <h2 className="max-w-4xl text-4xl font-semibold leading-[1.02] tracking-[-0.035em] md:text-6xl">
          {title}
        </h2>
        {description && (
          <p className="mt-6 max-w-xl text-base leading-relaxed text-secondary md:text-lg">
            {description}
          </p>
        )}
      </div>
    </div>
  );
}
