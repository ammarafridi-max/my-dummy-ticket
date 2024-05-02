import styles from "./PrimaryButton.module.css";

export default function PrimaryButton(props) {
  return (
    <button
      onClick={props.onClick}
      type={props.type}
      className={`${styles.Btn} ${props.className}`}
    >
      {props.children}
    </button>
  );
}
