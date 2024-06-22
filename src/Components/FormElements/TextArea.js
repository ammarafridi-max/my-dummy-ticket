import { useState } from "react";
import styles from "./TextArea.module.css";

export default function TextArea({
  name,
  id,
  className,
  onChange,
  placeholder,
  defaultValue = "", // Added a defaultValue prop for initial state
}) {
  const [message, setMessage] = useState(defaultValue);

  function handleChange(e) {
    setMessage(e.target.value);
    if (onChange) {
      onChange(e.target.value); // Call onChange prop to update parent state
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
