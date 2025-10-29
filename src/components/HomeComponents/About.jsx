import {
  MdOutlineAirplaneTicket,
  MdOutlineHealthAndSafety,
  MdOutlineHotel,
} from 'react-icons/md';
import PrimarySection from '../PrimarySection';
import Container from '../Container';
import SectionTitle from '../SectionTitle';

export default function About() {
  return (
    <PrimarySection className="pt-10" id="about">
      <Container className="block md:flex items-center gap-5">
        <div className="w-full md:w-[58%] p-0">
          <SectionTitle mb="7" subtitle="About MDT">
            Who We Are
          </SectionTitle>
          <p className="font-light font-nunito text-md md:text-lg mb-5">
            We are a licensed travel agency based in Dubai, UAE. We offer air
            tickets, hotel bookings, travel insurance, flight reservations for
            visas, airport transfers, tours, and holiday packages to thousands
            of satisfied customers annually.
          </p>
          <IconWithText
            icon={<MdOutlineAirplaneTicket />}
            title="Flight Reservations"
            description="Our flight reservations are used as proof of onward travel for visa applications or airport requirements."
          />
          <IconWithText
            icon={<MdOutlineHotel />}
            title="Hotel Reservations"
            description="Verifiable hotel bookings often required for visa applications, ensuring proof of stay."
          />
          <IconWithText
            icon={<MdOutlineHealthAndSafety />}
            title="Travel Insurance"
            description="Comprehensive policies covering medical emergencies, trip cancellations, and travel delays."
          />
        </div>
        <Gallery />
      </Container>
    </PrimarySection>
  );
}

function Gallery() {
  return (
    <div className="w-full min-h-[400px] mt-12.5 md:w-[42%] md:min-h-[300px] grid grid-cols-2 gap-3.75 md:p-0">
      <div className="flex flex-col gap-3.75">
        <div className="bg-gray-100 rounded-sm h-[20%] overflow-hidden p-5.5">
          <img
            className="w-full h-full object-contain"
            src="/trustpilot.webp"
            alt="MDT has received over 50 reviews on Trustpilot, with an average rating of 4.5+"
          />
        </div>
        <div className="bg-white rounded-sm h-[80%] overflow-hidden">
          <img
            className="w-full h-full object-cover"
            src="/happy-traveler1.webp"
            alt="A happy couple receiving their Schengen visa"
          />
        </div>
      </div>
      <div className="flex flex-col gap-3.75">
        <div className="bg-white rounded-sm h-[80%] overflow-hidden">
          <img
            className="w-full h-full object-cover"
            src="/happy-traveler2.webp"
            alt="A happy couple with their passports, flight reservations, and other related documents for their visa appointment"
          />
        </div>
        <div className="bg-gray-100 rounded-sm h-[20%] overflow-hidden p-5.5">
          <img
            className="w-full h-full object-contain"
            src="/travel-icon.webp"
            alt="Flight reservations, hotel reservations, and travel insurance"
          />
        </div>
      </div>
    </div>
  );
}

const IconWithText = ({ icon, title, description }) => (
  <div className="grid grid-cols-[2fr_10fr] md:grid-cols-[1fr_11fr] items-center mt-5">
    <div className="w-[40px] h-[40px] text-xl rounded-full bg-primary-500 text-white flex items-center justify-center">
      {icon}
    </div>
    <p className="text-md md:text-lg font-light">
      <span className="font-semibold">{title}: </span>
      {description}
    </p>
  </div>
);
