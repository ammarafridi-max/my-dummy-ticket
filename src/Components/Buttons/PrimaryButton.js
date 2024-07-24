import styles from "./PrimaryButton.module.css";

export default function PrimaryButton({
  onClick,
  type,
  className,
  disabled,
  children,
  href,
  pt,
  pb,
  py,
  mt,
  mb,
  my,
}) {
  const btnStyling = {
    paddingTop: pt || py,
    paddingBottom: pb || py,
    marginTop: mt || my,
    marginBottom: mb || my,
  };

  return (
    <a href={href} target="_blank">
      <button
        onClick={onClick}
        type={type}
        className={`${styles.Btn} ${className}`}
        disabled={disabled}
        style={btnStyling}
      >
        {children}
      </button>
    </a>
  );
}
