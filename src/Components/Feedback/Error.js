import styles from "./Error.module.css";

export default function Error({ children }) {
  return <div className={styles.Error}>{children}</div>;
}
