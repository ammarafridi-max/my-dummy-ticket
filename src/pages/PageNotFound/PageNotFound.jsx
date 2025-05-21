import styled from 'styled-components';
import PrimaryButton from '../../components/PrimaryButton';
import Container from '../../components/Container';
import PrimarySection from '../../components/PrimarySection';

const Title = styled.h1`
  text-align: center;
  color: var(--primary-color-dark);
  font-size: 80px;
  font-weight: 700;
`;

const Subtitle = styled.h2`
  text-align: center;
  font-size: 30px;
  font-weight: 400;
`;

const CenteredDiv = styled.div`
  text-align: center;
`;

export default function PageNotFound() {
  return (
    <PrimarySection py="150px">
      <Container>
        <CenteredDiv>
          <Title>404 Error!</Title>
          <Subtitle>The page you're looking for doesn't exist.</Subtitle>
          <PrimaryButton mr="8px" href="/">
            Go to Home
          </PrimaryButton>
        </CenteredDiv>
      </Container>
    </PrimarySection>
  );
}
