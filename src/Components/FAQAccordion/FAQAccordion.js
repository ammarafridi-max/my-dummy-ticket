import styles from "./FAQAccordion.module.css";
import { useState } from "react";
import { Add } from "@mui/icons-material";
import { Remove } from "@mui/icons-material";

export default function FAQAccordion({ question, children }) {
  const [className, setClassName] = useState(styles.Hidden);

  function toggleHidden() {
    setClassName((prev) =>
      prev === styles.Hidden ? styles.Show : styles.Hidden
    );
  }

  return (
    <div className={styles.accordion}>
      <div
        className={`${styles.questionDiv} ${
          className === styles.Show && styles.Active
        }`}
        onClick={toggleHidden}
      >
        <h3 className={styles.question}>{question}</h3>
        {className === styles.Hidden ? (
          <Add className={styles.icon} />
        ) : (
          <Remove className={styles.icon} />
        )}
      </div>
      {children && (
        <p className={`${className} ${styles.Answer}`}>{children}</p>
      )}
    </div>
  );
}
