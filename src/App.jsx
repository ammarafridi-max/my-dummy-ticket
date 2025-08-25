import '@fontsource-variable/nunito';
import '@fontsource/merriweather';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { ToastContainer, Zoom } from 'react-toastify';
import Layout from './components/Layout';
import BookingLayout from './components/BookingLayout';
import Home from './pages/Home';
import PageNotFound from './pages/PageNotFound';
import FAQ from './pages/FAQ';
import SelectFlights from './pages/SelectFlights';
import ReviewDetails from './pages/ReviewDetails';
import PaymentSuccess from './pages/PaymentSuccess';
import TermsAndConditions from './pages/TermsAndConditions';
import PrivacyPolicy from './pages/PrivacyPolicy';
import { useEffect } from 'react';
import { initializeGA } from './utils/analytics';

function App() {
  useEffect(() => {
    initializeGA();
  }, []);

  return (
    <HelmetProvider>
      <ToastContainer transition={Zoom} />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="*" element={<PageNotFound />} />
            <Route path="faq" element={<FAQ />} />
            <Route path="booking" element={<BookingLayout />}>
              <Route path="select-flights" element={<SelectFlights />} />
              <Route path="review-details" element={<ReviewDetails />} />
            </Route>
            <Route path="payment-successful" element={<PaymentSuccess />} />
            <Route
              path="terms-and-conditions"
              element={<TermsAndConditions />}
            />
            <Route path="privacy-policy" element={<PrivacyPolicy />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </HelmetProvider>
  );
}

export default App;
