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
    name: 'Dummy Ticket For Schengen Visa',
    href: '/dummy-ticket-schengen-visa',
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
    name: 'Blog',
    href: '/blog',
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
              <li key={i} className="flex gap-3">
                <a href={page?.href} className="text-accent-500 hover:underline">
                  {page?.name}
                </a>
              </li>
            ))}
          </ul>
        </Container>
      </PrimarySection>
    </>
  );
}
