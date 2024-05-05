import styles from "./Counter.module.css";
import { useState } from "react";
import { Remove, Add } from "@mui/icons-material";

export default function Counter({ children, onAdd, onSubtract }) {
  return (
    <div className={styles.Counter}>
      <button type="none" className={styles.Button} onClick={onSubtract}>
        <Remove />
      </button>
      <p className={styles.Number}>{children}</p>
      <button type="none" className={styles.Button} onClick={onAdd}>
        <Add />
      </button>
    </div>
  );
}
