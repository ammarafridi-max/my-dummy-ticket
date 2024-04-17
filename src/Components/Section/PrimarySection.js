export default function PrimarySection(props) {
  const sectionStyle = {
    paddingTop: props.pt || props.py,
    paddingBottom: props.pb || props.py,
    marginTop: props.mt || props.my,
    marginBottom: props.mb || props.my,
    backgroundImage:
      props.backgroundColor === "purple"
        ? "linear-gradient(90deg, rgba(73,8,176,1), rgba(136,0,231,1))"
        : "",
    color: props.backgroundColor === "purple" ? "white" : "black",
  };

  return (
    <section style={sectionStyle} className={props.className} id={props.id}>
      {props.children}
    </section>
  );
}
