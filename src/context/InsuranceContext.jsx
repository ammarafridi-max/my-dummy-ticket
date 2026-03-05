import { createContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocalStorage } from '../hooks/general/useLocalStorage';
import toast from 'react-hot-toast';
import { compareDateOnly, todayDateOnly } from '../utils/dateOnly';

function safeParse(key, fallback) {
  try {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : fallback;
  } catch {
    return fallback;
  }
}

const PASSENGER_GROUPS = [
  { key: 'adults', label: 'Adult' },
  { key: 'children', label: 'Child' },
  { key: 'seniors', label: 'Senior' },
];

const REGIONS = [
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
  const navigate = useNavigate();
  const { updateLocalStorage } = useLocalStorage();

  const storedData = safeParse('travelInsurance', {});

  const [quoteId, setQuoteId] = useState(storedData.quoteId || null);
  const [schemeId, setSchemeId] = useState(storedData.schemeId || null);
  const [journeyType, setJourneyType] = useState(storedData.journeyType || 'single');
  const [startDate, setStartDate] = useState(storedData.startDate || '');
  const [endDate, setEndDate] = useState(storedData.endDate || '');
  const [region, setRegion] = useState(storedData.region || REGIONS[0]);
  const [group, setGroup] = useState(storedData.group || 'individual');
  const [quantity, setQuantity] = useState(
    storedData.quantity || { adults: 1, children: 0, seniors: 0 }
  );

  const [passengers, setPassengers] = useState([]);
  const [email, setEmail] = useState(localStorage.getItem('email') || '');
  const [mobile, setMobile] = useState(
    safeParse('phoneNumber', {
      code: '',
      digits: '',
    })
  );
  const [address1, setAddress1] = useState(storedData.address1 || '');
  const [address2, setAddress2] = useState(storedData.address2 || '');
  const [address3, setAddress3] = useState(storedData.address3 || '');
  const [address4, setAddress4] = useState(storedData.address4 || '');

  function handleUpdatePassenger(id, field, value) {
    setPassengers(prev => prev.map(p => (p.id === id ? { ...p, [field]: value } : p)));
  }

  function handleEmailChange(e) {
    setEmail(e.target.value);
  }

  function handlePhoneChange(phone) {
    setMobile(phone);
  }

  function handleAddress1Change(e) {
    setAddress1(e.target.value);
  }

  function handleAddress2Change(e) {
    setAddress2(e.target.value);
  }

  function handleAddress3Change(e) {
    setAddress3(e.target.value);
  }

  function handleAddress4Change(e) {
    setAddress4(e.target.value);
  }

  function handleQuantityChange(field, delta) {
    setQuantity(prev => ({
      ...prev,
      [field]: Math.max(0, prev[field] + delta),
    }));
  }

  function handleSelectQuote(schemeId, quoteId) {
    setSchemeId(schemeId);
    setQuoteId(quoteId);

    updateLocalStorage('travelInsurance', {
      ...storedData,
      schemeId,
      quoteId,
    });
  }

  function validateForm() {
    if (!startDate || !endDate || !region?.id) {
      toast.error('Please select travel dates and region');
      return false;
    }

    if (compareDateOnly(startDate, endDate) > 0) {
      toast.error('End date must be after start date');
      return false;
    }

    return true;
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (!validateForm()) return;

    setSchemeId(null);
    setQuoteId(null);

    updateLocalStorage('travelInsurance', {
      journeyType,
      startDate,
      endDate,
      region,
      group,
      quantity,
      schemeId: null,
      quoteId: null,
    });

    navigate('/travel-insurance/quotes');
  }

  useEffect(() => {
    if (!startDate || !endDate) return;
    const today = todayDateOnly();

    if (compareDateOnly(startDate, today) < 0 || compareDateOnly(endDate, today) < 0) {
      setStartDate('');
      setEndDate('');
    }
  }, [endDate, startDate]);

  useEffect(() => {
    const initialPassengers = PASSENGER_GROUPS.flatMap(gr =>
      Array.from({ length: quantity[gr.key] || 0 }, (_, index) => ({
        id: `${gr.key}-${index + 1}`,
        type: gr.key,
        title: 'Mr.',
        firstName: '',
        lastName: '',
        nationality: null,
        dob: '',
        passport: '',
      }))
    );

    setPassengers(initialPassengers);
  }, [quantity]);

  return (
    <InsuranceContext.Provider
      value={{
        REGIONS,
        groups,
        ageCategories,

        quoteId,
        schemeId,
        journeyType,
        startDate,
        endDate,
        region,
        group,
        quantity,

        passengers,
        email,
        mobile,
        address1,
        address2,
        address3,
        address4,

        setJourneyType,
        setStartDate,
        setEndDate,
        setRegion,
        setGroup,
        setQuantity,
        setPassengers,
        setEmail,
        setMobile,
        setAddress1,
        setAddress2,
        setAddress3,
        setAddress4,

        handleEmailChange,
        handlePhoneChange,
        handleAddress1Change,
        handleAddress2Change,
        handleAddress3Change,
        handleAddress4Change,
        handleQuantityChange,
        handleUpdatePassenger,
        handleSelectQuote,
        handleSubmit,
      }}
    >
      {children}
    </InsuranceContext.Provider>
  );
}
