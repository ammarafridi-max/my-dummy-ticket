import { useRef, useState } from 'react';
import { pages } from './Navigation';
import { HiOutlineXMark, HiOutlineBars3 } from 'react-icons/hi2';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { useOutsideClick } from '../hooks/useOutsideClick';
import Container from './Container';

export default function MobileNavigation() {
  const wrapperRef = useRef(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [openIndex, setOpenIndex] = useState(null);

  useOutsideClick(wrapperRef, () => setMenuOpen(false));

  return (
    <nav className="block lg:hidden py-3 relative z-50">
      <Container className="flex justify-between items-center">
        <a href="/" className="w-45 h-auto flex items-center">
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
          <div className="fixed inset-0 z-50 flex items-start justify-start">
            <div
              ref={wrapperRef}
              className="w-[80%] h-dvh bg-white shadow-md border border-gray-200"
            >
              {pages.map((page, i) => {
                if (page.subpages) {
                  return (
                    <>
                      <div
                        key={i}
                        className="flex items-center justify-between px-6 py-2 text-base font-light text-gray-800 hover:bg-gray-100 transition"
                        onClick={() => setOpenIndex(openIndex === i ? null : i)}
                      >
                        <span>{page.name}</span>
                        {openIndex === i ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
                      </div>

                      {openIndex === i && page.subpages && (
                        <div className="flex flex-col bg-gray-50">
                          {page.subpages.map((sub, idx) => (
                            <a
                              key={idx}
                              href={sub.link}
                              className="px-10 py-2 font-light text-gray-700 hover:bg-gray-100"
                            >
                              {sub.name}
                            </a>
                          ))}
                        </div>
                      )}
                    </>
                  );
                }

                return (
                  <a
                    key={i}
                    href={page.link}
                    onClick={() => setMenuOpen(false)}
                    className="flex items-center justify-between px-6 py-2 text-base font-light text-gray-800 hover:bg-gray-100 transition"
                  >
                    <span>{page.name}</span>
                  </a>
                );
              })}
            </div>
          </div>
        </>
      )}
    </nav>
  );
}
