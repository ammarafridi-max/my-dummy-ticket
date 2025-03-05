import styled from 'styled-components';
import {
  MdOutlineAirplaneTicket,
  MdOutlineHealthAndSafety,
  MdOutlineHotel,
} from 'react-icons/md';
import PrimarySection from '../../components/Section/PrimarySection';
import Container from '../../components/Container/Container';
import SectionTitle from '../../components/Typography/SectionTitle';
import Paragraph from '../../components/Typography/Paragraph';
import trustpilot from '../../assets/images/trustpilot.png';
import travelIcon from '../../assets/images/travel-icon.png';
import happyTraveler1 from '../../assets/images/happy-traveler1.png';
import happyTraveler2 from '../../assets/images/happy-traveler2.png';

const StyledContainer = styled(Container)`
  display: flex;
  gap: 20px;
  align-items: center;
  @media screen and (max-width: 991px) {
    display: block;
  }
`;

const LeftContainer = styled.div`
  width: 58%;
  @media screen and (max-width: 991px) {
    width: 100%;
  }
`;

export default function About() {
  return (
    <PrimarySection id="about" pt="100px" pb="0">
      <StyledContainer>
        <LeftContainer>
          <SectionTitle mb="30px" subtitle="About My Dummy Ticket">
            Who We Are
          </SectionTitle>
          <Paragraph fontSize="18px" color="black" mb="20px">
            My Dummy Ticket is a service of Travl Technologies LLC, a licensed
            travel agency based in Dubai, UAE. We offer air tickets, hotel
            bookings, travel insurance, dummy flight reservations for visas,
            airport transfers, tours, and holiday packages to thousands of
            satisfied customers annually.
          </Paragraph>
          <IconWithText
            icon={<MdOutlineAirplaneTicket />}
            title="Dummy Tickets"
            description="Dummy ticket are used as proof of onward travel for visa applications or airport requirements."
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
  height: 500px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 15px;
  padding: 0px;
  @media screen and (max-width: 991px) {
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

const Img1Container = styled.div`
  background-color: white;
  border-radius: 5px;
  height: 27%;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  & img {
    width: 100%;
    object-fit: contain;
    padding: 20px;
  }
`;

const Img2Container = styled.div`
  background-color: white;
  border-radius: 5px;
  height: 73%;
  overflow: hidden;
  & img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const Img3Container = styled.div`
  background-color: white;
  border-radius: 5px;
  height: 73%;
  overflow: hidden;
  & img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const Img4Container = styled.div`
  background-color: white;
  border-radius: 5px;
  height: 27%;
  & img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    padding: 20px;
  }
`;

function Gallery() {
  return (
    <GalleryContainer>
      <Col1>
        <Img1Container>
          <img src={trustpilot} />
        </Img1Container>
        <Img2Container>
          <img src={happyTraveler1} />
        </Img2Container>
      </Col1>
      <Col2>
        <Img3Container>
          <img src={happyTraveler2} />
        </Img3Container>
        <Img4Container>
          <img src={travelIcon} />
        </Img4Container>
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
