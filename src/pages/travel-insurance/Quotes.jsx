import { Helmet } from 'react-helmet-async';
import { useContext, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useInsuranceQuotes } from '../../hooks/useInsuranceQuotes';
import { useOutsideClick } from '../../hooks/useOutsideClick';
import { InsuranceContext } from '../../context/InsuranceContext';
import { Swiper, SwiperSlide } from 'swiper/react';
import { X } from 'lucide-react';
import 'swiper/css';
import Loading from '../../components/Loading';
import InsuranceQuoteCard from '../../components/InsuranceQuoteCard';
import Container from '../../components/Container';

const pageData = {
  meta: {
    title: 'Quotes - Travel Insurance',
    description:
      'Dummy tickets are flight reservations travelers use for various purposes, including visa applications. Book yours with My Dummy Ticket. Starting from AED 49.',
    canonical: 'https://www.mydummyticket.ae/travel-insurance/quotes',
  },
  sections: {},
};

export default function Quotes() {
  const navigate = useNavigate();
  const [showTable, setShowTable] = useState(false);
  const {
    schemeId,
    setSchemeId,
    setQuoteId,
    journeyType,
    startDate,
    endDate,
    region,
    group,
    quantity,
    handleSelectQuote,
  } = useContext(InsuranceContext);
  const { insuranceQuotes, getInsuranceQuotes, isPendingInsuranceQuotes } = useInsuranceQuotes();

  useEffect(() => {
    getInsuranceQuotes({
      journeyType,
      startDate,
      endDate,
      region: region.id,
      group,
      quantity,
    });
  }, [journeyType, startDate, endDate, region, group, quantity, getInsuranceQuotes]);

  if (isPendingInsuranceQuotes) return <Loading />;

  const quotesArray = insuranceQuotes?.quotes ? Object.values(insuranceQuotes?.quotes) : [];
  const quoteId = insuranceQuotes?.quote_id;

  console.log(quotesArray);

  return (
    <>
      <Helmet>
        <title>{pageData.meta.title}</title>
        <link rel="canonical" href={pageData.meta.canonical} />
        <meta name="robots" content="noindex, nofollow" />
        <meta name="description" content={pageData.meta.description} />
      </Helmet>

      {/* <SectionTitle className="mb-8 lg:mb-10 font-light" textAlign="center">
        1. Select Your Insurance Type
      </SectionTitle> */}

      <Swiper
        grabCursor
        spaceBetween={24}
        slidesPerView={1.1}
        breakpoints={{
          640: {
            slidesPerView: 1,
          },
          768: {
            slidesPerView: 2,
          },
          1024: {
            slidesPerView: 3,
          },
        }}
      >
        {quotesArray.map(quote => {
          return (
            <SwiperSlide key={quote.scheme_id}>
              <InsuranceQuoteCard
                key={quote.scheme_id}
                quote={quote}
                isSelected={schemeId === quote.scheme_id}
                onClick={() => handleSelectQuote(quote.scheme_id, quoteId)}
              />
            </SwiperSlide>
          );
        })}
      </Swiper>

      <div className="mt-8 flex justify-center gap-4">
        <button
          type="button"
          onClick={() => setShowTable(true)}
          className="px-6 py-2.5 rounded-xl bg-transparent text-gray-800 text-sm font-light transition cursor-pointer hover:underline"
        >
          Compare plans
        </button>
        <button
          type="button"
          onClick={() => navigate('/travel-insurance/passenger-details')}
          disabled={!schemeId}
          className="px-6 py-2.5 rounded-xl border border-accent-500 bg-accent-500 text-white text-sm font-light shadow-sm hover:shadow-md hover:bg-accent-600 transition cursor-pointer disabled:bg-accent-500/20 disabled:border-accent-500/20 disabled:cursor-not-allowed"
        >
          Proceed
        </button>
      </div>

      {showTable && (
        <ComparisonTable
          quotesArray={quotesArray}
          showTable={showTable}
          setShowTable={setShowTable}
        />
      )}
    </>
  );
}

function ComparisonTable({ quotesArray, setShowTable }) {
  const wrapperRef = useRef(null);

  useOutsideClick(wrapperRef, () => setShowTable(false));

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
      <X className="fixed right-7 top-7 text-white" size={40} />

      <div ref={wrapperRef} className="h-140">
        <Container className="h-full bg-white rounded-2xl border border-gray-200 shadow-sm overflow-x-scroll">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-50">
                <th className="text-left font-normal text-md text-gray-600 px-6 py-5">
                  Inclusions
                </th>
                {quotesArray.map((quote, i) => (
                  <th
                    key={quote.scheme_id || i}
                    className="text-left font-normal text-md text-gray-600 px-6 py-5"
                  >
                    {quote.name.split(' - ')[1]}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200">
              {quotesArray[0]?.benefits.map((ben, i) => (
                <tr key={i} className="hover:bg-gray-50 transition">
                  <td className="px-6 py-4 text-sm text-gray-500 font-light align-top">
                    {ben.cover}
                  </td>

                  {quotesArray.map((quote, j) => (
                    <td key={j} className="px-6 py-4 text-sm text-gray-900 font-light align-top">
                      {quote?.benefits?.[i]?.amount || '—'}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </Container>
      </div>
    </div>
  );
}
