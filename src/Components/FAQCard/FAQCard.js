import styles from "./FAQCard.module.css";
import { useState } from "react";
import { Add } from "@mui/icons-material";
import { Remove } from "@mui/icons-material";

export default function FAQCard(props) {
  const [hidden, setHidden] = useState("none");

  function toggleHidden() {
    setHidden((prevHidden) => (prevHidden === "none" ? "block" : "none"));
  }

  return (
    <div className={styles.FAQCard}>
      <div className={styles.QuestionBox} onClick={toggleHidden}>
        <p className={styles.Question}>{props.question}</p>
        {hidden === "none" ? (
          <Add className={styles.FAQIcon} />
        ) : (
          <Remove className={styles.FAQIcon} />
        )}
      </div>
      <p className={styles.AnswerBox} style={{ display: hidden }}>
        {props.answer}
      </p>
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
