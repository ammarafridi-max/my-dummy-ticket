import styles from "./Label.module.css";

export default function Label(props) {
  const style = {
    marginRight: props.mr || props.mx,
    marginLeft: props.ml || props.mx,
    marginTop: props.mt || props.my,
    marginBottom: props.mb || props.my || "10px",
  };

  return (
    <label htmlFor={props.htmlFor} style={style}>
      {props.children}
    </label>
  );
}
