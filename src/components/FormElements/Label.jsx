export default function Label({ children, htmlFor, optional, className }) {
  return (
    <label
      className={`text-[14px] md:text-[14px] font-medium text-black uppercase mb-1.25 ${className}`}
      htmlFor={htmlFor}
    >
      {children}
      {optional && (
        <span className="ml-0.75 text-gray-400 font-normal">(Optional)</span>
      )}
    </label>
  );
}
