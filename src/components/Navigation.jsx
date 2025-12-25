import Container from './Container';

export const pages = [
  { name: 'Process', link: '/#process' },
  { name: 'About', link: '/#about' },
  { name: 'Benefits', link: '/#benefits' },
  { name: 'FAQs', link: '/#faq' },
  { name: 'Email Us', link: 'mailto:info@mydummyticket.ae' },
];

export default function Navigation() {
  return (
    <header className="hidden lg:block bg-white/80 backdrop-blur-sm py-2 shadow-sm z-50">
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

          <div className="flex items-center gap-7">
            {pages.map((page, i) => (
              <a
                key={i}
                href={page.link}
                title={page.name}
                className="text-[16px] font-light text-black/60 hover:text-black hover:font-normal capitalize transition-colors duration-300"
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
