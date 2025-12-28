import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ScrollToTop from '../components/ScrollToTop';

// Layout
import AppLayout from '../layouts/AppLayout';
import BookingLayout from '../layouts/BookingLayout';

// Landing Pages
import Home from '../pages/landing-pages/Home';
import FlightReservation from '../pages/landing-pages/FlightReservation';
import DummyTicketForSchengenVisa from '../pages/landing-pages/DummyTicketForSchengenVisa';
import DummyTicketForUSVisa from '../pages/landing-pages/DummyTicketForUSVisa';
import OnwardTicket from '../pages/landing-pages/OnwardTicket';

// Booking Pages
import SelectFlights from '../pages/booking-pages/SelectFlights';
import ReviewDetails from '../pages/booking-pages/ReviewDetails';
import PaymentSuccess from '../pages/booking-pages/PaymentSuccess';

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

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<Home />} />
          <Route path="dummy-ticket-schengen-visa" element={<DummyTicketForSchengenVisa />} />
          <Route path="dummy-ticket-us-visa" element={<DummyTicketForUSVisa />} />
          <Route path="onward-ticket" element={<OnwardTicket />} />
          <Route path="flight-reservation" element={<FlightReservation />} />
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
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
