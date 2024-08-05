import styles from "./FlightCard.module.css";
import { FaArrowRightLong } from "react-icons/fa6";
import PrimaryButton from "../Buttons/PrimaryButton";
import { formatISODuration } from "../../Services/formatISODuration";
import { formatISOTime } from "../../Services/formatISOTime";
import { useEffect, useState } from "react";
import FlightInformationModal from "../FlightInformationModal/FlightInformationModal";
import { useNavigate } from "react-router-dom";

export default function FlightCard({ itineraries, onSelectFlight, selected }) {
  const navigate = useNavigate();
  const [airlineDetail, setAirlineDetail] = useState("");
  const [showInformationModal, setShowInformationModal] = useState(false);

  return (
    <>
      {/* Card */}
      <div className={`${styles.flightCard}`}>
        <div className="row align-items-center">
          <div className={`${styles.flightDetail}`}>
            {itineraries.map((itinerary, i) => {
              return (
                <div
                  className={`row align-items-center justify-content-center ${
                    styles.segment
                  } ${i >= 1 && styles.borderBottom}`}
                  key={i}
                >
                  <div className={styles.airlineLogo}>{airlineDetail}</div>

                  <p className={styles.time}>
                    {itinerary.segments[0].departure.iataCode}
                    <br />
                    <span>
                      {formatISOTime(itinerary.segments[0].departure.at).date}
                    </span>
                    <br />
                    <span>
                      {formatISOTime(itinerary.segments[0].departure.at).time}
                    </span>
                  </p>

                  <p className={styles.duration}>
                    <span>{formatISODuration(itinerary.duration)}</span>
                    <br />
                    <FaArrowRightLong />
                    <br />
                    {itinerary.segments.length === 1 && <span>Non-stop</span>}
                    {itinerary.segments.length >= 2 && (
                      <span>{itinerary.segments.length - 1} stop(s)</span>
                    )}
                  </p>

                  <p className={styles.time}>
                    {
                      itinerary.segments[itinerary.segments.length - 1].arrival
                        .iataCode
                    }
                    <br />
                    <span>
                      {
                        formatISOTime(
                          itinerary.segments[itinerary.segments.length - 1]
                            .arrival.at
                        ).date
                      }
                    </span>
                    <br />
                    <span>
                      {
                        formatISOTime(
                          itinerary.segments[itinerary.segments.length - 1]
                            .arrival.at
                        ).time
                      }
                    </span>
                  </p>
                </div>
              );
            })}
          </div>
          <div className={styles.cta}>
            <p className={styles.price}>AED 49</p>

            {/* <PrimaryButton
              className={styles.selectBtn}
              onClick={onSelectFlight}
              disabled={selected}
            >
              {selected ? "Selected" : "Book Now"}
            </PrimaryButton> */}

            <PrimaryButton
              className={styles.selectBtn}
              onClick={() => {
                setShowInformationModal(true);
              }}
            >
              Select Flight
            </PrimaryButton>

            <FlightInformationModal
              onOpen={showInformationModal}
              onClose={() => setShowInformationModal(false)}
              itineraries={itineraries}
              onProceed={() => {
                navigate("/booking/passenger-details");
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
}

const sampleData = {
  type: "One Way Flight Reservation",
  creation: { time: "2:10:49 PM", date: "August 1, 2024" },
  numberOfTickets: 3,
  passengers: [
    {
      type: "Adult",
      title: "Mr",
      firstName: "Aneersha",
      lastName: "Esmail",
    },
    {
      type: "Adults",
      title: "Mrs",
      firstName: "Fathima",
      lastName: "Sahiyath",
    },
    {
      type: "Child",
      title: "Ms",
      firstName: "Aleema Mariyam",
      lastName: "Aneersha",
    },
  ],
  from: "DXB - Dubai",
  to: "PEK - Beijing",
  flights: [
    { type: "departure", airlineCode: "SV", number: "553" },
    { type: "return", airlineCode: "SV", number: "342" },
  ],
  departureDate: "September 11, 2024",
  phoneNumber: "+971507014898",
  emailAddress: "aneer.esmail@gmail.com",
  message: "",
};
