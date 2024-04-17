export default function PrimaryButton(props) {
  const style = {
    color: "white",
    textAlign: "center",
    backgroundImage: "linear-gradient(90deg, #8800e7, #4908B0)",
    border: "1px solid #8800e7",
    padding: "10px 30px",
    borderRadius: "5px",
    width: props.width,
  };
  return (
    <button
      style={style}
      onClick={props.onClick}
      type={props.type}
      className={props.className}
    >
      {props.children}
    </button>
  );
}
