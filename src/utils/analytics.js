import ReactGA from 'react-ga4';

export function initializeGA() {
  ReactGA.initialize(process.env.REACT_APP_GA4_MEASUREMENT_ID);
}

export const trackPurchaseEvent = (currency, value, transactionId) => {
  ReactGA.event('dummy_ticket_purchase', {
    currency,
    value,
    transactionId,
  });
};
