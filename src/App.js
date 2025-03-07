import { BrowserRouter, Route, Routes } from 'react-router-dom';
import '@fontsource-variable/nunito';
import './App.css';
import Layout from './layout/Layout';
import BookingLayout from './pages/BookingLayout/BookingLayout';
import Home from './pages/Home/Home';
import PageNotFound from './pages/PageNotFound/PageNotFound';
import FAQ from './pages/FAQ/FAQ';
import SelectFlights from './pages/SelectFlights/SelectFlights';
import ReviewDetails from './pages/ReviewDetails/ReviewDetails';
import PaymentSuccess from './pages/PaymentSuccess/PaymentSuccess';
import TermsAndConditions from './pages/Legal/TermsAndConditions';
import PrivacyPolicy from './pages/Legal/PrivacyPolicy';

export default function App() {
  return (
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
          <Route path="terms-and-conditions" element={<TermsAndConditions />} />
          <Route path="privacy-policy" element={<PrivacyPolicy />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
