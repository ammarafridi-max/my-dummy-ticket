import { Outlet, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import Container from '../../components/Container/Container';
import PrimarySection from '../../components/Section/PrimarySection';

const Body = styled.div`
  width: 80%;
  margin: 0 auto;
  @media screen and (max-width: 991px) {
    width: 100%;
  }
`;

export default function BookingLayout() {
  return (
    <PrimarySection pt="0" pb="0">
      <Container>
        <Menu />
        <Body>
          <Outlet />
        </Body>
      </Container>
    </PrimarySection>
  );
}

const MenuContainer = styled.div`
  background-color: white;
  width: 100%;
  margin-top: 30px;
  margin-bottom: 50px;
  display: flex;
  align-items: center;
  -ms-overflow-style: none;
  scrollbar-width: none;
  border-radius: 5px;
  box-shadow: 0px 0px 10px 1px rgba(190, 190, 190, 1);
  -webkit-box-shadow: 0px 0px 10px 1px rgba(190, 190, 190, 1);
  -moz-box-shadow: 0px 0px 10px 1px rgba(190, 190, 190, 1);
  &::-webkit-scrollbar {
    display: none;
  }
  @media screen and (max-width: 991px) {
    flex-direction: column;
    overflow: scroll;
  }
`;

const MenuItem = styled.button`
  width: 33%;
  padding: 10px 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  outline: none;
  background-color: white;
  &.active {
    border-radius: 5px;
    background-color: var(--primary-color-500);
    color: white;
  }
  @media screen and (max-width: 991px) {
    width: 100%;
    justify-content: start;
  }
`;

const Step = styled.p`
  width: 30px;
  height: 30px;
  background-color: var(--primary-color-200);
  color: var(--primary-color-600);
  border-radius: 100px;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 10px;
`;

function Menu() {
  const { pathname } = useLocation();

  return (
    <MenuContainer>
      <MenuItem
        className={pathname === '/booking/select-flights' ? 'active' : ''}
      >
        <Step>1</Step>
        <p>Select Flights</p>
      </MenuItem>

      <MenuItem
        className={pathname === '/booking/review-details' ? 'active' : ''}
      >
        <Step>2</Step>
        <p>Review Details</p>
      </MenuItem>

      <MenuItem>
        <Step>3</Step>
        <p>Payment</p>
      </MenuItem>
    </MenuContainer>
  );
}
