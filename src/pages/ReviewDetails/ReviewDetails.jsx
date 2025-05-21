import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { createTicket } from '../../redux/slices/createTicket';
import { fetchFormDetails } from '../../redux/slices/fetchTicketDetails';
import { formatDate } from '../../utils/formatDate';
import { FaSpinner } from 'react-icons/fa';
import { Helmet } from 'react-helmet-async';
import PrimaryButton from '../../components/PrimaryButton';
import PageTitle from '../../components/PageTitle';
import styled from 'styled-components';

const Box = styled.div`
  display: flex;
  justify-content: space-between;

  @media (max-width: 991px) {
    flex-direction: column;
  }
`;

const Section = styled.div`
  margin-bottom: 20px;
  width: 48%;
  padding: 0;

  @media (max-width: 991px) {
    width: 100%;
  }
`;

const SectionTitle = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 10px;
  border-bottom: 3px solid var(--primary-color-600);
  padding-bottom: 5px;

  @media (max-width: 991px) {
    font-size: 1.2rem;
  }
`;

const Detail = styled.div`
  margin-bottom: 10px;
  font-size: 1rem;
  display: flex;
  justify-content: space-between;

  @media (max-width: 991px) {
    font-size: 0.9rem;
  }
`;

const PassengerInfo = styled.div`
  margin-bottom: 8px;
  font-size: 1rem;

  @media (max-width: 991px) {
    font-size: 0.9rem;
  }
`;

const LoadingText = styled.p`
  text-align: center;
  font-size: 1.2rem;
  color: var(--primary-color);
`;

const SpinnerIcon = styled(FaSpinner)`
  animation: spin 1s linear infinite;
  margin-right: 8px;

  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
