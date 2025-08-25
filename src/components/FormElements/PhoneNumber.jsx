import { useState, useEffect, useRef } from 'react';
import { countryCodes } from '../../data/countryCodes';
import Label from './Label';

export default function PhoneNumber({ phoneNumber, setPhoneNumber }) {
  return (
    <div className="w-full mt-3 flex flex-col">
      <Label htmlFor="number" required>
        Phone Number
      </Label>
      <Number
        codeValue={phoneNumber.code}
        codeOnChange={(e) =>
          setPhoneNumber({ ...phoneNumber, code: e.target.value })
        }
        digitsValue={phoneNumber.digits}
        digitsOnChange={(e) =>
          setPhoneNumber({ ...phoneNumber, digits: e.target.value })
        }
      />
    </div>
  );
}

function Number({
  codeValue,
  digitsValue,
  codeOnChange,
  digitsOnChange,
  disabled = false,
}) {
  const [code, setCode] = useState(codeValue);
  const [isOnFocus, setIsOnFocus] = useState(false);

  const filteredCodes = countryCodes.filter((country) => {
    return `${country.country} (+${country.code})`
      .toLowerCase()
      .includes(code.toLowerCase());
  });

  const handleCodeChange = (e) => {
    if (!disabled) {
      setCode(e);
      codeOnChange({ target: { value: e } });
    }
  };

  const componentRef = useRef();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        componentRef.current &&
        !componentRef.current.contains(event.target)
      ) {
        setIsOnFocus(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div
      className="w-full py-2.75 px-4 rounded-md relative bg-white shadow-(--input-box-shadow-sm) flex items-center"
      ref={componentRef}
      disabled={disabled}
    >
      <input
        className="w-[60px]  text-[14.5px] border-r border-r-gray-400"
        type="text"
        id="code"
        name="code"
        value={code}
        onChange={(e) => handleCodeChange(e.target.value)}
        onFocus={() => !disabled && setIsOnFocus(true)}
        onClick={() => !disabled && setCode('')}
        placeholder="Code"
        disabled={disabled}
      />
      <input
        className="w-full text-[14.5px] ml-4"
        type="text"
        id="digits"
        name="digits"
        value={digitsValue}
        onChange={disabled ? undefined : digitsOnChange}
        placeholder="Number"
        disabled={disabled}
      />

      {isOnFocus && !disabled && (
        <div className="w-full h-[300px] bg-white mt-3.75 p-0 border border-solid border-gray-700 absolute left-0 top-10 rounded-sm z-1000 list-none overflow-hidden">
          {filteredCodes.map((country, i) => (
            <li
              className="w-full h-[40px] flex items-center py-0 px-2.5 cursor-pointer hover:bg-white hover:text-primary-500"
              key={i}
              onClick={() => {
                handleCodeChange(`+${country.code}`);
                setIsOnFocus(false);
              }}
            >
              {country.country} (+{country.code})
            </li>
          ))}
        </div>
      )}
    </div>
  );
}
