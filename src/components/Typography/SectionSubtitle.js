export default function SectionSubtitle({
  children,
  textAlign,
  fontSize,
  color = 'black',
  textTransform = 'capitalize',
  fontWeight = '500',
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
      fontSize === 'xlarge'
        ? '34px'
        : fontSize === 'large'
        ? '32px'
        : fontSize === 'small'
        ? '24px'
        : '28px',
    color: color,
  };

  return <h3 style={titleStyle}>{children}</h3>;
}
