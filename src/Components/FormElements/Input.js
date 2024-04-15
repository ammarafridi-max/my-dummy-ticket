import styles from "./Input.module.css";

export default function Input(props) {
  const style = {
    width: props.width || "100%",
  };

  return (
    <div className={styles.InputDiv}>
      <input
        type={props.type}
        className={styles.Input}
        placeholder={props.placeholder}
        value={props.value}
        style={style}
        onClick={props.onClick}
        onChange={props.onChange}
      />
    </div>
  );
}
