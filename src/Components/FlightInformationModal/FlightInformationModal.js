import styles from "./FlightInformationModal.module.css";
import { IoClose } from "react-icons/io5";
import { useEffect, useState } from "react";
import { FaArrowRightLong } from "react-icons/fa6";
import { formatISOTime } from "../../Services/formatISOTime";
import { formatISODuration } from "../../Services/formatISODuration";
import PrimaryButton from "../Buttons/PrimaryButton";

export default function FlightInformationModal({
  children,
  onClose,
  onOpen,
  onProceed,
  itineraries,
}) {
  const [showModalClassName, setShowModalClassName] = useState(false);

  useEffect(() => {
    function modalClassName() {
      setShowModalClassName(onOpen);
    }
    modalClassName();
  }, [onOpen]);

  return (
    <div
      className={`${styles.modalBg} ${
        showModalClassName === false ? styles.hidden : styles.show
      }`}
    >
      <div className={styles.modalContainer}>
        <div className={styles.modalHeader}>
          {/* Title */}
          <p>Flight Information</p>
          <IoClose className={styles.closeIcon} onClick={onClose} />
        </div>

        <div className={styles.modalBody}>
          {itineraries.map((itinerary, i) => {
            return (
              <div key={i}>
                {i === 0 ? (
                  <p className={styles.flightType}>Departure Flight:</p>
                ) : (
                  <p className={styles.flightType}>Return Flight:</p>
                )}

                {itinerary.segments.map((segment, i) => {
                  return (
                    <div className={styles.flightInformation} key={i}>
                      <p className={styles.indexNumber}>{i + 1}</p>
                      <p className={styles.flightDestination}>
                        {segment.departure.iataCode}
                        <br />
                        <span>
                          {formatISOTime(segment.departure.at).date} (
                          {formatISOTime(segment.departure.at).time})
                        </span>
                      </p>
                      <p className={styles.rightIcon}>
                        <span>{formatISODuration(segment.duration)}</span>
                        <br />
                        <FaArrowRightLong />
                      </p>
                      <p className={styles.flightDestination}>
                        {segment.arrival.iataCode}
                        <br />
                        <span>
                          {formatISOTime(segment.arrival.at).date} (
                          {formatISOTime(segment.arrival.at).time})
                        </span>
                      </p>
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
        <div className={styles.modalFooter}>
          <PrimaryButton onClick={onProceed}>Proceed</PrimaryButton>
        </div>
      </div>
    </div>
  );
}

