export default function InputWithIcon({ icon, className = '', type = 'text', ...props }) {
  return (
    <div className="relative w-full z-0">
      {icon && (
        <div className="absolute inset-y-0 left-3.5 lg:left-3 flex items-center text-gray-800">
          <span className="text-md">{icon}</span>
        </div>
      )}
      <input
        className={`w-[100%] bg-white text-[14.5px] font-light outline-none placeholder:text-gray-400 placeholder:text-[14px] rounded-lg border border-gray-300 focus-visible:border-1.5 focus-visible:border-primary-500 ${icon ? 'py-2.5 px-3 pl-11 md:pl-10' : 'py-2.5 px-3'}`}
        {...props}
      />
    </div>
  );
}
