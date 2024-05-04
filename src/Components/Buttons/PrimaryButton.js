import styles from "./PrimaryButton.module.css";

export default function PrimaryButton({
  onClick,
  type,
  className,
  disabled,
  children,
}) {
  return (
    <button
      onClick={onClick}
      type={type}
      className={`${styles.Btn} ${className}`}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
