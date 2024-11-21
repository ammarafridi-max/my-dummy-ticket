import styles from "./Counter.module.css";
import { IoIosRemove, IoIosAdd } from "react-icons/io";

export default function Counter({ ageGroup, age, onAdd, onSubtract, value }) {
  return (
    <div className={styles.counter}>
      <div className={styles.ageGroup}>
        <p>
          {ageGroup} <span>{age}</span>
        </p>
      </div>
      <div className={styles.count}>
        <IoIosRemove onClick={onSubtract} className={styles.icon} />
        <p className={styles.Number}>{value}</p>
        <IoIosAdd onClick={onAdd} className={styles.icon} />
      </div>
    </div>
  );
}
