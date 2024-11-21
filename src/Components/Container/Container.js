export default function Container({
  pt,
  pb,
  py,
  mt,
  mb,
  my,
  className,
  children,
}) {
  const containerStyle = {
    paddingTop: pt || py,
    paddingBottom: pb || py,
    marginTop: mt || my,
    marginBottom: mb || my,
  };
  return (
    <div
      className={`col-11 col-lg-10 mx-auto m-0 ${className} `}
      style={containerStyle}
    >
      {children}
    </div>
  );
}
