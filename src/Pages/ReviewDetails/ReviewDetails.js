import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchFormDetails } from "../../redux/slices/fetchReviewDetailsSlice";
import { createTicket } from "../../redux/slices/createTicketSlice";
import styles from "./ReviewDetails.module.css";
import PrimaryButton from "../../Components/Buttons/PrimaryButton";
import {
  FaPlaneDeparture,
  FaPlaneArrival,
  FaDollarSign,
  FaEnvelope,
  FaPhone,
  FaTicket,
  FaArrowAltCircleLeft,
  FaSpinner,
} from "react-icons/fa";
import { IoMdCalendar, IoMdClock, IoMdPricetag } from "react-icons/io";
import { AiOutlineArrowRight } from "react-icons/ai";
import { formatISOTime } from "../../Services/formatISOTime";
import { FaArrowLeftLong, FaArrowRightLong } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function ReviewDetails() {
  const dispatch = useDispatch();
  const { formDetails, ticketPrice, status } = useSelector(
    (state) => state.formDetails
  );
  const { stripeStatus, data, stripeError } = useSelector(
    (state) => state.createTicket
  );

  const navigate = useNavigate();
  const sessionId = localStorage.getItem("SESSION_ID");
  useEffect(() => {
    if (sessionId) {
      dispatch(fetchFormDetails(sessionId));
    }
  }, [dispatch]);

  const handleConfirm = () => {
    if (sessionId) {
      dispatch(createTicket({ ...formDetails, ticketPrice }));
    }
  };

  useEffect(() => {
    if (stripeError) {
      toast.error(` Error: ${stripeError}`, {
        position: "top-right",
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
    if (stripeStatus === "succeeded" && data?.url) {
      window.location.href = data.url;
    }
  }, [stripeStatus, data]);

  const handleNavigate = async () => {
    navigate("/booking/select-flights");
  };

  let content;

  if (status === "loading") {
    content = <p className={styles.loading}>Loading...</p>;
  } else if (status === "succeeded") {
    const groupedPassengers = formDetails.passengers.reduce(
      (acc, passenger) => {
        if (!acc[passenger.type]) {
          acc[passenger.type] = [];
        }
        acc[passenger.type].push(passenger);
        return acc;
      },
      {}
    );

    const { adults, children, infants } = formDetails.quantity;

    const totalQuantity = adults + children + infants;
    const ticketAvailability = formDetails.ticketAvailability;

    const price = parseFloat(ticketPrice);

    let additionPrice = 0;
    let validityText = "48 hours";
    if (formDetails.ticketValidity === "7d") {
      additionPrice = 20;
      validityText = " 7 days";
    }
    if (formDetails.ticketValidity === "14d") {
      additionPrice = 26;
      validityText = " 14 days";
    }

    let statusText;

    if (formDetails.status === "REVIEW_ORDER") {
      statusText = "Pending Payment";
    }

    let availability;
    if (formDetails.ticketAvailability.immediate === true) {
      availability = true;
    }
    if (formDetails.ticketAvailability.immediate === false) {
      availability = false;
    }

    const [airline] = formDetails.flightDetails.airlineDetails;

    content = (
      <>
        <div className={styles.backbtn}>
          <span
            className={styles.icon}
            onClick={handleNavigate}
            style={{ cursor: "pointer" }}
          >
            <PrimaryButton>
              <FaArrowLeftLong style={{ marginRight: 10 }} /> Back
            </PrimaryButton>
          </span>
        </div>
        <div className={styles.container}>
          <h1 className={styles.title}>Flight Booking Review</h1>

          <div className={styles.box}>
            <div className={styles.section}>
              <h2 className={styles.sectionTitle}>Booking Details</h2>

              <div className={styles.detail}>
                <strong>Booking Date:</strong> {formDetails.creation.date}
              </div>

              <div className={styles.detail}>
                <strong>Email:</strong> {formDetails.email}
              </div>
              <div className={styles.detail}>
                <strong>Phone Number:</strong> {formDetails.phoneNumber.code}{" "}
                {formDetails.phoneNumber.digits}
              </div>
              {formDetails.message && (
                <div className={styles.detail}>
                  <strong>Message:</strong> {formDetails.message}
                </div>
              )}
              <div className={styles.detail}>
                <strong>Status:</strong> {statusText}
              </div>
            </div>

            <div className={styles.section}>
              <h2 className={styles.sectionTitle}>Flight Information</h2>
              <div className={styles.detail}>
                <strong>From:</strong> {formDetails.from}
              </div>
              <div className={styles.detail}>
                <strong>To:</strong> {formDetails.to}
              </div>
              <div className={styles.detail}>
                <strong>Departure Date:</strong> {formDetails.departureDate}
              </div>

              <div className={styles.detail}>
                <strong>Departure Time:</strong>{" "}
                {
                  formatISOTime(
                    formDetails.flightDetails.itineraries[0].segments[0]
                      .departure.at
                  ).time
                }
              </div>

              {formDetails.arrivalDate && (
                <>
                  <div className={styles.detail}>
                    <strong>Return Date:</strong> {formDetails.arrivalDate}
                  </div>
                </>
              )}
            </div>
          </div>

          <div className={styles.box}>
            <div className={styles.section}>
              <h2 className={styles.sectionTitle}>Ticket Availability</h2>

              <div className={styles.detail}>
                <strong>Ticket Validity :</strong> {validityText}
              </div>

              <div className={styles.detail}>
                {availability ? (
                  <>
                    <strong> Availability Type: </strong> Immediate{" "}
                  </>
                ) : (
                  <>
                    <strong> Availability Type: </strong> Later{" "}
                  </>
                )}
              </div>
              {!availability && (
                <>
                  <div className={styles.detail}>
                    <strong>Receipt Date:</strong>{" "}
                    {ticketAvailability.receiptDate}
                  </div>
                </>
              )}
            </div>
            <div className={styles.section}>
              <h2 className={styles.sectionTitle}>Passenger Information</h2>

              {Object.keys(groupedPassengers).map((type) => (
                <div key={type} className={styles.passengerGroup}>
                  <strong className={styles.passengerGroupTitle}>
                    {type.charAt(0).toUpperCase() + type.slice(1)} Passengers
                  </strong>
                  {groupedPassengers[type].map((passenger, index) => (
                    <div key={index} className={styles.passenger}>
                      <strong>
                        {type} {index + 1}:
                      </strong>{" "}
                      {passenger.title} {passenger.firstName}{" "}
                      {passenger.lastName}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>

          <div className={styles.box}>
            <div className={styles.section}>
              <h2 className={styles.sectionTitle} style={{ fontWeight: 1000 }}>
                ORDER TOTAL
              </h2>

              <div className={styles.detail}>
                <strong>Base Price :</strong> AED {49 * totalQuantity}
              </div>
              <div className={styles.detail}>
                <strong>Additional Price :</strong> 
                {additionPrice === 0 ? ("Nill"):( "AED", additionPrice * totalQuantity)}
              </div>
              <p className={styles.sectionTitle}></p>

              <div className={styles.detail} style={{ padding: "none" }}>
                <strong>Total :</strong> AED {price}
              </div>
              <p className={styles.sectionTitle}></p>
            </div>
          </div>

          <div className={styles.btnBox}>
           
            <div className={styles.buttonContainer}>
              <PrimaryButton
                onClick={handleConfirm}
                disabled={stripeStatus === "loading"}
              >
                {stripeStatus === "loading" ? (
                  <>
                    <span className={styles.loader}>
                      <FaSpinner />
                    </span>{" "}
                    Processing...
                  </>
                ) : (
                  <>Proceed To Payment (AED {price})</>
                )}
              </PrimaryButton>
            </div>
          </div>
        </div>
      </>
    );
  }

  return <div>{content}</div>;
}
