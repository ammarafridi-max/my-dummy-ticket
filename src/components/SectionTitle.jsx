export default function SectionTitle({
  textAlign = 'left',
  children,
  subtitle,
  className = 'mb-10 lg:mb-12',
  type = 'primary',
}) {
  const isCenter = textAlign === 'center';

  let h2ClassName = `
    text-gray-900 text-[28px] lg:text-[34px] font-normal font-outfit leading-10 capitalize mb-3 ${isCenter ? 'mx-auto text-left lg:text-center' : 'text-left'}
  `;

  let pClassName = `
    text-gray-500 text-[16px] lg:text-[16px] font-light font-outfit ${isCenter ? 'mx-auto text-left lg:text-center' : 'text-left'}
  `;

  return (
    <div className={className}>
      <h2 className={h2ClassName}>{children}</h2>
      {subtitle && <p className={pClassName}>{subtitle}</p>}
    </div>
  );
}
