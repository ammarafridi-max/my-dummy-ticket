import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { FaCheck, FaX } from 'react-icons/fa6';
import { useDummyTicket } from '../../../hooks/dummy-tickets/useDummyTicket';
import { trackPurchaseEvent } from '../../../lib/analytics';
import { formatDate } from '../../../utils/formatDate';
import { LuShieldPlus } from 'react-icons/lu';
import PrimarySection from '../../../components/PrimarySection';
import Container from '../../../components/Container';
import PageTitle from '../../../components/PageTitle';
import Loading from '../../../components/Loading';
import PrimaryLink from '../../../components/PrimaryLink';
import { useDummyTicketPricing } from '../../../hooks/pricing/useDummyTicketPricing';
import { getTicketPriceByValidity } from '../../../utils/dummyTicketPricing';
import { formatAmount, convertAmount } from '../../../utils/currency';
import { useContext } from 'react';
import { CurrencyContext } from '../../../context/CurrencyContext';

export default function PaymentSuccess() {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get('sessionId');
  const { dummyTicket, isLoadingDummyTicket, isErrorDummyTicket } = useDummyTicket(sessionId);

  if (isLoadingDummyTicket) return <Loading />;

  if (isErrorDummyTicket || dummyTicket?.paymentStatus === 'UNPAID' || !sessionId) return <Error />;

  return <Success sessionId={sessionId} dummyTicket={dummyTicket} />;
}

function Success({ sessionId, dummyTicket }) {
  const { pricing } = useDummyTicketPricing();
  const type = dummyTicket?.type;
  const quantity = Number(dummyTicket?.quantity?.adults || 0) + Number(dummyTicket?.quantity?.children || 0);
  const ticketValidity = dummyTicket?.ticketValidity;
  const currency = dummyTicket?.amountPaid?.currency;
  const amount = dummyTicket?.amountPaid?.amount;
  const fallbackPrice = getTicketPriceByValidity(pricing, ticketValidity);
  const price = quantity > 0 && Number.isFinite(Number(amount)) ? Number(amount) / quantity : fallbackPrice;

  useEffect(() => {
    if (currency && amount && import.meta.env.MODE === 'production') {
      trackPurchaseEvent({
        currency,
        value: amount,
        sessionId,
        items: [{ item_name: `${type} Flight Reservation`, quantity, price }],
      });
    }
  }, [amount, currency, price, quantity, sessionId, type]);

  useEffect(() => {
    localStorage.removeItem('SESSION_ID');
  }, []);

  return (
    <>
      <Helmet>
        <title>Payment Successfully Processed</title>
        <meta name="robots" content="none" />
      </Helmet>
      <PrimarySection className="py-20 md:pt-30 md:pb-15 bg-gray-50">
        <Container>
          <div className="w-30 h-30 flex items-center justify-center bg-green-500/20 text-green-800 mx-auto rounded-full text-5xl mb-10">
            <FaCheck />
          </div>
          <PageTitle className="text-center">Thank You for Your Booking!</PageTitle>
          <p className="text-center text-lg md:text-[18px] font-light mt-5">
            Your payment of{' '}
            <span className="font-normal">
              {currency} {formatAmount(amount)}
            </span>{' '}
            has been successfully processed.
          </p>
          {!dummyTicket?.ticketDelivery?.immediate && (
            <p className="text-center text-lg md:text-[18px] font-light mt-3">
              Your dummy ticket will be sent to your email address on{' '}
              {formatDate(dummyTicket?.ticketDelivery?.deliveryDate)} since you selected the later
              delivery option. An email regarding the same has been sent your email address, as
              well.
            </p>
          )}
          {dummyTicket?.ticketDelivery?.immediate && (
            <p className="text-center text-lg md:text-[18px] font-light mt-3">
              You will recieve a receipt of your payment by email, followed by your dummy ticket in
              a second email shortly afterwards. Please remember to check your spam folder too.
            </p>
          )}
          <div className="w-full mx-auto mt-10">
            <UpsellCard />
          </div>
        </Container>
      </PrimarySection>
    </>
  );
}

function UpsellCard() {
  const { pricing } = useDummyTicketPricing();
  const { currency } = useContext(CurrencyContext);
  const baseAmount = getTicketPriceByValidity(pricing, '2 Days');
  const displayAmount = convertAmount(baseAmount, currency?.conversionRate || 1);
  const displayCode = currency?.code || 'AED';

  return (
    <div className="max-w-120 bg-white rounded-2xl border border-gray-100 shadow-md mx-auto">
      <div className="flex items-center gap-4 border-b border-gray-100 p-5">
        <div className="w-8 h-8 flex items-center justify-center bg-primary-500 text-white rounded-full">
          <LuShieldPlus />
        </div>
        <div>Buy a Travel Insurance?</div>
      </div>
      <p className="font-extralight p-5">
        Book a legitimate, and 100% genuine travel insurance for your next trip. Our travel
        insurance policies are accepted by embassies for visa applications. Exclusively for UAE
        residents/citizens.
      </p>
      <div className="grid grid-cols-[6fr_4fr] gap-4 items-center justify-between border-t border-gray-100 p-5">
        <div className="flex flex-col">
          <span className="text-sm text-gray-900/40 font-extralight">from</span>
          <span>
            {displayCode} {formatAmount(displayAmount)}
          </span>
        </div>
        <div>
          <PrimaryLink className="w-full" size="small" to="/travel-insurance">
            Book Now
          </PrimaryLink>
        </div>
      </div>
    </div>
  );
}

function Error() {
  return (
    <>
      <Helmet>
        <title>Payment Not Found</title>
      </Helmet>
      <PrimarySection className="py-10 md:pt-30 md:pb-15 bg-gray-50">
        <Container>
          <div className="w-30 h-30 flex items-center justify-center bg-red-500/20 text-red-800 mx-auto rounded-full text-5xl mb-10">
            <FaX />
          </div>
          <PageTitle className="text-center">Payment Not Found!</PageTitle>
          <p className="text-center text-lg md:text-[20px] font-extralight mt-5">
            We couldn’t find a successful payment linked to this booking.
          </p>
          <p className="text-center text-lg md:text-[20px] font-extralight mt-5">
            If you have already completed a payment, please contact our support team with your
            transaction details at <a href="mailto:info@mydummyticket.ae">info@mydummyticket.ae</a>,
            and we will assist you as soon as possible.
          </p>
        </Container>
      </PrimarySection>
    </>
  );
}
