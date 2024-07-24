import styles from "./SectionTitle.module.css";

export function SectionTitle({ textAlign, children, type, subtitle }) {
  const titleStyle = {
    textAlign: textAlign || "left",
  };
  return (
    <>
      <p
        className={`${styles.subtitle} ${
          type === "secondary" && styles.secondary
        }`}
        style={titleStyle}
      >
        {subtitle}
      </p>
      <h2
        style={titleStyle}
        className={`${styles.title} ${
          type === "secondary" && styles.secondary
        }`}
      >
        {children}
      </h2>
    </>
  );
}
