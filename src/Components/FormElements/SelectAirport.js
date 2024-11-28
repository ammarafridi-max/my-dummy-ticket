import React, { useState, useEffect, useRef } from "react";
import styles from "./SelectAirport.module.css";

export default function SelectAirport({
  value,
  onChange,
  id,
  className,
  icon,
}) {
  const [query, setQuery] = useState(value || "");
  const [selectedAirport, setSelectedAirport] = useState(value || null);
  const [isOnFocus, setIsOnFocus] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [airports, setAirports] = useState([]);
  const componentRef = useRef();
  // const { airports, isLoading } = useSelector((state) => state.airports);

  // const debouncedFetchAirports = debounce((query) => {
  //   dispatch(fetchAirports(query));
  // }, 300);

  // useEffect(() => {
  //   if (query.length > 2) {
  //     debouncedFetchAirports(query);
  //   }
  // }, [query]);

  const handleChange = (e) => {
    setQuery(e.target.value);
    setIsOnFocus(true);
    onChange(null);
  };

  const handleClick = () => {
    setIsOnFocus(true);
  };

  const handleItemClick = (airport) => {
    setQuery(`${airport.address.cityName} (${airport.iataCode})`);
    setSelectedAirport(airport);
    setIsOnFocus(false);
    onChange(`${airport.address.cityName} (${airport.iataCode})`);
  };

  useEffect(() => {
    async function fetchAirports() {
      try {
        setIsLoading(true);
        const res = await fetch(
          `${process.env.REACT_APP_BACKEND_URL}/api/airports?keyword=${query}`
        );
        const data = await res.json();
        setAirports(data.result);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    }
    if (query.length > 2) fetchAirports();
  }, [query]);

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

  return (
    <div
      style={{ position: "relative" }}
      ref={componentRef}
      className={className}
    >
      <div className={styles.SelectDiv}>
        {icon && <span className={styles.Icon}>{icon}</span>}
        <input
          id={id}
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
          {query.length < 3 && !isLoading && (
            <li className={`${styles.Text}`}>Enter at least 3 characters</li>
          )}

          {isLoading && (
            <li className={`${styles.Text}`}>Loading airports...</li>
          )}

          {airports.length === 0 && query.length >= 3 && !isLoading && (
            <li className={`${styles.Text}`}>No airports found</li>
          )}

          {!isLoading &&
            airports.length > 0 &&
            airports.map((airport) => (
              <li
                key={airport.iataCode}
                onClick={() => handleItemClick(airport)}
              >
                {airport.address.cityName} ({airport.iataCode})
              </li>
            ))}
        </ul>
      )}
    </div>
  );
}
