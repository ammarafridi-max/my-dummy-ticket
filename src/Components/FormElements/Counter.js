import styles from "./Counter.module.css";
import { Remove, Add } from "@mui/icons-material";

export default function Counter({ children, onAdd, onSubtract, className }) {
  return (
    <div className={`${styles.Counter} ${className}`}>
      <p className={styles.Button} onClick={onSubtract}>
        <Remove />
      </p>
      <p className={styles.Number}>{children}</p>
      <p className={styles.Button} onClick={onAdd}>
        <Add />
      </p>
    </div>
  );
}
