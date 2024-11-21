export default function SectionTitle({
  children,
  textAlign,
  fontSize,
  color = "black",
  textTransform = "capitalize",
  fontWeight = "500",
  pt,
  pb,
  py,
  pl,
  pr,
  px,
  mt,
  mb,
  my,
}) {
  const titleStyle = {
    textAlign: textAlign,
    marginTop: mt || my,
    marginBottom: mb || my,
    paddingTop: pt || py,
    paddingBottom: pb || py,
    paddingLeft: pl || px,
    paddingRight: pr || px,
    textTransform: textTransform,
    fontWeight: fontWeight,
    fontSize:
      fontSize === "xlarge"
        ? "40px"
        : fontSize === "large"
        ? "36px"
        : fontSize === "small"
        ? "28px"
        : fontSize === "xsmall"
        ? "24px"
        : fontSize === "xxsmall"
        ? "1.25rem"
        : "32px",
    color: color,
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
