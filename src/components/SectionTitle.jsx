export default function SectionTitle({
  textAlign = 'left',
  children,
  subtitle,
  className,
  mb = '8',
}) {
  return (
    <div className={`leading-7 mb-${mb} ${className}`}>
      {subtitle && (
        <p
          className={`text-[14px] md:text-[16px] text-primary-500 font-normal font-outfit uppercase ${textAlign === 'center' ? 'text-left md:text-center' : 'text-left'}`}
        >
          {subtitle}
        </p>
      )}
      <h2
        className={`text-[26px] md:text-[30px] text-black font-medium font-outfit capitalize ${textAlign === 'center' ? 'text-left md:text-center' : 'text-left'}`}
      >
        {children}
      </h2>
    </div>
  );
}
