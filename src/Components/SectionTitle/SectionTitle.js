import styles from "./SectionTitle.module.css";

export function SectionTitle({
  textAlign,
  children,
  type,
  subtitle,
  pt,
  pb,
  py,
  mt,
  mb,
  my,
}) {
  const titleStyle = {
    textAlign: textAlign || "left",
  };
  const divStyling = {
    paddingTop: pt || py,
    paddingBottom: pb || py,
    marginTop: mt || my,
    marginBottom: mb || my,
  };
  return (
    <div className={styles.container} style={divStyling}>
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
    </div>
  );
}
