import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import About from "./Components/About/AboutPage.jsx";
import Contributors from "./Components/contributors/contributePage.jsx";
import Home from "./Components/Home/HomePage.jsx";
import Gcet from "./Components/landing/Gcet.jsx";
import Updates from "./Components/updates/UpdatePage.jsx";
import Navbar from "./Components/Navbar.jsx";
import Footer from "./Components/Footer.jsx";
import PageNotFound from "./Components/PageNotFound.jsx";

import { BrowserRouter, Routes, Route } from "react-router";
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Gcet />} />
        <Route path="/home" element={<Home />} />
        <Route path="/contributors" element={<Contributors />} />
        <Route path="/updates" element={<Updates />} />
        <Route path="/about" element={<About />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  </StrictMode>
);
