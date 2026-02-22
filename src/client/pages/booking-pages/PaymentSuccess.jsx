import { useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { FaCheck, FaX } from 'react-icons/fa6';
import { useDummyTicket } from '../../../hooks/dummy-tickets/useDummyTicket';
import { trackPurchaseEvent } from '../../../lib/analytics';
import { formatDate } from '../../../utils/formatDate';
import { HiShieldCheck } from 'react-icons/hi2';
import PrimarySection from '../../../components/PrimarySection';
import Container from '../../../components/Container';
import PageTitle from '../../../components/PageTitle';
import Loading from '../../../components/Loading';
import PrimaryLink from '../../../components/PrimaryLink';

export default function PaymentSuccess() {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get('sessionId');
  const { dummyTicket, isLoadingDummyTicket, isErrorDummyTicket } = useDummyTicket(sessionId);

  if (isLoadingDummyTicket) return <Loading />;

  if (isErrorDummyTicket || dummyTicket?.paymentStatus === 'UNPAID') return <Error />;

  return <Success sessionId={sessionId} dummyTicket={dummyTicket} />;
}

function Success({ sessionId, dummyTicket }) {
  const type = dummyTicket?.type;
  const quantity = dummyTicket?.quantity?.adults + dummyTicket?.quantity?.children;
  const ticketValidity = dummyTicket?.ticketValidity;
  const currency = dummyTicket?.amountPaid?.currency;
  const amount = dummyTicket?.amountPaid?.amount;

  let price = 0;
  if (ticketValidity === '2 Days') {
    price = 49;
  } else if (ticketValidity === '7 Days') {
    price = 69;
  } else if (ticketValidity === '14 Days') {
    price = 79;
  }

  useEffect(() => {
    if (currency && amount && import.meta.env.MODE === 'production') {
      trackPurchaseEvent({
        currency,
        value: amount,
        sessionId,
        items: [{ item_name: `${type} Flight Reservation`, quantity, price }],
      });
    }
  }, []);

  useEffect(() => {
    localStorage.removeItem('SESSION_ID');
  }, []);

  return (
    <>
      <Helmet>
        <title>Payment Successfully Processed</title>
        <meta name="robots" content="none" />
      </Helmet>
      <PrimarySection className="py-10 md:pt-5 md:pb-15 bg-gray-50">
        <Container>
          <div className="w-30 h-30 flex items-center justify-center bg-green-500/20 text-green-800 mx-auto rounded-full text-5xl mb-10">
            <FaCheck />
          </div>
          <PageTitle className="text-center">Thank You for Your Booking!</PageTitle>
          <p className="text-center text-lg md:text-[20px] font-light mt-5">
            Your payment of{' '}
            <span className="font-normal">
              {currency} {amount}
            </span>{' '}
            has been successfully processed.
          </p>
          {!dummyTicket?.ticketDelivery?.immediate && (
            <p className="text-center text-lg md:text-[20px] font-light mt-5">
              Your dummy ticket will be sent to your email address on{' '}
              {formatDate(dummyTicket?.ticketDelivery?.deliveryDate)} since you selected the later
              delivery option. An email regarding the same has been sent your email address, as
              well.
            </p>
          )}
          {dummyTicket?.ticketDelivery?.immediate && (
            <p className="text-center text-lg md:text-[20px] font-light mt-5">
              You will recieve a receipt of your payment by email, followed by your dummy ticket in
              a second email shortly afterwards. Please remember to check your spam folder too.
            </p>
          )}

          <UpsellCard
            icon={<HiShieldCheck />}
            title="Buy Travel Insurance"
            description="Book a legitimate, and 100% genuine travel insurance for your next trip. Our travel insurance policies are accepted by embassies for visa applications. Exclusively for UAE residents/citizens."
            price={55}
            to="/travel-insurance"
          />
        </Container>
      </PrimarySection>
    </>
  );
}

function Error() {
  return (
    <>
      <Helmet>
        <title>Payment Not Found</title>
      </Helmet>
      <PrimarySection className="py-10 md:pt-5 md:pb-15 bg-gray-50">
        <Container>
          <div className="w-30 h-30 flex items-center justify-center bg-red-500/20 text-red-800 mx-auto rounded-full text-5xl mb-10">
            <FaX />
          </div>
          <PageTitle className="text-center">Payment Not Found!</PageTitle>
          <p className="text-center text-lg md:text-[20px] font-light mt-5">
            We couldn’t find a successful payment linked to this booking.
          </p>
          <p className="text-center text-lg md:text-[20px] font-light mt-5">
            If you have already completed a payment, please contact our support team with your
            transaction details at{' '}
            <a href="mailto:info@mydummyticket.ae">info@mydummyticket.ae</a>, and we will
            assist you as soon as possible.
          </p>
        </Container>
      </PrimarySection>
    </>
  );
}

function UpsellCard({ icon, title, description, price, to }) {
  return (
    <div className="max-w-120 mx-auto bg-white shadow-md rounded-xl mt-7">
      <Link to={to}>
        <div className="flex items-center gap-3 p-5 font-normal border-b border-gray-200">
          <div className="w-8 h-8 flex items-center justify-center bg-primary-500 text-white rounded-full">
            {icon}
          </div>
          <p className="text-base md:text-[18px]">{title}</p>
        </div>
        <div className="p-5 font-light">
          <p>{description}</p>
          <div className="mt-4 grid grid-cols-[6fr_4fr]">
            <div className="leading-5">
              <p className="text-sm text-gray-400">from</p>
              <p className="font-medium">AED {price}</p>
            </div>
            <div>
              <PrimaryLink to={to} size="small" className="w-full">
                Book Now
              </PrimaryLink>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}
