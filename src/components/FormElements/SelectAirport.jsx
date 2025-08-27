import React, { useState, useEffect, useRef } from 'react';
import { BASEURL } from '../../config';
import InputWithIcon from './InputWithIcon';

export default function SelectAirport({ value, onChange, id, icon }) {
  const [query, setQuery] = useState(value || '');
  const [airports, setAirports] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const componentRef = useRef();

  const fetchAirports = async (keyword) => {
    if (keyword.trim().length < 3) {
      setAirports([]);
      return;
    }

    try {
      setIsLoading(true);
      const res = await fetch(`${BASEURL}/api/airports?keyword=${keyword}`);
      const data = await res.json();
      setAirports(data?.result || []);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    const inputValue = e.target.value;
    setQuery(inputValue);
    onChange(null);
    setIsOpen(true);
    fetchAirports(inputValue);
  };

  const handleSelect = (airport) => {
    const display = `${airport.address.cityName} (${airport.iataCode})`;
    setQuery(display);
    setIsOpen(false);
    onChange(display);
  };

  const handleClickOutside = (e) => {
    if (componentRef.current && !componentRef.current.contains(e.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={componentRef}>
      <InputWithIcon
        id={id}
        icon={icon}
        type="text"
        value={query}
        onChange={handleChange}
        placeholder="Search airport or city..."
        onClick={() => {
          if (typeof value === 'string' && value.length > 0) {
            setQuery('');
          }
          setIsOpen(true);
        }}
      />

      {/* Dropdown */}
      {isOpen && (
        <ul className="absolute top-full left-0 w-full max-h-[300px] mt-2 overflow-y-auto rounded-md shadow-lg bg-white z-[1000] text-sm">
          {isLoading && <ListItem>Loading airports...</ListItem>}

          {!isLoading && query.trim().length < 3 && (
            <ListItem>Enter at least 3 characters</ListItem>
          )}

          {!isLoading && query.trim().length >= 3 && airports.length === 0 && (
            <ListItem>No airports found</ListItem>
          )}

          {!isLoading &&
            airports.map((airport) => (
              <ListItem
                key={airport.iataCode}
                onClick={() => handleSelect(airport)}
                className="hover:bg-primary-500 hover:text-white"
              >
                {airport.address.cityName} ({airport.iataCode})
              </ListItem>
            ))}
        </ul>
      )}
    </div>
  );
}

function ListItem({ children, className, ...props }) {
  return (
    <li
      className={`px-5 py-2 font-nunito cursor-pointer transition-colors ${className}`}
      {...props}
    >
      {children}
    </li>
  );
}
