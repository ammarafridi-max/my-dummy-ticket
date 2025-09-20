export default function InputWithIcon({
  icon,
  className = '',
  type = 'text',
  ...props
}) {
  return (
    <div className="relative w-full">
      {icon && (
        <div className="absolute inset-y-0 left-2 md:left-3 flex items-center text-gray-800">
          <span className="text-lg">{icon}</span>
        </div>
      )}
      <input
        className="w-[100%] bg-white text-[14.5px] py-2.5 px-3 pl-10 md:pl-10 font-normal outline-none placeholder:text-gray-400 placeholder:text-[14px] rounded-md border border-gray-300 focus-visible:border-1.5 focus-visible:border-primary-500"
        {...props}
      />
    </div>
  );
}
