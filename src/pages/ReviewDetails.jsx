import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { createStipePaymentLink } from '../redux/slices/stripePayment';
import { fetchFormDetails } from '../redux/slices/fetchTicketDetails';
import { formatDate } from '../utils/formatDate';
import { Helmet } from 'react-helmet-async';
import { trackBeginCheckout } from '../utils/analytics';
import PrimaryButton from '../components/PrimaryButton';
import Loading from '../components/Loading';

function Section({ children }) {
  return (
    <div className="w-full md:w-[50%] mb-3.75 p-5 rounded-xl shadow-md bg-white font-nunito">
      {children}
    </div>
  );
}

function SectionTitle({ children }) {
  return (
    <h2 className="text-[20px] md:text-2xl mb-2.5 pb-1.25 font-bold">
      {children}
    </h2>
  );
}

function Detail({ children }) {
  return (
    <div className="mb-1 text-[0.9rem] md:text-[1rem] flex justify-between">
      {children}
    </div>
  );
}

export default function ReviewDetails() {
  const dispatch = useDispatch();
  const { formDetails, status } = useSelector((state) => state.formDetails);
  const { type, ticketPrice, quantity } = useSelector(
    (state) => state.ticketForm
  );
  const { stripeStatus, data, stripeError } = useSelector(
    (state) => state.payment
  );
  const sessionId = localStorage.getItem('SESSION_ID');

  const totalQuantity =
    formDetails?.quantity?.adults + formDetails?.quantity?.children;
  const totalAmount = ticketPrice * totalQuantity;

  useEffect(() => {
    if (sessionId) {
      dispatch(fetchFormDetails(sessionId));
    }
  }, [dispatch]);

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
      dispatch(createStipePaymentLink({ ...formDetails, totalAmount }));
    }
  };

  useEffect(() => {
    if (stripeError) {
      toast.error('An error occurred while processing your payment');
    }
  }, [stripeError]);

  useEffect(() => {
    if (stripeStatus === 'succeeded' && data?.url) {
      window.location.href = data.url;
    }
  }, [stripeStatus, data]);

  const groupedPassengers =
    formDetails?.passengers?.reduce((acc, passenger) => {
      if (!acc[passenger.type]) {
        acc[passenger.type] = [];
      }
      acc[passenger.type].push(passenger);
      return acc;
    }, {}) || {};

  if (status === 'loading') return <Loading />;

  return (
    <>
      <Helmet>
        <title>Review Your Information</title>
      </Helmet>
      <div className="block md:flex md:gap-4">
        <BookingDetailBox formDetails={formDetails} />
        <FlightDetailBox formDetails={formDetails} />
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
        stripeStatus={stripeStatus}
        totalAmount={totalAmount}
      />
    </>
  );
}

function BookingDetailBox({ formDetails }) {
  return (
    <Section>
      <SectionTitle>Booking Details</SectionTitle>
      <Detail>
        <span>Booking Date:</span> {formatDate(formDetails?.createdAt)}
      </Detail>
      <Detail>
        <span>Email:</span> {formDetails?.email}
      </Detail>
      <Detail>
        <span>Phone Number:</span> {formDetails?.phoneNumber.code}
        {formDetails?.phoneNumber.digits}
      </Detail>
      {formDetails?.message && (
        <Detail>
          <span>Message:</span> {formDetails?.message}
        </Detail>
      )}
      <Detail>
        <span>Status:</span> Payment Pending
      </Detail>
      <Detail>
        <span>Ticket Validity:</span> {formDetails?.ticketValidity}
      </Detail>
      <Detail>
        <span>Delivery Type:</span>{' '}
        {formDetails?.ticketDelivery?.immediate ? 'Immediate' : 'Later'}
      </Detail>
      {!formDetails?.ticketDelivery?.immediate && (
        <Detail>
          <span>Delivery Date:</span>{' '}
          {formatDate(formDetails?.ticketDelivery?.deliveryDate)}
        </Detail>
      )}
    </Section>
  );
}

function FlightDetailBox({ formDetails }) {
  return (
    <Section>
      <SectionTitle>Flight Information</SectionTitle>
      <Detail>
        <span>From:</span> {formDetails?.from}
      </Detail>
      <Detail>
        <span>To:</span> {formDetails?.to}
      </Detail>
      <Detail>
        <span>Departure Date:</span> {formatDate(formDetails?.departureDate)}
      </Detail>
      <Detail>
        <span>Departure Flight:</span>{' '}
        {formDetails?.flightDetails?.departureFlight.segments[0].carrierCode}{' '}
        {formDetails?.flightDetails?.departureFlight.segments[0].flightNumber}
      </Detail>
      {formDetails?.returnDate && (
        <Detail>
          <span>Return Date:</span> {formatDate(formDetails?.returnDate)}
        </Detail>
      )}
      {formDetails?.flightDetails.returnFlight && (
        <Detail>
          <span>Return Flight:</span>{' '}
          {formDetails?.flightDetails?.returnFlight.segments[0].carrierCode}{' '}
          {formDetails?.flightDetails?.returnFlight.segments[0].flightNumber}
        </Detail>
      )}
    </Section>
  );
}

function PassengerDetail({ groupedPassengers }) {
  return (
    <Section>
      <SectionTitle>Passenger Information</SectionTitle>
      {Object.keys(groupedPassengers).map((type) => (
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

function ProceedButton({ handleConfirm, stripeStatus, totalAmount }) {
  return (
    <div className="flex items-center justify-center">
      <PrimaryButton
        onClick={handleConfirm}
        disabled={stripeStatus === 'loading'}
      >
        {stripeStatus === 'loading'
          ? 'Processing...'
          : `Proceed To Payment (AED ${totalAmount})`}
      </PrimaryButton>
    </div>
  );
}
