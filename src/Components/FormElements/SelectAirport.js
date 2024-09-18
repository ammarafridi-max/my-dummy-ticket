import React, { useState, useEffect, useRef } from "react";
import debounce from "lodash.debounce";
import { useSelector, useDispatch } from "react-redux";
import { fetchAirports } from "../../redux/slices/airportsSlice";
import styles from "./SelectAirport.module.css";

export default function SelectAirport({
  value,
  onChange,
  id,
  className,
  icon,
}) {
  const [query, setQuery] = useState(value?.address?.cityName || ""); 
  const [selectedAirport, setSelectedAirport] = useState(value || null); 
  const [isOnFocus, setIsOnFocus] = useState(false);
  const componentRef = useRef();
  const dispatch = useDispatch();

  const { airports, isLoading } = useSelector((state) => state.airports);

  useEffect(() => {
    if (query.length > 2) {
      debouncedFetchAirports(query);
    }
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

  const debouncedFetchAirports = debounce((query) => {
    dispatch(fetchAirports(query));
  }, 300);

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
