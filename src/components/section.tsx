interface SectionProps {
  id?: string;
  title?: string;
  subtitle?: React.ReactNode;
  description?: string;
  children?: React.ReactNode;
  className?: string;
}

export default function Section({
  id,
  title,
  subtitle,
  description,
  children,
  className,
}: SectionProps) {
  const sectionId = id || (title ? title.toLowerCase().replace(/\s+/g, "-") : undefined);
  return (
    <section id={sectionId}>
      <div className={className}>
        <div className="relative container mx-auto px-4 py-16 max-w-7xl">
          <div className="text-center space-y-4 pb-6 mx-auto">
            {title && (
              <h2 className="text-sm text-primary font-mono font-medium tracking-wider uppercase text-balance">
                {title}
              </h2>
            )}
            {subtitle && (
              <h3 className="mx-auto mt-4 max-w-xs sm:max-w-2xl text-3xl font-semibold sm:text-4xl md:text-5xl text-balance">
                {subtitle}
              </h3>
            )}
            {description && (
              <p className="mt-6 text-lg leading-8 text-slate-600 max-w-2xl mx-auto text-balance">
                {description}
              </p>
            )}
          </div>
          {children}
        </div>
      </div>
    </section>
  );
}
