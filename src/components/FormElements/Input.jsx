import { forwardRef } from 'react';

const Input = forwardRef(function Input({ className = '', type = 'text', ...props }, ref) {
  return (
    <input
      ref={ref}
      type={type}
      {...props}
      className={`w-[100%] bg-white font-light text-[14.5px] py-2 px-3 outline-none placeholder:text-gray-400 placeholder:text-[14px] rounded-lg border border-gray-300 focus-visible:border-1.5 focus-visible:border-primary-500 ${className}`}
    />
  );
});

export default Input;
