import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import Navigation from "./Layout/Navigation";
import MobileNavigation from "./Layout/MobileNavigation";
import Footer from "./Layout/Footer";
import Home from "./Pages/Home/Home";
import FAQ from "./Pages/FAQ/FAQ";
import PaymentSuccess from "./Pages/PaymentSuccess/PaymentSuccess";
import ReviewDetails from "./Pages/ReviewDetails/ReviewDetails";

export default function App() {
  return (
    <>
      <BrowserRouter>
        <MobileNavigation />
        <Navigation />
        <Routes>
          <Route path="*" element={<Navigate to="/" />} />
          <Route path="/" element={<Home />} />
          <Route path="/payment-successful" element={<PaymentSuccess />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/review" element={<ReviewDetails />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}
