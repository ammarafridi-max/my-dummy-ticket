import React from "react";
import ReactDOM from "react-dom/client";
import "./App.css";
import Home from "./Home/Home";
import About from "./About/About";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navigation from "./Layout/Navigation";
import Footer from "./Layout/Footer";

function App() {
  return (
    <BrowserRouter>
      <Navigation />
      <Routes>
        <Route path="/" element={<Home />} />
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
