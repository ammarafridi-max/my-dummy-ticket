import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { InsuranceProvider } from '../context/InsuranceContext';
import { TicketProvider } from '../context/TicketContext';
import ScrollToTop from '../components/ScrollToTop';

// Layout
import AppLayout from '../layouts/AppLayout';
import BookingLayout from '../layouts/BookingLayout';
import InsuranceBookingLayout from '../layouts/InsuranceBookingLayout';

// Landing Pages
import Home from '../pages/landing-pages/Home';
import FlightReservation from '../pages/landing-pages/FlightReservation';
import DummyTicketForSchengenVisa from '../pages/landing-pages/DummyTicketForSchengenVisa';
import DummyTicketForUSVisa from '../pages/landing-pages/DummyTicketForUSVisa';
import EmiratesDummyTicket from '../pages/landing-pages/EmiratesDummyTicket';
import EtihadDummyTicket from '../pages/landing-pages/EtihadDummyTicket';
import OnwardTicket from '../pages/landing-pages/OnwardTicket';

// Booking Pages
import SelectFlights from '../pages/booking-pages/SelectFlights';
import ReviewDetails from '../pages/booking-pages/ReviewDetails';
import PaymentSuccess from '../pages/booking-pages/PaymentSuccess';

// Travel Insurance
import TravelInsurance from '../pages/travel-insurance/TravelInsurance';
import Quotes from '../pages/travel-insurance/Quotes';
import PassengerDetails from '../pages/travel-insurance/PassengerDetails';
import InsurancePayment from '../pages/travel-insurance/InsurancePayment';

// Legal Pages
import TermsAndConditions from '../pages/legal-pages/TermsAndConditions';
import PrivacyPolicy from '../pages/legal-pages/PrivacyPolicy';

// FAQ
import FAQ from '../pages/faq/FAQ';

// Blog
import BlogPost from '../pages/blog-pages/BlogPost';
import Blog from '../pages/blog-pages/Blog';

// Other Pages
import Sitemap from '../pages/other/Sitemap';
import PageNotFound from '../pages/other/PageNotFound';
import AppLayout2 from '../layouts/AppLayout2';

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <TicketProvider>
        <InsuranceProvider>
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<AppLayout />}>
              <Route index element={<Home />} />
              <Route path="dummy-ticket-schengen-visa" element={<DummyTicketForSchengenVisa />} />
              <Route path="dummy-ticket-us-visa" element={<DummyTicketForUSVisa />} />
              <Route path="emirates-dummy-ticket" element={<EmiratesDummyTicket />} />
              <Route path="etihad-dummy-ticket" element={<EtihadDummyTicket />} />
              <Route path="onward-ticket" element={<OnwardTicket />} />
              <Route path="travel-insurance" element={<TravelInsurance />} />
              <Route path="*" element={<PageNotFound />} />
              <Route path="sitemap" element={<Sitemap />} />
              <Route path="faq" element={<FAQ />} />
              <Route path="payment-successful" element={<PaymentSuccess />} />
              <Route path="terms-and-conditions" element={<TermsAndConditions />} />
              <Route path="privacy-policy" element={<PrivacyPolicy />} />
              <Route path="blog" element={<Blog />} />
              <Route path="blog/:slug" element={<BlogPost />} />
              <Route path="booking" element={<BookingLayout />}>
                <Route path="select-flights" element={<SelectFlights />} />
                <Route path="review-details" element={<ReviewDetails />} />
              </Route>
              <Route element={<InsuranceBookingLayout />}>
                <Route path="travel-insurance/quotes" element={<Quotes />} />
                <Route path="travel-insurance/passenger-details" element={<PassengerDetails />} />
                <Route path="travel-insurance/payment" element={<InsurancePayment />} />
              </Route>
            </Route>
            <Route element={<AppLayout2 />}>
              <Route path="flight-reservation" element={<FlightReservation />} />
            </Route>
          </Routes>
        </InsuranceProvider>
      </TicketProvider>
    </BrowserRouter>
  );
}
