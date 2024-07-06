import styles from "./PrimaryButton.module.css";

export default function PrimaryButton({
  onClick,
  type,
  className,
  disabled,
  children,
  href,
}) {
  return (
    <a href={href} target="_blank">
      <button
        onClick={onClick}
        type={type}
        className={`${styles.Btn} ${className}`}
        disabled={disabled}
      >
        {children}
      </button>
    </a>
  );
}
