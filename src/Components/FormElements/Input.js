import styles from "./Input.module.css";
import { FaPlaneDeparture } from "react-icons/fa";

export default function Input(props) {
  return (
    <div className={styles.InputDiv}>
      {props.icon && <span className={styles.Icon}>{props.icon}</span>}
      <input
        type={props.type}
        className={styles.Input}
        placeholder={props.placeholder}
        value={props.value}
        style={props.style}
        onClick={props.onClick}
        onChange={props.onChange}
        onFocus={props.onFocus}
        id={props.id}
        name={props.name}
        autoComplete={props.autoComplete}
        pattern={props.pattern}
        min={props.min}
        max={props.max}
      />
    </div>
  );
}
