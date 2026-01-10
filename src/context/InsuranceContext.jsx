import { createContext, useEffect, useState } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';

const regions = [
  {
    id: 'gulf',
    name: 'Gulf',
    description:
      'United Arab Emirates, Saudi Arabia, Oman, Kuwait, Jordan, Lebanon, Qatar, Egypt, and Bahrain.',
  },
  {
    id: 'europe',
    name: 'Europe',
    description: 'Europe including Schengen countries.',
  },
  {
    id: 'worldwide_ex',
    name: 'Worldwide (Excluding USA & Canada)',
    description: 'Worldwide excluding USA, Canada, and all islands in the Caribbean and Bahamas.',
  },
  {
    id: 'worldwide',
    name: 'Worldwide',
    description: 'Worldwide including USA, Canada, and all islands in the Caribbean and Bahamas.',
  },
  {
    id: 'subcon',
    name: 'Asian Subcontinent',
    description: 'Bangladesh, India, Pakistan, and Sri Lanka.',
  },
];

const groups = [
  { label: 'Individual', value: 'individual' },
  { label: 'Family', value: 'family' },
  { label: 'Group', value: 'group' },
];

const ageCategories = [
  { label: 'Children', ageRange: '(0 - 16)', field: 'children' },
  { label: 'Adults', ageRange: '(17 - 65)', field: 'adults' },
  { label: 'Seniors', ageRange: '(66 - 75)', field: 'seniors' },
];

export const InsuranceContext = createContext();

export function InsuranceProvider({ children }) {
  const { updateLocalStorage, deleteLocalStorage } = useLocalStorage();
  const existingData = JSON.parse(localStorage.getItem('travelInsurance'));
  const [journeyType, setJourneyType] = useState(existingData.journeyType || 'Single Trip');
  const [startDate, setStartDate] = useState(existingData.startDate || '');
  const [endDate, setEndDate] = useState(existingData.endDate || '');
  const [region, setRegion] = useState(existingData.region || 'gulf');
  const [group, setGroup] = useState(existingData.group || 'individual');
  const [quantity, setQuantity] = useState(
    existingData.quantity || {
      adults: 1,
      children: 0,
      infants: 0,
    }
  );

  function onQuantityChange(field, delta) {
    setQuantity(prev => ({
      ...prev,
      [field]: Math.max(0, prev[field] + delta),
    }));
  }

  function validateForm() {
    if (!startDate || !endDate || !region || !group) {
      return false;
    }
    return true;
  }

  function handleSubmit(e) {
    e.preventDefault();
    const data = { journeyType, startDate, endDate, region, group, quantity };
    updateLocalStorage('travelInsurance', data);
    console.log(data);
  }

  useEffect(() => {
    if (new Date(startDate) < new Date() || new Date(endDate) < new Date()) {
      setStartDate('');
      setEndDate('');
    }
  }, []);

  return (
    <InsuranceContext.Provider
      value={{
        regions,
        groups,
        ageCategories,
        journeyType,
        setJourneyType,
        startDate,
        setStartDate,
        endDate,
        setEndDate,
        region,
        setRegion,
        group,
        setGroup,
        quantity,
        setQuantity,
        onQuantityChange,
        validateForm,
        handleSubmit,
      }}
    >
      {children}
    </InsuranceContext.Provider>
  );
}
