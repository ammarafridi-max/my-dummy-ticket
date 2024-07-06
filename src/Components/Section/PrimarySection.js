export default function PrimarySection(props) {
  const sectionStyle = {
    paddingTop: props.pt || props.py,
    paddingBottom: props.pb || props.py,
    marginTop: props.mt || props.my,
    marginBottom: props.mb || props.my,
    backgroundColor: "rgb(240, 240, 240)",
    color: props.backgroundColor === "primary" ? "white" : "black",
  };

  return (
    <section style={sectionStyle} className={props.className} id={props.id}>
      {props.children}
    </section>
  );
}
