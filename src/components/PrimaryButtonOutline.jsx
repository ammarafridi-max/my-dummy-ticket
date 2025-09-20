export default function PrimaryButtonOutline({
  children,
  className = '',
  ...props
}) {
  return (
    <button
      className={`text-center text-accent-500 text-[15px] no-underline font-semibold py-2.5 px-5 rounded-md capitalize border border-solid border-accent-500 bg-transparent hover:bg-accent-600 hover:text-white hover:border-accent-600 cursor-pointer duration-300 disabled:bg-accent-600 disabled:text-white disabled:opacity-50 disabled:cursor-auto ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
