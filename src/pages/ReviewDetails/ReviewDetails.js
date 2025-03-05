import styles from './ReviewDetails.module.css';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { createTicket } from '../../redux/slices/createTicket';
import { fetchFormDetails } from '../../redux/slices/fetchTicketDetails';
import { formatDate } from '../../utils/formatDate';
import { FaSpinner } from 'react-icons/fa';
import { Helmet } from 'react-helmet';
import PrimaryButton from '../../components/Buttons/PrimaryButton';
import PageTitle from '../../components/Typography/PageTitle';

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
      toast.error(` Error: ${stripeError}`, {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  }, [stripeError]);

  useEffect(() => {
    if (stripeStatus === 'succeeded' && data?.url) {
      window.location.href = data.url;
    }
  }, [stripeStatus, data]);

  let content;

  if (status === 'loading') {
    content = <p className={styles.loading}>Loading...</p>;
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
        <PageTitle pt="20px" pb="30px">
          Review Your Information
        </PageTitle>

        <div className={styles.box}>
          <BookingDetailBox formDetails={formDetails} statusText={statusText} />
          <FlightDetailBox formDetails={formDetails} />
        </div>
        <div className={styles.box}>
          <TicketAvailabilityDetail
            validityText={validityText}
            availability={availability}
            ticketAvailability={ticketAvailability}
          />
          <PassengerDetail groupedPassengers={groupedPassengers} />
        </div>
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

  return (
    <div>
      <Helmet>
        <title>Review Your Information</title>
      </Helmet>
      {content}
    </div>
  );
}

function BookingDetailBox({ formDetails, statusText }) {
  return (
    <div className={styles.section}>
      <h2 className={styles.sectionTitle}>Booking Details</h2>
      <div className={styles.detail}>
        <span>Booking Date:</span> {formatDate(formDetails.createdAt)}
      </div>
      <div className={styles.detail}>
        <span>Email:</span> {formDetails.email}
      </div>
      <div className={styles.detail}>
        <span>Phone Number:</span> {formDetails.phoneNumber.code}
        {formDetails.phoneNumber.digits}
      </div>
      {formDetails.message && (
        <div className={styles.detail}>
          <span>Message:</span> {formDetails.message}
        </div>
      )}
      <div className={styles.detail}>
        <span>Status:</span> {statusText}
      </div>
    </div>
  );
}

function FlightDetailBox({ formDetails }) {
  return (
    <div className={styles.section}>
      <h2 className={styles.sectionTitle}>Flight Information</h2>
      <div className={styles.detail}>
        <span>From:</span> {formDetails?.from}
      </div>
      <div className={styles.detail}>
        <span>To:</span> {formDetails?.to}
      </div>
      <div className={styles.detail}>
        <span>Departure Date:</span> {formatDate(formDetails?.departureDate)}
      </div>
      <div className={styles.detail}>
        <span>Departure Flight:</span>{' '}
        {formDetails?.flightDetails?.departureFlight}
      </div>
      {formDetails?.returnDate && (
        <div className={styles.detail}>
          <span>Return Date:</span> {formatDate(formDetails?.returnDate)}
        </div>
      )}
      {formDetails?.flightDetails?.returnFlight && (
        <div className={styles.detail}>
          <span>Return Flight:</span>{' '}
          {formDetails?.flightDetails?.returnFlight || ''}
        </div>
      )}
    </div>
  );
}

function TicketAvailabilityDetail({
  validityText,
  availability,
  ticketAvailability,
}) {
  return (
    <div className={styles.section}>
      <h2 className={styles.sectionTitle}>Ticket Availability</h2>

      <div className={styles.detail}>
        <span>Ticket Validity :</span> {validityText}
      </div>

      <div className={styles.detail}>
        {availability ? (
          <>
            <span> Availability Type: </span> Immediate{' '}
          </>
        ) : (
          <>
            <span> Availability Type: </span> Later{' '}
          </>
        )}
      </div>
      {!availability && (
        <>
          <div className={styles.detail}>
            <span>Receipt Date:</span>{' '}
            {formatDate(ticketAvailability.receiptDate)}
          </div>
        </>
      )}
    </div>
  );
}

function PassengerDetail({ groupedPassengers }) {
  return (
    <div className={styles.section}>
      <h2 className={styles.sectionTitle}>Passenger Information</h2>

      {Object.keys(groupedPassengers).map((type) => (
        <div key={type} className={styles.passengerGroup}>
          {groupedPassengers[type].map((passenger, index) => (
            <div key={index} className={styles.passenger}>
              <span>
                {type} {index + 1}:
              </span>{' '}
              {passenger.title} {passenger.firstName} {passenger.lastName}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

function OrderTotalDetail({ totalQuantity, additionalPrice, totalAmount }) {
  return (
    <div className={styles.box}>
      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>Order Total</h2>

        <div className={styles.detail}>
          <span>Base Price :</span> AED {49 * totalQuantity}
        </div>
        <div className={styles.detail}>
          <span>Additional Price :</span>
          {additionalPrice === 0
            ? 'AED 0'
            : `AED ${additionalPrice * totalQuantity}`}
        </div>
        <p className={styles.sectionTitle}></p>
        <div className={styles.detail} style={{ padding: 'none' }}>
          <span>Total :</span> AED {totalAmount}
        </div>
        <p className={styles.sectionTitle}></p>
      </div>
    </div>
  );
}

function ProceedButton({ handleConfirm, stripeStatus, totalAmount }) {
  return (
    <div className="text-center">
      <PrimaryButton
        onClick={handleConfirm}
        disabled={stripeStatus === 'loading'}
      >
        {stripeStatus === 'loading' ? (
          <>
            <span className={styles.loader}>
              <FaSpinner />
            </span>{' '}
            Processing...
          </>
        ) : (
          <>Proceed To Payment (AED {totalAmount})</>
        )}
      </PrimaryButton>
    </div>
  );
}
