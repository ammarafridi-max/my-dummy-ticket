import { useContext, useEffect } from 'react';
import { useStripePaymentURL } from '../../../hooks/dummy-tickets/useStripePaymentURL';
import { useDummyTicket } from '../../../hooks/dummy-tickets/useDummyTicket';
import { toast } from 'react-hot-toast';
import { Helmet } from 'react-helmet-async';
import { TicketContext } from '../../../context/TicketContext';
import { trackBeginCheckout } from '../../../lib/analytics';
import { formatDate } from '../../../utils/formatDate';
import PrimaryButton from '../../../components/PrimaryButton';
import Loading from '../../../components/Loading';
import { useDummyTicketPricing } from '../../../hooks/pricing/useDummyTicketPricing';
import { getTicketPriceByValidity } from '../../../utils/dummyTicketPricing';
import { CurrencyContext } from '../../../context/CurrencyContext';
import { convertAmount, formatAmount } from '../../../utils/currency';

function Section({ children }) {
  return (
    <div className="w-full md:w-[50%] mb-3.75 p-5 rounded-xl shadow-md bg-white">{children}</div>
  );
}

function SectionTitle({ children }) {
  return <h2 className="text-[20px] md:text-2xl mb-2.5 pb-1.25 font-normal">{children}</h2>;
}

function Detail({ children }) {
  return (
    <div className="mb-2 text-[14px] lg:text-[16px] flex justify-between font-light">
      {children}
    </div>
  );
}

export default function ReviewDetails() {
  const sessionId = localStorage.getItem('SESSION_ID');
  const { type } = useContext(TicketContext);
  const { currency } = useContext(CurrencyContext);
  const { pricing } = useDummyTicketPricing();
  const { createStripePayment, isLoadingStripePaymentURL, isErrorStripePaymentURL } =
    useStripePaymentURL();
  const { dummyTicket, isLoadingDummyTicket } = useDummyTicket(sessionId);

  const totalQuantity = Number(dummyTicket?.quantity?.adults || 0) + Number(dummyTicket?.quantity?.children || 0);
  const baseTicketPrice = getTicketPriceByValidity(pricing, dummyTicket?.ticketValidity);
  const conversionRate = Number(currency?.conversionRate || 1);
  const ticketPrice = convertAmount(baseTicketPrice, conversionRate);
  const totalAmount = convertAmount(ticketPrice * totalQuantity, 1);

  const handleConfirm = () => {
    if (sessionId) {
      trackBeginCheckout({
        currency: currency?.code || 'AED',
        value: ticketPrice * totalQuantity,
        items: [
          {
            item_name: `${type} flight reservation`,
            price: ticketPrice,
            quantity: totalQuantity,
          },
        ],
      });
      createStripePayment({
        ...dummyTicket,
        totalAmount,
        currencyCode: currency?.code || 'AED',
      });
    }
  };

  useEffect(() => {
    if (isErrorStripePaymentURL) {
      toast.error('Could not get payment URL. Please send us an email.');
    }
  }, [isErrorStripePaymentURL]);

  const groupedPassengers =
    dummyTicket?.passengers?.reduce((acc, passenger) => {
      if (!acc[passenger.type]) {
        acc[passenger.type] = [];
      }
      acc[passenger.type].push(passenger);
      return acc;
    }, {}) || {};

  if (isLoadingDummyTicket) return <Loading />;

  return (
    <>
      <Helmet>
        <title>Review Your Information</title>
        <meta name="robots" content="none" />
      </Helmet>
      <div className="block md:flex md:gap-4">
        <BookingDetailBox dummyTicket={dummyTicket} />
        <FlightDetailBox dummyTicket={dummyTicket} />
      </div>
      <div className="block md:flex md:gap-4">
        <PassengerDetail groupedPassengers={groupedPassengers} />
        <OrderTotalDetail
          totalQuantity={totalQuantity}
          totalAmount={totalAmount}
          ticketPrice={ticketPrice}
          currencyCode={currency?.code || 'AED'}
        />
      </div>
      <ProceedButton
        handleConfirm={handleConfirm}
        isLoadingStripePaymentURL={isLoadingStripePaymentURL}
        totalAmount={totalAmount}
        currencyCode={currency?.code || 'AED'}
      />
    </>
  );
}

