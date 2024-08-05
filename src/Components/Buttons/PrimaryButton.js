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
  mr,
  ml,
  mx,
}) {
  const btnStyling = {
    paddingTop: pt || py,
    paddingBottom: pb || py,
    marginTop: mt || my,
    marginBottom: mb || my,
    marginRight: mr || mx,
    marginLeft: ml || mx,
  };

  return (
    <a href={href} target="_blank" style={{ width: "100%" }}>
      <button
        onClick={onClick}
        type={type}
        className={`${styles.Btn} ${styles.Primary} ${className}`}
        disabled={disabled}
        style={btnStyling}
      >
        {children}
      </button>
    </a>
  );
}
