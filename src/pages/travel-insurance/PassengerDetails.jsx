import { useContext } from 'react';
import { Helmet } from 'react-helmet-async';
import { InsuranceContext } from '../../context/InsuranceContext';

const pageData = {
  meta: {
    title: 'Passenger Details - Travel Insurance',
    description:
      'Dummy tickets are flight reservations travelers use for various purposes, including visa applications. Book yours with My Dummy Ticket. Starting from AED 49.',
    canonical: 'https://www.mydummyticket.ae/travel-insurance/passenger-details',
  },
  sections: {},
};

export default function PassengerDetails() {
  const data = useContext(InsuranceContext);
  return (
    <>
      <Helmet>
        <title>{pageData.meta.title}</title>
        <link rel="canonical" href={pageData.meta.canonical} />
        <meta name="robots" content="noindex, nofollow" />
        <meta name="description" content={pageData.meta.description} />
      </Helmet>
    </>
  );
}
