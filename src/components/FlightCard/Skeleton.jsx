import React from 'react';
import styled, { keyframes } from 'styled-components';

const pulse = keyframes`
  0% {
    background-color: #e0e0e0;
  }
  50% {
    background-color: #f5f5f5;
  }
  100% {
    background-color: #e0e0e0;
  }
`;

const Container = styled.div`
  width: 100%;
  padding: 20px;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0px 0px 10px 2px rgba(240, 240, 240, 1);
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 20px;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const Body = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  flex-direction: column;
  gap: 8px;
`;

const Footer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const Image = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: #e0e0e0;
  animation: ${pulse} 1.5s infinite ease-in-out;
`;

const Details = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  flex: 1;
`;

const TextShort = styled.div`
  height: 12px;
  background: #e0e0e0;
  animation: ${pulse} 1.5s infinite ease-in-out;
  border-radius: 4px;
  width: 50%;
`;

const TextLong = styled.div`
  height: 12px;
  background: #e0e0e0;
  animation: ${pulse} 1.5s infinite ease-in-out;
  border-radius: 4px;
  width: 100%;
`;

const Detail = styled.div`
  width: 100%;
  height: 16px;
  background: #e0e0e0;
  animation: ${pulse} 1.5s infinite ease-in-out;
  border-radius: 4px;
`;

const Price = styled.div`
  width: 30%;
  height: 20px;
  background: #e0e0e0;
  animation: ${pulse} 1.5s infinite ease-in-out;
  border-radius: 4px;
`;

const Button = styled.div`
  width: 100px;
  height: 36px;
  background: #e0e0e0;
  animation: ${pulse} 1.5s infinite ease-in-out;
  border-radius: 20px;
`;

export default function Skeleton() {
  return (
    <Container>
      <Header>
        <Image />
        <Details>
          <TextShort />
          <TextLong />
        </Details>
      </Header>
      <Body>
        <Detail />
        <Detail />
      </Body>
      <Footer>
        <Price />
        <Button />
      </Footer>
    </Container>
  );
}
