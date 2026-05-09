type Props = {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: 'center' | 'left';
};

export default function SectionHeading({ eyebrow, title, subtitle, align = 'center' }: Props) {
  const alignCls = align === 'center' ? 'text-center items-center' : 'text-left items-start';
  return (
    <div className={`flex flex-col gap-3 ${alignCls}`}>
      {eyebrow && (
        <span className="text-[11px] uppercase tracking-[0.3em] text-accent">{eyebrow}</span>
      )}
      <h2 className="font-display text-3xl text-ink md:text-5xl">{title}</h2>
      {subtitle && (
        <p className="max-w-2xl text-sm leading-relaxed text-muted md:text-base">{subtitle}</p>
      )}
      <span className="mt-2 h-px w-12 bg-accent" />
    </div>
  );
}
