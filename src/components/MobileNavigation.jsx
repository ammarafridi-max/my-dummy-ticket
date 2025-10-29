import { useState } from 'react';
import { pages } from './Navigation';
import { HiOutlineXMark, HiOutlineBars3 } from 'react-icons/hi2';
import Container from './Container';

export default function MobileNavigation() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="block lg:hidden py-3 relative z-50">
      <Container className="flex justify-between items-center">
        <a href="/" className="w-40 h-auto flex items-center">
          <img
            src="/logo.webp"
            alt="MDT Logo"
            title="MDT Logo"
            className="w-full h-auto object-contain"
          />
        </a>
        <button onClick={() => setMenuOpen(!menuOpen)} name="mobileMenu">
          {menuOpen ? (
            <HiOutlineXMark className="text-3xl" />
          ) : (
            <HiOutlineBars3 className="text-3xl" />
          )}
        </button>
      </Container>

      {menuOpen && (
        <>
          <div
            className="fixed inset-0 bg-black opacity-60 z-40"
            onClick={() => setMenuOpen(false)}
          />
          <div
            className="fixed inset-0 z-50 flex items-start m-10 justify-center"
            onClick={() => setMenuOpen(false)}
          >
            <div className="w-full h-fit bg-white shadow-md border border-gray-200 rounded-md">
              {pages.map((page, i) => (
                <a
                  key={i}
                  href={page.link}
                  onClick={() => setMenuOpen(false)}
                  className="block px-6 py-3 text-center text-base text-gray-800 hover:bg-gray-100 transition"
                >
                  {page.name}
                </a>
              ))}
            </div>
          </div>
        </>
      )}
    </nav>
  );
}
