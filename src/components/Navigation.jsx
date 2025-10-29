import Container from './Container';

export const pages = [
  { name: 'Process', link: '/#process' },
  { name: 'About', link: '/#about' },
  { name: 'Benefits', link: '/#benefits' },
  { name: 'FAQs', link: '/#faq' },
  { name: 'Email Us', link: 'mailto:info@mydummyticket.ae' },
  { name: 'Book Now', link: '/#form', cta: true },
];

export default function Navigation() {
  return (
    <header className="hidden lg:block bg-white/80 backdrop-blur-sm py-2 shadow-sm sticky top-0 z-50">
      <Container>
        <nav className="flex items-center justify-between py-2 font-outfit">
          {/* Logo */}
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

          {/* Nav Links */}
          <div className="flex items-center gap-7">
            {pages.map((page, i) =>
              page.cta ? (
                <a
                  key={i}
                  href={page.link}
                  title={page.name}
                  className="bg-accent-500 text-white px-5 py-2 rounded-lg text-[16px] font-normal transition-all duration-300 hover:bg-[#e65e00]"
                >
                  {page.name}
                </a>
              ) : (
                <a
                  key={i}
                  href={page.link}
                  title={page.name}
                  className="text-[16px] font-normal text-gray-700 capitalize transition-colors duration-300 hover:text-[#ff6b00]"
                >
                  {page.name}
                </a>
              )
            )}
          </div>
        </nav>
      </Container>
    </header>
  );
}
