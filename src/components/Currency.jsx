import { useContext, useRef, useState } from 'react';
import { HiChevronDown } from 'react-icons/hi2';
import { CurrencyContext } from '../context/CurrencyContext';
import { useOutsideClick } from '../hooks/general/useOutsideClick';

export default function Currency() {
  const { currency, currencies, handleSetCurrency } = useContext(CurrencyContext);
  const [showCurrencies, setShowCurrencies] = useState(false);
  const wrapperRef = useRef(null);

  useOutsideClick(wrapperRef, () => setShowCurrencies(false));

  return (
    <div className="relative" ref={wrapperRef}>
      <button
        type="button"
        className="relative flex items-center justify-between text-[14px] text-gray-700 font-medium gap-1 px-2 py-1 cursor-pointer duration-300"
        onClick={() => setShowCurrencies(val => !val)}
        disabled={!currencies?.length}
      >
        <span>{currency?.code || '...'}</span>
        <span>
          <HiChevronDown />
        </span>
      </button>
      {showCurrencies && (
        <div className="min-w-40 grid grid-cols-2 max-h-fit absolute top-10 right-0 p-2 bg-white mx-auto rounded-md shadow-[0px_0px_8px_rgba(0,0,0,0.2)] z-[100]">
          {currencies?.map(cur => (
            <button
              key={cur.code}
              onClick={() => {
                setShowCurrencies(false);
                handleSetCurrency(cur.code);
              }}
              type="button"
              className={`h-fit rounded-sm text-center text-[12px] py-1.5 duration-300 cursor-pointer ${
                currency?.code === cur?.code
                  ? 'bg-primary-900 text-white'
                  : 'bg-transparent hover:bg-primary-100'
              }`}
            >
              {cur.code}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
