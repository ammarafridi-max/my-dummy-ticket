import styles from "./SelectTitle.module.css";

export default function SelectTitle(props) {
  const titles = ["Mr.", "Mrs.", "Ms.", "Master"];

  return (
    <div className={styles.SelectDiv}>
      <select
        className={styles.Select}
        onChange={props.onChange}
        value={props.value || "Mr."}
        placeholder="Title"
        name="title"
        id="title"
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
