import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Navigation from "./Layout/Navigation";
import MobileNavigation from "./Layout/MobileNavigation";
import Footer from "./Layout/Footer";
import Home from "./Home/Home";

export default function App() {
  return (
    <BrowserRouter>
      <MobileNavigation />
      <Navigation />
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}
