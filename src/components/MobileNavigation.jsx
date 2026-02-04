import { useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useOutsideClick } from '../hooks/general/useOutsideClick';
import { defaultPages } from './Navigation';
import { HiOutlineEnvelope, HiOutlineXMark } from 'react-icons/hi2';
import { CgMenuRightAlt } from 'react-icons/cg';
import { ChevronDown, ChevronRight } from 'lucide-react';
import Container from './Container';

export default function MobileNavigation() {
  const { pathname } = useLocation();
  const wrapperRef = useRef(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [openIndex, setOpenIndex] = useState(null);

  useOutsideClick(wrapperRef, () => setMenuOpen(false));

  return (
    <nav className="block lg:hidden pt-4 relative z-[9999] bg-gray-50">
      <Container className="flex justify-between items-center">
        <a href="/" className="w-45 h-auto flex items-center">
          <img src="/logo.webp" alt="MDT Logo" className="w-full h-auto object-contain" />
        </a>

        <div className="flex items-center gap-3">
          <a
            aria-label="Email us"
            href="mailto:info@mydummyticket.ae"
            className="bg-gray-200 p-2 rounded-sm hover:bg-gray-300"
          >
            <HiOutlineEnvelope className="text-xl" />
          </a>

          <div
            onClick={() => setMenuOpen(prev => !prev)}
            className="bg-gray-200 p-2 rounded-sm cursor-pointer hover:bg-gray-300"
          >
            {menuOpen ? (
              <HiOutlineXMark className="text-xl" />
            ) : (
              <CgMenuRightAlt className="text-xl" />
            )}
          </div>
        </div>
      </Container>

      {menuOpen && (
        <>
          <div className="fixed inset-0 bg-black/60 z-[9998]" />

          <div className="fixed inset-0 z-[9999] flex">
            <div
              ref={wrapperRef}
              className="w-[75%] h-dvh bg-white shadow-md border border-gray-200 px-5 pt-5"
            >
              {defaultPages.map((page, i) => {
                if (page.subpages) {
                  return (
                    <div key={i}>
                      <div
                        className="flex items-center justify-between px-3 py-2 text-base font-light text-gray-800 hover:bg-gray-100"
                        onClick={() => setOpenIndex(openIndex === i ? null : i)}
                      >
                        <div className="flex items-center gap-3">
                          {page.icon}
                          <span>{page.name}</span>
                        </div>
                        {openIndex === i ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
                      </div>

                      {openIndex === i && (
                        <div className="flex flex-col bg-gray-50">
                          {page.subpages.map((sub, idx) => (
                            <a
                              key={idx}
                              href={sub.link}
                              onClick={() => setMenuOpen(false)}
                              className="px-10 py-2 font-light text-gray-700 hover:bg-gray-100"
                            >
                              {sub.name}
                            </a>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                }

                return (
                  <a
                    key={i}
                    href={page.links[0]}
                    onClick={() => setMenuOpen(false)}
                    className={`flex items-center justify-between px-3 py-2 text-base font-light rounded-md transition ${
                      page.links.includes(pathname)
                        ? 'bg-primary-100 text-primary-600'
                        : 'text-gray-800 hover:bg-gray-100'
                    }`}
                  >
                    <span className="flex items-center gap-3">
                      {page.icon}
                      {page.name}
                    </span>
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
