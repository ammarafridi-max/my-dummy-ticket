export default function Input({
  icon,
  className = '',
  type = 'text',
  ...props
}) {
  return (
    <input
      {...props}
      className={`w-[100%] bg-white font-medium border-none text-[14.5px] py-3 px-4 rounded-md outline-none placeholder:text-gray-400 placeholder:text-[14px] shadow-(--input-box-shadow) ${className}`}
    />
  );
}
