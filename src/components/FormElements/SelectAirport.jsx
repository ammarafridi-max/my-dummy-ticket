import { useState, useRef } from 'react';
import { useAirports } from '../../hooks/airport/useAirports';
import { useOutsideClick } from '../../hooks/general/useOutsideClick';
import InputWithIcon from './InputWithIcon';

export default function SelectAirport({ value, onChange, id, icon }) {
  const [query, setQuery] = useState(value || '');
  const [isOpen, setIsOpen] = useState(false);
  const { airports, isLoadingAirports } = useAirports(query);
  const componentRef = useRef();

  const handleChange = e => {
    const inputValue = e.target.value;
    setQuery(inputValue);
    onChange(null);
    setIsOpen(true);

    console.log(airports);
  };

  const handleSelect = airport => {
    const display = `${airport.address.cityName} (${airport.iataCode})`;
    setQuery(display);
    setIsOpen(false);
    onChange(display);
  };

  useOutsideClick(componentRef, () => setIsOpen(false));

  return (
    <>
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

      <div className="relative z-50" ref={componentRef}>
        {isOpen && (
          <ul className="absolute top-0 left-0 w-full min-h-[200px] max-h-[300px] mt-2 overflow-y-auto rounded-md border border-gray-300 bg-white z-[60] text-sm shadow-lg">
            {isLoadingAirports && <ListItem>Loading airports...</ListItem>}

            {!isLoadingAirports && query.trim().length < 3 && (
              <ListItem>Enter at least 3 characters</ListItem>
            )}

            {!isLoadingAirports && query.trim().length >= 3 && airports.length === 0 && (
              <ListItem>No airports found</ListItem>
            )}

            {!isLoadingAirports &&
              airports.map(airport => (
                <ListItem
                  key={airport.iataCode}
                  onClick={() => handleSelect(airport)}
                  className="hover:bg-primary-600 hover:text-white"
                >
                  {airport.address.cityName} ({airport.iataCode})
                </ListItem>
              ))}
          </ul>
        )}
      </div>
    </>
  );
}

function ListItem({ children, className, ...props }) {
  return (
    <li
      className={`px-3 py-2 font-nunito font-light cursor-pointer transition-colors text-[14px] ${className}`}
      {...props}
    >
      {children}
    </li>
  );
}
