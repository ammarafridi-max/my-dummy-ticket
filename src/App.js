import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css';
import Home from './pages/Home/Home';
import SelectFlights from './pages/SelectFlights/SelectFlights';
import FAQ from './pages/FAQ/FAQ';
import PaymentSuccess from './pages/PaymentSuccess/PaymentSuccess';
import ReviewDetails from './pages/ReviewDetails/ReviewDetails';
import BookingLayout from './pages/BookingLayout/BookingLayout';
import Layout from './layout/Layout';
import PageNotFound from './pages/PageNotFound/PageNotFound';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import TermsAndConditions from './pages/Legal/TermsAndConditions';
import PrivacyPolicy from './pages/Legal/PrivacyPolicy';

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { path: '/', element: <Home /> },
      { path: '*', element: <PageNotFound /> },
      { path: '/faq', element: <FAQ /> },
      { path: '/payment-successful', element: <PaymentSuccess /> },
      {
        path: '/booking',
        element: <BookingLayout />,
        children: [
          { path: 'select-flights', element: <SelectFlights /> },
          { path: 'review-details', element: <ReviewDetails /> },
          { path: 'payment-successfull', element: <PaymentSuccess /> },
        ],
      },
      { path: '/payment-successfull', element: <PaymentSuccess /> },
      { path: '/terms-and-conditions', element: <TermsAndConditions /> },
      { path: '/privacy-policy', element: <PrivacyPolicy /> },
    ],
  },
]);

export default function App() {
  return (
    <>
      {/* ToastContainer added here */}
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <RouterProvider router={router} />
    </>
  );
}
