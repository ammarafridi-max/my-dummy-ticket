import ReactGA from 'react-ga4';

export function initializeGA() {
  ReactGA.initialize(import.meta.env.VITE_GA4_MEASUREMENT_ID);
}

export const trackPageView = (path = window.location.pathname) => {
  ReactGA.send({ hitType: 'pageview', page: path });
};

export const trackFlightSearch = ({
  type,
  from,
  to,
  departureDate,
  returnDate,
  quantity,
}) => {
  ReactGA.event('flight_search', {
    type,
    from,
    to,
    departureDate,
    returnDate: returnDate || null,
    passengers: quantity.adults + quantity.children,
  });
};

export const trackFlightFormSubmission = ({
  passengers,
  email,
  phoneNumber,
  ticketValidity,
  flightDetails,
}) => {
  ReactGA.event('flight_form_submission', {
    passengers,
    email,
    phoneNumber,
    ticketValidity,
    flightDetails,
  });
};

export const trackBeginCheckout = ({ currency, value, items }) => {
  ReactGA.event('begin_checkout', {
    currency,
    value,
    items,
  });
};

export const trackPurchaseEvent = ({
  currency,
  value,
  sessionId,
  items = [{ item_name: 'Flight reservation', price: 13, quantity: 1 }],
}) => {
  ReactGA.event('purchase', {
    transaction_id: sessionId,
    value,
    currency,
    items,
  });
};
