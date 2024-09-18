import styles from "./Label.module.css";

export default function Label(props) {
  const style = {
    marginRight: props.mr || props.mx,
    marginLeft: props.ml || props.mx,
    marginTop: props.mt || props.my,
    marginBottom: props.mb || props.my || "5px",
  };

  return (
    <label htmlFor={props.htmlFor} className={styles.Label} style={style}>
      {props.children}
      {props.optional && <span className={styles.Optional}>(Optional)</span>}
    </label>
  );
}
