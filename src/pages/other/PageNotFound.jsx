import PrimaryButton from '../../components/PrimaryButton';
import Container from '../../components/Container';
import PrimarySection from '../../components/PrimarySection';

export default function PageNotFound() {
  return (
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
  );
}
