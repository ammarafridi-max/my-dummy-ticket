export default function PageTitle({
  children,
  textAlign,
  fontSize,
  color = "black",
  fontWeight = "600",
  textTransform = "uppercase",
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
        ? "2.75rem"
        : fontSize === "large"
        ? "2.5rem"
        : fontSize === "small"
        ? "2rem"
        : fontSize === "xsmall"
        ? "1.75rem"
        : "2.25rem",
    color: color,
  };

  return <h1 style={titleStyle}>{children}</h1>;
}
