import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
  Navigate,
} from "react-router-dom";
import { useEffect, useContext } from "react";
import { CurrencyProvider, CurrencyContext } from "./Context/CurrencyContext";
import "./App.css";
import Navigation from "./Layout/Navigation";
import MobileNavigation from "./Layout/MobileNavigation";
import Footer from "./Layout/Footer";
import Home from "./Home/Home";
import PaymentSuccess from "./PaymentSuccess/PaymentSuccess";

export default function App() {
  return (
    <>
      <BrowserRouter>
        <MobileNavigation />
        <Navigation />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="*" element={<Navigate to="/" />} />
          <Route path="/payment-successful" element={<PaymentSuccess />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}
