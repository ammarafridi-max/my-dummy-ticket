export default function PrimaryButton({ children, className = '', size = 'medium', ...props }) {
  let newClassName = className;
  const baseClassName =
    'inline-flex items-center justify-center gap-2 text-center text-white no-underline font-outfit rounded-xl border border-solid border-accent-500/80 bg-[linear-gradient(135deg,#ff6b45_0%,#ff5a2f_100%)] shadow-[0_10px_22px_rgba(231,68,29,0.35)] cursor-pointer duration-300 hover:-translate-y-0.5 hover:shadow-[0_14px_28px_rgba(231,68,29,0.42)] hover:brightness-105 active:translate-y-0 active:shadow-[0_8px_18px_rgba(231,68,29,0.32)] disabled:opacity-55 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-[0_10px_22px_rgba(231,68,29,0.35)] disabled:hover:brightness-100';

  if (size === 'large') {
    newClassName =
      newClassName + ` ${baseClassName} text-[15px] md:text-[18px] font-semibold py-3 px-5`;
  } else if (size === 'small') {
    newClassName =
      newClassName +
      ` ${baseClassName} text-[12px] md:text-[14px] font-medium py-2 px-4 rounded-lg`;
  } else {
    newClassName =
      newClassName + ` ${baseClassName} text-[14px] md:text-[16px] font-medium py-2.5 px-5`;
  }

  return (
    <button className={newClassName} {...props}>
      {children}
    </button>
  );
}
