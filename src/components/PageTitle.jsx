export default function PageTitle({ children, className }) {
  return (
    <h1
      className={`text-black text-[27px] md:text-[36px] capitalize font-light font-merriweather leading-8 md:leading-12 ${className}`}
    >
      {children}
    </h1>
  );
}
