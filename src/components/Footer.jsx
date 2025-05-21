import {
  FaStripe,
  FaGooglePay,
  FaApplePay,
  FaCcVisa,
  FaCcMastercard,
} from 'react-icons/fa';
import styled from 'styled-components';
import Container from './Container';
import Paragraph from './Paragraph';

const StyledFooter = styled.footer`
  padding: 20px 0;
  margin-top: 50px;
  background-color: var(--primary-color-900);
`;

const StyledContainer = styled(Container)`
  border-radius: 20px;
  padding: 30px 0;
  background-color: transparent;
  box-sizing: border-box;
`;

const PartnerImagesContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 30px;
  border-bottom: 1px solid rgb(240, 240, 240);
  margin-bottom: 15px;
  padding-bottom: 15px;
  @media screen and (max-width: 991px) {
    width: 100%;
    gap: 20px;
    margin: 0 auto 15px auto;
  }
`;

const PartnerIcon = styled.div`
  color: white;
  font-size: 40px;
  @media screen and (max-width: 991px) {
    height: 35px;
    width: 35px;
  }
`;

const LegalLinks = styled(Paragraph)`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
`;

const StyledCopyrightText = styled(Paragraph)`
  text-align: center;
  color: white;
  font-weight: 300;
  @media screen and (max-width: 991px) {
    font-size: 13px;
  }
`;

export default function Footer() {
  return (
    <StyledFooter>
      <StyledContainer>
        <PartnerImages />
        <CopyrightText />
      </StyledContainer>
    </StyledFooter>
  );
}

function PartnerImages() {
  return (
    <PartnerImagesContainer>
      <PartnerIcon as={FaStripe} />
      <PartnerIcon as={FaGooglePay} />
      <PartnerIcon as={FaApplePay} />
      <PartnerIcon as={FaCcVisa} />
      <PartnerIcon as={FaCcMastercard} />
    </PartnerImagesContainer>
  );
}

function CopyrightText() {
  return (
    <>
      <StyledCopyrightText color="white">
        © 2024 TRAVL Technologies. All Rights Reserved.
      </StyledCopyrightText>
      <LegalLinks color="white">
        <a href="/terms-and-conditions" className="color-white">
          Terms & Conditions
        </a>
        {'     '}|{'     '}
        <a href="/privacy-policy" className="color-white">
          Privacy Policy
        </a>
      </LegalLinks>
    </>
  );
}
