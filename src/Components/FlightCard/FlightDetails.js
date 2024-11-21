import styles from "./FlightCard.module.css";
import { FaArrowRightLong } from "react-icons/fa6";
import { formatISODuration } from "../../utils/formatISODuration";
import { formatISOTime } from "../../utils/formatISOTime";
import { baseURL } from "../../config";

export default function FlightDetails({ itinerary, airlineInfo }) {
  return (
    <div className={styles.flightDetail}>
      <div className={styles.airlineImgDiv}>
        <img
          src={`${baseURL}${airlineInfo.logo}` || ""}
          alt={`${airlineInfo.commonName} Logo`}
        />
        {/* <p>
          {itinerary.segments[0].carrierCode}-{itinerary.segments[0].number}
        </p> */}
      </div>
      <div className={styles.departureData}>
        {itinerary.segments[0].departure.iataCode}
        <br />
        <span>{formatISOTime(itinerary.segments[0].departure.at).date}</span>
        <br />
        <span>{formatISOTime(itinerary.segments[0].departure.at).time}</span>
      </div>
      <div className={styles.duration}>
        <span>{formatISODuration(itinerary.duration)}</span>
        <br />
        <FaArrowRightLong />
        <br />
        {itinerary.segments.length === 1 && <span>Non-stop</span>}
        {itinerary.segments.length === 2 && (
          <span>Stop in {itinerary.segments.at(0).arrival.iataCode}</span>
        )}
        {itinerary.segments.length >= 3 && <span>Multiple stops</span>}
      </div>
      <div className={styles.returnData}>
        {itinerary.segments[itinerary.segments.length - 1].arrival.iataCode}
        <br />
        <span>
          {
            formatISOTime(
              itinerary.segments[itinerary.segments.length - 1].arrival.at
            ).date
          }
        </span>
        <br />
        <span>
          {
            formatISOTime(
              itinerary.segments[itinerary.segments.length - 1].arrival.at
            ).time
          }
        </span>
      </div>
    </div>
  );
}
