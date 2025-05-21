'use client';
import styled from 'styled-components';

export default function SectionTitle({
  textAlign = 'left',
  children,
  type,
  subtitle,
  pt,
  pb,
  py,
  mt,
  mb,
  my,
}) {
  return (
    <Container pt={pt} pb={pb} py={py} mt={mt} mb={mb} my={my}>
      {subtitle && (
        <Subtitle textAlign={textAlign} type={type}>
          {subtitle}
        </Subtitle>
      )}
      <Title textAlign={textAlign} type={type}>
        {children}
      </Title>
    </Container>
  );
}

const Container = styled.div`
  padding-top: ${({ pt, py }) => pt || py || '0px'};
  padding-bottom: ${({ pb, py }) => pb || py || '0px'};
  margin-top: ${({ mt, my }) => mt || my || '0px'};
  margin-bottom: ${({ mb, my }) => mb || my || '0px'};
`;

const Subtitle = styled.p`
  color: ${({ type }) =>
    type === 'secondary'
      ? 'var(--primary-color-700)'
      : 'var(--primary-color-700)'};
  font-size: 16px;
  font-weight: 600;
  text-align: ${({ textAlign }) => textAlign};
  text-transform: uppercase;
  margin: 0;
  @media only screen and (max-width: 991px) {
    font-size: 14px;
    margin-bottom: 5px;
  }
`;

const Title = styled.h2`
  color: ${({ type }) => (type === 'secondary' ? 'black' : 'black')};
  text-align: ${({ textAlign }) => textAlign};
  font-size: 33px;
  font-weight: 500;
  margin: 0;
  @media only screen and (max-width: 991px) {
    font-size: 26px;
  }
`;
