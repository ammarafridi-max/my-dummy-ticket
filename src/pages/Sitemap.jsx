import Container from '../components/Container';
import PageTitle from '../components/PageTitle';
import PrimarySection from '../components/PrimarySection';

const pages = [
  {
    name: 'Home',
    href: '/',
  },
  {
    name: 'Flight Reservation',
    href: '/flight-reservation',
  },
  {
    name: 'Dummy Ticket',
    href: '/dummy-ticket',
  },
  {
    name: 'Onward Ticket',
    href: '/onward-ticket',
  },
  {
    name: 'Frequently Asked Questions',
    href: '/faq',
  },
  {
    name: 'Terms and Conditions',
    href: '/terms-and-conditions',
  },
  {
    name: 'Privacy Policy',
    href: '/privacy-policy',
  },
];

export default function Sitemap() {
  return (
    <>
      <PrimarySection className="bg-gray-100 py-20 w-full overflow-x-hidden">
        <Container>
          <PageTitle>Sitemap</PageTitle>

          <ul className="mt-6 font-outfit list-disc list-inside text-gray-800 space-y-3 text-[16px]">
            {pages?.map((page, i) => (
              <li key={i}>
                <strong>{page?.name}</strong> —{' '}
                <a href={page?.href} className="text-[#ff6b00] hover:underline">
                  https://www.mydummyticket.ae{page?.href}
                </a>
              </li>
            ))}
          </ul>
        </Container>
      </PrimarySection>
    </>
  );
}
