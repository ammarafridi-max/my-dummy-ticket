import React from 'react';
import {
  FaStripe,
  FaGooglePay,
  FaApplePay,
  FaCcVisa,
  FaCcMastercard,
} from 'react-icons/fa';
import styled from 'styled-components';
import Container from '../components/Container/Container';
import Paragraph from '../components/Typography/Paragraph';

const StyledFooter = styled.footer`
  padding: 50px 0;
  background-color: white;
`;

const StyledContainer = styled(Container)`
  border-radius: 20px;
  padding: 30px;
  background-color: var(--primary-color-600);
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
    width: 90%;
    gap: 20px;
    margin: 0 auto 15px auto;
  }
`;

const PartnerIcon = styled.div`
  color: white;
  font-size: 40px;
  @media screen and (max-width: 991px) {
    height: 60px;
    width: 60px;
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
      <StyledCopyrightText color="white" textAlign="center">
        © 2024 TRAVL Technologies. All Rights Reserved.
      </StyledCopyrightText>
      <LegalLinks color="white" textAlign="center">
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
