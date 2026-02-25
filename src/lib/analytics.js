import ReactGA from 'react-ga4';
import { GA4_MEASUREMENT_ID } from '../config';

const isProduction = import.meta.env.MODE === 'production';
const isAdminPath = () =>
  typeof window !== 'undefined' && window.location.pathname.startsWith('/admin');
const shouldTrackAnalytics = () => isProduction && !isAdminPath();

export function initializeGA() {
  if (shouldTrackAnalytics()) {
    ReactGA.initialize(GA4_MEASUREMENT_ID);
  }
}

export const trackFlightSearch = ({ type, from, to, departureDate, returnDate, quantity }) => {
  if (shouldTrackAnalytics()) {
    ReactGA.event('flight_search', {
      type,
      from,
      to,
      departureDate,
      returnDate: returnDate || null,
      passengers: quantity.adults + quantity.children,
    });
  }
};

export const trackFlightFormSubmission = ({
  passengers,
  email,
  phoneNumber,
  ticketValidity,
  flightDetails,
}) => {
  if (shouldTrackAnalytics()) {
    ReactGA.event('flight_form_submission', {
      passengers,
      email,
      phoneNumber,
      ticketValidity,
      flightDetails,
    });
  }
};

export const trackBeginCheckout = ({ currency, value, items }) => {
  if (shouldTrackAnalytics()) {
    ReactGA.event('begin_checkout', {
      currency,
      value,
      items,
    });
  }
};

export const trackPurchaseEvent = ({
  currency,
  value,
  sessionId,
  items = [{ item_name: 'Flight reservation', price: 13, quantity: 1 }],
}) => {
  if (shouldTrackAnalytics()) {
    ReactGA.event('purchase', {
      transaction_id: sessionId,
      value,
      currency,
      items,
    });
  }
};
