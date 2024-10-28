import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import Home from "./Pages/Home/Home";
import SelectFlights from "./Pages/SelectFlights/SelectFlights";
import FAQ from "./Pages/FAQ/FAQ";
import PaymentSuccess from "./Pages/PaymentSuccess/PaymentSuccess";
import ReviewDetails from "./Pages/ReviewDetails/ReviewDetails";
import BookingLayout from "./Pages/BookingLayout/BookingLayout";
import Layout from "./Layout/Layout";
import PageNotFound from "./Pages/PageNotFound/PageNotFound";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import the styles for toastify

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "*", element: <PageNotFound /> },
      { path: "/faq", element: <FAQ /> },
      { path: "/payment-successful", element: <PaymentSuccess /> },
      {
        path: "/booking",
        element: <BookingLayout />,
        children: [
          { path: "select-flights", element: <SelectFlights /> },
          { path: "review-details", element: <ReviewDetails /> },
          { path: "payment-successfull", element: <PaymentSuccess /> },
        ],
      },
      { path: "/payment-successfull", element: <PaymentSuccess /> },
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
