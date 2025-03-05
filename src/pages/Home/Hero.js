import React from 'react';
import styled from 'styled-components';
import PrimarySection from '../../components/Section/PrimarySection';
import TicketForm from './TicketForm';
import Container from '../../components/Container/Container';
import PageTitle from '../../components/Typography/PageTitle';

const Row = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  @media screen and (max-width: 991px) {
    display: block;
  }
`;

const LeftContent = styled.div`
  width: 50%;
  @media screen and (max-width: 991px) {
    width: 100%;
  }
`;

const RightContent = styled.div`
  width: 50%;
  background-color: white;
  padding: 40px;
  border-radius: 20px;
  -webkit-box-shadow: 0px 0px 20px 1px rgba(219, 219, 219, 1);
  -moz-box-shadow: 0px 0px 20px 1px rgba(219, 219, 219, 1);
  box-shadow: 0px 0px 20px 1px rgba(219, 219, 219, 1);
  @media screen and (max-width: 991px) {
    width: 100%;
    padding: 30px;
  }
`;

const Price = styled.span`
  color: var(--primary-color-700);
`;

const Text = styled.p`
  font-size: 19px;
  margin-top: 20px;
  font-weight: 500;
  line-height: 1.7;
  @media screen and (max-width: 991px) {
    margin: 20px 0;
  }
`;

export default function Hero() {
  return (
    <PrimarySection pt="50px" pb="50px" id="form">
      <Container>
        <Row>
          <LeftContent>
            <PageTitle fontSize="40px">
              Get your dummy ticket From <Price>AED 49</Price>
            </PageTitle>
            <Text>
              Book confirmed flight reservations for visa application from
              licensed Dubai agency (
              <a
                href="https://app.invest.dubai.ae/DUL/98A318CC-6751-4CDB-A958-9FF407AF6049"
                target="_blank"
                rel="noreferrer"
                title="Verify My Dummy Ticket's official license here."
              >
                verify here
              </a>
              ). All bookings have a PNR code that you can check on airline
              websites.
            </Text>
          </LeftContent>
          <RightContent>
            <TicketForm />
          </RightContent>
        </Row>
      </Container>
    </PrimarySection>
  );
}

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
