export default function DeleteButton({ children, className, type = 'button', ...props }) {
  return (
    <button
      className={`inline-flex items-center justify-center gap-2 rounded-lg border border-red-600 bg-red-600 px-3 py-1.5 text-xs md:text-sm text-white transition-all duration-200 hover:bg-red-700 disabled:opacity-55 disabled:cursor-not-allowed ${className || ''}`}
      type={type}
      {...props}
    >
      {children}
    </button>
  );
}
