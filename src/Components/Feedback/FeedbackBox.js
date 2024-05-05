import styles from "./FeedbackBox.module.css";
import CloseIcon from "@mui/icons-material/Close";

export default function FeedbackBox({ children, onClick }) {
  return (
    <div className={styles.Container}>
      <div className="row justify-content-between">
        <div className={styles.Text}>{children}</div>
        <button className={styles.Icon} onClick={onClick}>
          <CloseIcon />
        </button>
      </div>
    </div>
  );
}
