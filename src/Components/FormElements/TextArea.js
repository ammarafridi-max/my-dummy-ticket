import styles from "./TextArea.module.css";

export default function TextArea({ children, name, id, className, onChange }) {
  return (
    <textarea
      name={name}
      className={`${styles.TextArea} ${className}`}
      onChange={onChange}
      id={id}
    >
      {children}
    </textarea>
  );
}
