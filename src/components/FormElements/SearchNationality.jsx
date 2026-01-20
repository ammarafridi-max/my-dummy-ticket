import { useState, useEffect, useRef } from 'react';
import InputWithIcon from './InputWithIcon';
import { useOutsideClick } from '../../hooks/general/useOutsideClick';

export default function SearchNationality({
  icon,
  items = [],
  value = null,
  onChange,
  placeholder = 'Search nationality...',
  minSearchLength = 0,
}) {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    setQuery(value?.nationality || '');
  }, [value]);

  useOutsideClick(ref, () => setIsOpen(false));

  const filteredItems =
    query.trim().length < minSearchLength
      ? []
      : items.filter(item => item.nationality.toLowerCase().includes(query.toLowerCase()));

  const handleSelect = item => {
    setQuery(item.nationality);
    setIsOpen(false);

    onChange({
      id: item.id,
      nationality: item.nationality,
    });
  };

  return (
    <div ref={ref} className="relative w-full">
      <InputWithIcon
        icon={icon}
        type="text"
        value={query}
        placeholder={placeholder}
        onFocus={() => setIsOpen(true)}
        onChange={e => {
          setQuery(e.target.value);
          onChange(null);
          setIsOpen(true);
        }}
      />

      {isOpen && (
        <ul className="absolute top-full left-0 z-[1000] mt-2 w-full max-h-[280px] overflow-y-auto rounded-md border border-gray-300 bg-white shadow divide-y divide-gray-100">
          {query.trim().length < minSearchLength && (
            <ListItem muted>Enter at least {minSearchLength} characters</ListItem>
          )}

          {query.trim().length >= minSearchLength && filteredItems.length === 0 && (
            <ListItem muted>No results found</ListItem>
          )}

          {filteredItems.map(item => (
            <ListItem key={item.id} onClick={() => handleSelect(item)}>
              <span className="text-sm font-light">{item.nationality}</span>
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
      className={`px-3 py-2 text-sm transition-colors ${
        muted ? 'cursor-default text-gray-400' : 'cursor-pointer hover:bg-gray-50'
      }`}
    >
      {children}
    </li>
  );
}
