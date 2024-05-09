import styles from "./SelectTitle.module.css";

export default function SelectTitle(props) {
  const titles = ["", "Mr.", "Mrs.", "Ms.", "Master"];

  return (
    <div className={styles.SelectDiv}>
      <select
        className={styles.Select}
        onChange={props.onChange}
        value={props.value || titles[0]}
        placeholder="Title"
      >
        {titles.map((title, i) => (
          <option value={title} key={i}>
            {title}
          </option>
        ))}
      </select>
    </div>
  );
}
