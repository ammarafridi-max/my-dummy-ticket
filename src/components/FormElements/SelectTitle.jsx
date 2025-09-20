import { useState } from 'react';

export default function SelectTitle({ value, onChange, className = '' }) {
  const [isOpen, setIsOpen] = useState(false);

  const titles = [{ value: 'Mr.' }, { value: 'Mrs.' }, { value: 'Ms.' }];

  const handleSelect = (title) => {
    onChange({ target: { value: title } });
    setIsOpen(false);
  };

  return (
    <div
      className={`relative bg-white rounded-md cursor-pointer p-0 ${className}`}
    >
      <div
        className="flex items-center gap-2 text-[14.5px] text-gray-80 text-left px-4 py-2.5 rounded-md border-1 border-gray-300 font-nunito"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>{value}</span>
      </div>

      {isOpen && (
        <div className="absolute top-full left-0 w-[70px] mt-2 bg-white rounded-md border-1 border-gray-300 z-[1000]">
          {titles.map((title) => (
            <div
              key={title.value}
              onClick={() => handleSelect(title.value)}
              className="flex items-center justify-between px-4 py-3 text-[14px] text-gray-800 hover:bg-primary-100 transition-colors border-b last:border-b-0 border-gray-200"
            >
              {title.value}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
