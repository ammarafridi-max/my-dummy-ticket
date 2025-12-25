export default function Input({ icon, className = '', type = 'text', ...props }) {
  return (
    <input
      {...props}
      className={`w-[100%] bg-white font-light text-[14.5px] py-2 px-4 outline-none placeholder:text-gray-400 placeholder:text-[14px] rounded-lg border border-gray-300 focus-visible:border-1.5 focus-visible:border-primary-500 ${className}`}
    />
  );
}
