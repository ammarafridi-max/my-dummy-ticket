import { useState } from "react";
import styles from "./TextArea.module.css";

export default function TextArea({
  name,
  id,
  className,
  onChange,
  placeholder,
  defaultValue = "",
}) {
  const [message, setMessage] = useState(defaultValue);

  function handleChange(e) {
    setMessage(e.target.value);
    if (onChange) {
      onChange(e.target.value);
    }
  }

  return (
    <textarea
      name={name}
      className={`${styles.TextArea} ${className}`}
      onChange={handleChange}
      id={id}
      placeholder={placeholder}
      value={message}
    />
  );
}
