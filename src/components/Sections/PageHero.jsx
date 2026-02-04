import Breadcrumb from '../Breadcrumb';
import Container from '../Container';
import PageTitle from '../PageTitle';
import PrimarySection from '../PrimarySection';

export default function PageHero({ paths = [], title = '', subtitle = '' }) {
  return (
    <PrimarySection className="py-10 lg:pt-10 lg:pb-15 bg-gray-50">
      <Container>
        <div className="flex flex-col lg:items-center lg:justify-center lg:text-center lg:max-w-200 lg:mx-auto">
          <Breadcrumb paths={paths} />
          <PageTitle className="mt-3 mb-5">{title}</PageTitle>
          <p className="font-extralight text-sm lg:text-lg">{subtitle}</p>
        </div>
      </Container>
    </PrimarySection>
  );
}
