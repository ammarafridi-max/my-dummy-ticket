import { createContext, useEffect, useState } from 'react';

function safeParse(key, fallback) {
  try {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : fallback;
  } catch {
    return fallback;
  }
}

export const TicketContext = createContext();

export function TicketProvider({ children }) {
  const routes = safeParse('routes', {});
  const storedPhone = safeParse('phoneNumber', { code: '', digits: '' });

  const [type, setType] = useState('One Way');
  const [from, setFrom] = useState(routes.from || '');
  const [to, setTo] = useState(routes.to || '');
  const [departureDate, setDepartureDate] = useState(localStorage.getItem('departureDate') || '');
  const [returnDate, setReturnDate] = useState(type === 'One Way' ? '' : localStorage.getItem('returnDate') || '');
  const [quantity, setQuantity] = useState({ adults: 1, children: 0, infants: 0 });
  const [ticketPrice, setTicketPrice] = useState(49);
  const [passengers, setPassengers] = useState([]);
  const [email, setEmail] = useState(localStorage.getItem('email') || '');
  const [phoneNumber, setPhoneNumber] = useState(storedPhone);
  const [ticketValidity, setTicketValidity] = useState('2 Days');
  const [receiveNow, setReceiveNow] = useState(true);
  const [deliveryDate, setDeliveryDate] = useState('');
  const [message, setMessage] = useState('');
  const [departureFlight, setDepartureFlight] = useState('');
  const [returnFlight, setReturnFlight] = useState('');

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
