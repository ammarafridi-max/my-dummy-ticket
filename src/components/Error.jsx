export default function Error({ children }) {
  return (
    <div className="w-full rounded-sm my-1.25 text-[14px] text-red-700">
      {children}
    </div>
  );
}
