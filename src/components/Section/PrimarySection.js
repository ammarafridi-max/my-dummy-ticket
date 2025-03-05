export default function PrimarySection({
  pt,
  pb,
  py,
  mt,
  mb,
  my,
  backgroundColor = 'transparent',
  className,
  id,
  children,
}) {
  const sectionStyle = {
    paddingTop: pt || py || '100px',
    paddingBottom: pb || py || '100px',
    marginTop: mt || my,
    marginBottom: mb || my,
    backgroundColor: backgroundColor,
  };

  return (
    <section style={sectionStyle} className={className} id={id}>
      {children}
    </section>
  );
}
