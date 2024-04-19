import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Navigation from "./Layout/Navigation";
import MobileNavigation from "./Layout/MobileNavigation";
import Footer from "./Layout/Footer";
import Home from "./Home/Home";
import FAQ from "./FAQ/FAQ";

function App() {
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

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
