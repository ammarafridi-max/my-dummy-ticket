import { useState } from "react";
import styles from "./Select.module.css";

export default function Select({ onChange, id, className }) {
  const airports = [
    {
      code: "AUH",
      city: "Abu Dhabi",
    },
    {
      code: "DXB",
      city: "Dubai",
    },
    {
      code: "SHJ",
      city: "Sharjah",
    },
    {
      code: "RKT",
      city: "Ras Al Khaimah",
    },
    {
      code: "KHI",
      city: "Karachi",
    },
  ];

  const [query, setQuery] = useState("");
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [delayedBlurTimeout, setDelayedBlurTimeout] = useState(null);

  function handleChange(e) {
    const value = e.target.value;
    setQuery(value);
  }

  const filteredAirports = airports.filter(
    (airport) =>
      airport.code.toLowerCase().includes(query.toLowerCase()) ||
      airport.city.toLowerCase().includes(query.toLowerCase())
  );

  function handleInputFocus() {
    setIsInputFocused(true);
  }

  function handleInputBlur() {
    // Delay the onBlur event slightly to allow time for the click event of the li item to execute
    const timeout = setTimeout(() => {
      setIsInputFocused(false);
    }, 200); // Adjust the delay time as needed
    setDelayedBlurTimeout(timeout);
  }

  function handleLiClick(airport) {
    setQuery(`${airport.code} - ${airport.city}`);
    clearTimeout(delayedBlurTimeout); // Clear the delayed onBlur timeout
    setIsInputFocused(false); // Manually trigger onBlur
  }

  return (
    <div style={{ position: "relative" }}>
      <input
        type="text"
        className={styles.Select}
        onChange={handleChange}
        id={id}
        placeholder="Search airports..."
        value={query}
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
      />
      {isInputFocused && (
        <ul className={styles.OptionsBox}>
          {filteredAirports.map((airport) => (
            <li
              key={airport.code}
              onClick={() => handleLiClick(airport)}
              className={styles.Option}
            >
              {airport.code} - {airport.city}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
