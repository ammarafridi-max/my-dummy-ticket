import { useState, useEffect } from 'react';

export function useFlights(type, from, to, departureDate, returnDate) {
  const [isLoading, setIsLoading] = useState(false);
  const [errorText, setErrorText] = useState('');
  const [flights, setFlights] = useState([]);
  const [maxFlights, setMaxFlights] = useState(4);
  const [selectedFlight, setSelectedFlight] = useState(0);

  function showMoreFlights() {
    if (maxFlights < 19) {
      setMaxFlights((cur) => cur + 5);
    }
  }

  function handleSelectFlight(id) {
    setSelectedFlight(id);
    // navigate(`/booking/passenger-details`);
  }

  useEffect(() => {
    async function fetchFlights() {
      try {
        setIsLoading(true);
        const res = await fetch(
          `${
            process.env.REACT_APP_BACKEND_URL
          }/flights?type=${type}&from=${from}&to=${to}&departureDate=${departureDate}${
            returnDate && `&returnDate=${returnDate}`
          }`
        );
        const data = await res.json();
        if (!data.length) setErrorText('No flights found');
        setFlights(data);
      } catch (error) {
        setErrorText('Could not load flights');
      } finally {
        setIsLoading(false);
      }
    }
    fetchFlights();
  }, []);

  return {
    isLoading,
    errorText,
    flights,
    showMoreFlights,
    handleSelectFlight,
    maxFlights,
    selectedFlight,
  };
}
