import styles from "./FAQCard.module.css";
import { useState } from "react";
import { Add } from "@mui/icons-material";
import { Remove } from "@mui/icons-material";

export default function FAQCard({ question, children }) {
  const [hidden, setHidden] = useState("none");

  function toggleHidden() {
    setHidden((prevHidden) => (prevHidden === "none" ? "block" : "none"));
  }

  return (
    <div className={styles.FAQCard}>
      <div
        className={`${styles.QuestionBox} ${
          hidden === "block" ? styles.Active : ""
        }`}
        onClick={toggleHidden}
      >
        <p className={styles.Question}>{question}</p>
        {hidden === "none" ? (
          <Add className={styles.FAQIcon} />
        ) : (
          <Remove className={styles.FAQIcon} />
        )}
      </div>
      {children && (
        <p className={styles.AnswerBox} style={{ display: hidden }}>
          {children}
        </p>
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
