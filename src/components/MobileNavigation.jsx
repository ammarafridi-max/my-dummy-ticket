import { useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { defaultPages } from './Navigation';
import { HiOutlineEnvelope, HiOutlineXMark } from 'react-icons/hi2';
import { CgMenuRightAlt } from "react-icons/cg";
import { ChevronDown, ChevronRight, Mail } from 'lucide-react';
import { useOutsideClick } from '../hooks/general/useOutsideClick';
import Container from './Container';
import { FaEnvelope } from 'react-icons/fa';

export default function MobileNavigation() {
  const { pathname } = useLocation()
  const wrapperRef = useRef(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [openIndex, setOpenIndex] = useState(null);

  useOutsideClick(wrapperRef, () => setMenuOpen(false));

  return (
    <nav className="block lg:hidden pt-4 relative z-50 bg-gray-50">
      <Container className="flex justify-between items-center">
        <a href="/" className="w-45 h-auto flex items-center">
          <img
            src="/logo.webp"
            alt="MDT Logo"
            title="MDT Logo"
            className="w-full h-auto object-contain"
          />
        </a>
        <div className='flex items-center gap-3'>
          <a aria-label="Email us" title="Email us" href='mailto:info@mydummyticket.ae' className='bg-gray-200 p-2 rounded-sm cursor-pointer duration-300 hover:bg-gray-300'>
            <HiOutlineEnvelope className="text-xl" aria-hidden="true" />
          </a>
          <div onClick={() => setMenuOpen(!menuOpen)} className='bg-gray-200 p-2 rounded-sm cursor-pointer duration-300 hover:bg-gray-300'>
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
          <div
            className="fixed inset-0 bg-black opacity-60 z-40"
            onClick={() => setMenuOpen(false)}
          />
          <div className="fixed inset-0 z-50 flex items-start justify-start">
            <div
              ref={wrapperRef}
              className="w-[65%] h-dvh flex flex-col gap-2 bg-white shadow-md border border-gray-200 px-5 pt-5"
            >
              {defaultPages.map((page, i) => {
                if (page.subpages) {
                  return (
                    <>
                      <div
                        key={i}
                        className="flex items-center justify-between px-3 py-2 text-base font-light text-gray-800 hover:bg-gray-100 transition"
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
                    className={`flex items-center justify-between px-3 py-2 text-base font-light rounded-md transition ${page.links.includes(pathname) ? 'bg-primary-100 text-primary-600' : 'text-gray-800 hover:bg-gray-100'}`}
                  >
                    <span className='flex items-center gap-3'>{page.icon && page.icon}{page.name}</span>
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
