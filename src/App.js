import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Navigation from "./Layout/Navigation";
import MobileNavigation from "./Layout/MobileNavigation";
import Footer from "./Layout/Footer";
import Home from "./Home/Home";
import FAQ from "./FAQ/FAQ";

export default function App() {
  return (
    <BrowserRouter>
      <MobileNavigation />
      <Navigation />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/faq" element={<FAQ />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}
