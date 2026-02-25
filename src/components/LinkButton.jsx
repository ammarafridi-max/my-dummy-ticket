export default function LinkButton({ children, className, type = 'button', ...props }) {
  return (
    <button
      className={`inline-flex items-center justify-center gap-2 rounded-lg border border-gray-300 bg-white px-3 py-1.5 text-xs md:text-sm text-gray-700 transition-all duration-200 hover:bg-gray-100 disabled:opacity-55 disabled:cursor-not-allowed ${className || ''}`}
      type={type}
      {...props}
    >
      {children}
    </button>
  );
}
