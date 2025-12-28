import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { formatDate } from '../../utils/formatDate';
import { Helmet } from 'react-helmet-async';
import { trackBeginCheckout } from '../../utils/analytics';
import { useStripePaymentURL } from '../../hooks/useStripePaymentURL';
import PrimaryButton from '../../components/PrimaryButton';
import Loading from '../../components/Loading';
import { useDummyTicket } from '../../hooks/useDummyTicket';

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
  const { type, ticketPrice, quantity } = useSelector(state => state.ticketForm);
  const sessionId = localStorage.getItem('SESSION_ID');
  const { url, createStripePayment, isLoadingStripePaymentURL, isErrorStripePaymentURL } =
    useStripePaymentURL();
  const { dummyTicket, isLoadingDummyTicket, isErrorDummyTicket } = useDummyTicket(sessionId);

  const totalQuantity = dummyTicket?.quantity?.adults + dummyTicket?.quantity?.children;
  const totalAmount = ticketPrice * totalQuantity;

  const handleConfirm = () => {
    if (sessionId) {
      trackBeginCheckout({
        currency: 'AED',
        value: ticketPrice * (quantity?.adults + quantity?.children),
        items: [
          {
            item_name: `${type} flight reservation`,
            price: ticketPrice,
            quantity: quantity?.adults + quantity?.children,
          },
        ],
      });
      createStripePayment({ ...dummyTicket, totalAmount });
    }
  };

  useEffect(() => {
    if (isErrorStripePaymentURL) {
      toast.error('Could not get payment URL. Please send us an email.');
    }
  }, [isErrorStripePaymentURL]);

  useEffect(() => {
    if (url) {
      window.location.href = url;
    }
  }, [url]);

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
        />
      </div>
      <ProceedButton
        handleConfirm={handleConfirm}
        isLoadingStripePaymentURL={isLoadingStripePaymentURL}
        totalAmount={totalAmount}
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

function OrderTotalDetail({ totalQuantity, ticketPrice, totalAmount }) {
  return (
    <Section>
      <SectionTitle>Order Total</SectionTitle>
      <Detail>
        <span>Dummy Ticket Price:</span> AED {ticketPrice}
      </Detail>
      <Detail>
        <span>Number of Passengers (excl. infants):</span> {totalQuantity}
      </Detail>
      <Detail>
        <span>Total:</span> AED {totalAmount}
      </Detail>
    </Section>
  );
}

function ProceedButton({ handleConfirm, isLoadingStripePaymentURL, totalAmount }) {
  return (
    <div className="flex items-center justify-center">
      <PrimaryButton onClick={handleConfirm} disabled={isLoadingStripePaymentURL}>
        {isLoadingStripePaymentURL ? 'Processing...' : `Proceed To Payment (AED ${totalAmount})`}
      </PrimaryButton>
    </div>
  );
}
