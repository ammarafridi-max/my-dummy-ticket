import React, { useState, useEffect, useRef } from "react";
import styles from "./SelectAirport.module.css";
import debounce from "lodash.debounce";

export default function SelectAirport({
  value,
  onChange,
  id,
  className,
  icon,
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [query, setQuery] = useState(value);
  const [airports, setAirports] = useState([]);
  const [isOnFocus, setIsOnFocus] = useState(false);
  const componentRef = useRef();

  useEffect(() => {
    if (query.length >= 3) {
      debouncedGetAirports(query);
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
      setIsLoading(true);
      setAirports([]);
      const response = await fetch(url, options);
      const data = await response.json();
      console.log("API Response Data: ", data.data[0]);
      setAirports(data.data[0]);
    } catch (error) {
      console.error("Error fetching airports: ", error);
    } finally {
      setIsLoading(false);
    }
  }

  const debouncedGetAirports = debounce(getAirports, 0);

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
    const selectedValue = `${airport.city} (${airport.iata})`;
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
              Enter at least 3 characters
            </li>
          )}

          {isLoading && (
            <li className={`${styles.Name} ${styles.Text}`}>
              Loading airports...
            </li>
          )}

          {airports.length === 0 && query.length >= 3 && !isLoading && (
            <li className={`${styles.Name} ${styles.Text}`}>
              No airports found
            </li>
          )}

          {query.length >= 3 &&
            airports.length !== 0 &&
            !isLoading &&
            airports.map((airport, index) => (
              <li
                key={index}
                className={styles.Name}
                onClick={() => handleItemClick(airport)}
              >
                {airport.city} ({airport.iata})
              </li>
            ))}
        </ul>
      )}
    </div>
  );
}

// async function getAirports(query) {
//   const url = "https://airline-database.p.rapidapi.com/api/search";
//   const data = new FormData();
//   data.append("q", query);

//   const options = {
//     method: "POST",
//     headers: {
//       "x-rapidapi-key": process.env.REACT_APP_RAPID_API_KEY,
//       "x-rapidapi-host": "airline-database.p.rapidapi.com",
//     },
//     body: data,
//   };

//   try {
//     const response = await fetch(url, options);
//     const data = await response.json();
//     setAirports(data.data[0]);
//   } catch (error) {
//     console.error(error);
//   }
// }

// const getAirports = async (query) => {
//   try {
//     const res = await fetch(
//       `${process.env.REACT_APP_BACKEND_URL}/airports?keyword=${query}`
//     );
//     const data = await res.json();
//     if (Array.isArray(data)) {
//       setAirports(data);
//     } else {
//       setAirports([]);
//       console.error("API response is not an array:", data);
//     }
//   } catch (error) {
//     console.error("Error fetching airports:", error);
//     setAirports([]);
//   }
// };
