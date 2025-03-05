import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { baseURL } from '../../config';
import { selectFlightError } from '../../redux/slices/selectFlight';

function generatePassengerList(quantity) {
  const passengers = [];
  [
    ['Adult', quantity.adults],
    ['Child', quantity.children],
    ['Infant', quantity.infants],
  ].forEach(([type, count]) => {
    for (let i = 0; i < count; i++) {
      passengers.push({ type, title: 'Mr.', firstName: '', lastName: '' });
    }
  });
  return passengers;
}

export function useHandleForm(flight) {
  const navigate = useNavigate();
  const flightError = useSelector(selectFlightError);
  const { formData } = useSelector((state) => state.ticketForm);
  const [passengers, setPassengers] = useState([]);
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState({ code: '', digits: '' });
  const [message, setMessage] = useState('');
  const [ticketValidity, setTicketValidity] = useState('48 Hours');
  const [receiveNow, setReceiveNow] = useState(true);
  const [receiptDate, setReceiptDate] = useState('');
  const [dummyPrice, setDummyPrice] = useState(
    49 * (formData.quantity.adults + formData.quantity.children)
  );
  const [passengerErrors, setPassengerErrors] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [phoneNumberError, setPhoneNumberError] = useState('');
  const departureFlight = `${flight?.itineraries[0]?.segments[0].carrierCode} ${flight?.itineraries[0]?.segments[0].number}`;
  const returnFlight =
    formData.type === 'Return'
      ? `${flight?.itineraries[1]?.segments[0].carrierCode} ${flight?.itineraries[1]?.segments[0].number}`
      : null;

  useEffect(() => {
    setPassengers(generatePassengerList(formData.quantity));
  }, [formData]);

  // Handlers
  const handleUpdatePassenger = (index, field, value) => {
    setPassengers((prev) =>
      prev.map((p, i) => (i === index ? { ...p, [field]: value } : p))
    );
    setPassengerErrors((prevErrors) => {
      const updatedErrors = [...prevErrors];
      if (field === 'firstName' || field === 'lastName') {
        updatedErrors[index] = {
          ...updatedErrors[index],
          [field]: value.trim() ? '' : `${field} is required`,
        };
      }
      return updatedErrors;
    });
  };

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
  };

  const handleValidityChange = (e) => {
    const validity = e.target.value;
    console.log(validity);
    setTicketValidity(validity);
    setDummyPrice(
      validity === '7 Days'
        ? 19 * (formData.quantity.adults + formData.quantity.children)
        : validity === '14 Days'
          ? 22 * (formData.quantity.adults + formData.quantity.children)
          : 12 * (formData.quantity.adults + formData.quantity.children)
    );
  };

  const handleSelectDate = (date) => setReceiptDate(date);

  // Validation
  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,3}$/.test(email);

  const validatePhoneNumber = (phoneNumber) => {
    if (!phoneNumber.code || !phoneNumber.digits) {
      setPhoneNumberError('Please provide a valid phone number');
    }
  };

  const validatePassengers = () => {
    const errors = passengers.map(({ firstName, lastName }) => ({
      firstName: firstName
        ? /^[A-Za-z\s]+$/.test(firstName.trim())
          ? ''
          : 'Only letters and spaces allowed'
        : 'First name required',
      lastName: lastName
        ? /^[A-Za-z\s]+$/.test(lastName.trim())
          ? ''
          : 'Only letters and spaces allowed'
        : 'Last name required',
    }));
    setPassengerErrors(errors);
    return errors.every((err) => !Object.values(err).some(Boolean));
  };

  const validateReceiptInfo = () => receiveNow || receiptDate;

  const validateForm = () => {
    const isValid = [
      validatePassengers(),
      validateReceiptInfo(),
      validateEmail(email),
    ].every(Boolean);
    setErrorMessage(isValid ? '' : 'Please complete all required fields.');
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { type, from, to, departureDate, returnDate, quantity } = formData;
    const updatedFormData = {
      type,
      passengers,
      email,
      phoneNumber,
      message,
      from,
      to,
      flightDetails: { departureFlight, returnFlight: returnFlight || null },
      departureDate,
      returnDate: returnDate || null,
      quantity,
      status: 'REVIEW_ORDER',
      ticketValidity,
      ticketAvailability: {
        immediate: receiveNow,
        receiptDate: !receiveNow ? receiptDate : null,
      },
      totalAmount: dummyPrice,
    };

    console.log(updatedFormData);

    if (validateForm()) {
      try {
        const res = await fetch(`${baseURL}/api/ticket`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(updatedFormData),
        });
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
        const data = await res.json();
        localStorage.setItem('SESSION_ID', data.sessionId);
        navigate('/booking/review-details');
      } catch (error) {
        console.error('Error:', error);
        alert('Failed to create the ticket. Please try again.');
      }
    } else {
      console.log('Validation failed');
    }
  };

  return {
    formData,
    email,
    setEmail,
    phoneNumber,
    setPhoneNumber,
    message,
    setMessage,
    passengers,
    ticketValidity,
    receiveNow,
    setReceiveNow,
    receiptDate,
    setReceiptDate,
    dummyPrice,
    errorMessage,
    passengerErrors,
    flightError,
    handleUpdatePassenger,
    handleEmailChange,
    handleSelectDate,
    handleValidityChange,
    handleSubmit,
  };
}
