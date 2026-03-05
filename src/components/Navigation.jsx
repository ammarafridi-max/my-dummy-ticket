import { ChevronDown, Mail, Plane, Rss, ShieldPlus } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import Container from './Container';
import Currency from './Currency';

export const defaultPages = [
  {
    name: 'Dummy Tickets',
    links: ['/', '/booking/select-flights', '/booking/review-details'],
    icon: <Plane size={18} />,
    subpages: [
      {
        name: 'Dummy Ticket For Schengen Visa',
        link: '/dummy-ticket-schengen-visa',
      },
      {
        name: 'Dummy Ticket For US Visa',
        link: '/dummy-ticket-us-visa',
      },
      {
        name: 'Emirates Dummy Ticket',
        link: '/emirates-dummy-ticket',
      },
      {
        name: 'Etihad Dummy Ticket',
        link: '/etihad-dummy-ticket',
      },
    ],
  },
  { name: 'Travel Insurance', links: ['/travel-insurance'], icon: <ShieldPlus size={18} /> },
  { name: 'Blog', links: ['/blog'], icon: <Rss size={18} /> },
  { name: 'Email Us', links: ['mailto:info@mydummyticket.ae'], icon: <Mail size={18} /> },
];

export default function Navigation({ pages = defaultPages }) {
  const { pathname } = useLocation();

  return (
    <header className="hidden lg:block absolute top-0 left-0 right-0 z-50 bg-transparent">
      <Container>
        <nav className="flex items-center justify-between py-3 font-outfit">
          <div className="w-56 flex-shrink-0">
            <a href="/" className="block">
              <img
                src="/logo.webp"
                alt="MDT Logo"
                title="MDT"
                className="w-full h-auto object-contain"
              />
            </a>
          </div>

          <div className="flex items-center gap-1 rounded-2xl bg-transparent p-1">
            {pages.map((page, i) => (
              <div key={i} className="relative group">
                <a
                  href={page.links[0]}
                  title={page.name}
                  className={`flex items-center gap-1.5 text-[14px] font-medium py-2 px-3 capitalize transition-all duration-300 rounded-xl ${
                    page.links.includes(pathname)
                      ? 'bg-primary-100 text-primary-700'
                      : 'text-gray-700'
                  }`}
                >
                  {page.icon && <span className="text-sm">{page.icon}</span>}
                  <span>{page.name}</span>
                  <span>{page.subpages ? <ChevronDown size={18} /> : ''}</span>
                </a>

                {page?.subpages && (
                  <div className="hidden group-hover:flex flex-col w-72 absolute top-10 left-0 bg-white rounded-2xl border border-gray-200 shadow-xl overflow-hidden z-[60] p-2">
                    {page.subpages.map((subpage, j) => (
                      <a
                        key={j}
                        href={subpage.link}
                        className="text-[14px] font-medium text-gray-600 hover:text-gray-900 px-3 py-2.5 hover:bg-gray-100 rounded-xl"
                      >
                        {subpage.name}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <div className="ml-2 pl-2 border-l">
              <Currency />
            </div>
          </div>
        </nav>
      </Container>
    </header>
  );
}
