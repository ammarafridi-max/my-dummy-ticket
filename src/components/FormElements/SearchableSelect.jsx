import React, { useState, useEffect, useRef } from 'react';
import { FaGlobeAfrica } from 'react-icons/fa';
import InputWithIcon from './InputWithIcon';

export default function SearchableSelect({
  items = [],
  value = null,
  onChange,
  placeholder = 'Search...',
  minSearchLength = 0,
}) {
  const [query, setQuery] = useState(value?.name || '');
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    setQuery(value?.name || '');
  }, [value]);

  useEffect(() => {
    const handleClickOutside = e => {
      if (ref.current && !ref.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const filteredItems =
    query.trim().length < minSearchLength
      ? []
      : items.filter(item =>
          `${item.name} ${item.description ?? ''}`.toLowerCase().includes(query.toLowerCase())
        );

  const handleSelect = item => {
    setQuery(item.name);
    setIsOpen(false);
    onChange(item);
  };

  return (
    <div ref={ref} className="relative w-full">
      <InputWithIcon
        icon={<FaGlobeAfrica />}
        type="text"
        value={query}
        placeholder={placeholder}
        onChange={e => {
          setQuery(e.target.value);
          onChange(null);
          setIsOpen(true);
        }}
        onFocus={() => setIsOpen(true)}
      />

      {isOpen && (
        <ul className="absolute top-full left-0 z-[1000] mt-2 w-full max-h-[280px] overflow-y-auto rounded-md border border-gray-300 bg-white text-md shadow divide-y divide-gray-100">
          {query.trim().length < minSearchLength && (
            <ListItem muted>Enter at least {minSearchLength} characters</ListItem>
          )}

          {query.trim().length >= minSearchLength && filteredItems.length === 0 && (
            <ListItem muted>No results found</ListItem>
          )}

          {filteredItems.map(item => (
            <ListItem key={item.id} onClick={() => handleSelect(item)}>
              <div className="font-medium">{item.name}</div>
              {item.description && (
                <div className="text-xs font-light text-gray-400">{item.description}</div>
              )}
            </ListItem>
          ))}
        </ul>
      )}
    </div>
  );
}

function ListItem({ children, muted = false, ...props }) {
  return (
    <li
      {...props}
      className={`cursor-pointer px-3 py-2 transition-colors ${
        muted ? 'cursor-default text-gray-400' : 'hover:bg-primary-100'
      }`}
    >
      {children}
    </li>
  );
}
