export default function PageTitle(props) {
  const style = {
    fontSize: "35px",
    fontWeight: "600",
    textAlign: props.textAlign || "left",
    marginTop: props.mt || props.my,
    marginBottom: props.mb || props.my,
    marginRight: props.mr || props.mx,
    marginLeft: props.ml || props.mx,
  };

  return (
    <h1 style={style} className={props.className}>
      {props.children}
    </h1>
  );
}
