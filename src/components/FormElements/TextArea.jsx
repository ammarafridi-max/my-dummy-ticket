export default function TextArea({ ...props }) {
  return (
    <textarea
      className="w-full h-40 bg-white border border-gray-300 py-2.5 px-5 rounded-lg font-light text-[14.5px] outline-0 duration-300 placeholder:text-gray-500"
      {...props}
    />
  );
}
