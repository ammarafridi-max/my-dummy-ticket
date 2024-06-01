import { useState } from "react";
import styles from "./Select.module.css";

export default function Select({ onChange, id, className }) {
  const [query, setQuery] = useState("");
  const [showList, setShowList] = useState(false);
  const airports = [
    { iata: "DXB", airport: "Dubai" },
    { iata: "AUH", airport: "Abu Dhabi" },
    { iata: "SHJ", airport: "Sharjah" },
  ];

  function handleChange(e) {
    setQuery(e.target.value);
  }

  function handleClick() {
    setShowList(true);
  }

  return (
    <div style={{ position: "relative" }}>
      <input
        type="text"
        className={styles.Select}
        value={query}
        onChange={handleChange}
        onClick={handleClick}
        placeholder="Search airports..."
      />
      {showList && (
        <ul className={styles.List}>
          {airports.map((airport) => {
            return (
              <li
                className={styles.Name}
                onClick={() => {
                  setQuery(`${airport.iata} - ${airport.airport}`);
                  setShowList(false);
                }}
              >
                {airport.iata} - {airport.airport}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
