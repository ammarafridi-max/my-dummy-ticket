import { ChevronDown } from 'lucide-react';
import Container from './Container';

export const pages = [
  {
    name: 'Dummy Tickets',
    link: '/',
    subpages: [
      {
        name: 'For Schengen Visa',
        link: '/dummy-ticket-schengen-visa',
      },
      {
        name: 'For US Visa',
        link: '/dummy-ticket-us-visa',
      },
    ],
  },
  { name: 'Process', link: '#process' },
  { name: 'About', link: '#about' },
  { name: 'Benefits', link: '#benefits' },
  { name: 'FAQs', link: '#faq' },
  { name: 'Email Us', link: 'mailto:info@mydummyticket.ae' },
];

export default function Navigation() {
  return (
    <header className="hidden lg:block bg-white/80 backdrop-blur-sm py-0 shadow-sm z-50">
      <Container>
        <nav className="flex items-center justify-between py-2 font-outfit">
          <div className="w-[200px] flex-shrink-0">
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
                  href={page.link}
                  title={page.name}
                  className="flex items-center gap-1 text-[16px] font-normal text-black/50 hover:text-black py-4 px-2 capitalize transition-colors duration-300"
                >
                  <span>{page.name}</span>
                  <span>{page.subpages ? <ChevronDown size={20} /> : ''}</span>
                </a>

                {page?.subpages && (
                  <div className="hidden group-hover:flex flex-col w-70 absolute top-12 left-0 bg-white rounded-xl border border-gray-200 shadow-md overflow-hidden">
                    {page.subpages.map((subpage, j) => (
                      <a
                        key={j}
                        href={subpage.link}
                        className="text-[15px] font-normal text-black/50 hover:text-black px-4 py-1.5 hover:bg-gray-100"
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