function BookingDetailBox({ dummyTicket }) {
  return (
    <Section>
      <SectionTitle>Booking Details</SectionTitle>
      <Detail>
        <span>Booking Date:</span> {formatDate(dummyTicket?.createdAt)}
      </Detail>
      <Detail>
        <span>Email:</span> {dummyTicket?.email}
      </Detail>
      <Detail>
        <span>Phone Number:</span> {dummyTicket?.phoneNumber.code}
        {dummyTicket?.phoneNumber.digits}
      </Detail>
      {dummyTicket?.message && (
        <Detail>
          <span>Message:</span> {dummyTicket?.message}
        </Detail>
      )}
      <Detail>
        <span>Status:</span> Payment Pending
      </Detail>
      <Detail>
        <span>Ticket Validity:</span> {dummyTicket?.ticketValidity}
      </Detail>
      <Detail>
        <span>Delivery Type:</span> {dummyTicket?.ticketDelivery?.immediate ? 'Immediate' : 'Later'}
      </Detail>
      {!dummyTicket?.ticketDelivery?.immediate && (
        <Detail>
          <span>Delivery Date:</span> {formatDate(dummyTicket?.ticketDelivery?.deliveryDate)}
        </Detail>
      )}
    </Section>
  );
}

function FlightDetailBox({ dummyTicket }) {
  return (
    <Section>
      <SectionTitle>Flight Information</SectionTitle>
      <Detail>
        <span>From:</span> {dummyTicket?.from}
      </Detail>
      <Detail>
        <span>To:</span> {dummyTicket?.to}
      </Detail>
      <Detail>
        <span>Departure Date:</span> {formatDate(dummyTicket?.departureDate)}
      </Detail>
      <Detail>
        <span>Departure Flight:</span>{' '}
        {dummyTicket?.flightDetails?.departureFlight.segments[0].carrierCode}{' '}
        {dummyTicket?.flightDetails?.departureFlight.segments[0].flightNumber}
      </Detail>
      {dummyTicket?.returnDate && (
        <Detail>
          <span>Return Date:</span> {formatDate(dummyTicket?.returnDate)}
        </Detail>
      )}
      {dummyTicket?.flightDetails.returnFlight && (
        <Detail>
          <span>Return Flight:</span>{' '}
          {dummyTicket?.flightDetails?.returnFlight.segments[0].carrierCode}{' '}
          {dummyTicket?.flightDetails?.returnFlight.segments[0].flightNumber}
        </Detail>
      )}
    </Section>
  );
}

function PassengerDetail({ groupedPassengers }) {
  return (
    <Section>
      <SectionTitle>Passenger Information</SectionTitle>
      {Object.keys(groupedPassengers).map(type => (
        <div key={type}>
          {groupedPassengers[type].map((passenger, index) => (
            <Detail key={index}>
              <span>
                {type} {index + 1}:
              </span>{' '}
              {passenger.title} {passenger.firstName} {passenger.lastName}
            </Detail>
          ))}
        </div>
      ))}
    </Section>
  );
}

function OrderTotalDetail({ totalQuantity, ticketPrice, totalAmount, currencyCode }) {
  return (
    <Section>
      <SectionTitle>Order Total</SectionTitle>
      <Detail>
        <span>Dummy Ticket Price:</span> {currencyCode} {formatAmount(ticketPrice)}
      </Detail>
      <Detail>
        <span>Number of Passengers (excl. infants):</span> {totalQuantity}
      </Detail>
      <Detail>
        <span>Total:</span> {currencyCode} {formatAmount(totalAmount)}
      </Detail>
    </Section>
  );
}

function ProceedButton({ handleConfirm, isLoadingStripePaymentURL, totalAmount, currencyCode }) {
  return (
    <div className="flex items-center justify-center">
      <PrimaryButton onClick={handleConfirm} disabled={isLoadingStripePaymentURL}>
        {isLoadingStripePaymentURL ? 'Processing...' : `Proceed To Payment (${currencyCode} ${formatAmount(totalAmount)})`}
      </PrimaryButton>
    </div>
  );
}
