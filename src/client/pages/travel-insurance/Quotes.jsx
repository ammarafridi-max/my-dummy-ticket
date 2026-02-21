import { Helmet } from 'react-helmet-async';
import { useContext, useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { X } from 'lucide-react';
import 'swiper/css';

import { useInsuranceQuotes } from '../../../hooks/insurance/useInsuranceQuotes';
import { useOutsideClick } from '../../../hooks/general/useOutsideClick';
import { InsuranceContext } from '../../../context/InsuranceContext';

import Loading from '../../../components/Loading';
import InsuranceQuoteCard from '../../../components/InsuranceQuoteCard';
import Container from '../../../components/Container';

const pageData = {
  meta: {
    title: 'Quotes - Travel Insurance',
    description: 'Compare travel insurance plans and choose the coverage that fits your trip.',
    canonical: 'https://www.mydummyticket.ae/travel-insurance/quotes',
  },
};

export default function Quotes() {
  const navigate = useNavigate();
  const [showTable, setShowTable] = useState(false);

  const { schemeId, journeyType, startDate, endDate, region, group, quantity, handleSelectQuote } =
    useContext(InsuranceContext);

  const { insuranceQuotes, getInsuranceQuotes, isPendingInsuranceQuotes } = useInsuranceQuotes();

  useEffect(() => {
    if (!journeyType || !region?.id || !startDate || !endDate) return;

    getInsuranceQuotes({
      journeyType,
      startDate,
      endDate,
      region: region.id,
      group,
      quantity,
    });
  }, [journeyType, startDate, endDate, region, group, quantity, getInsuranceQuotes]);

  const quotesArray = useMemo(
    () => Object.values(insuranceQuotes?.quotes || {}),
    [insuranceQuotes]
  );

  const quoteId = insuranceQuotes?.quote_id;

  if (isPendingInsuranceQuotes) return <Loading />;

  return (
    <>
      <Helmet>
        <title>{pageData.meta.title}</title>
        <link rel="canonical" href={pageData.meta.canonical} />
        <meta name="robots" content="noindex, nofollow" />
        <meta name="description" content={pageData.meta.description} />
      </Helmet>

      <Swiper
        grabCursor
        spaceBetween={24}
        slidesPerView={1.1}
        breakpoints={{
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
      >
        {quotesArray.map(quote => (
          <SwiperSlide key={quote.scheme_id}>
            <InsuranceQuoteCard
              quote={quote}
              isSelected={schemeId === quote.scheme_id}
              onClick={() => handleSelectQuote(quote.scheme_id, quoteId)}
            />
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="mt-8 flex justify-center gap-4">
        <button
          type="button"
          onClick={() => setShowTable(true)}
          className="px-6 py-2.5 rounded-xl text-sm font-light hover:underline"
        >
          Compare plans
        </button>

        <button
          type="button"
          disabled={!schemeId}
          onClick={() => navigate('/travel-insurance/passenger-details')}
          className="px-6 py-2.5 rounded-xl bg-accent-500 text-white text-sm font-light hover:bg-accent-600 transition disabled:bg-accent-500/20 disabled:cursor-not-allowed"
        >
          Proceed
        </button>
      </div>

      {showTable && (
        <ComparisonTable quotesArray={quotesArray} onClose={() => setShowTable(false)} />
      )}
    </>
  );
}

function ComparisonTable({ quotesArray, onClose }) {
  const modalRef = useRef(null);
  useOutsideClick(modalRef, onClose);

  if (!quotesArray.length) return null;

  return (
    <div
      className="fixed inset-0 bg-black/50 z-[10000] flex items-center justify-center overflow-y-auto p-6"
      onClick={onClose}
    >
      <button
        onClick={onClose}
        className="fixed right-7 top-7 text-white z-[10001]"
        aria-label="Close comparison table"
      >
        <X size={40} />
      </button>

      <div
        ref={modalRef}
        onClick={e => e.stopPropagation()}
        className="w-full max-w-[95vw] md:max-w-[85vw]"
      >
        <Container className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-auto max-h-[75vh]">
          <table className="min-w-max w-full border-collapse text-sm">
            <thead className="sticky top-0 z-10 bg-gray-100 border-b border-gray-200">
              <tr>
                <th className="px-5 py-4 text-left text-gray-900 font-normal">Inclusions</th>

                {quotesArray.map(quote => (
                  <th
                    key={quote.scheme_id}
                    className="px-5 py-4 text-left text-gray-900 font-normal max-w-30"
                  >
                    {quote.name.split(' - ')[1]}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200">
              {quotesArray[0].benefits.map((benefit, i) => (
                <tr key={i} className="hover:bg-gray-50">
                  <td className="px-5 py-3 text-sm text-gray-600 max-w-60">{benefit.cover}</td>

                  {quotesArray.map((quote, j) => (
                    <td key={j} className="px-5 py-3 text-sm font-light text-gray-500 max-w-60">
                      {quote.benefits?.[i]?.amount === 'Not Covered' ? (
                        <X size={16} className="text-red-700" />
                      ) : (
                        quote.benefits?.[i]?.amount || <X size={16} className="text-red-700" />
                      )}
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
