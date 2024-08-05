import styles from "./FAQCard.module.css";
import { useState } from "react";
import { Add } from "@mui/icons-material";
import { Remove } from "@mui/icons-material";

export default function FAQCard({ question, children }) {
  const [className, setClassName] = useState(styles.Hidden);

  function toggleHidden() {
    setClassName((prev) =>
      prev === styles.Hidden ? styles.Show : styles.Hidden
    );
  }

  return (
    <div className={styles.FAQCard}>
      <div
        className={`${styles.QuestionBox} ${
          className === styles.Show && styles.Active
        }`}
        onClick={toggleHidden}
      >
        <h3 className={styles.Question}>{question}</h3>
        {className === styles.Hidden ? (
          <Add className={styles.FAQIcon} />
        ) : (
          <Remove className={styles.FAQIcon} />
        )}
      </div>
      {children && (
        <p className={`${className} ${styles.Answer}`}>{children}</p>
      )}
    </div>
  );
}
