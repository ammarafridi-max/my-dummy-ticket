import { useState } from 'react';
import { pages } from './Navigation';
import { HiOutlineXMark, HiOutlineBars3 } from 'react-icons/hi2';
import Container from './Container';
import logo from '/logo.png';
import styled from 'styled-components';

const Nav = styled.nav`
  display: none;
  @media only screen and (max-width: 991px) {
    display: block;
    padding: 15px 0;
    /* box-shadow: 0px 0px 20px -5px rgba(200, 200, 200, 1);
    -moz-box-shadow: 0px 0px 20px -5px rgba(200, 200, 200, 1);
    -webkit-box-shadow: 0px 0px 20px -5px rgba(200, 200, 200, 1); */
  }
`;

const StyledContainer = styled(Container)`
  display: grid;
  grid-template-columns: auto 1fr;
`;

const LogoDiv = styled.a`
  width: 60%;
  height: fit-content;
  display: flex;
  align-items: center;
  justify-content: center;
  & img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const Button = styled.button`
  margin: auto 0;
  background-color: transparent;
  text-align: right;
  padding: 0;
  border: none;
  & * {
    font-size: 30px !important;
  }
`;

export default function MobileNavigation() {
  const [menuOpen, setMenuOpen] = useState(false);
  function handleClick() {
    if (menuOpen === true) {
      setMenuOpen(false);
    } else {
      setMenuOpen(true);
    }
  }
  return (
    <Nav>
      <StyledContainer>
        <LogoDiv href="/">
          <img
            src={logo}
            alt="My Dummy Ticket Logo"
            title="My Dummy Ticket Logo"
          />
        </LogoDiv>
        <Button onClick={handleClick} name="mobileMenu">
          {menuOpen ? <HiOutlineXMark /> : <HiOutlineBars3 />}
        </Button>
      </StyledContainer>
      {menuOpen && (
        <MenuList
          onClose={() => {
            setMenuOpen(false);
          }}
        />
      )}
    </Nav>
  );
}

const Menu = styled.div`
  width: 100%;
  margin: 0 auto;
  position: absolute;
  left: 0%;
  right: 0%;
  background-color: white;
  border: 1px solid rgb(150, 150, 150);
  border-radius: 0px;
  overflow: hidden;
  margin-top: 15px;
  &:nth-last-child() {
    margin-bottom: 0px;
  }
`;

const Item = styled.p`
  padding: 12.5px 20px;
  text-align: center;
  transition-duration: 0.3s;
  color: black;
  &:hover {
    background-color: rgb(242, 242, 242);
  }
  &:nth-of-type(3) {
    margin-bottom: 0;
  }
`;

function MenuList({ onClose }) {
  return (
    <Menu>
      {pages.map((page, i) => (
        <a key={i} href={page.link} onClick={onClose}>
          <Item>{page.name}</Item>
        </a>
      ))}
    </Menu>
  );
}
