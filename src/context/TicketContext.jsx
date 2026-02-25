import { createContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

function safeParse(key, fallback) {
  try {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : fallback;
  } catch {
    return fallback;
  }
}

export const TicketContext = createContext();
const AFFILIATE_STORAGE_KEY = 'affiliate_attribution_v1';
const AFFILIATE_TTL_MS = 30 * 24 * 60 * 60 * 1000;

function isValidAffiliateId(value) {
  return /^\d{9}$/.test(value || '');
}

function getStoredAttribution() {
  const value = safeParse(AFFILIATE_STORAGE_KEY, null);
  if (!value || !isValidAffiliateId(value.affiliateId)) return null;
  if (!value.expiresAt || new Date(value.expiresAt).getTime() <= Date.now()) return null;
  return value;
}

export function TicketProvider({ children }) {
  const location = useLocation();
  const storedPhone = safeParse('phoneNumber', { code: '', digits: '' });
  const storedEmail = localStorage.getItem('email') || '';
  const storedAffiliate = getStoredAttribution();

  const [type, setType] = useState('One Way');
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [departureDate, setDepartureDate] = useState('');
  const [returnDate, setReturnDate] = useState(type === 'One Way' ? '' : '');
  const [quantity, setQuantity] = useState({ adults: 1, children: 0, infants: 0 });
  const [ticketPrice, setTicketPrice] = useState(13);
  const [passengers, setPassengers] = useState([]);
  const [email, setEmail] = useState(storedEmail);
  const [phoneNumber, setPhoneNumber] = useState(storedPhone);
  const [ticketValidity, setTicketValidity] = useState('2 Days');
  const [receiveNow, setReceiveNow] = useState(true);
  const [deliveryDate, setDeliveryDate] = useState('');
  const [message, setMessage] = useState('');
  const [departureFlight, setDepartureFlight] = useState('');
  const [returnFlight, setReturnFlight] = useState('');
  const [affiliateAttribution, setAffiliateAttribution] = useState(storedAffiliate);

  function initializePassengers(quantity) {
    const newPassengers = [];
    [
      ['Adult', quantity.adults],
      ['Child', quantity.children],
      ['Infant', quantity.infants],
    ].forEach(([type, count]) => {
      for (let i = 0; i < count; i++) {
        newPassengers.push({
          type,
          title: 'Mr.',
          firstName: '',
          lastName: '',
        });
      }
    });
    setPassengers(newPassengers);
  }

  function updatePassengerData(index, field, value) {
    const updatedPassengers = [...passengers];
    updatedPassengers[index] = { ...updatedPassengers[index], [field]: value };
    setPassengers(updatedPassengers);
  }

  function updatePricing({ ticketValidity, ticketPrice }) {
    setTicketValidity(ticketValidity);
    setTicketPrice(ticketPrice);
  }

  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    if (departureDate && departureDate <= today) setDepartureDate('');
    if (returnDate && returnDate <= today) setReturnDate('');
  }, [departureDate, returnDate]);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const incomingAffiliateId = params.get('affId');
    const current = getStoredAttribution();

    if (incomingAffiliateId && isValidAffiliateId(incomingAffiliateId)) {
      if (current?.affiliateId && current.expiresAt && new Date(current.expiresAt).getTime() > Date.now()) {
        setAffiliateAttribution(current);
        return;
      }

      const next = {
        affiliateId: incomingAffiliateId,
        source: 'query',
        capturedAt: new Date().toISOString(),
        expiresAt: new Date(Date.now() + AFFILIATE_TTL_MS).toISOString(),
      };

      localStorage.setItem(AFFILIATE_STORAGE_KEY, JSON.stringify(next));
      setAffiliateAttribution(next);
      return;
    }

    if (!current) {
      localStorage.removeItem(AFFILIATE_STORAGE_KEY);
      setAffiliateAttribution(null);
      return;
    }

    setAffiliateAttribution(current);
  }, [location.search]);

  return (
    <TicketContext.Provider
      value={{
        type,
        from,
        to,
        departureDate,
        returnDate,
        quantity,
        ticketPrice,
        passengers,
        email,
        phoneNumber,
        ticketValidity,
        receiveNow,
        deliveryDate,
        message,
        departureFlight,
        returnFlight,
        affiliateAttribution,

        setType,
        setFrom,
        setTo,
        setDepartureDate,
        setReturnDate,
        setQuantity,
        setTicketPrice,
        setPassengers,
        setEmail,
        setPhoneNumber,
        setTicketValidity,
        setReceiveNow,
        setDeliveryDate,
        setMessage,
        setDepartureFlight,
        setReturnFlight,

        initializePassengers,
        updatePassengerData,
        updatePricing,
      }}
    >
      {children}
    </TicketContext.Provider>
  );
}
