export default function Paragraph({
  className,
  children,
  fontWeight = 300,
  color = 'black',
  fontSize = '15px',
  textAlign = 'left',
  pt,
  pb,
  py,
  pl,
  pr,
  px,
  mt,
  mb,
  my,
  mr,
  ml,
  mx,
}) {
  const styles = {
    color,
    fontSize,
    textAlign,
    fontWeight,
    paddingTop: pt || py,
    paddingBottom: pb || py,
    paddingRight: pr || px,
    paddingLeft: pl || px,
    marginTop: mt || my,
    marginBottom: mb || my,
    marginRight: mr || mx,
    marginLeft: ml || mx,
  };

  return (
    <p style={styles} className={className}>
      {children}
    </p>
  );
}
