import styles from "./FeedbackBox.module.css";
import CloseIcon from "@mui/icons-material/Close";
import { useState } from "react";

export default function FeedbackBox({ children, showFeedbackBox }) {
  const [isOpen, setIsOpen] = useState(showFeedbackBox);

  function handleClick(e) {
    e.preventDefault();
    setIsOpen(false);
  }

  return (
    <>
      {isOpen && (
        <div className={styles.Container}>
          <div className="row justify-content-between">
            <div className={styles.Text}>{children}</div>
            <button className={styles.Icon} onClick={handleClick}>
              <CloseIcon />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
