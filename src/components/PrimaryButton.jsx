export default function PrimaryButton({ children, className, ...props }) {
  return (
    <button
      className={`box-border text-center text-white text-[15px] no-underline font-semibold py-2.5 px-5 rounded-md capitalize bg-accent-500 hover:bg-accent-600 border border-solid border-accent-500 cursor-pointer duration-300 shadow shadow-accent-900 disabled:bg-accent-500 disabled:opacity-60 disabled:cursor-auto disabled:hover:bg-accent-500 ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
