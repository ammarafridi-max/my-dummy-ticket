import PrimaryButton from '../../components/PrimaryButton';
import Container from '../../components/Container';
import PrimarySection from '../../components/PrimarySection';
import { Helmet } from 'react-helmet-async';

export default function PageNotFound() {
  return (
    <>
      <Helmet>
        <title>Page Not Found!</title>
        <meta name="robots" content="none" />
      </Helmet>
      <PrimarySection py="150px">
        <Container>
          <div className="text-center">
            <h1 className="font-merriweather text-center text-primary-800 text-7xl font-bold">
              404 Error!
            </h1>
            <h2 className="font-nunito text-center text-3xl font-normal">
              The page you're looking for doesn't exist.
            </h2>
            <PrimaryButton mr="8px" href="/">
              Go to Home
            </PrimaryButton>
          </div>
        </Container>
      </PrimarySection>
    </>
  );
}
