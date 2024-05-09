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
      <div className={`${styles.QuestionBox}`} onClick={toggleHidden}>
        <p className={styles.Question}>{question}</p>
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

// export function Question(props) {
//     return <p className={styles.Question}>{props.children}</p>;
//   }

//   export function Answer(props) {
//     return (
//       <p className={styles.AnswerBox} style={{ display: props.display }}>
//         {props.children}
//       </p>
//     );
//   }
