import Container from './Container';

export const pages = [
  { name: 'Process', link: '/#process' },
  { name: 'About', link: '/#about' },
  { name: 'Benefits', link: '/#benefits' },
  { name: 'FAQs', link: '/#faq' },
  { name: 'Book Now', link: '/#form', cta: true },
  { name: 'Email Us', link: 'mailto:info@dummyticket365.com' },
];

export default function Navigation() {
  return (
    <header className="hidden lg:block bg-transparent py-2">
      <Container>
        <nav className="flex items-center justify-between py-1.25">
          <div className="w-[21%] p-0">
            <a href="/">
              <img
                src="/logo.webp"
                alt="My Dummy Ticket Logo"
                title="My Dummy Ticket Logo"
                className="w-full h-full object-contain"
              />
            </a>
          </div>
          <div className="w-auto flex items-center justify-between gap-5">
            {pages.map((page, i) => (
              <a
                className="text-[17px] font-semibold text-gray-700 capitalize py-2.5 px-1.25 duration-300 hover:text-accent-500 last:pr-0"
                key={i}
                href={page.link}
                title={page.name}
              >
                {page.name}
              </a>
            ))}
          </div>
        </nav>
      </Container>
    </header>
  );
}
