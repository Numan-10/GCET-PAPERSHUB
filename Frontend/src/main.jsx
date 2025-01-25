import { createRoot } from "react-dom/client";
import About from "./Components/About/AboutPage.jsx";
// import Contributors from "./Components/Contributors/ContributePage.jsx";
import Home from "./Components/Home/HomePage.jsx";
import Landing from "./Components/Landing/Gcet.jsx" 
// import Gcet from "./Components/Landing/Gcet.jsx";
// import Updates from "./Components/Updates/UpdatePage.jsx";
import UpdatePage from "./Components/Update/UpdatePage.jsx";
import Navbar from "./Components/Navbar.jsx";
import Footer from "./Components/Footer.jsx";
import PageNotFound from "./Components/PageNotFound.jsx";
import { BrowserRouter, Routes, Route, useLocation } from "react-router";
import Upload from "./Components/Upload/UploadPage.jsx";
import Login from "./Components/Login/Login.jsx";
import Signup from "./Components/Signup/Signup.jsx";
// import Content from "./Components/Content/Content.jsx";
import ContentPage from "./Components/Content/ContentPage.jsx";
import "./index.css";
import SubDetails from "./Components/Details/SubDetails.jsx";
import ContributePage from "./Components/Contributors/ContributePage.jsx";
// import ContributePage from "./Components/contributors/contributePage.jsx";

function Layout({ children }) {
  const location = useLocation();

  const noNavbarFooterRoute = ["/"];

  return (
    <>
      {!noNavbarFooterRoute.includes(location.pathname) && <Navbar />}
      {children}
      {!noNavbarFooterRoute.includes(location.pathname) && <Footer />}
    </>
  );
}

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Layout>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/home" element={<Home />} />
        <Route path="/home/:id" element={<SubDetails />} />
        <Route path="/contributors" element={<ContributePage />} />
        <Route path="/updates" element={<UpdatePage />} />
        <Route path="/about" element={<About />} />
        <Route path="/upload" element={<Upload />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/content" element={<ContentPage />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </Layout>
  </BrowserRouter>
);
