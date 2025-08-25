export default function PageTitle({ children, className }) {
  return (
    <h1
      className={`text-black text-[27px] md:text-[38px] capitalize font-bold font-nunito leading-8 md:leading-12 ${className}`}
    >
      {children}
    </h1>
  );
}
