import { lazy, Suspense } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { InsuranceProvider } from '../../context/InsuranceContext';
import { TicketProvider } from '../../context/TicketContext';
import { CurrencyProvider } from '../../context/CurrencyContext';
import ScrollToTop from '../../components/ScrollToTop';

// Layout
import AppLayout from '../../layouts/AppLayout';
import BookingLayout from '../../layouts/BookingLayout';
import InsuranceBookingLayout from '../../layouts/InsuranceBookingLayout';

// Landing Pages
import Home from '../pages/landing-pages/Home';
const AppLayout2 = lazy(() => import('../../layouts/AppLayout2'));
const FlightReservation = lazy(() => import('../pages/landing-pages/FlightReservation'));
const DummyTicketForSchengenVisa = lazy(
  () => import('../pages/landing-pages/DummyTicketForSchengenVisa')
);
const DummyTicketForUSVisa = lazy(() => import('../pages/landing-pages/DummyTicketForUSVisa'));
const EmiratesDummyTicket = lazy(() => import('../pages/landing-pages/EmiratesDummyTicket'));
const EtihadDummyTicket = lazy(() => import('../pages/landing-pages/EtihadDummyTicket'));
const OnwardTicket = lazy(() => import('../pages/landing-pages/OnwardTicket'));
const SelectFlights = lazy(() => import('../pages/booking-pages/SelectFlights'));
const ReviewDetails = lazy(() => import('../pages/booking-pages/ReviewDetails'));
const PaymentSuccess = lazy(() => import('../pages/booking-pages/PaymentSuccess'));
const TravelInsurance = lazy(() => import('../pages/travel-insurance/TravelInsurance'));
const Quotes = lazy(() => import('../pages/travel-insurance/Quotes'));
const PassengerDetails = lazy(() => import('../pages/travel-insurance/PassengerDetails'));
const InsurancePayment = lazy(() => import('../pages/travel-insurance/InsurancePayment'));
const TermsAndConditions = lazy(() => import('../pages/legal-pages/TermsAndConditions'));
const PrivacyPolicy = lazy(() => import('../pages/legal-pages/PrivacyPolicy'));
const FAQ = lazy(() => import('../pages/faq/FAQ'));
const BlogPost = lazy(() => import('../pages/blog-pages/BlogPost'));
const Blog = lazy(() => import('../pages/blog-pages/Blog'));
const PageNotFound = lazy(() => import('../pages/other/PageNotFound'));

function LazyRoute({ children }) {
  return <Suspense fallback={null}>{children}</Suspense>;
}

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <CurrencyProvider>
        <TicketProvider>
          <InsuranceProvider>
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<AppLayout />}>
              <Route index element={<Home />} />
              <Route
                path="dummy-ticket-schengen-visa"
                element={
                  <LazyRoute>
                    <DummyTicketForSchengenVisa />
                  </LazyRoute>
                }
              />
              <Route
                path="dummy-ticket-us-visa"
                element={
                  <LazyRoute>
                    <DummyTicketForUSVisa />
                  </LazyRoute>
                }
              />
              <Route
                path="emirates-dummy-ticket"
                element={
                  <LazyRoute>
                    <EmiratesDummyTicket />
                  </LazyRoute>
                }
              />
              <Route
                path="etihad-dummy-ticket"
                element={
                  <LazyRoute>
                    <EtihadDummyTicket />
                  </LazyRoute>
                }
              />
              <Route
                path="onward-ticket"
                element={
                  <LazyRoute>
                    <OnwardTicket />
                  </LazyRoute>
                }
              />
              <Route
                path="travel-insurance"
                element={
                  <LazyRoute>
                    <TravelInsurance />
                  </LazyRoute>
                }
              />
              <Route
                path="*"
                element={
                  <LazyRoute>
                    <PageNotFound />
                  </LazyRoute>
                }
              />
              <Route
                path="faq"
                element={
                  <LazyRoute>
                    <FAQ />
                  </LazyRoute>
                }
              />
              <Route
                path="payment-successful"
                element={
                  <LazyRoute>
                    <PaymentSuccess />
                  </LazyRoute>
                }
              />
              <Route
                path="terms-and-conditions"
                element={
                  <LazyRoute>
                    <TermsAndConditions />
                  </LazyRoute>
                }
              />
              <Route
                path="privacy-policy"
                element={
                  <LazyRoute>
                    <PrivacyPolicy />
                  </LazyRoute>
                }
              />
              <Route
                path="blog"
                element={
                  <LazyRoute>
                    <Blog />
                  </LazyRoute>
                }
              />
              <Route
                path="blog/:slug"
                element={
                  <LazyRoute>
                    <BlogPost />
                  </LazyRoute>
                }
              />
              <Route path="booking" element={<BookingLayout />}>
                <Route
                  path="select-flights"
                  element={
                    <LazyRoute>
                      <SelectFlights />
                    </LazyRoute>
                  }
                />
                <Route
                  path="review-details"
                  element={
                    <LazyRoute>
                      <ReviewDetails />
                    </LazyRoute>
                  }
                />
              </Route>
              <Route element={<InsuranceBookingLayout />}>
                <Route
                  path="travel-insurance/quotes"
                  element={
                    <LazyRoute>
                      <Quotes />
                    </LazyRoute>
                  }
                />
                <Route
                  path="travel-insurance/passenger-details"
                  element={
                    <LazyRoute>
                      <PassengerDetails />
                    </LazyRoute>
                  }
                />
                <Route
                  path="travel-insurance/payment"
                  element={
                    <LazyRoute>
                      <InsurancePayment />
                    </LazyRoute>
                  }
                />
              </Route>
            </Route>
            <Route
              element={
                <LazyRoute>
                  <AppLayout2 />
                </LazyRoute>
              }
            >
              <Route
                path="flight-reservation"
                element={
                  <LazyRoute>
                    <FlightReservation />
                  </LazyRoute>
                }
              />
            </Route>
          </Routes>
          </InsuranceProvider>
        </TicketProvider>
      </CurrencyProvider>
    </BrowserRouter>
  );
}