`;

const ButtonDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default function ReviewDetails() {
  const dispatch = useDispatch();
  const { formDetails, status } = useSelector((state) => state.formDetails);
  const { stripeStatus, data, stripeError } = useSelector(
    (state) => state.createTicket
  );
  const navigate = useNavigate();
  const sessionId = localStorage.getItem('SESSION_ID');

  let additionalPrice = 0;
  let validityText = '48 Hours';

  if (formDetails?.ticketValidity === '7 Days') {
    additionalPrice = 20;
    validityText = '7 Days';
  }
  if (formDetails?.ticketValidity === '14 Days') {
    additionalPrice = 30;
    validityText = '14 Days';
  }

  const { adults = 0, children = 0 } = formDetails?.quantity || {};
  const totalQuantity = adults + children;
  const ticketAvailability = formDetails?.ticketAvailability || {};
  const totalAmount = 49 * totalQuantity + additionalPrice * totalQuantity;

  useEffect(() => {
    if (sessionId) {
      dispatch(fetchFormDetails(sessionId));
    }
  }, [dispatch]);

  const handleConfirm = () => {
    if (sessionId) {
      dispatch(createTicket({ ...formDetails, totalAmount }));
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

  let content;

  if (status === 'loading') {
    content = <LoadingText>Loading...</LoadingText>;
  } else if (status === 'succeeded' && formDetails) {
    const groupedPassengers =
      formDetails?.passengers?.reduce((acc, passenger) => {
        if (!acc[passenger.type]) {
          acc[passenger.type] = [];
        }
        acc[passenger.type].push(passenger);
        return acc;
      }, {}) || {};

    let statusText;

    if (formDetails?.status === 'REVIEW_ORDER') {
      statusText = 'Pending Payment';
    }

    let availability;
    if (formDetails?.ticketAvailability?.immediate === true) {
      availability = true;
    }
    if (formDetails?.ticketAvailability?.immediate === false) {
      availability = false;
    }

    content = (
      <>
        <Helmet>
          <title>Review Your Information</title>
        </Helmet>
        {/* <PageTitle pt="20px" pb="30px">
          Review Your Information
        </PageTitle> */}

        <Box>
          <BookingDetailBox formDetails={formDetails} statusText={statusText} />
          <FlightDetailBox formDetails={formDetails} />
        </Box>
        <Box>
          <TicketAvailabilityDetail
            validityText={validityText}
            availability={availability}
            ticketAvailability={ticketAvailability}
          />
          <PassengerDetail groupedPassengers={groupedPassengers} />
        </Box>
        <OrderTotalDetail
          totalQuantity={totalQuantity}
          additionalPrice={additionalPrice}
          totalAmount={totalAmount}
        />
        <ProceedButton
          handleConfirm={handleConfirm}
          stripeStatus={stripeStatus}
          totalAmount={totalAmount}
        />
      </>
    );
  }

  return <>{content}</>;
}

function BookingDetailBox({ formDetails, statusText }) {
  return (
    <Section>
      <SectionTitle>Booking Details</SectionTitle>
      <Detail>
        <span>Booking Date:</span> {formatDate(formDetails.createdAt)}
      </Detail>
      <Detail>
        <span>Email:</span> {formDetails.email}
      </Detail>
      <Detail>
        <span>Phone Number:</span> {formDetails.phoneNumber.code}
        {formDetails.phoneNumber.digits}
      </Detail>
      {formDetails.message && (
        <Detail>
          <span>Message:</span> {formDetails.message}
        </Detail>
      )}
      <Detail>
        <span>Status:</span> {statusText}
      </Detail>
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
        {formDetails?.flightDetails?.departureFlight}
      </Detail>
      {formDetails?.returnDate && (
        <Detail>
          <span>Return Date:</span> {formatDate(formDetails?.returnDate)}
        </Detail>
      )}
      {formDetails?.flightDetails?.returnFlight && (
        <Detail>
          <span>Return Flight:</span>{' '}
          {formDetails?.flightDetails?.returnFlight || ''}
        </Detail>
      )}
    </Section>
  );
}

function TicketAvailabilityDetail({
  validityText,
  availability,
  ticketAvailability,
}) {
  return (
    <Section>
      <SectionTitle>Ticket Availability</SectionTitle>
      <Detail>
        <span>Ticket Validity :</span> {validityText}
      </Detail>
      <Detail>
        {availability ? (
          <>
            <span>Availability Type:</span> Immediate{' '}
          </>
        ) : (
          <>
            <span>Availability Type:</span> Later{' '}
          </>
        )}
      </Detail>
      {!availability && (
        <Detail>
          <span>Receipt Date:</span>{' '}
          {formatDate(ticketAvailability.receiptDate)}
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
            <PassengerInfo key={index}>
              <span>
                {type} {index + 1}:
              </span>{' '}
              {passenger.title} {passenger.firstName} {passenger.lastName}
            </PassengerInfo>
          ))}
        </div>
      ))}
    </Section>
  );
}

function OrderTotalDetail({ totalQuantity, additionalPrice, totalAmount }) {
  return (
    <Box>
      <Section>
        <SectionTitle>Order Total</SectionTitle>
        <Detail>
          <span>Base Price :</span> AED {49 * totalQuantity}
        </Detail>
        <Detail>
          <span>Additional Price :</span>
          {additionalPrice === 0
            ? 'AED 0'
            : `AED ${additionalPrice * totalQuantity}`}
        </Detail>
        <Detail>
          <span>Total :</span> AED {totalAmount}
        </Detail>
      </Section>
    </Box>
  );
}

function ProceedButton({ handleConfirm, stripeStatus, totalAmount }) {
  return (
    <ButtonDiv>
      <PrimaryButton
        onClick={handleConfirm}
        disabled={stripeStatus === 'loading'}
      >
        {stripeStatus === 'loading' ? (
          <>
            <SpinnerIcon /> Processing...
          </>
        ) : (
          <>Proceed To Payment (AED {totalAmount})</>
        )}
      </PrimaryButton>
    </ButtonDiv>
  );
}
