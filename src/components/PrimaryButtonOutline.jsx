export default function PrimaryButtonOutline({
  children,
  className = '',
  size = 'medium',
  selected,
  ...props
}) {
  let newClassName =
    className +
    ' text-center no-underline font-normal font-outfit rounded-lg capitalize border border-solid border-accent-500 cursor-pointer duration-300 shadow disabled:bg-accent-600 disabled:text-white disabled:opacity-50 disabled:cursor-auto';

  if (size === 'large') {
    newClassName = newClassName + ` text-[15px] md:text-[18px] py-3 px-5 `;
  } else if (size === 'small') {
    newClassName = newClassName + `text-[12px] md:text-[14px] py-2 px-4`;
  } else {
    newClassName = newClassName + `text-[14px] md:text-[16px] py-2.5 px-5`;
  }

  if (selected) {
    newClassName = newClassName + ` bg-accent-500 text-white`;
  } else {
    newClassName =
      newClassName +
      ` bg-transparent text-accent-500 hover:bg-accent-600 hover:text-white hover:border-accent-600`;
  }

  return (
    <button className={newClassName} {...props}>
      {children}
    </button>
  );
}
