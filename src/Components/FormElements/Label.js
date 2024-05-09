import styles from "./Label.module.css";

export default function Label(props) {
  const style = {
    marginRight: props.mr || props.mx,
    marginLeft: props.ml || props.mx,
    marginTop: props.mt || props.my,
    marginBottom: props.mb || props.my || "10px",
    fontWeight: "500",
    color: "#1a4d2e",
  };

  return (
    <label htmlFor={props.htmlFor} className={styles.Label} style={style}>
      {props.required && <span className={styles.Required}>*</span>}
      {props.children}
      {props.optional && <span className={styles.Optional}>(Optional)</span>}
    </label>
  );
}
