export default function InputWithIcon({
  icon,
  className = '',
  type = 'text',
  ...props
}) {
  return (
    <div className="relative w-full">
      {icon && (
        <div className="absolute inset-y-0 left-2 md:left-4 flex items-center text-gray-800 ">
          <span className="text-lg">{icon}</span>
        </div>
      )}
      <input
        className="w-[100%] bg-white border-none text-[14.5px] py-3 px-3 pl-10 md:pl-12 outline-none placeholder:text-gray-400 placeholder:text-[14px] rounded-lg shadow-(--input-box-shadow-sm)"
        {...props}
      />
    </div>
  );
}
