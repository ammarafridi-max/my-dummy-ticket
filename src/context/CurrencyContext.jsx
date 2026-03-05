import { createContext, useEffect, useMemo, useState } from 'react';
import { useCurrencies } from '../hooks/currencies/useCurrencies';

export const CurrencyContext = createContext();
const STORAGE_KEY = 'currency_code';

export function CurrencyProvider({ children }) {
  const { currencies: apiCurrencies } = useCurrencies();

  const currencies = useMemo(() => {
    if (!apiCurrencies?.length) return [];

    const baseCurrency = apiCurrencies.find((cur) => cur.isBaseCurrency) || apiCurrencies[0];
    const baseRate = baseCurrency?.rate || 1;

    return apiCurrencies.map((cur) => ({
      code: cur.code,
      sign: cur.symbol || cur.code,
      conversionRate: baseRate / (cur.rate || 1),
      isBaseCurrency: cur.isBaseCurrency,
    }));
  }, [apiCurrencies]);

  const [selectedCode, setSelectedCode] = useState(() => localStorage.getItem(STORAGE_KEY) || '');

  function handleSetCurrency(code) {
    const nextCode = String(code || '').toUpperCase();
    if (!nextCode) return;
    setSelectedCode(nextCode);
    localStorage.setItem(STORAGE_KEY, nextCode);
  }

  useEffect(() => {
    if (!currencies.length) return;

    const storedCode = (localStorage.getItem(STORAGE_KEY) || '').toUpperCase();
    const storedValid = storedCode && currencies.some((item) => item.code === storedCode);
    if (storedValid) {
      setSelectedCode(storedCode);
      return;
    }

    const defaultCurrency = currencies.find((item) => item.code === 'AED') || currencies[0];
    if (!defaultCurrency) return;

    setSelectedCode(defaultCurrency.code);
    localStorage.setItem(STORAGE_KEY, defaultCurrency.code);
  }, [currencies]);

  const currency = useMemo(() => {
    if (!currencies.length) return null;
    return currencies.find((item) => item.code === selectedCode) || currencies[0];
  }, [currencies, selectedCode]);

  return (
    <CurrencyContext.Provider value={{ currencies, currency, handleSetCurrency }}>
      {children}
    </CurrencyContext.Provider>
  );
}
