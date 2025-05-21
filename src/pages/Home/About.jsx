import styled from 'styled-components';
import {
  MdOutlineAirplaneTicket,
  MdOutlineHealthAndSafety,
  MdOutlineHotel,
} from 'react-icons/md';
import PrimarySection from '../../components/PrimarySection';
import Container from '../../components/Container';
import SectionTitle from '../../components/SectionTitle';
import Paragraph from '../../components/Paragraph';

const StyledContainer = styled(Container)`
  display: flex;
  align-items: center;
  gap: 20px;
  @media screen and (max-width: 991px) {
    display: block;
  }
`;

const LeftContainer = styled.div`
  width: 58%;
  padding: 0px;
  @media screen and (max-width: 991px) {
    width: 100%;
  }
`;

export default function About() {
  return (
    <PrimarySection id="about" pt="0px" pb="100px">
      <StyledContainer>
        <LeftContainer>
          <SectionTitle mb="30px" subtitle="About My Dummy Ticket">
            Who We Are
          </SectionTitle>
          <Paragraph fontSize="18px" color="black" mb="20px">
            My Dummy Ticket is a service of Travl Technologies LLC, a licensed
            travel agency based in Dubai, UAE. We offer air tickets, hotel
            bookings, travel insurance, flight reservations for visas, airport
            transfers, tours, and holiday packages to thousands of satisfied
            customers annually.
          </Paragraph>
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
        </LeftContainer>
        <Gallery />
      </StyledContainer>
    </PrimarySection>
  );
}

const GalleryContainer = styled.div`
  width: 42%;
  min-height: 300px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 15px;
  padding: 0px;
  @media screen and (max-width: 991px) {
    min-height: 400px;
    margin-top: 50px;
    width: 100%;
  }
`;

const Col1 = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const Col2 = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const SmallImage = styled.div`
  background-color: var(--grey-color-100);
  border-radius: 5px;
  height: 20%;
  padding: 30px;
  overflow: hidden;
  & img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`;

const LargeImage = styled.div`
  background-color: white;
  border-radius: 5px;
  height: 80%;
  overflow: hidden;
  & img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

function Gallery() {
  return (
    <GalleryContainer>
      <Col1>
        <SmallImage>
          <img
            src="/trustpilot.webp"
            alt="My Dummy Ticket has received over 50 reviews on Trustpilot, with an average rating of 4.5+"
          />
        </SmallImage>
        <LargeImage>
          <img
            src="/happy-traveler1.webp"
            alt="A happy couple receiving their Schengen visa"
          />
        </LargeImage>
      </Col1>
      <Col2>
        <LargeImage>
          <img
            src="/happy-traveler2.webp"
            alt="A happy couple with their passports, dummy tickets, and other related documents for their visa appointment"
          />
        </LargeImage>
        <SmallImage>
          <img
            src="/travel-icon.webp"
            alt="Dummy tickets, hotel reservations, and travel insurance"
          />
        </SmallImage>
      </Col2>
    </GalleryContainer>
  );
}

const IconContainer = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: 1fr 11fr;
  margin-top: 20px;
  @media screen and (max-width: 991px) {
    grid-template-columns: 2fr 10fr;
  }
`;

const IconDiv = styled.div`
  width: 40px;
  height: 40px;
  font-size: 20px;
  border-radius: 100px;
  background-color: var(--primary-color-500);
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const IconWithText = ({ icon, title, description }) => (
  <IconContainer>
    <IconDiv>{icon}</IconDiv>
    <Paragraph fontSize="18px">
      <span className="semi-bold">{title}: </span>
      {description}
    </Paragraph>
  </IconContainer>
);

// function Gallery() {
//   return (
//     <div className={`col-12 col-md-6 col-lg-5 row mx-auto p-0 ${styles.gallery}`}>
//       <div className={styles.grid1}>
//         <div className={styles.img1}>
//           <a href="https://www.trustpilot.com/review/mydummyticket.ae" target="_blank">
//             Rated 4.5+ on <img src={trustpilot} className={styles.trustpilotIcon} />
//           </a>
//         </div>
//         <div className={styles.img2}>
//           <img src={happyTraveler1} />
//         </div>
//       </div>
//       <div className={styles.grid2}>
//         <div className={styles.img1}>
//           <img src={happyTraveler2} />
//         </div>
//         <div className={styles.img2}>
//           <img src={travelIcon} className={styles.travelIcon} />
//         </div>
//       </div>
//     </div>
//   );
// }
