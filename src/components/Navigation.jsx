import Container from './Container';
import styled from 'styled-components';

export const pages = [
  { name: 'Process', link: '/#process' },
  { name: 'About', link: '/#about' },
  { name: 'FAQ', link: '#faq' },
  { name: 'Contact', link: 'mailto:info@dummyticket365.com' },
  { name: 'Book Now', link: '/#form', cta: true },
];

export default function Navigation() {
  return (
    <Header>
      <Container>
        <Nav>
          <LogoContainer />
          <NavLinks />
        </Nav>
      </Container>
    </Header>
  );
}

function LogoContainer() {
  return (
    <LogoDiv>
      <a href="/">
        <img
          src="/logo.png"
          alt="Dummy Ticket 365 Logo"
          title="Dummy Ticket 365 Logo"
        />
      </a>
    </LogoDiv>
  );
}

function NavLinks() {
  return (
    <StyledNavLinks>
      {pages.map((page, i) => (
        <StyledNavLink key={i} href={page.link} title={page.name}>
          {page.name}
        </StyledNavLink>
      ))}
    </StyledNavLinks>
  );
}

const Header = styled.header`
  background-color: transparent;
  padding: 10px 0;
  /* box-shadow: 0px 0px 20px 0px rgba(200, 200, 200, 1);
  -moz-box-shadow: 0px 0px 20px 0px rgba(200, 200, 200, 1);
  -webkit-box-shadow: 0px 0px 20px 0px rgba(200, 200, 200, 1); */
  @media only screen and (max-width: 991px) {
    display: none;
  }
`;

const LogoDiv = styled.div`
  width: 24%;
  padding: 0;
  & img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`;

const Nav = styled.nav`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 5px 0;
`;

const StyledNavLinks = styled.div`
  width: auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const StyledNavLink = styled.a`
  font-size: 14px;
  font-weight: 700;
  color: var(--grey-color-800);
  text-transform: uppercase;
  padding: 10px 5px;
  margin-right: 15px;
  transition-duration: 0.3s;
  &:hover {
    color: var(--primary-color-500);
  }
`;
