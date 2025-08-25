export default function SectionTitle({
  textAlign = 'left',
  children,
  subtitle,
  className,
  mb = '8',
}) {
  return (
    <div className={`mb-${mb} ${className}`}>
      {subtitle && (
        <p
          className={`text-[14px] font-semibold font-nunito uppercase text-primary-500 mb-0 pb-0 md:text-[16px] ${textAlign === 'center' ? 'text-center' : 'text-left'}`}
        >
          {subtitle}
        </p>
      )}
      <h2
        className={`text-[24px] text-black font-medium font-merriweather md:text-[33px] ${textAlign === 'center' ? 'text-center' : 'text-left'}`}
      >
        {children}
      </h2>
    </div>
  );
}
