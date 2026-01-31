import { ChevronDown, Mail, Plane, Rss, ShieldPlus } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import Container from './Container';

export const defaultPages = [
  {
    name: 'Dummy Tickets',
    links: ['/', '/booking/select-flights', '/booking/review-details'],
    icon: <Plane size={18} />,
    subpages: [
      {
        name: 'For Schengen Visa',
        link: '/dummy-ticket-schengen-visa',
      },
      {
        name: 'For US Visa',
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
    <header className="hidden lg:block bg-gray-50 backdrop-blur-sm py-2 z-40 relative">
      <Container>
        <nav className="flex items-center justify-between py-2 font-outfit">
          <div className="w-60 flex-shrink-0">
            <a href="/" className="block">
              <img
                src="/logo.webp"
                alt="MDT Logo"
                title="MDT"
                className="w-full h-auto object-contain"
              />
            </a>
          </div>

          <div className="flex items-center gap-3">
            {pages.map((page, i) => (
              <div key={i} className="relative group">
                <a
                  href={page.links[0]}
                  title={page.name}
                  className={`flex items-center gap-1 text-[15px] font-normal text-black/60 hover:text-black py-2 px-2 capitalize transition-colors duration-300 ${page.links.includes(pathname) ? 'bg-primary-100 text-primary-600 rounded-md' : ''}`}
                >
                  {page.icon && <span className='text-sm mr-1'>{page.icon}</span>}
                  <span>{page.name}</span>
                  <span>{page.subpages ? <ChevronDown size={20} /> : ''}</span>
                </a>

                {page?.subpages && (
                  <div className="hidden group-hover:flex flex-col w-70 absolute top-9.5 left-0 bg-white rounded-xl border border-gray-200 shadow-md overflow-hidden z-[60]">
                    {page.subpages.map((subpage, j) => (
                      <a
                        key={j}
                        href={subpage.link}
                        className="text-[15px] font-normal text-black/50 hover:text-black px-4 py-2 hover:bg-gray-100"
                      >
                        {subpage.name}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </nav>
      </Container>
    </header>
  );
}
