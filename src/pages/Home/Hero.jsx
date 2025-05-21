import styled from 'styled-components';
import PrimarySection from '../../components/PrimarySection';
import Container from '../../components/Container';
import PageTitle from '../../components/PageTitle';
import TicketForm from './TicketForm';

const StyledContainer = styled(Container)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  padding: 30px 0;
  @media screen and (max-width: 991px) {
    display: block;
    padding: 10px 0;
  }
`;

const LeftContent = styled.div`
  width: 55%;
  @media screen and (max-width: 991px) {
    width: 100%;
  }
`;

const RightContent = styled.div`
  width: 45%;
  background-color: white;
  padding: 30px;
  border-radius: 20px;
  -webkit-box-shadow: 0px 0px 20px 1px rgba(219, 219, 219, 1);
  -moz-box-shadow: 0px 0px 20px 1px rgba(219, 219, 219, 1);
  box-shadow: 0px 0px 20px 1px rgba(219, 219, 219, 1);
  @media screen and (max-width: 991px) {
    width: 100%;
    padding: 30px;
  }
`;

const Title = styled(PageTitle)`
  font-size: 38px;
  font-weight: 800;
  line-height: 1.5;
  @media screen and (max-width: 991px) {
    font-size: 26px;
  }
`;

const Price = styled.span`
  color: var(--primary-color-500);
  font-family: 'Merriweather';
`;

const Text = styled.p`
  font-size: 20px;
  margin-top: 20px;
  font-weight: 300;
  line-height: 1.4;
  @media screen and (max-width: 991px) {
    font-size: 16px;
    font-weight: 400;
    margin: 20px 0 30px 0;
  }
`;

export default function Hero() {
  return (
    <PrimarySection py="0" id="form">
      <StyledContainer>
        <LeftContent>
          <Title>Flight Reservations From AED49. Verifiable and Legit.</Title>
          <Text>
            Book verifiable flight reservations for visa applications. All
            legitimate reservations come with a PNR code that can be verified
            directly on airline websites.
          </Text>
        </LeftContent>
        <RightContent>
          <TicketForm />
        </RightContent>
      </StyledContainer>
    </PrimarySection>
  );
}

//  (
//             <a
//               href="https://app.invest.dubai.ae/DUL/98A318CC-6751-4CDB-A958-9FF407AF6049"
//               target="_blank"
//               rel="noreferrer"
//               title="Verify My Dummy Ticket's official license here."
//             >
//               verify here
//             </a>
//             ).

// function Form() {
//   const [currentForm, setCurrentForm] = useState('ticket');

//   return (
//     <>
//       {currentForm === 'ticket' && <TicketForm />}
//       {currentForm === 'hotel' && <HotelForm />}
//       <div className={`row ${styles.iconContainer}`}>
//         <div
//         className={`${styles.iconWithText} ${
//           currentForm === "ticket" && styles.active
//         }`}
//         onClick={() => setCurrentForm("ticket")}
//         >
//         <IoIosAirplane className={styles.icon} />
//         <p>Flights</p>
//         </div>

//         <div
//         className={`${styles.iconWithText} ${
//           currentForm === "hotel" && styles.active
//         }`}
//         onClick={() => setCurrentForm("hotel")}
//         >
//         <MdHotel className={styles.icon} />
//         <p>Hotels</p>
//         </div>
//       </div>
//     </>
//   );
// }
