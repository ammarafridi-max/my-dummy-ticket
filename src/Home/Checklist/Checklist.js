import styles from "./Checklist.module.css";
import DoneRoundedIcon from "@mui/icons-material/DoneRounded";
import PrimarySection from "../../Components/Section/PrimarySection";
import Container from "../../Components/Container/Container";

export default function Checklist(props) {
  return (
    <div className={props.className}>
      <p className={styles.CheckList}>
        <span className={styles.Icon}>
          <DoneRoundedIcon />
        </span>
        Instant tickets
      </p>
      <p className={styles.CheckList}>
        <span className={styles.Icon}>
          <DoneRoundedIcon />
        </span>
        Unlimited changes permitted
      </p>
      <p className={styles.CheckList}>
        <span className={styles.Icon}>
          <DoneRoundedIcon />
        </span>
        Dubai-based agency
      </p>
    </div>
  );
}
