import { useState } from "react";
import styles from "./Select.module.css";

export default function Select({ children, onChange, onClick, id, className }) {
  return (
    <div className={styles.Container}>
      <select
        className={`${styles.Select} ${className}`}
        onChange={onChange}
        onClick={onClick}
        id={id}
      >
        {children}
      </select>
    </div>
  );
}
