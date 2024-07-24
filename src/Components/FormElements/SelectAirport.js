import React, { useState, useEffect, useRef } from "react";
import styles from "./SelectAirport.module.css";

export default function SelectAirport({
  value,
  onChange,
  id,
  className,
  icon,
}) {
  const [query, setQuery] = useState(value);
  const [airports, setAirports] = useState([]);
  const [isOnFocus, setIsOnFocus] = useState(false);
  const componentRef = useRef();

  useEffect(() => {
    if (query.length >= 3) {
      getAirports(query);
    }
  }, [query]);

  async function getAirports(query) {
    const url = "https://airline-database.p.rapidapi.com/api/search";
    const data = new FormData();
    data.append("q", query);

    const options = {
      method: "POST",
      headers: {
        "x-rapidapi-key": process.env.REACT_APP_RAPID_API_KEY,
        "x-rapidapi-host": "airline-database.p.rapidapi.com",
      },
      body: data,
    };

    try {
      const response = await fetch(url, options);
      const data = await response.json();
      setAirports(data.data[0]);
    } catch (error) {
      console.error(error);
    }
  }

  function handleChange(e) {
    setQuery(e.target.value);
    setIsOnFocus(true);
    onChange(e.target.value); // Call onChange prop to update parent state
  }

  function handleClick() {
    setIsOnFocus(true);
    setQuery("");
  }

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        componentRef.current &&
        !componentRef.current.contains(event.target)
      ) {
        setIsOnFocus(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  function handleItemClick(airport) {
    const selectedValue = `${airport.iata} - ${airport.city}`;
    setQuery(selectedValue);
    setIsOnFocus(false);
    onChange(selectedValue); // Call onChange prop to update parent state
  }

  return (
    <div style={{ position: "relative" }} ref={componentRef}>
      <div className={styles.SelectDiv}>
        {icon && <span className={styles.Icon}>{icon}</span>}
        <input
          type="text"
          value={query}
          onChange={handleChange}
          onClick={handleClick}
          placeholder="Search city..."
          className={styles.Input}
        />
      </div>
      {isOnFocus && (
        <ul className={styles.List}>
          {query.length < 3 && (
            <li className={`${styles.Name} ${styles.Text}`}>
              Enter at least {3 - query.length} characters
            </li>
          )}
          {query.length >= 3 &&
            airports.map((airport, index) => (
              <li
                key={index}
                className={styles.Name}
                onClick={() => handleItemClick(airport)}
              >
                {airport.iata} - {airport.city}
              </li>
            ))}
        </ul>
      )}
    </div>
  );
}
